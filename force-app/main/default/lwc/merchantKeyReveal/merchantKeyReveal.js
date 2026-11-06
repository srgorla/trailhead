import { LightningElement, api, wire } from "lwc";
import { createRecord, getRecord, getFieldValue } from "lightning/uiRecordApi";
import PAYLOAD from "@salesforce/schema/Merchant_Key_Demo__c.Encrypted_Payload__c";
import { generateKey, encryptSecret, decryptSecret } from "c/merchantKeyCrypto";

export default class MerchantKeyReveal extends LightningElement {
  @api recordId;
  selectedRecordId;
  keyValue = "";
  draftSecret = "";
  revealedSecret = "";
  payload = "";
  status = "";
  busy = false;
  timer;
  generation = 0;

  get activeRecordId() {
    return this.selectedRecordId || this.recordId;
  }
  get revealDisabled() {
    return this.busy || !this.payload || !this.keyValue;
  }
  get saveDisabled() {
    return this.busy || !this.draftSecret || !this.keyValue;
  }
  @wire(getRecord, { recordId: "$activeRecordId", fields: [PAYLOAD] })
  loadRecord({ data, error }) {
    this.hide();
    this.payload = data ? getFieldValue(data, PAYLOAD) : "";
    if (error)
      this.status =
        "Cannot read this record. Check its ID, record sharing, and field access.";
    else if (data)
      this.status = "Ciphertext loaded. Enter the matching key to reveal.";
  }
  handleKey(event) {
    this.hide();
    this.keyValue = event.target.value;
  }
  handleSecret(event) {
    this.draftSecret = event.target.value;
  }
  handleRecord(event) {
    this.hide();
    this.payload = "";
    this.selectedRecordId = event.target.value.trim();
  }
  generate() {
    this.hide();
    try {
      this.keyValue = generateKey();
      this.status =
        "Keep a secure copy of this key before saving. Salesforce will not store it.";
    } catch {
      this.status =
        "Browser cryptography is unavailable. Use a supported browser over HTTPS.";
    }
  }
  async save() {
    if (this.saveDisabled) return;
    this.busy = true;
    this.hide();
    try {
      const payload = await encryptSecret(this.draftSecret, this.keyValue);
      const record = await createRecord({
        apiName: "Merchant_Key_Demo__c",
        fields: { Encrypted_Payload__c: payload }
      });
      this.draftSecret = "";
      this.keyValue = "";
      this.selectedRecordId = record.id;
      this.status =
        "Ciphertext saved. Re-enter your saved key and click Reveal.";
    } catch {
      this.status =
        "Save failed. Check key format, browser crypto support, and create/field permissions.";
    } finally {
      this.busy = false;
    }
  }
  async reveal() {
    if (this.revealDisabled) return;
    this.hide();
    const generation = this.generation;
    this.busy = true;
    try {
      const plaintext = await decryptSecret(this.payload, this.keyValue);
      if (generation !== this.generation) return;
      this.revealedSecret = plaintext;
      this.keyValue = "";
      this.status =
        "Decrypted in this browser. The value will hide after 30 seconds.";
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.timer = setTimeout(() => this.hide(), 30000);
    } catch {
      this.status =
        "Unable to decrypt. The key is incorrect or the ciphertext has changed.";
    } finally {
      this.busy = false;
    }
  }
  hide() {
    this.generation += 1;
    clearTimeout(this.timer);
    this.revealedSecret = "";
  }
  lock() {
    this.hide();
    this.keyValue = "";
    this.draftSecret = "";
    this.status = "Locked.";
  }
  disconnectedCallback() {
    this.lock();
  }
}
