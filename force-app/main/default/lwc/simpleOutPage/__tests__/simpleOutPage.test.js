import { createElement } from "lwc";
import SimpleOutPage from "c/simpleOutPage";

const taskId = "00T000000000001AAA";
const contactId = "003000000000001AAA";
const channel = "12345678-1234-1234-1234-123456789abc";
const flush = () => Promise.resolve();

function setup() {
  const element = createElement("c-simple-out-page", { is: SimpleOutPage });
  element.messageChannel = channel;
  document.body.appendChild(element);
  const form = element.shadowRoot.querySelector("lightning-record-edit-form");
  const picker = element.shadowRoot.querySelector("lightning-record-picker");
  form.submit = jest.fn();
  picker.reportValidity = jest.fn(() => true);
  form.dispatchEvent(new CustomEvent("load"));
  return { element, form, picker };
}

describe("Salesforce Task form", () => {
  afterEach(() => {
    document.body.replaceChildren();
    jest.restoreAllMocks();
  });

  it("submits the Task with the selected Contact once while saving", async () => {
    const { form, picker } = setup();
    picker.dispatchEvent(
      new CustomEvent("change", { detail: { recordId: contactId } })
    );
    await flush();
    const submit = () =>
      form.dispatchEvent(
        new CustomEvent("submit", {
          cancelable: true,
          detail: { fields: { Subject: "Call", Status: "Not Started" } }
        })
      );
    submit();
    submit();
    expect(form.submit).toHaveBeenCalledTimes(1);
    expect(form.submit).toHaveBeenCalledWith({
      Subject: "Call",
      Status: "Not Started",
      WhoId: contactId
    });
  });

  it("does not save without a Contact", async () => {
    const { element, form } = setup();
    await flush();
    form.dispatchEvent(
      new CustomEvent("submit", {
        cancelable: true,
        detail: { fields: { Subject: "Call" } }
      })
    );
    expect(form.submit).not.toHaveBeenCalled();
    await flush();
    expect(
      element.shadowRoot.querySelector('[role="alert"]').textContent
    ).toContain("Select a Contact");
  });

  it("returns only the confirmed Task ID and waits for a React receipt", async () => {
    const { element, form } = setup();
    const post = jest
      .spyOn(window.top, "postMessage")
      .mockImplementation(() => {});
    form.dispatchEvent(new CustomEvent("success", { detail: { id: taskId } }));
    expect(post).toHaveBeenCalledTimes(1);
    expect(post.mock.calls[0][1]).toBe("http://localhost:5174");
    expect(JSON.parse(post.mock.calls[0][0])).toMatchObject({
      type: "simple-out.task-created.v1",
      taskId,
      channel
    });
    await flush();
    expect(element.shadowRoot.textContent).toContain("Waiting for React");
    element.deliveryReceipt = taskId;
    await flush();
    expect(element.shadowRoot.textContent).toContain(
      "React received the Task ID."
    );
  });

  it("shows Salesforce errors without sending a Task ID", async () => {
    const { element, form } = setup();
    const post = jest
      .spyOn(window.top, "postMessage")
      .mockImplementation(() => {});
    form.dispatchEvent(
      new CustomEvent("error", {
        detail: {
          message: "Validation failed",
          output: {
            fieldErrors: { Subject: [{ message: "Subject is required" }] }
          }
        }
      })
    );
    await flush();
    expect(element.shadowRoot.querySelector('[role="alert"]').textContent).toBe(
      "Subject is required"
    );
    expect(post).not.toHaveBeenCalled();
  });

  it("rejects non-Task IDs returned by an unexpected success event", async () => {
    const { element, form } = setup();
    const post = jest
      .spyOn(window.top, "postMessage")
      .mockImplementation(() => {});
    form.dispatchEvent(
      new CustomEvent("success", { detail: { id: contactId } })
    );
    await flush();
    expect(post).not.toHaveBeenCalled();
    expect(
      element.shadowRoot.querySelector('[role="alert"]').textContent
    ).toContain("valid Task ID");
  });
});
