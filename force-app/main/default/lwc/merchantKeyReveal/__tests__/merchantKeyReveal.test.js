import { setImmediate } from "timers";
import { createElement } from "lwc";
import MerchantKeyReveal from "c/merchantKeyReveal";
import { createRecord, getRecord } from "lightning/uiRecordApi";
import { encryptSecret, decryptSecret } from "c/merchantKeyCrypto";
jest.mock("c/merchantKeyCrypto", () => ({
  generateKey: jest.fn(),
  encryptSecret: jest.fn(),
  decryptSecret: jest.fn()
}));
const flush = () => new Promise((resolve) => setImmediate(resolve));
function input(element, label, value) {
  const target = [
    ...element.shadowRoot.querySelectorAll("lightning-input")
  ].find((node) => node.label === label);
  target.value = value;
  target.dispatchEvent(new CustomEvent("change"));
}
function button(element, label) {
  return [...element.shadowRoot.querySelectorAll("lightning-button")].find(
    (node) => node.label === label
  );
}
afterEach(() => {
  while (document.body.firstChild)
    document.body.removeChild(document.body.firstChild);
  jest.clearAllMocks();
});
it("sends only ciphertext to Salesforce and clears secret inputs after saving", async () => {
  encryptSecret.mockResolvedValue("encrypted-envelope");
  createRecord.mockResolvedValue({ id: "a00000000000001AAA" });
  const element = createElement("c-merchant-key-reveal", {
    is: MerchantKeyReveal
  });
  document.body.appendChild(element);
  input(element, "Decryption key (Base64, 32 random bytes)", "client-only-key");
  input(element, "Demo API key to encrypt", "client-only-secret");
  await flush();
  button(element, "Encrypt in browser and save ciphertext").click();
  await flush();
  expect(createRecord).toHaveBeenCalledWith({
    apiName: "Merchant_Key_Demo__c",
    fields: { Encrypted_Payload__c: "encrypted-envelope" }
  });
  expect(JSON.stringify(createRecord.mock.calls)).not.toContain("client-only");
  const inputs = [...element.shadowRoot.querySelectorAll("lightning-input")];
  expect(inputs[0].value).toBe("");
  expect(inputs[1].value).toBe("");
});
it("does not reveal plaintext when decryption fails", async () => {
  decryptSecret.mockRejectedValue(new Error("authentication failed"));
  const element = createElement("c-merchant-key-reveal", {
    is: MerchantKeyReveal
  });
  element.recordId = "a00000000000001AAA";
  document.body.appendChild(element);
  getRecord.emit({
    fields: { Encrypted_Payload__c: { value: "encrypted-envelope" } }
  });
  input(element, "Decryption key (Base64, 32 random bytes)", "wrong-key");
  await flush();
  button(element, "Reveal API key").click();
  await flush();
  expect(element.shadowRoot.textContent).toContain("Unable to decrypt");
  expect(element.shadowRoot.textContent).not.toContain("Revealed API key");
});
