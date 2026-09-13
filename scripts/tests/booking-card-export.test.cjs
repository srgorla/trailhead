const { test } = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const source = fs.readFileSync(
  path.join(
    __dirname,
    "../../force-app/main/default/staticresources/bookingCardExport.resource"
  ),
  "utf8"
);
async function render(overrides = {}, error = "") {
  const drawn = [],
    downloads = [],
    handlers = {};
  const booking = {
    bookingId: "a00gL00001XG2gfQAD",
    isSuccess: true,
    hasImage: true,
    experienceName: "Ocean Kayak Fitness Expedition",
    contactName: "Osborn Libbe",
    bookingReference: "B-00001738",
    bookingStatus: "Booked",
    sessionDate: "2026-09-12",
    startTime: "09:00",
    endTime: "15:00",
    timeZone: "America/Chicago",
    guestCount: 2,
    totalPrice: 300,
    currencyCode: "USD",
    ...overrides
  };
  const context = {
    measureText: (s) => ({ width: s.length * 16 }),
    fillRect() {},
    drawImage() {
      drawn.push("PHOTO");
    },
    fillText: (value) => drawn.push(value)
  };
  const nodes = {
    "export-status": {},
    "download-card": {
      disabled: true,
      addEventListener: (event, fn) => (handlers[event] = fn)
    },
    "booking-canvas": {
      getContext: () => context,
      toBlob: (fn, mime) => {
        assert.equal(mime, "image/jpeg");
        return fn(new Blob([new Uint8Array([255, 216, 255, 217])]));
      }
    },
    "booking-payload": { textContent: JSON.stringify(booking) },
    "booking-photo": { textContent: "data:image/png;base64,example" },
    "booking-error": { textContent: error }
  };
  class Image {
    naturalWidth = 1200;
    naturalHeight = 800;
    set src(value) {
      assert.match(value, /^data:image\//);
      this.onload();
    }
  }
  await vm.runInNewContext(source, {
    Image,
    Blob,
    TextEncoder,
    Uint8Array,
    document: {
      getElementById: (id) => nodes[id],
      body: { appendChild() {} },
      createElement: () => {
        const link = {
          click() {
            downloads.push(this.download);
          },
          remove() {}
        };
        return link;
      }
    },
    URL: { createObjectURL: () => "blob:test", revokeObjectURL() {} },
    setTimeout: (fn) => fn()
  });
  return { nodes, drawn, downloads, handlers };
}
test("whole-card export draws photo and saved booking details and downloads PDF", async () => {
  const result = await render();
  assert.equal(result.nodes["download-card"].disabled, false);
  for (const text of [
    "PHOTO",
    "Ocean Kayak Fitness Expedition",
    "Booked for: Osborn Libbe",
    "Booking: B-00001738",
    "Status: Booked",
    "Date: 2026-09-12",
    "Guests: 2",
    "Total: USD 300.00"
  ])
    assert.ok(result.drawn.includes(text), text);
  await result.handlers.click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(result.downloads, ["B-00001738.pdf"]);
});
test("photo or access errors prevent exporting an incomplete confirmation", async () => {
  const result = await render({}, "Photo unavailable");
  assert.equal(result.nodes["download-card"].disabled, true);
  assert.equal(result.nodes["export-status"].textContent, "Photo unavailable");
  assert.equal(result.drawn.length, 0);
});
test("canceled state and unavailable image are accurately represented", async () => {
  const result = await render({ hasImage: false, bookingStatus: "Canceled" });
  assert.ok(result.drawn.includes("Status: Canceled"));
  assert.ok(result.drawn.includes("Experience image unavailable"));
  assert.ok(!result.drawn.includes("PHOTO"));
});
test("long contact names wrap without loss and filenames discard unsafe characters", async () => {
  const name = "LongName".repeat(30);
  const result = await render({
    contactName: name,
    bookingReference: "../booking/<unsafe>"
  });
  assert.ok(result.drawn.join("").includes("Booked for: " + name));
  await result.handlers.click();
  await new Promise((resolve) => setImmediate(resolve));
  assert.match(result.downloads[0], /^[A-Za-z0-9_-]+\.pdf$/);
});

test("PDF contains correct byte offsets and a page embedding the full card", async () => {
  const context = { TextEncoder, Uint8Array, Blob };
  vm.createContext(context);
  vm.runInContext(
    source.slice(source.indexOf("function createBookingPdf")),
    context
  );
  const bytes = new Uint8Array([255, 216, 128, 255, 217]);
  const pdf = context.createBookingPdf(bytes, 1200, 1800);
  assert.equal(pdf.type, "application/pdf");
  const data = Buffer.from(await pdf.arrayBuffer());
  const text = data.toString("latin1");
  assert.ok(text.startsWith("%PDF-1.4"));
  assert.ok(text.includes("/MediaBox [0 0 595.28 892.92]"));
  const xrefOffset = Number(text.match(/startxref\n(\d+)/)[1]);
  assert.equal(data.subarray(xrefOffset, xrefOffset + 4).toString(), "xref");
  const entries = text.slice(xrefOffset).split("\n").slice(3, 8);
  entries.forEach((entry, index) => {
    const offset = Number(entry.slice(0, 10));
    assert.ok(
      data
        .subarray(offset)
        .toString("latin1")
        .startsWith(`${index + 1} 0 obj`)
    );
  });
  assert.ok(data.includes(Buffer.from(bytes)));
});
test("download visibility uses a Boolean expression, not the URL string", () => {
  const widget = JSON.parse(
    fs.readFileSync(
      path.join(
        __dirname,
        "../../force-app/main/default/uiWidgets/bookingCard/bookingCard.json"
      ),
      "utf8"
    )
  );
  const link = widget.contentBody.widgetBody.children[0].children.at(-1);
  assert.equal(link.meta.if, "{!NOT(ISBLANK($attrs.downloadUrl))}");
});

test("script loaded in the head waits for DOMContentLoaded before reading page elements", async () => {
  let ready,
    reads = 0;
  const status = {};
  const canvas = {};
  const completion = vm.runInNewContext(source, {
    document: {
      readyState: "loading",
      addEventListener(event, callback, options) {
        assert.equal(event, "DOMContentLoaded");
        assert.equal(options.once, true);
        ready = callback;
      },
      getElementById(id) {
        reads++;
        if (id === "export-status") return status;
        if (id === "booking-canvas") return canvas;
        if (id === "booking-error")
          return { textContent: "Booking unavailable" };
        return {};
      }
    }
  });
  assert.equal(reads, 0);
  ready();
  await completion;
  assert.ok(reads > 0);
  assert.equal(status.textContent, "Booking unavailable");
  assert.equal(canvas.hidden, true);
});
