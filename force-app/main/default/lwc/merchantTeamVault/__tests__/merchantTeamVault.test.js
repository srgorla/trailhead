import { setImmediate } from "timers";
import { createElement } from "lwc";
import MerchantTeamVault from "c/merchantTeamVault";
import execute from "@salesforce/apex/MerchantTeamVaultController.execute";
import {
  enrollKeys,
  unlockKeys,
  encryptTeamSecret,
  decryptTeamSecret
} from "c/merchantTeamCrypto";
jest.mock(
  "@salesforce/apex/MerchantTeamVaultController.execute",
  () => ({ default: jest.fn() }),
  { virtual: true }
);
jest.mock("c/merchantTeamCrypto", () => ({
  enrollKeys: jest.fn(),
  unlockKeys: jest.fn(),
  encryptTeamSecret: jest.fn(),
  decryptTeamSecret: jest.fn(),
  rewrapForTeammate: jest.fn()
}));
const flush = () => new Promise((resolve) => setImmediate(resolve));
const state = {
  memberId: "member-A",
  merchantId: "merchant-A",
  userId: "user-A",
  publicKey: "public-key",
  fingerprint: "fingerprint-A",
  backup: "encrypted-backup",
  canGrant: true,
  teammates: [],
  secrets: [{ id: "secret-A", label: "Demo" }]
};
function input(element, label, value) {
  const node = [...element.shadowRoot.querySelectorAll("lightning-input")].find(
    (item) => item.label === label
  );
  node.value = value;
  node.dispatchEvent(new CustomEvent("change"));
}
function button(element, label) {
  return [...element.shadowRoot.querySelectorAll("lightning-button")].find(
    (item) => item.label === label
  );
}
async function mount(value = state) {
  execute.mockImplementation(({ action }) =>
    Promise.resolve(
      JSON.stringify(action === "state" ? value : { secretId: "new-secret" })
    )
  );
  const element = createElement("c-merchant-team-vault", {
    is: MerchantTeamVault
  });
  document.body.appendChild(element);
  await flush();
  return element;
}
async function unlock(element) {
  unlockKeys.mockResolvedValue({ type: "private" });
  input(
    element,
    "My encryption passphrase (at least 16 characters)",
    "my separate long passphrase"
  );
  await flush();
  button(element, "Unlock my key").click();
  await flush();
}
afterEach(() => {
  while (document.body.firstChild)
    document.body.removeChild(document.body.firstChild);
  jest.clearAllMocks();
});
it("sends only encrypted enrollment and never the passphrase", async () => {
  const element = await mount({ ...state, publicKey: null, backup: null });
  enrollKeys.mockResolvedValue({
    publicKey: "public-key",
    backup: "encrypted-backup"
  });
  input(
    element,
    "My encryption passphrase (at least 16 characters)",
    "my separate long passphrase"
  );
  await flush();
  button(element, "Enroll my personal key").click();
  await flush();
  const request = execute.mock.calls.find(
    ([value]) => value.action === "enroll"
  )[0];
  expect(JSON.parse(request.requestJson)).toEqual({
    publicKey: "public-key",
    backup: "encrypted-backup"
  });
  expect(JSON.stringify(execute.mock.calls)).not.toContain(
    "my separate long passphrase"
  );
});
it("saves only encrypted secret material", async () => {
  const element = await mount();
  await unlock(element);
  encryptTeamSecret.mockResolvedValue({
    resource: "resource-A",
    payload: "ciphertext",
    wrappedKey: "wrapped-key"
  });
  input(element, "Secret label (not confidential)", "Demo");
  input(element, "Demo API secret", "plaintext-demo");
  await flush();
  button(element, "Encrypt and save team secret").click();
  await flush();
  expect(
    JSON.parse(
      execute.mock.calls.find(([value]) => value.action === "create")[0]
        .requestJson
    )
  ).toEqual({
    resource: "resource-A",
    payload: "ciphertext",
    wrappedKey: "wrapped-key",
    label: "Demo"
  });
  expect(JSON.stringify(execute.mock.calls)).not.toContain("plaintext-demo");
});
it("does not restore an unlocked key after the user locks during async unlock", async () => {
  const element = await mount();
  let resolveUnlock;
  unlockKeys.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveUnlock = resolve;
      })
  );
  input(
    element,
    "My encryption passphrase (at least 16 characters)",
    "my separate long passphrase"
  );
  await flush();
  button(element, "Unlock my key").click();
  await flush();
  button(element, "Lock vault").click();
  resolveUnlock({ type: "private" });
  await flush();
  const combo = element.shadowRoot.querySelector("lightning-combobox");
  combo.dispatchEvent(
    new CustomEvent("change", { detail: { value: "secret-A" } })
  );
  await flush();
  expect(button(element, "Reveal using my key").disabled).toBe(true);
  expect(decryptTeamSecret).not.toHaveBeenCalled();
});
it("keeps a pending reveal hidden after Hide secret is clicked", async () => {
  const element = await mount();
  await unlock(element);
  const combo = element.shadowRoot.querySelector("lightning-combobox");
  combo.dispatchEvent(
    new CustomEvent("change", { detail: { value: "secret-A" } })
  );
  let resolveReveal;
  decryptTeamSecret.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveReveal = resolve;
      })
  );
  await flush();
  button(element, "Reveal using my key").click();
  await flush();
  button(element, "Hide secret").click();
  resolveReveal("must-remain-hidden");
  await flush();
  expect(element.shadowRoot.textContent).not.toContain("must-remain-hidden");
});
