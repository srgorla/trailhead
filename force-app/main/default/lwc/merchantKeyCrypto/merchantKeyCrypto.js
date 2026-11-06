const CONTEXT = "merchant-key-demo:v1";
function encode(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}
function decode(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}
async function importKey(value) {
  const bytes = decode(value.trim());
  if (bytes.length !== 32)
    throw new Error("Enter a Base64-encoded 256-bit key.");
  return crypto.subtle.importKey("raw", bytes, "AES-GCM", false, [
    "encrypt",
    "decrypt"
  ]);
}
export function generateKey() {
  return encode(crypto.getRandomValues(new Uint8Array(32)));
}
export async function encryptSecret(secret, keyValue) {
  const key = await importKey(keyValue);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData: new TextEncoder().encode(CONTEXT),
      tagLength: 128
    },
    key,
    new TextEncoder().encode(secret)
  );
  return JSON.stringify({
    version: 1,
    algorithm: "AES-GCM",
    iv: encode(iv),
    ciphertext: encode(ciphertext)
  });
}
export async function decryptSecret(payload, keyValue) {
  const envelope = JSON.parse(payload);
  if (envelope.version !== 1 || envelope.algorithm !== "AES-GCM")
    throw new Error("Unsupported payload.");
  const iv = decode(envelope.iv);
  if (iv.length !== 12) throw new Error("Invalid nonce.");
  const key = await importKey(keyValue);
  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
      additionalData: new TextEncoder().encode(CONTEXT),
      tagLength: 128
    },
    key,
    decode(envelope.ciphertext)
  );
  return new TextDecoder().decode(plaintext);
}
