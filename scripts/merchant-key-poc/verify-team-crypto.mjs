import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const source = await readFile(
  new URL(
    "../../force-app/main/default/lwc/merchantTeamCrypto/merchantTeamCrypto.js",
    import.meta.url
  ),
  "utf8"
);
const api = await import(
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`
);
const merchant = "merchant-A";
const alice = await api.enrollKeys(
  "alice long passphrase 123",
  merchant,
  "alice"
);
const bob = await api.enrollKeys("bob long passphrase 12345", merchant, "bob");
const aliceFingerprint = await api.fingerprint(alice.publicKey);
const bobFingerprint = await api.fingerprint(bob.publicKey);
const aliceKey = await api.unlockKeys(
  alice.backup,
  "alice long passphrase 123",
  merchant,
  "alice",
  alice.publicKey
);
const bobKey = await api.unlockKeys(
  bob.backup,
  "bob long passphrase 12345",
  merchant,
  "bob",
  bob.publicKey
);
assert.equal(aliceKey.extractable, false);
const secret = {
  ...(await api.encryptTeamSecret(
    "demo-team-secret-🔐",
    merchant,
    alice.publicKey,
    aliceFingerprint
  )),
  merchantId: merchant
};
assert.equal(
  await api.decryptTeamSecret(secret, aliceKey, aliceFingerprint, merchant),
  "demo-team-secret-🔐"
);
await assert.rejects(() =>
  api.decryptTeamSecret(secret, bobKey, bobFingerprint, merchant)
);
const bobWrapped = await api.rewrapForTeammate(
  secret,
  aliceKey,
  aliceFingerprint,
  { publicKey: bob.publicKey, fingerprint: bobFingerprint },
  merchant
);
assert.notEqual(bobWrapped, secret.wrappedKey);
assert.equal(
  await api.decryptTeamSecret(
    { ...secret, wrappedKey: bobWrapped },
    bobKey,
    bobFingerprint,
    merchant
  ),
  "demo-team-secret-🔐"
);
await assert.rejects(() =>
  api.unlockKeys(
    alice.backup,
    "wrong passphrase that is long",
    merchant,
    "alice",
    alice.publicKey
  )
);
await assert.rejects(() =>
  api.unlockKeys(
    alice.backup,
    "alice long passphrase 123",
    "merchant-B",
    "alice",
    alice.publicKey
  )
);
await assert.rejects(() =>
  api.unlockKeys(
    alice.backup,
    "alice long passphrase 123",
    merchant,
    "bob",
    alice.publicKey
  )
);
await assert.rejects(() =>
  api.rewrapForTeammate(
    secret,
    aliceKey,
    aliceFingerprint,
    { publicKey: bob.publicKey, fingerprint: aliceFingerprint },
    merchant
  )
);
await assert.rejects(() =>
  api.decryptTeamSecret(secret, aliceKey, aliceFingerprint, "merchant-B")
);
const tampered = JSON.parse(secret.payload);
const bytes = Buffer.from(tampered.ciphertext, "base64");
bytes[0] ^= 1;
tampered.ciphertext = bytes.toString("base64");
await assert.rejects(() =>
  api.decryptTeamSecret(
    { ...secret, payload: JSON.stringify(tampered) },
    aliceKey,
    aliceFingerprint,
    merchant
  )
);
const another = {
  ...(await api.encryptTeamSecret(
    "other",
    merchant,
    alice.publicKey,
    aliceFingerprint
  )),
  merchantId: merchant
};
await assert.rejects(() =>
  api.decryptTeamSecret(
    { ...another, wrappedKey: secret.wrappedKey },
    aliceKey,
    aliceFingerprint,
    merchant
  )
);
assert.ok(!JSON.stringify(secret).includes("demo-team-secret"));
assert.ok(!alice.backup.includes("alice long passphrase"));
console.log(
  "PASS: individual enrollment/unlock, non-extractable private key, own reveal, ungranted teammate rejection, recipient-specific rewrap/reveal, wrong passphrase, user/merchant context, fingerprint mismatch, ciphertext tamper, cross-resource grant substitution, encrypted-only payloads."
);
