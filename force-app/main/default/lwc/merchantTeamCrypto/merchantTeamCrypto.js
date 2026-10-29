const ITERATIONS = 600000;
const utf8 = (value) => new TextEncoder().encode(value);
const bytes = (length) => crypto.getRandomValues(new Uint8Array(length));
const encode = (value) => btoa(String.fromCharCode(...new Uint8Array(value)));
const decode = (value) =>
  Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
const context = (...parts) => utf8(JSON.stringify(parts.map(String)));
const hex = (value) =>
  Array.from(new Uint8Array(value), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");
export async function fingerprint(publicKey) {
  return hex(await crypto.subtle.digest("SHA-256", decode(publicKey)));
}
async function backupKey(passphrase, salt) {
  if (passphrase.length < 16)
    throw new Error("Use an encryption passphrase of at least 16 characters.");
  const material = await crypto.subtle.importKey(
    "raw",
    utf8(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
function backupContext(envelope) {
  return context(
    "merchant-private-backup:v1",
    envelope.merchantId,
    envelope.userId,
    envelope.fingerprint
  );
}
export async function enrollKeys(passphrase, merchantId, userId) {
  const pair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 3072,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256"
    },
    true,
    ["encrypt", "decrypt"]
  );
  const publicKey = encode(
    await crypto.subtle.exportKey("spki", pair.publicKey)
  );
  const keyFingerprint = await fingerprint(publicKey);
  const salt = bytes(16);
  const iv = bytes(12);
  const envelope = {
    version: 1,
    merchantId,
    userId,
    fingerprint: keyFingerprint,
    kdf: "PBKDF2-SHA256",
    iterations: ITERATIONS,
    salt: encode(salt),
    iv: encode(iv)
  };
  const key = await backupKey(passphrase, salt);
  const privateBytes = new Uint8Array(
    await crypto.subtle.exportKey("pkcs8", pair.privateKey)
  );
  try {
    envelope.ciphertext = encode(
      await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
          additionalData: backupContext(envelope),
          tagLength: 128
        },
        key,
        privateBytes
      )
    );
  } finally {
    privateBytes.fill(0);
  }
  return { publicKey, backup: JSON.stringify(envelope) };
}
export async function unlockKeys(
  backup,
  passphrase,
  merchantId,
  userId,
  publicKey
) {
  const envelope = JSON.parse(backup);
  const expected = await fingerprint(publicKey);
  if (
    envelope.version !== 1 ||
    envelope.merchantId !== merchantId ||
    envelope.userId !== userId ||
    envelope.fingerprint !== expected ||
    envelope.kdf !== "PBKDF2-SHA256" ||
    envelope.iterations !== ITERATIONS
  ) {
    throw new Error("Private key backup context mismatch.");
  }
  const salt = decode(envelope.salt);
  const iv = decode(envelope.iv);
  if (salt.length !== 16 || iv.length !== 12)
    throw new Error("Invalid backup.");
  const key = await backupKey(passphrase, salt);
  const plaintext = new Uint8Array(
    await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
        additionalData: backupContext(envelope),
        tagLength: 128
      },
      key,
      decode(envelope.ciphertext)
    )
  );
  try {
    return await crypto.subtle.importKey(
      "pkcs8",
      plaintext,
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["decrypt"]
    );
  } finally {
    plaintext.fill(0);
  }
}
async function publicCryptoKey(publicKey, expectedFingerprint) {
  if ((await fingerprint(publicKey)) !== expectedFingerprint)
    throw new Error("Recipient fingerprint mismatch.");
  const key = await crypto.subtle.importKey(
    "spki",
    decode(publicKey),
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );
  if (key.algorithm.modulusLength !== 3072)
    throw new Error("Unsupported recipient key size.");
  return key;
}
function secretContext(merchantId, resource) {
  return context("merchant-secret:v2", merchantId, resource);
}
function grantContext(merchantId, resource, keyFingerprint) {
  return context("merchant-grant:v1", merchantId, resource, keyFingerprint);
}
async function wrap(raw, publicKey, keyFingerprint, merchantId, resource) {
  const recipient = await publicCryptoKey(publicKey, keyFingerprint);
  return encode(
    await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
        label: grantContext(merchantId, resource, keyFingerprint)
      },
      recipient,
      raw
    )
  );
}
async function unwrap(
  wrappedKey,
  privateKey,
  keyFingerprint,
  merchantId,
  resource
) {
  const raw = new Uint8Array(
    await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
        label: grantContext(merchantId, resource, keyFingerprint)
      },
      privateKey,
      decode(wrappedKey)
    )
  );
  if (raw.length !== 32) throw new Error("Invalid data key.");
  return raw;
}
export async function encryptTeamSecret(
  secret,
  merchantId,
  publicKey,
  keyFingerprint
) {
  const resourceBytes = bytes(16);
  const resourceHex = hex(resourceBytes);
  const resource = [
    resourceHex.slice(0, 8),
    resourceHex.slice(8, 12),
    resourceHex.slice(12, 16),
    resourceHex.slice(16, 20),
    resourceHex.slice(20)
  ].join("-");
  const raw = bytes(32);
  const iv = bytes(12);
  try {
    const key = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, [
      "encrypt"
    ]);
    const ciphertext = encode(
      await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv,
          additionalData: secretContext(merchantId, resource),
          tagLength: 128
        },
        key,
        utf8(secret)
      )
    );
    const wrappedKey = await wrap(
      raw,
      publicKey,
      keyFingerprint,
      merchantId,
      resource
    );
    return {
      resource,
      wrappedKey,
      payload: JSON.stringify({
        version: 2,
        algorithm: "AES-GCM",
        merchantId,
        resource,
        iv: encode(iv),
        ciphertext
      })
    };
  } finally {
    raw.fill(0);
  }
}
export async function decryptTeamSecret(
  secret,
  privateKey,
  keyFingerprint,
  merchantId
) {
  const envelope = JSON.parse(secret.payload);
  if (
    envelope.version !== 2 ||
    envelope.algorithm !== "AES-GCM" ||
    envelope.merchantId !== merchantId ||
    secret.merchantId !== merchantId ||
    envelope.resource !== secret.resource
  )
    throw new Error("Secret context mismatch.");
  const iv = decode(envelope.iv);
  if (iv.length !== 12) throw new Error("Invalid nonce.");
  const raw = await unwrap(
    secret.wrappedKey,
    privateKey,
    keyFingerprint,
    merchantId,
    secret.resource
  );
  try {
    const key = await crypto.subtle.importKey("raw", raw, "AES-GCM", false, [
      "decrypt"
    ]);
    return new TextDecoder().decode(
      await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
          additionalData: secretContext(merchantId, secret.resource),
          tagLength: 128
        },
        key,
        decode(envelope.ciphertext)
      )
    );
  } finally {
    raw.fill(0);
  }
}
export async function rewrapForTeammate(
  secret,
  privateKey,
  ownFingerprint,
  recipient,
  merchantId
) {
  if (secret.merchantId !== merchantId) throw new Error("Merchant mismatch.");
  const raw = await unwrap(
    secret.wrappedKey,
    privateKey,
    ownFingerprint,
    merchantId,
    secret.resource
  );
  try {
    return await wrap(
      raw,
      recipient.publicKey,
      recipient.fingerprint,
      merchantId,
      secret.resource
    );
  } finally {
    raw.fill(0);
  }
}
