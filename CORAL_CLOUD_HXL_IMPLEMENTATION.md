# Coral Cloud experiences HXL card

## Goal

Render an HXL card when a user searches for Coral Cloud Resorts experiences.
Show the experience image, price per guest, session availability, review rating,
and booking context.

- Target org: `aforce_de`.
- Branch: `feature/coral-cloud-hxl-experiences`, based on `origin/main` at `fbf443a`.
- API version: `67.0`.
- First rendering client: Claude.
- Session timezone: `America/Chicago` (Central Time, including daylight saving).
- Currency: `USD`, verified with `UserInfo.getDefaultCurrency()`.
- Status: core implementation passed dry-run deployment and Apex tests; live deployment and Claude rendering pending.

## Implementation approach

Use a custom MCP server with an Apex invocable search action, Custom Lightning
Types, and the `experienceCard` HXL widget. The standard SObject MCP server can
query these objects, but the documented HXL resource mapping uses a custom
server and invocable action. A separate standard-server prototype is not a
prerequisite for this implementation.

References: [HXL rendering configuration](https://developer.salesforce.com/docs/platform/hxl/guide/hxl-rich-ui),
[Custom MCP server for HXL](https://developer.salesforce.com/docs/platform/hxl/guide/hxl-mcp-server.html).

## 1. Complete org and data discovery

- [x] Inspect `Experience__c`, `Session__c`, `Booking__c`, and `Guest_Review__c`.
- [x] Verify that the booked-slots rollup sums guest counts and excludes canceled bookings.
- [x] Verify review rollup filters and handling of reviews without ratings.
- [x] Inspect sample experiences and the available session date range.
- [x] Confirm currency and resort timezone.
- [x] Confirm HXL availability and select the MCP/agent client for rendering tests.
- [x] Identify the sampled image domain and prepare its Trusted URL metadata.
- [ ] Deploy the image Trusted URL and verify image loading in Claude.

### Verified data behavior

- `Booked_Slots__c` sums `Booking__c.Number_of_Guests__c` where
  `Is_Canceled__c = false`.
- The review total counts all reviews, including reviews without a rating.
  The action calculates its displayed average from rated reviews only using
  `Rating_Value__c`, and returns the rated count separately from total reviews.
- The 177 non-canceled sessions span 2025-04-28 through 2026-05-23. There are
  currently no upcoming non-canceled sessions for a live availability demo.
  Tests create isolated sessions; no org demo records have been changed.
- Sample images use `https://s3-us-west-2.amazonaws.com`.
- HXL widget metadata passed target-org validation. Visual behavior in Claude
  remains to be verified.

### Verified data sources

| Card information                | Source                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Experience identity and title   | `Experience__c.Id`, `Name`                                                                              |
| Image                           | `Experience__c.Picture_URL__c`                                                                          |
| Description and location        | `Experience__c.Description__c`, `Location__c`                                                           |
| Category and activity level     | `Experience__c.Type__c`, `Activity_Level__c`                                                            |
| Duration                        | `Experience__c.Duration_Hours__c`                                                                       |
| Price per guest                 | `Experience__c.Price__c`; booking total formula multiplies this by guest count                          |
| Rating                          | Rated-review average from `Guest_Review__c.Rating_Value__c`; the org also has `Experience__c.Rating__c` |
| Review count and summary        | `Experience__c.Total_Guest_Reviews__c`, `Reviews_Summary__c`                                            |
| Session date and times          | `Session__c.Date__c`, `Start_Time__c`, `End_Time__c`                                                    |
| Capacity and booked guests      | `Session__c.Capacity__c`, `Booked_Slots__c`                                                             |
| Remaining capacity              | `Session__c.Available_Slots__c`, calculated as capacity minus booked slots                              |
| Cancellation and session status | `Session__c.Is_Canceled__c`, `Status__c`                                                                |
| Booking guest count and total   | `Booking__c.Number_of_Guests__c`, `Total_Price__c`                                                      |
| Booking cancellation            | `Booking__c.Is_Canceled__c`                                                                             |

Relationships:

- `Experience__c.Sessions__r` → `Session__c.Experience__c`.
- `Experience__c.Guest_Reviews__r` → `Guest_Review__c.Experience__c`.
- `Session__c.Bookings__r` → `Booking__c.Session__c`.
- Bookings and reviews also require a `Contact__c` reference.

## 2. Define the search and response contracts for the custom HXL action

- [x] Define `ExperienceSearchAction` inputs: search phrase, category, date range,
      and guest count; establish required fields, defaults, and limits.
- [x] Define `ExperienceSearchResult` with experience matches, session details,
      review information, and booking context.
- [x] Preserve one result per invocable input request and model multiple
      experience matches within each search result.
- [ ] Validate collection rendering in the selected HXL client before finalizing
      the response schema.
- [x] Represent no matches, no suitable sessions, and execution/access errors distinctly.
- [x] Include structured experience/session IDs and numeric values for agent follow-up.

### Implemented search limits and output

- All search fields are optional; an empty request browses the catalog.
- `searchPhrase`: literal, case-insensitive name substring, at most 100 characters.
- `category`: exact category value, case-insensitive, at most 100 characters.
- `guestCount`: defaults to 1; accepts integers from 1 to 100.
- Dates: defaults to today through 30 days later in Central Time. Start date is
  within the next 365 days; each inclusive date window spans at most 31 days.
- Up to 20 input requests per invocation, preserving input/output order.
- Up to 5 experiences per request and 3 sessions per experience, ordered by name
  and date/time respectively, with explicit truncation flags and messages.
  Sessions include full, canceled, or already-started entries with their status.
- Three permission-enforced queries serve the batch. More than 200 matching
  experiences or 2,000 sessions produces `SEARCH_TOO_BROAD` and asks for narrower
  filters rather than silently dropping candidate data.
- Result statuses: `OK`, `NO_MATCHES`, `INVALID_INPUT`, `SEARCH_TOO_BROAD`, and
  `ACCESS_OR_QUERY_ERROR`. Experiences without sessions still return a card with
  a no-sessions message. Structured IDs and numbers support booking follow-up.

## 3. Implement the Apex search

- [x] Query the existing org objects using sharing-aware, permission-enforced queries.
- [x] Bulkify requests, avoid queries inside request loops, and bound result sizes.
- [x] Apply search filters and deterministic ordering.
- [x] Return session date, start/end times, duration, capacity, and remaining slots.
- [x] Determine availability using cancellation, session start time in the confirmed
      timezone, and enough slots for the requested guest count. `Status__c` alone
      is insufficient because its formula only checks the date.
- [x] Return price per guest and a party-price estimate in the confirmed currency.
- [x] Return the rating on its native **1–10 scale**, review count, and available summary.
- [x] Handle missing prices, images, times, and reviews explicitly.

The initial search is read-only. Booking context consists of experience/session
identifiers, guest count, availability, and a price estimate. Guest-specific
booking lookup requires an established guest identity and access scope. A booking
URL or booking action must have a verified destination or implementation before
being exposed; no booking URL field was found in the inspected objects.

## 4. Build the experience HXL card

- [x] Create the `experienceCard` widget bundle and attribute schema.
- [x] Display image, title, description, location, category, and activity level.
- [x] Display price per guest, currency, duration, and party-price estimate.
- [x] Display matching session dates/times and availability.
- [x] Display rating out of 10, review count, and available review summary.
- [x] Implement missing-image, missing-price, unrated, and unavailable states.
- [x] Create experience-specific Custom Lightning Types and renderer mappings for
      the selected MCP/agent response shapes.

## 5. Configure the MCP integration

- [x] Prepare `CoralCloudExperiences` MCP server definition.
- [ ] Validate and deploy the MCP definition after the Apex action is registered.
- [ ] Register the Apex search tool and its HXL UI resource.
- [x] Set tool annotations to reflect read-only, non-destructive search behavior.
- [ ] Inspect existing OAuth setup in `aforce_de` and configure the required client
      registration, scopes, and callbacks.
- [ ] Configure a Coral Cloud MCP client connection with target-org authorization.
- [x] Prepare `CoralCloudExperienceSearch` read-access permission set.
- [ ] Assign the permission set to the intended users. It includes Contact read
      access, required by the review object's master-detail relationship; the
      search returns no Contact records or guest-identifying information.

## 6. Test, deploy, and verify

- [x] Write isolated Apex tests for matching, multiple matches, no matches,
      invalid inputs, and bulk requests.
- [x] Cover canceled, full, past, and same-day sessions; party-size limits;
      missing optional fields; and unrated experiences.
- [x] Verify cancellation effects on availability and restricted-access behavior.
- [x] Create an experience-only deployment manifest.
- [x] Run deployment validation and focused Apex tests against `aforce_de`.
- [ ] Deploy the experience metadata and activate/configure the MCP server.
- [ ] Run searches through the selected client and verify images, prices, ratings,
      session details, multiple results, and empty/error states render correctly.
- [ ] Record deployment, Apex test, and client-rendering results separately.

## First implementation checkpoint

Core dry-run deployment: **Succeeded** on 2026-09-07.

- Validation ID: `0AfgL00000WwgIzSAJ`.
- Apex: **10 tests passed**, 0 failures.
- Search action coverage: **283 / 305 executable lines (92.8%)**.
- Validated: Apex classes, HXL widget, three Lightning Type bundles, image
  Trusted URL, and permission set.
- MCP definition is prepared but has not yet been validated or activated.
- No live metadata deployment, permission assignment, OAuth change, or Claude
  rendering test has been completed.

Use `manifest/coral-cloud-experiences-core.xml` for the first deployment, followed
by MCP server validation/registration. `manifest/coral-cloud-experiences.xml`
includes the server for subsequent complete deployments.

The Salesforce CLI currently encounters an unrelated incomplete
`uiBundles/financialinstitutionfinder` bundle when scanning this repository.
Validation used an isolated temporary DX project containing exactly the core
manifest's components. Use the same isolation for deployment until that existing
bundle issue is resolved.

Next checkpoint: deploy the validated core, register and activate the MCP server,
configure Claude OAuth, and verify the card from a real tool response. Show the
current no-upcoming-sessions state; creating future demo sessions would be a
separate data change.

## Commit policy

Create meaningful commits only after explicit user approval. No commits have
been created for this work.
