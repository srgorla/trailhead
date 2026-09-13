import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { writeFile } from "node:fs/promises";
import {
  chooseSaveLocation,
  readBooking,
  readPhoto,
  renderPdf
} from "./export.mjs";

// Tokens and PDFs live only in this process. No public listener or disk staging.
export function createDownloadLinks({
  choose = chooseSaveLocation,
  save = writeFile,
  now = Date.now,
  ttl = 10 * 60 * 1000
} = {}) {
  const entries = new Map();
  let origin;
  const server = createServer(async (req, res) => {
    const headers = {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy":
        "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'"
    };
    const reply = (status, body) => {
      res.writeHead(status, headers);
      res.end(body);
    };
    const page = (message, form = "") =>
      `<!doctype html><html><head><title>Save booking PDF</title><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{font:18px system-ui;background:#eff6f5;color:#163638;padding:40px}main{max-width:600px;margin:auto}button{font:inherit;background:#006b70;color:white;border:0;padding:14px;border-radius:8px}</style></head><body><main><h1>Save booking PDF</h1><p>${message}</p>${form}</main></body></html>`;
    if (req.headers.host !== new URL(origin).host)
      return reply(403, page("Invalid host."));
    const match = /^\/save\/([a-f0-9]{48})$/.exec(req.url || "");
    const entry = match && entries.get(match[1]);
    if (!entry || now() >= entry.expires) {
      if (match) entries.delete(match[1]);
      return reply(
        410,
        page("This link has expired. Ask Claude for a new download link.")
      );
    }
    if (req.method === "GET")
      return reply(
        200,
        page(
          `Ready to save ${entry.reference}.pdf. This link works only on this Mac and expires in ten minutes.`,
          `<form method="post"><button type="submit">Choose location and save</button></form>`
        )
      );
    if (req.method !== "POST") return reply(405, page("Method not allowed."));
    if (req.headers.origin !== origin)
      return reply(
        403,
        page("Open the original download link and use its save button.")
      );
    if (entry.busy)
      return reply(409, page("A Save As dialog is already open."));
    entry.busy = true;
    try {
      const file = await choose(entry.reference + ".pdf");
      if (!file)
        return reply(
          200,
          page("Save cancelled. You can return to the link to try again.")
        );
      await save(file, entry.pdf, { flag: "wx", mode: 0o600 });
      entries.delete(match[1]);
      reply(
        200,
        page(
          "Your PDF was saved in the location you selected. You can close this tab."
        )
      );
    } catch (error) {
      reply(
        400,
        page(
          error.code === "EEXIST"
            ? "A file already exists there. Return to the link and choose another filename."
            : "The PDF could not be saved. Return to the link to retry."
        )
      );
    } finally {
      entry.busy = false;
    }
  });
  const ready = new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      origin = `http://127.0.0.1:${server.address().port}`;
      server.unref();
      resolve();
    });
  });
  const cleanup = setInterval(() => {
    for (const [token, entry] of entries)
      if (!entry.busy && now() >= entry.expires) entries.delete(token);
  }, 60000);
  cleanup.unref();
  return {
    async add(reference, pdf) {
      await ready;
      if (!/^B-\d{1,12}$/.test(reference))
        throw new Error("Invalid booking reference.");
      for (const [key, entry] of entries)
        if (!entry.busy && now() >= entry.expires) entries.delete(key);
      if (entries.size >= 5)
        throw new Error(
          "Five download links are already pending. Save one or wait for expiry."
        );
      if (pdf.length > 8 * 1024 * 1024)
        throw new Error("PDF is too large for a temporary link.");
      const token = randomBytes(24).toString("hex"),
        expires = now() + ttl;
      entries.set(token, { pdf, reference, expires, busy: false });
      return {
        url: `${origin}/save/${token}`,
        expiresAt: new Date(expires).toISOString(),
        filename: reference + ".pdf"
      };
    },
    async close() {
      clearInterval(cleanup);
      await ready;
      entries.clear();
      await new Promise((resolve) => server.close(resolve));
    }
  };
}
let links;
export async function prepareBookingDownload(booking) {
  const data = await readBooking(booking),
    photo = await readPhoto(data),
    pdf = await renderPdf(data, photo);
  links ||= createDownloadLinks();
  return links.add(data.bookingReference, pdf);
}
