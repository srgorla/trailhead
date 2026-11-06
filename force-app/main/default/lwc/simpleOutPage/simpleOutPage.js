import { LightningElement, api } from "lwc";
import TASK from "@salesforce/schema/Task";
import CONTACT from "@salesforce/schema/Contact";
import SUBJECT from "@salesforce/schema/Task.Subject";
import WHO from "@salesforce/schema/Task.WhoId";
import DUE_DATE from "@salesforce/schema/Task.ActivityDate";
import PRIORITY from "@salesforce/schema/Task.Priority";
import STATUS from "@salesforce/schema/Task.Status";
import DESCRIPTION from "@salesforce/schema/Task.Description";

export default class SimpleOutPage extends LightningElement {
  @api hostOrigin = "http://localhost:5174";
  @api messageChannel = "";
  taskObject = TASK;
  contactObject = CONTACT.objectApiName;
  subjectField = SUBJECT;
  dueDateField = DUE_DATE;
  priorityField = PRIORITY;
  statusField = STATUS;
  descriptionField = DESCRIPTION;
  contactId = null;
  isSaving = false;
  formLoaded = false;
  savedTaskId = "";
  savedSubject = "";
  error = "";
  deliveryStatus = "";
  receipt = "";

  @api
  get deliveryReceipt() {
    return this.receipt;
  }
  set deliveryReceipt(value) {
    this.receipt = value;
    if (value && value === this.savedTaskId)
      this.deliveryStatus = "React received the Task ID.";
  }

  get saveDisabled() {
    return this.isSaving || !this.formLoaded || !!this.savedTaskId;
  }
  get fieldsDisabled() {
    return this.isSaving || !!this.savedTaskId;
  }
  get saveLabel() {
    return this.isSaving ? "Saving task…" : "Save task";
  }
  get taskLink() {
    return `${window.location.origin}/lightning/r/Task/${this.savedTaskId}/view`;
  }

  handleLoad() {
    this.formLoaded = true;
  }
  handleContactChange(event) {
    this.contactId = event.detail.recordId;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.saveDisabled) return;
    this.error = "";
    const picker = this.template.querySelector("lightning-record-picker");
    picker.reportValidity();
    if (!/^003[a-zA-Z0-9]{12}(?:[a-zA-Z0-9]{3})?$/.test(this.contactId || "")) {
      this.error = "Select a Contact before saving.";
      return;
    }
    const fields = {
      ...event.detail.fields,
      [WHO.fieldApiName]: this.contactId
    };
    this.savedSubject = fields[SUBJECT.fieldApiName] || "Task";
    this.isSaving = true;
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

  handleSuccess(event) {
    this.isSaving = false;
    const id = event.detail.id;
    if (!/^00T[a-zA-Z0-9]{12}(?:[a-zA-Z0-9]{3})?$/.test(id || "")) {
      this.error =
        "Salesforce did not return a valid Task ID. Check Salesforce before saving again.";
      return;
    }
    this.savedTaskId = id;
    this.publishTask();
  }

  handleError(event) {
    this.isSaving = false;
    const detail = event.detail || {};
    const fields = Object.values(detail.output?.fieldErrors || {}).flat();
    this.error =
      fields[0]?.message ||
      detail.output?.errors?.[0]?.message ||
      detail.message ||
      "Salesforce could not save the Task.";
  }

  publishTask() {
    if (!this.savedTaskId) return;
    if (
      this.hostOrigin !== "http://localhost:5174" ||
      !/^[a-f0-9-]{36}$/i.test(this.messageChannel)
    ) {
      this.deliveryStatus =
        "Task saved. Open this form from the React host to return its ID.";
      return;
    }
    this.deliveryStatus = "Task saved. Waiting for React to confirm receipt…";
    window.top.postMessage(
      JSON.stringify({
        type: "simple-out.task-created.v1",
        channel: this.messageChannel,
        taskId: this.savedTaskId,
        subject: this.savedSubject
      }),
      this.hostOrigin
    );
  }

  handleNewTask() {
    if (this.isSaving) return;
    this.template
      .querySelectorAll("lightning-input-field")
      .forEach((field) => field.reset());
    this.template.querySelector("lightning-record-picker").clearSelection();
    this.contactId = null;
    this.savedTaskId = "";
    this.savedSubject = "";
    this.receipt = "";
    this.error = "";
    this.deliveryStatus = "";
  }
}
