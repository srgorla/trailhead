import { test } from "node:test";
import assert from "node:assert/strict";
import { createDownloadLinks } from "./download-links.mjs";
test("GET never saves; POST requires same origin; successful save invalidates link", async () => {
  let chosen = 0,
    saved = 0;
  const service = createDownloadLinks({
    choose: async (name) => {
      chosen++;
      assert.equal(name, "B-1743.pdf");
      return "/tmp/booking.pdf";
    },
    save: async (file, data, options) => {
      saved++;
      assert.equal(options.flag, "wx");
      assert.equal(data.toString(), "PDF");
    }
  });
  try {
    const link = await service.add("B-1743", Buffer.from("PDF"));
    const first = await fetch(link.url);
    assert.equal(first.status, 200);
    assert.match(await first.text(), /Choose location and save/);
    assert.equal(chosen, 0);
    assert.equal(
      (
        await fetch(link.url, {
          method: "POST",
          headers: { origin: "https://example.com" }
        })
      ).status,
      403
    );
    assert.equal(chosen, 0);
    assert.equal(
      (
        await fetch(link.url, {
          method: "POST",
          headers: { origin: new URL(link.url).origin }
        })
      ).status,
      200
    );
    assert.equal(saved, 1);
    assert.equal((await fetch(link.url)).status, 410);
  } finally {
    await service.close();
  }
});
test("expired links never open dialog; cancellation permits retry", async () => {
  let time = 0,
    chosen = 0;
  const service = createDownloadLinks({
    now: () => time,
    ttl: 1000,
    choose: async () => {
      chosen++;
      return null;
    },
    save: async () => assert.fail("cancel must not write")
  });
  try {
    const link = await service.add("B-1", Buffer.from("PDF"));
    await fetch(link.url, {
      method: "POST",
      headers: { origin: new URL(link.url).origin }
    });
    assert.equal(chosen, 1);
    assert.equal((await fetch(link.url)).status, 200);
    time = 1000;
    assert.equal((await fetch(link.url)).status, 410);
    assert.equal(chosen, 1);
  } finally {
    await service.close();
  }
});
