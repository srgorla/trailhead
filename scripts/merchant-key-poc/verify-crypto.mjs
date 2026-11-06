import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const source = await readFile(
  new URL(
    "../../force-app/main/default/lwc/merchantKeyCrypto/merchantKeyCrypto.js",
    import.meta.url
  ),
  "utf8"
);
const { generateKey, encryptSecret, decryptSecret } = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
const key = generateKey();
const secret = "demo_api_key_merchant_A_🔐";
const payload = await encryptSecret(secret, key);
assert.equal(await decryptSecret(payload, key), secret);
assert.ok(!payload.includes(secret));
await assert.rejects(() => decryptSecret(payload, generateKey()));
const tampered = JSON.parse(payload);
const bytes = Buffer.from(tampered.ciphertext, "base64");
bytes[0] ^= 1;
tampered.ciphertext = bytes.toString("base64");
await assert.rejects(() => decryptSecret(JSON.stringify(tampered), key));
const changedNonce = JSON.parse(payload);
changedNonce.iv = Buffer.alloc(12).toString("base64");
await assert.rejects(() => decryptSecret(JSON.stringify(changedNonce), key));
assert.notEqual(
  JSON.parse(payload).iv,
  JSON.parse(await encryptSecret(secret, key)).iv
);
await assert.rejects(() => encryptSecret(secret, "invalid"));
console.log(
  "PASS: round trip, ciphertext-only payload, wrong merchant key rejection, ciphertext tamper rejection, nonce tamper rejection, fresh nonce, malformed key rejection."
);
