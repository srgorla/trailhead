# Salesforce LWC Task form embedded in React

The **Salesforce LWC** owns the Contact picker, Task fields, and Save operation.
React hosts the Lightning Out 2.0 app and displays the Task ID returned after a
successful Salesforce save.

See [technical design and call sequences](TECHNICAL-DESIGN.md) for the component
responsibilities, session initialization, save sequence, and message protocol.

## Current call flow

```text
React mounts the Lightning Out host
  -> Node obtains the Salesforce browser session
  -> Salesforce loads the LWC form
  -> User selects a Contact and enters Task details inside the LWC
  -> LWC submits the Task through Lightning Data Service
  -> Salesforce confirms the saved Task ID
  -> LWC sends the ID to React as a serialized message
  -> React validates and displays it
  -> React acknowledges receipt through a Lightning Out public property
```

The form and save action run inside Salesforce. React has no Contact/task-entry
form and the Node server has no Task-creation endpoint in this version.

## Try it

Open **http://localhost:5174** and use the Salesforce form on the right:

1. Search for and select a Contact.
2. Enter a subject and optionally a due date and description. Choose the priority
   and status as needed.
3. Click **Save task**. This creates a real Salesforce Task.
4. React displays the saved Task ID and a record link on the left.

The LWC shows **React received the Task ID** after receiving an acknowledgment.
If delivery is pending, **Send Task ID to React** resends the existing ID without
creating another Task. **Create another task** resets the form for a new save.
React keeps received IDs for the current page lifetime and ignores duplicate IDs.

**Saved versus delivered:** a Task ID displayed in the LWC means Salesforce saved
the record. An ID displayed in React means the host accepted the message. The
receipt text confirms the return acknowledgment. These are separate milestones;
resending an ID never creates a replacement record.

## Run locally

Requires Node 22+, npm, Salesforce CLI, and a Salesforce user with UI access,
Contact read access, Task create access, and access to the displayed fields.

```sh
cd examples/lightning-out-react
npm ci
cp .env.example .env
npm run dev
```

The app uses `aforce_de`, Lightning Out app `Simple_React_Demo`, app ID
`1UsgL0000004EArSAM`, component `c-simple-out-page`, and allowed host
`http://localhost:5174`. Use this exact host and port. The developer login
establishes the Salesforce browser session. Browser and Salesforce cookie policy
must permit the Lightning Out iframe.

The Node server now exposes only **POST /api/session**. Contact search and Task
creation execute inside Salesforce through the LWC's base components and
Lightning Data Service. The earlier React prompt parser and Node Contact/Task
endpoints have been removed.

## Configuration and deployment

Set `SF_TARGET_ORG` and `SF_LIGHTNING_OUT_APP_ID` in the server's ignored `.env`.
Optional `SF_INSTANCE_URL` and `SF_ACCESS_TOKEN` override the session exchange;
never put tokens in `VITE_*` variables or source control. Restart the server after
changing its modules or environment.

Deploy the LWC from the repository root:

```sh
sf project deploy start --source-dir force-app/main/default/lwc/simpleOutPage --target-org aforce_de --wait 5
```

For another org, create and enable a Lightning Out 2.0 app in Setup, add
`c-simple-out-page`, and allow the host domain. The `salesforce/` XML file is a
reference; this org previously rejected deployment of the LightningOutApp
metadata type, so the app was provisioned through Tooling API.

## Checks

```sh
npm test
npm run build
```

From the repository root:

```sh
npx sfdx-lwc-jest -- --runInBand --runTestsByPath force-app/main/default/lwc/simpleOutPage/__tests__/simpleOutPage.test.js
```

The tests simulate Salesforce form events. They verify Contact-to-Task mapping,
duplicate-submit guards, successful-ID publication, error handling, React message
validation, acknowledgment, and session exchange. Browser integration still needs
a live Save to verify the org-specific base-component behavior and message delivery.

This is a local developer demo. All Salesforce actions use the bridged user's
identity. Shared deployment requires per-user OAuth and a production session
backend. The Vite static build alone does not provide `/api/session`.
