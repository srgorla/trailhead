import { test } from "node:test";
import assert from "node:assert/strict";
import { readTaskCreated } from "../src/task-messages.mjs";

const context = {
  origins: ["https://demo.lightning.force.com"],
  channel: "per-page-random-channel"
};
const data = {
  type: "simple-out.task-created.v1",
  channel: context.channel,
  taskId: "00T000000000001AAA",
  subject: "Call contact"
};
const event = {
  origin: context.origins[0],
  source: {},
  data: JSON.stringify(data)
};

test("accepts the saved Task ID from the expected Salesforce origin and channel", () => {
  assert.deepEqual(readTaskCreated(event, context), {
    taskId: data.taskId,
    subject: data.subject
  });
});
test("rejects forged origins, wrong channels, invalid IDs, and malformed payloads", () => {
  for (const invalid of [
    { ...event, origin: "https://evil.example" },
    { ...event, source: null },
    { ...event, data: "{" },
    { ...event, data },
    ...[
      { channel: "other" },
      { taskId: "003000000000001AAA" },
      { subject: {} },
      { type: "other" }
    ].map((change) => ({
      ...event,
      data: JSON.stringify({ ...data, ...change })
    }))
  ])
    assert.equal(readTaskCreated(invalid, context), null);
});
