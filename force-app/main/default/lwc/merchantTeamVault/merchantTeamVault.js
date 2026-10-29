import { LightningElement } from "lwc";
import execute from "@salesforce/apex/MerchantTeamVaultController.execute";
import {
  enrollKeys,
  unlockKeys,
  encryptTeamSecret,
  decryptTeamSecret,
  rewrapForTeammate
} from "c/merchantTeamCrypto";

export default class MerchantTeamVault extends LightningElement {
  vault;
  passphrase = "";
  label = "";
  draft = "";
  secretId = "";
  recipientId = "";
  fingerprintVerified = false;
  privateKey;
  unlocked = false;
  plaintext = "";
  status = "";
  busy = false;
  epoch = 0;
  revealTimer;
  revealVersion = 0;
  lockTimer;
  visibilityHandler = () => {
    if (document.hidden) this.lock();
  };
  connectedCallback() {
    document.addEventListener("visibilitychange", this.visibilityHandler);
    this.refresh();
  }
  disconnectedCallback() {
    document.removeEventListener("visibilitychange", this.visibilityHandler);
    this.lock();
  }
  get enrolled() {
    return Boolean(this.vault?.publicKey);
  }
  get merchantName() {
    return this.vault?.merchantName || "";
  }
  get ownFingerprint() {
    return this.vault?.fingerprint || "";
  }
  get secrets() {
    return (this.vault?.secrets || []).map((item) => ({
      label: item.label,
      value: item.id
    }));
  }
  get teammates() {
    return (this.vault?.teammates || []).map((item) => ({
      label: item.name,
      value: item.id
    }));
  }
  get recipientFingerprint() {
    return (
      this.vault?.teammates?.find((item) => item.id === this.recipientId)
        ?.fingerprint || ""
    );
  }
  get canGrant() {
    return Boolean(this.vault?.canGrant);
  }
  get enrollDisabled() {
    return (
      this.busy || !this.vault || this.enrolled || this.passphrase.length < 16
    );
  }
  get unlockDisabled() {
    return this.busy || !this.enrolled || this.passphrase.length < 16;
  }
  get createDisabled() {
    return this.busy || !this.unlocked || !this.draft || !this.label.trim();
  }
  get revealDisabled() {
    return this.busy || !this.unlocked || !this.secretId;
  }
  get grantDisabled() {
    return (
      this.revealDisabled ||
      !this.recipientId ||
      !this.fingerprintVerified ||
      !this.canGrant
    );
  }
  get revokeDisabled() {
    return this.busy || !this.secretId || !this.recipientId || !this.canGrant;
  }
  setPassphrase(event) {
    this.passphrase = event.target.value;
  }
  setLabel(event) {
    this.label = event.target.value;
  }
  setDraft(event) {
    this.draft = event.target.value;
  }
  selectSecret(event) {
    this.hide();
    this.secretId = event.detail.value;
  }
  selectRecipient(event) {
    this.recipientId = event.detail.value;
    this.fingerprintVerified = false;
  }
  verifyFingerprint(event) {
    this.fingerprintVerified = event.target.checked;
  }
  async call(action, request = {}) {
    return JSON.parse(
      await execute({ action, requestJson: JSON.stringify(request) })
    );
  }
  async perform(operation) {
    if (this.busy) return;
    this.busy = true;
    try {
      await operation(this.epoch);
    } catch (error) {
      this.status =
        error?.body?.message || error?.message || "Vault operation failed.";
    } finally {
      this.busy = false;
      this.passphrase = "";
    }
  }
  async refresh() {
    await this.perform(async () => {
      this.vault = await this.call("state");
      this.status = this.enrolled
        ? "Personal key enrolled. Unlock with your encryption passphrase."
        : "Create your personal encryption key with a separate passphrase.";
    });
  }
  async enroll() {
    if (this.enrollDisabled) return;
    await this.perform(async (epoch) => {
      const enrollment = await enrollKeys(
        this.passphrase,
        this.vault.merchantId,
        this.vault.userId
      );
      if (epoch !== this.epoch) return;
      await this.call("enroll", enrollment);
      this.vault = await this.call("state");
      this.status =
        "Personal key enrolled. Keep your passphrase safe; no automatic recovery is configured. Enter it again to unlock.";
    });
  }
  async unlock() {
    if (this.unlockDisabled) return;
    await this.perform(async (epoch) => {
      const privateKey = await unlockKeys(
        this.vault.backup,
        this.passphrase,
        this.vault.merchantId,
        this.vault.userId,
        this.vault.publicKey
      );
      if (epoch !== this.epoch) return;
      this.privateKey = privateKey;
      this.unlocked = true;
      clearTimeout(this.lockTimer);
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.lockTimer = setTimeout(() => this.lock(), 300000);
      this.status =
        "Unlocked for five minutes. Switching away from this tab locks the vault.";
    });
  }
  async createSecret() {
    if (this.createDisabled) return;
    await this.perform(async (epoch) => {
      const encrypted = await encryptTeamSecret(
        this.draft,
        this.vault.merchantId,
        this.vault.publicKey,
        this.vault.fingerprint
      );
      if (epoch !== this.epoch) return;
      const result = await this.call("create", {
        ...encrypted,
        label: this.label.trim()
      });
      this.draft = "";
      this.label = "";
      this.vault = await this.call("state");
      this.secretId = result.secretId;
      this.status =
        "Encrypted secret saved with a grant for your personal key.";
    });
  }
  async reveal() {
    if (this.revealDisabled) return;
    this.hide();
    const revealVersion = this.revealVersion;
    await this.perform(async (epoch) => {
      const secret = await this.call("read", { secretId: this.secretId });
      if (epoch !== this.epoch) return;
      const plaintext = await decryptTeamSecret(
        secret,
        this.privateKey,
        this.vault.fingerprint,
        this.vault.merchantId
      );
      if (epoch !== this.epoch) return;
      if (revealVersion !== this.revealVersion) return;
      this.plaintext = plaintext;
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.revealTimer = setTimeout(() => this.hide(), 30000);
      this.status = "Revealed locally for 30 seconds.";
    });
  }
  async grant() {
    if (this.grantDisabled) return;
    await this.perform(async (epoch) => {
      const memberId = this.recipientId;
      const expectedFingerprint = this.recipientFingerprint;
      const recipient = await this.call("recipient", { memberId });
      if (recipient.fingerprint !== expectedFingerprint)
        throw new Error("Recipient key changed. Refresh and verify again.");
      const secretId = this.secretId;
      const secret = await this.call("read", { secretId });
      if (epoch !== this.epoch) return;
      const wrappedKey = await rewrapForTeammate(
        secret,
        this.privateKey,
        this.vault.fingerprint,
        recipient,
        this.vault.merchantId
      );
      if (epoch !== this.epoch) return;
      await this.call("grant", {
        secretId,
        memberId,
        fingerprint: recipient.fingerprint,
        wrappedKey
      });
      this.status =
        "Teammate access granted. They can unlock and reveal with their own key.";
    });
  }
  async revoke() {
    if (this.revokeDisabled) return;
    await this.perform(async () => {
      await this.call("revoke", {
        secretId: this.secretId,
        memberId: this.recipientId
      });
      this.status =
        "Future retrieval revoked. Previously copied secrets remain accessible; rotate the API credential if necessary.";
    });
  }
  hide() {
    this.revealVersion += 1;
    clearTimeout(this.revealTimer);
    this.plaintext = "";
  }
  lock() {
    this.epoch += 1;
    clearTimeout(this.lockTimer);
    this.hide();
    this.privateKey = undefined;
    this.unlocked = false;
    this.passphrase = "";
    this.draft = "";
    this.status = "Vault locked.";
  }
}
