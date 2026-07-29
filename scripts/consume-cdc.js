const { execSync } = require("child_process");
const PubSubApiClient = require("salesforce-pubsub-api-client").default;

function safeJsonStringify(obj) {
  return JSON.stringify(
    obj,
    (key, value) => (typeof value === "bigint" ? value.toString() : value),
    2
  );
}

const channels = [
  "/data/Secure_Message__ChangeEvent",
  "/data/Secure_Thread__ChangeEvent"
];

// Track replay IDs to resume exactly where the connection was lost
const lastReplayIds = {};
let client = null;
let isReconnecting = false;

async function startClient() {
  console.log(
    "\nRetrieving connection details for aforce_de org using sf CLI..."
  );
  let authDetails;
  try {
    const sfOutput = execSync("sf org display -o aforce_de --json", {
      encoding: "utf8"
    });
    const parsed = JSON.parse(sfOutput);
    if (parsed.status !== 0 || !parsed.result) {
      throw new Error(
        `Failed to retrieve credentials: ${parsed.message || "Unknown error"}`
      );
    }
    authDetails = parsed.result;
  } catch (e) {
    console.error("Error running sf CLI:", e.message);
    triggerReconnection();
    return;
  }

  console.log(`Successfully authenticated as ${authDetails.username}`);
  console.log(`Connecting to Pub/Sub API for Org ID: ${authDetails.id}`);

  client = new PubSubApiClient({
    authType: "user-supplied",
    accessToken: authDetails.accessToken,
    instanceUrl: authDetails.instanceUrl,
    orgId: authDetails.id
  });

  try {
    await client.connect();
    console.log("Connected to Salesforce gRPC Pub/Sub API.");

    for (const channel of channels) {
      const replayId = lastReplayIds[channel];
      const callback = (subscription, type, event) => {
        if (type === "event") {
          lastReplayIds[channel] = event.replayId;
          console.log(`\n========================================`);
          console.log(`[Event Received on ${channel}]`);
          console.log(`Replay ID: ${event.replayId}`);

          if (event.payload && event.payload.ChangeEventHeader) {
            console.log(
              `Event Header:`,
              safeJsonStringify(event.payload.ChangeEventHeader)
            );

            const payloadCopy = { ...event.payload };
            delete payloadCopy.ChangeEventHeader;

            console.log(`Payload Fields:`, safeJsonStringify(payloadCopy));
          } else {
            console.log(`Payload:`, safeJsonStringify(event.payload));
          }
          console.log(`========================================`);
        } else if (type === "error" || type === "end") {
          console.warn(
            `\n[Stream ${type === "error" ? "error" : "end"} on ${channel}] Details:`,
            event.message || event
          );
          triggerReconnection();
        }
      };

      if (replayId) {
        console.log(
          `Subscribing to ${channel} starting from Replay ID: ${replayId}`
        );
        await client.subscribeFromReplayId(channel, callback, null, replayId);
      } else {
        console.log(`Subscribing to ${channel} (Latest events only)`);
        await client.subscribe(channel, callback);
      }
    }
    console.log("\nListening for CDC events... Press Ctrl+C to exit.");
  } catch (err) {
    console.error(
      "Failed during connection or subscription:",
      err.message || err
    );
    triggerReconnection();
  }
}

function triggerReconnection() {
  if (isReconnecting) return;
  isReconnecting = true;

  console.log("Reconnecting in 10 seconds...");

  client = null;

  setTimeout(() => {
    isReconnecting = false;
    startClient().catch((err) => {
      console.error("Reconnection attempt failed:", err.message || err);
      triggerReconnection();
    });
  }, 10000);
}

startClient();
