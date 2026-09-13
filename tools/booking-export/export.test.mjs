import { test } from "node:test";
import assert from "node:assert/strict";
import {
  chooseSaveLocation,
  validateBooking,
  allowedPhoto,
  renderPdf
} from "./export.mjs";
test("IDs and references are bounded and cannot inject queries", () => {
  for (const value of ["B-00001738", "a00gL00001XG2gfQAD"])
    assert.equal(validateBooking(value), value);
  for (const value of [
    "B-1' OR Name != '",
    "../file",
    "https://example.com",
    ""
  ])
    assert.throws(() => validateBooking(value));
});
test("photo allowlist rejects redirects and arbitrary hosts", () => {
  assert.equal(
    allowedPhoto(
      "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/coral-clouds/photo.jpg"
    ),
    true
  );
  for (const url of [
    "https://example.com/photo.jpg",
    "http://localhost/file",
    "https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/coral-clouds/../photo.jpg"
  ])
    assert.equal(allowedPhoto(url), false);
});
test("renderer produces a PDF when catalog has no photo", async () => {
  const bytes = await renderPdf(
    {
      bookingReference: "B-1",
      contactName: "Test Guest",
      bookingStatus: "Canceled"
    },
    null
  );
  assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
  assert.ok(bytes.length > 1000);
});

test("Save As passes filename as an argument and respects cancellation", async () => {
  if (process.platform !== "darwin") return;
  const selected = await chooseSaveLocation(
    "B-00001738.pdf",
    async (bin, args) => {
      assert.equal(bin, "/usr/bin/osascript");
      assert.equal(args.at(-1), "B-00001738.pdf");
      return { stdout: "/tmp/Chosen Folder/B-00001738.pdf\n" };
    }
  );
  assert.equal(selected, "/tmp/Chosen Folder/B-00001738.pdf");
  assert.equal(
    await chooseSaveLocation("B-1.pdf", async () => ({ stdout: "\n" })),
    null
  );
  await assert.rejects(() =>
    chooseSaveLocation("B-1.pdf", async () => ({ stdout: "/tmp/unsafe.txt\n" }))
  );
});
