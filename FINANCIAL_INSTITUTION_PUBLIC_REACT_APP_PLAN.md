# Public Financial Institution Finder React App Plan

## Goal

Create a public, unauthenticated React app similar in behavior to the Zelle "Find Your Bank" experience. The app will let external visitors search and browse financial institutions without logging in.

Financial institution data will come from Salesforce `Account` records. Institution logos will come from files attached to the corresponding `Account` records.

This plan is for a Salesforce Multi-Framework external React app hosted through a dedicated public LWR Experience Cloud site.

## Delivery Approach

Build and configure this through code wherever Salesforce supports it. Avoid manual Setup work in the org as much as possible.

Code-first means:

- Store all app, site, object, field, permission, routing, and asset metadata in this Salesforce DX project.
- Use Salesforce CLI commands for org validation, deployment, retrieval, and publishing.
- Use metadata files for the LWR site, Experience Cloud configuration, Network, Custom Site, UIBundle, permissions, objects, and fields.
- Use scripts, Salesforce CLI, and metadata for sample data and logo setup.
- Use deployment manifests or package directories so the work can be repeated in scratch orgs, sandboxes, and later environments.
- Document any unavoidable manual org prerequisite as an exception.

Expected exceptions:

- Some org-level enablement may still require a one-time admin action if the org does not already have Experience Cloud, Digital Experiences, domains, or Multi-Framework features enabled.
- Site activation/publishing support can vary by org and Salesforce CLI/API support. Prefer CLI or metadata deployment first; document any fallback.
- Guest user profile details may need to be retrieved after site creation because guest profile names and generated metadata can be org-specific.

## Target Architecture

```text
Public user browser
  -> Public LWR Experience Cloud site
  -> Salesforce Multi-Framework external React UIBundle
  -> Salesforce-supported public data access through Data SDK, GraphQL, UI API, CMS, or static assets
  -> Account records filtered as financial institutions
  -> Account-linked Salesforce Files for logos
```

Use an external app, not an internal app.

## Site Decision

Create a dedicated public LWR Experience Cloud site for this app.

Recommended site characteristics:

- Site type: LWR Experience Cloud site.
- Authentication: public guest access, no login required.
- Purpose: host only the financial institution finder experience and closely related public pages.
- System URL shape: use the generated Experience Cloud path, currently `/fifinderapp`, in scratch/dev orgs.
- Production URL shape: map the production custom domain root path `/` to this site using Salesforce Custom URLs so visitors can use `https://enroll.zellepay.com/` without the Salesforce site path segment.
- Guest profile: grant only the minimum permissions needed for the public API and public assets.
- Creation and configuration: managed through Salesforce DX metadata and CLI wherever possible.

Reasons to use a dedicated LWR site:

- The app needs a public unauthenticated URL.
- External Multi-Framework apps are surfaced through Experience Cloud, not the internal App Launcher.
- LWR is the better fit for a lightweight, public, React-based experience.
- Dedicated guest-user permissions are easier to reason about and audit.
- Branding, routing, caching, and public access can be managed separately from other sites.

External app characteristics:

- Public access through an LWR Experience Cloud site URL.
- No Salesforce login required for visitors.
- Uses public/guest user permissions.
- React app is packaged as Salesforce `UIBundle` metadata.
- App data access must be carefully controlled because it is exposed to anonymous users.

Current implementation notes:

- Site/API metadata names: `fifinderapp`, `fifinderapp1`, and `financialinstitutionfinder`.
- Scratch/dev system-managed URLs include `/fifinderapp`; do not try to remove this path from the generated Salesforce URL.
- Root-domain access is a domain mapping concern, not a React app routing concern. For production, configure a Custom URL path `/` for the custom domain and point it at this Experience Cloud site.
- The React bundle was generated/adapted using the `reactexternalapp` template shape.

## Important Salesforce Constraint

For a public unauthenticated app, do not expose raw `Account` access broadly to the guest user unless the data model and sharing model are intentionally designed for public access.

Recommended pattern:

- Keep direct guest access narrow.
- Prefer Salesforce-supported no-Apex data access first.
- Return or expose only approved public fields.
- Only return Accounts marked as public financial institutions.
- Only return logo URLs for files that are safe to expose publicly.

Apex should be used only if there is no safe or supportable no-Apex way to expose the required public data.

## No-Apex-First Decision

Implement this without Apex classes unless there is no other safe or supportable way.

Primary no-Apex options to evaluate:

- Multi-Framework Data SDK with GraphQL or UI API from the public LWR external app.
- Guest-user read access limited to public-safe `Account` fields.
- Public Experience Cloud data access rules and sharing settings.
- Public logo URLs stored on `Account`.
- Salesforce CMS images or static resources for institution logos.
- Salesforce Files only if public guest access is confirmed and safe.

Use Apex only as a fallback when one of these is true:

- Public guest users cannot query the required Account fields through supported no-Apex APIs.
- Salesforce Files cannot expose logo URLs safely without server-side mediation.
- Search/filtering requirements cannot be implemented safely with direct public data access.
- The no-Apex approach requires broader guest permissions than a controlled server-side endpoint would.

If Apex becomes necessary, document the exact blocker before adding Apex classes.

## Data Model

Use `Account` records as financial institutions.

Recommended Account fields:

```text
Account
- Name
- Type = Financial Institution
- Website
- Phone
- BillingCity
- BillingState
- BillingCountry
- Public_Display_Name__c
- Public_Search_Keywords__c
- Publicly_Listed__c
- Supports_Zelle__c or Supports_Enrollment__c
- Enrollment_URL__c
- Institution_Status__c
- Logo_ContentDocumentId__c, optional
```

Minimum required fields for MVP:

```text
Account
- Name
- Type
- Publicly_Listed__c
- Website
- BillingCity
- BillingState
```

Recommended filters:

```text
Type = 'Financial Institution'
Publicly_Listed__c = true
Institution_Status__c = 'Active'
```

## Logo Storage

Use Salesforce Files attached to the `Account`.

Recommended convention:

```text
Account
  -> ContentDocumentLink
  -> ContentDocument
  -> LatestPublishedVersionId
  -> ContentVersion
```

Use one of these strategies:

1. Preferred MVP: Add `Logo_ContentDocumentId__c` or `Logo_ContentVersionId__c` on `Account`.
2. Alternative: Resolve the primary logo by querying linked files where the title starts with `logo`.
3. Long-term: Maintain a dedicated custom object such as `Financial_Institution_Asset__c`.

If Salesforce Files are directly usable by the public LWR site, the frontend can use a logo URL such as:

```text
/sfc/servlet.shepherd/version/download/{ContentVersionId}
```

Validate public access to this URL in the Experience Cloud guest context. If direct file download is blocked, prefer CMS images, static resources, or a public logo URL field. Use an Apex file endpoint only as a fallback.

## Public Data Access Design

Primary approach: retrieve public financial institution records without Apex.

Potential data access options:

```text
Data SDK GraphQL query from external React app
Data SDK fetch to supported UI API endpoint
Experience Cloud public data access with restricted guest permissions
CMS/static JSON or static resource for a generated public directory snapshot
```

Search inputs:

```text
q       optional search text
letter  optional A-Z or #
limit   optional, default 100
offset  optional for pagination
```

Frontend institution shape:

```json
{
  "items": [
    {
      "id": "001...",
      "name": "Bank of Example",
      "displayName": "Bank of Example",
      "website": "https://example.com",
      "city": "Chicago",
      "state": "IL",
      "logoUrl": "/sfc/servlet.shepherd/version/download/068...",
      "enrollmentUrl": "https://example.com/enroll"
    }
  ],
  "total": 25
}
```

Security rules:

- Expose only public-safe fields.
- Enforce `Publicly_Listed__c = true`.
- Enforce active status.
- Enforce a reasonable maximum `limit`.
- Do not return internal IDs unless needed by the frontend. If possible, use a public slug.
- Avoid granting broad guest-user Account access.
- If direct guest queries are not safe, switch to a generated public directory snapshot or Apex fallback.

## React App UX

Recreate the functional pattern of the Zelle enrollment page without copying protected branding.

Main page:

- Public header.
- Search input with clear button.
- Alphabet selector: `A-Z` and `#`.
- Results grouped by first character.
- Institution list grouped in columns by first character.
- Disabled alphabet entries when no matching bank exists for that letter.
- Empty state.
- Loading state.
- Error state.
- Zelle-style public information/footer section.

Institution detail or selection behavior:

- Click institution row.
- Show a confirmation modal before redirecting to an external bank site.
- Modal includes "Great News!" title, bank name, logo or fallback, disclaimer, "Continue to your bank", and "Cancel".
- Use `Enrollment_URL__c` or `Website`.

MVP routes:

```text
/
```

No detail route is required for the current MVP.

Recommended components:

```text
AppShell
InstitutionSearch
AlphabetFilter
InstitutionList
InstitutionListItem
InstitutionLogo
InstitutionDetail
LoadingState
EmptyState
ErrorState
```

Recommended data modules:

```text
src/api/financialInstitutions.ts
src/types/financialInstitution.ts
src/utils/groupInstitutions.ts
src/utils/searchParams.ts
```

## Salesforce Multi-Framework Setup

Use the external React app template and connect it to the dedicated public LWR Experience Cloud site.

Expected metadata shape:

```text
force-app/main/default/uiBundles/<appName>/
force-app/main/default/digitalExperiences/
force-app/main/default/digitalExperienceConfigs/
force-app/main/default/networks/
force-app/main/default/sites/
force-app/main/default/experiences/ or related ExperienceBundle metadata, if used by the org
force-app/main/default/objects/Account/fields/
force-app/main/default/permissionsets/
```

Salesforce docs describe external React apps as being surfaced through Experience Cloud. External apps require additional site metadata such as `DigitalExperience`, `DigitalExperienceConfig`, `Network`, and `CustomSite`.

For this project, the Experience Cloud site should be an LWR site. Do not plan this as an internal App Launcher app.

## Code-First Configuration Plan

Manage these items in source control:

```text
LWR Experience Cloud site metadata
External React UIBundle metadata
Custom Account fields
Permission set for public app administration/testing
No-Apex public data access configuration
Frontend tests
Static fallback logo asset, if needed
Sample data scripts
Deployment manifests
Validation scripts
```

Recommended project additions:

```text
manifest/financialInstitutionPublicApp.xml
scripts/data/create-financial-institution-sample-data.md
scripts/data/upload-financial-institution-logos.md
scripts/validate-public-financial-institution-app.sh
force-app/main/default/permissionsets/Financial_Institution_Public_App_Admin.permissionset-meta.xml
```

Prefer these workflows:

```bash
sf project deploy start --manifest manifest/financialInstitutionPublicApp.xml
sf project retrieve start --metadata "ExperienceBundle"
sf project retrieve start --metadata "Network"
sf project retrieve start --metadata "CustomSite"
```

Use retrieval when Salesforce generates site-related metadata that must be committed back into the project. Do not hand-author first-create Experience Cloud site metadata unless deploy validation proves the shape is accepted by the target org.

Do not rely on undocumented manual Setup changes as the primary implementation path. If a manual step is unavoidable, capture it in a short `MANUAL_ORG_PREREQUISITES.md` file with the reason, owner, and whether it is one-time or repeatable.

## Development Steps

1. Confirm the target org supports Salesforce Multi-Framework external apps using CLI/org metadata checks.
2. Capture any one-time org prerequisites in `MANUAL_ORG_PREREQUISITES.md` only if they cannot be represented as metadata.
3. For a standard public LWR site, create the site with Salesforce CLI, then retrieve generated site metadata and commit it to the project.
4. Generate or adapt a Multi-Framework external React app from the `reactexternalapp` template and commit the UIBundle metadata.
5. For a direct external React app site, use the `reactexternalapp` app-container metadata shape at site creation time. Do not create a standard LWR site first and try to convert it later.
6. Add Account fields needed for public financial institution listing as source-tracked metadata.
7. Add sample financial institution Account records through Salesforce CLI data import or another repeatable no-Apex script.
8. Attach logo files to sample Account records through a repeatable script or documented CLI data process.
9. Implement the no-Apex public data access path.
10. Add tests for filtering, search, and public field control where testable in frontend/unit tests.
11. Build the React search and listing UI.
12. Connect the React app to the selected no-Apex public data source.
13. Configure guest user access through deployable metadata where supported, then retrieve generated guest profile/site metadata and commit it.
14. Validate the public LWR site without login in a private browser session.
15. Add automated frontend tests for grouping, search, empty state, and error state.
16. Deploy to sandbox from source, then package/promote after review.

Current implementation status:

- Account fields, UI bundle, site/network metadata, guest permission set, and admin permission set are in source.
- Guest access is configured through a dedicated permission set assigned to the site guest user. Do not edit profiles for this app.
- Sample scraped Zelle-style institution data is stored locally in `scripts/data/zelle-financial-institutions-accounts.csv` and can be loaded into scratch orgs/sandboxes.
- Scratch org `fifinder_test` and Dev Hub org alias `aforce_de` have been used for validation deployments.
- The latest UI bundle has been deployed to both scratch and `aforce_de`.

## React Data Access

For this public app, prefer no-Apex public data access first.

Possible Data SDK GraphQL shape:

```ts
const result = await dataSdk.graphql?.query({
  query: FINANCIAL_INSTITUTIONS_QUERY,
  variables: { searchText, first: 100 }
});
```

If UI API is used instead, call it through Data SDK `fetch`.

```ts
const response = await dataSdk.fetch?.("/services/data/vXX.X/ui-api/...");
```

Do not use raw `fetch` for Salesforce endpoints from a Multi-Framework app. The Data SDK handles platform-specific request behavior.

If neither GraphQL nor UI API can safely expose the data to unauthenticated visitors, use a generated static JSON/static resource or move to the documented Apex fallback.

Current implementation:

- Uses Salesforce Multi-Framework Data SDK GraphQL from the React app.
- Queries active, publicly listed `Account` records.
- Pages through results with `first: 200`.
- Renders the first returned page immediately, then continues appending later pages in the background to improve perceived load time.
- Does not use Apex.

## Guest User Permission Checklist

Experience Cloud guest user needs:

- Access to the public LWR site.
- Access to the external React app route.
- Read access only to public-safe fields if direct public record access is used.
- File visibility for logo assets, or an alternate public asset strategy.

Manage these permissions through metadata wherever possible. If the guest profile is generated by the site creation process, retrieve the generated metadata after site creation and commit the relevant changes.

Current permission decision:

- Do not modify the generated guest user profile directly.
- Use `Financial_Institution_Public_App_Guest` for guest access.
- Assign it with:

```bash
sf org assign permset --name Financial_Institution_Public_App_Guest --on-behalf-of <guest-user-username> --target-org <org-alias>
```

- Use `Financial_Institution_Public_App_Admin` for admin/test user access to app fields.

Avoid:

- Broad Account read access.
- Returning sensitive Account fields.
- Returning internal operational fields.
- Exposing files that are not intended for public use.

## Apex Fallback Criteria

Do not add Apex unless the no-Apex path is blocked.

Before adding Apex, document:

- Which no-Apex option failed.
- Whether the failure is technical, security-related, or org-permission-related.
- Why CMS/static asset/public URL alternatives are insufficient.
- Why a controlled Apex endpoint is safer than direct guest access.

If Apex is required, the Apex REST controller should:

- Accept `q`, `letter`, `limit`, and `offset`.
- Normalize search text.
- Query only public, active financial institution Accounts.
- Resolve logo URL from `Logo_ContentVersionId__c` or linked files.
- Return a small DTO.
- Enforce CRUD/FLS where applicable.
- Avoid leaking implementation details in error responses.

Recommended class names:

```text
PublicFinancialInstitutionController
PublicFinancialInstitutionControllerTest
```

## MVP Acceptance Criteria

The MVP is complete when:

- A public LWR Experience Cloud URL loads the React app without login.
- Visitors can search financial institutions by name.
- Visitors can browse by alphabet letter.
- Results show institution name.
- Redirect modal shows institution name and logo when available.
- Missing logos show a clean fallback.
- Clicking a bank opens a redirect confirmation modal before leaving the site.
- Only Accounts marked public and active appear.
- Public users cannot access non-public Account data.
- If Apex fallback is used, Apex tests cover filtering and response mapping.
- Frontend tests cover search, grouping, loading, empty, and error states.
- Site, app, fields, permissions, assets, and deployment manifests are committed to source control.
- Any unavoidable manual org prerequisite is documented separately.

## Risks and Decisions

Open decisions:

- Whether production logos should use `Logo_URL__c`, `Logo_ContentVersionId__c`, Salesforce Files, CMS, or another public asset store.
- Whether result data should be cached at the CDN/browser layer.
- Whether to switch from live GraphQL queries to a generated static JSON snapshot for production-grade startup performance.

Primary risks:

- Guest user access to Account and Files can be difficult to configure safely.
- Salesforce Files may not be directly public depending on site and file settings.
- Multi-Framework external app and LWR site support may depend on org edition, release, and enabled features.
- Some Experience Cloud and guest-profile metadata may be generated by Salesforce and require a retrieve-then-commit loop.
- A no-Apex direct query path may require guest permissions that are too broad for the desired security model.
- Loading thousands of Accounts through live GraphQL pagination can still take time after first render; production should consider caching or static snapshot generation if the directory changes infrequently.
- Custom domain root mapping must be configured as Salesforce Domain/Custom URL metadata or admin setup in the production org; the system-managed scratch/dev URL will still include `/fifinderapp`.

Recommended risk reduction:

- Prototype no-Apex public data access and logo access first.
- Test in an incognito browser before building the full UI.
- Keep the first data response intentionally small.

## Suggested Implementation Order

Phase 1: Platform validation

- Create the dedicated public LWR Experience Cloud site with Salesforce CLI, then retrieve the generated metadata.
- Create one public Account through a repeatable script.
- Attach one logo through a repeatable script or documented CLI process.
- Prove one no-Apex public data access path.
- Confirm anonymous browser access.

Phase 2: React MVP

- Generate or adapt the external React app from the `reactexternalapp` template.
- Build search, alphabet filter, and result list.
- Connect to the selected no-Apex public data source.

Phase 3: Hardening

- Add tests.
- Add field-level controls.
- Add pagination.
- Add performance strategy: cache, static JSON snapshot, or GraphQL query optimization.
- Validate file/logo security.
- Add Apex fallback only if the no-Apex path is formally blocked.

Phase 4: Polish

- Refine redirect confirmation modal and accessibility.
- Add analytics.
- Add CMS-managed copy if needed.
- Add deployment documentation.
- Add production custom domain mapping documentation for `https://enroll.zellepay.com/` root path `/`.

## Useful References

- Salesforce Multi-Framework overview: https://developer.salesforce.com/docs/platform/multiframework/guide
- React development with Multi-Framework: https://developer.salesforce.com/docs/platform/multiframework/guide/reactdev-overview.html
- Data SDK: https://developer.salesforce.com/docs/platform/multiframework/guide/reactdev-data-sdk-intro.html
- Salesforce Custom URLs/root path mapping: https://help.salesforce.com/s/articleView?id=platform.custom_url_add.htm&type=5
- Target functional reference: https://enroll.zellepay.com/
