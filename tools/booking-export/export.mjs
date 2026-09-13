import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import PDFDocument from "pdfkit";
const exec = promisify(execFile);
export function validateBooking(value) {
  if (!/^(?:[a-zA-Z0-9]{15}(?:[a-zA-Z0-9]{3})?|B-\d{1,12})$/.test(value))
    throw new Error("Provide a Salesforce booking ID or B- booking reference.");
  return value;
}
export async function readBooking(booking) {
  validateBooking(booking);
  // Let the CLI refresh its session; never expose or handle access tokens here.
  const request = async (route, options = {}) => {
    const args = [
      "api",
      "request",
      "rest",
      route,
      "--target-org",
      process.env.SF_TARGET_ORG || "aforce_de"
    ];
    if (options.method) args.push("--method", options.method);
    if (options.body) args.push("--body", options.body);
    try {
      const { stdout } = await exec(
        process.env.SF_BIN || "/opt/homebrew/bin/sf",
        args,
        { timeout: 60000, maxBuffer: 2 * 1024 * 1024 }
      );
      return JSON.parse(stdout);
    } catch {
      throw new Error(
        "Salesforce request failed. Check the configured CLI org connection and booking access."
      );
    }
  };
  let id = booking;
  if (booking.startsWith("B-")) {
    const result = await request(
      "/services/data/v67.0/query?q=" +
        encodeURIComponent(
          `SELECT Id FROM Booking__c WHERE Name = '${booking}' LIMIT 2`
        )
    );
    if (result.records.length !== 1)
      throw new Error(
        "Booking reference not found or ambiguous for this Salesforce user."
      );
    id = result.records[0].Id;
  }
  const response = await request(
    "/services/data/v67.0/actions/custom/apex/BookingDetailsAction",
    { method: "POST", body: JSON.stringify({ inputs: [{ bookingId: id }] }) }
  );
  const data = response[0]?.outputValues?.bookingResult;
  if (!response[0]?.isSuccess || !data?.isSuccess)
    throw new Error(data?.message || "Booking details unavailable.");
  return data;
}
export function allowedPhoto(url) {
  return /^https:\/\/s3-us-west-2\.amazonaws\.com\/dev-or-devrl-s3-bucket\/sample-apps\/coral-clouds\/[A-Za-z0-9_-]+\.(jpg|jpeg|png)$/.test(
    url || ""
  );
}
export async function readPhoto(booking) {
  if (!booking.hasImage) return null;
  if (!allowedPhoto(booking.imageUrl))
    throw new Error(
      "The booking photo is outside the approved Coral Cloud image catalog."
    );
  const response = await fetch(booking.imageUrl, {
    redirect: "error",
    signal: AbortSignal.timeout(20000)
  });
  if (
    !response.ok ||
    !/^image\/(jpeg|png)(;|$)/i.test(response.headers.get("content-type") || "")
  )
    throw new Error(
      "Could not retrieve the exact experience photo. No substitute will be used."
    );
  const chunks = [];
  let size = 0;
  for await (const chunk of response.body) {
    size += chunk.length;
    if (size > 5 * 1024 * 1024)
      throw new Error("Experience photo is too large to export.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
export function renderPdf(booking, photo) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 42,
      info: { Title: `Coral Cloud booking ${booking.bookingReference}` }
    });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    try {
      doc
        .fillColor("#006b70")
        .font("Helvetica-Bold")
        .fontSize(14)
        .text("CORAL CLOUD RESORTS");
      doc
        .moveDown(0.4)
        .fillColor("#163638")
        .fontSize(25)
        .text("Booking confirmation");
      doc.moveDown(0.6);
      if (photo) {
        const y = doc.y;
        doc.image(photo, 42, y, {
          fit: [511, 275],
          align: "center",
          valign: "center"
        });
        doc.y = y + 290;
      } else
        doc
          .font("Helvetica")
          .fontSize(11)
          .text("Experience image unavailable")
          .moveDown();
      doc
        .font("Helvetica-Bold")
        .fontSize(20)
        .text(booking.experienceName || "Experience");
      doc.moveDown(0.6);
      doc.font("Helvetica").fontSize(12);
      for (const [label, value] of [
        ["Booked for", booking.contactName],
        ["Booking", booking.bookingReference],
        ["Status", booking.bookingStatus],
        ["Date", booking.sessionDate],
        [
          "Time",
          `${booking.startTime || "Not provided"} - ${booking.endTime || "Not provided"} (${booking.timeZone})`
        ],
        ["Guests", booking.guestCount],
        [
          "Total",
          `${booking.currencyCode || ""} ${booking.totalPrice == null ? "Not provided" : Number(booking.totalPrice).toFixed(2)}`
        ]
      ])
        doc.text(`${label}: ${value ?? "Not provided"}`).moveDown(0.5);
      doc
        .moveDown()
        .fontSize(8)
        .fillColor("#567574")
        .text(`Saved booking snapshot | ${new Date().toISOString()}`);
      doc.end();
    } catch (error) {
      doc.destroy();
      reject(error);
    }
  });
}
export async function chooseSaveLocation(filename, run = exec) {
  if (process.platform !== "darwin")
    throw new Error("The Save As dialog currently requires macOS.");
  const script = `on run argv
try
  activate
  set destination to choose file name with prompt "Save Coral Cloud booking PDF" default name (item 1 of argv) default location (path to downloads folder)
  return POSIX path of destination
on error number -128
  return ""
end try
end run`;
  const { stdout } = await run("/usr/bin/osascript", ["-e", script, filename], {
    timeout: 120000
  });
  const selected = stdout.replace(/\r?\n$/, "");
  if (!selected) return null;
  if (
    !path.isAbsolute(selected) ||
    path.extname(selected).toLowerCase() !== ".pdf"
  )
    throw new Error("Choose a filename ending in .pdf.");
  return selected;
}
export async function exportBooking(booking, chooseLocation = true) {
  const data = await readBooking(booking);
  const photo = await readPhoto(data);
  const pdf = await renderPdf(data, photo);
  if (!/^B-\d{1,12}$/.test(data.bookingReference))
    throw new Error(
      "Unexpected booking reference; cannot safely name the file."
    );
  let file;
  if (chooseLocation) {
    file = await chooseSaveLocation(data.bookingReference + ".pdf");
    if (!file)
      return {
        cancelled: true,
        message: "Save cancelled. No file was written."
      };
  } else {
    const directory =
      process.env.CORAL_EXPORT_DIR ||
      path.join(homedir(), "Downloads", "Coral Cloud Bookings");
    await mkdir(directory, { recursive: true, mode: 0o700 });
    file = path.join(directory, data.bookingReference + ".pdf");
  }
  try {
    await writeFile(file, pdf, { flag: "wx", mode: 0o600 });
  } catch (error) {
    if (error.code === "EEXIST")
      throw new Error(
        `A PDF already exists at ${file}. Move or delete it before requesting a fresh export.`
      );
    throw error;
  }
  return {
    file,
    bookingReference: data.bookingReference,
    bytes: pdf.length,
    hasPhoto: !!photo
  };
}
