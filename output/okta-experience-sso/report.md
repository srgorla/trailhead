# Portal Creation Report

Target org: aforce_de (00DgL000000AF5qUAG), verified through Headless 360 MCP.

## LWR replacements

| Name     | Framework / template                | URL prefix | Network ID         | Status           |
| -------- | ----------------------------------- | ---------- | ------------------ | ---------------- |
| Customer | Enhanced LWR / Build Your Own (LWR) | customer   | 0DBgL000002bMbVWAU | Live / published |
| Merchant | Enhanced LWR / Build Your Own (LWR) | merchant   | 0DBgL000002bMd7WAE | Live / published |

API: POST /services/data/v67.0/connect/communities. General-community API chosen for blank Experience Builder sites without PRM or Messaging dependencies.

Customer body: {"name":"Customer","urlPathPrefix":"customer","templateName":"Build Your Own (LWR)","description":"Customer LWR portal for shared enterprise OIDC SSO."}
Response: HTTP 202, job 08PgL00001I4RD5UAN, final Complete.

Merchant body: {"name":"Merchant","urlPathPrefix":"merchant","templateName":"Build Your Own (LWR)","description":"Merchant LWR portal for shared enterprise OIDC SSO."}
Response: HTTP 202, job 08PgL00001I58WIUAZ, final Complete.

Created sequentially to avoid Salesforce's concurrent site-creation restriction.

## Aura cleanup

User explicitly authorized deleting and recreating Customer and Merchant, including local and org metadata.
Deletion validation 0AfgL00000a247dSAA failed: Salesforce explicitly prohibits deleting Experience Cloud sites. No destructive deployment was executed.

Supported replacement approach:

- Old Customer renamed Customer Aura Retired, inactive, URL /customerauraretired.
- Old Merchant renamed Merchant Aura Retired, inactive, URL /merchantauraretired.
- Updated their CustomSite labels/prefixes (deployment 0AfgL00000a24FhSAI).
- Removed old Aura ExperienceBundle, Network, and CustomSite files from the active local source. Retired Aura backup and temporary staging projects were removed during the requested local cleanup.
- Old Salesforce site resources still exist because deletion is unsupported; they were not converted in place.

## New local metadata and membership

- digitalExperienceConfigs/Customer2.digitalExperienceConfig-meta.xml
- digitalExperienceConfigs/Merchant2.digitalExperienceConfig-meta.xml
- digitalExperiences/site/Customer2/
- digitalExperiences/site/Merchant2/
- networks/Customer.network-meta.xml and networks/Merchant.network-meta.xml
- sites/Customer1.site-meta.xml and sites/Merchant1.site-meta.xml

Salesforce generated different internal names because old site resources remain. User-visible names are Customer and Merchant; public paths are /customer and /merchant.

Reused Customer_Site_Access and Merchant_Site_Access permission sets, adding each to the corresponding replacement site's member groups. Network deployment 0AfgL00000a24h7SAA succeeded. Both site permission sets are assigned to the existing active users matching Federation IDs sgorla@gmail.com and mutyalaswetha@gmail.com. User identity fields remain unchanged.

## Builder URLs

Customer: https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com/sfsites/picasso/core/config/commeditor.jsp?siteId=0DMgL000002Y3ta
Merchant: https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com/sfsites/picasso/core/config/commeditor.jsp?siteId=0DMgL000002Y3vC

## Remaining

- Reapply Customer blue and Merchant green branding in the new LWR pages. User approved retaining both Google SSO and username/password login. These are new default-template pages; the old Aura edits do not carry over.
- LWR customization skill requires execute_metadata_action for content schemas/examples and explicitly pauses if the tool is unavailable. metadata-experts/execute_metadata_action is not exposed in this session, so LWR content changes are pending.
- Google OIDC replaces Okta. Shared GoogleOIDC provider, verified-email registration handler, and both site memberships are configured; end-to-end browser verification remains.
- Both sites activated by deployment 0AfgL00000a3OsHSAU. Customer publication 08PgL00001IJRkdUAH completed. Merchant initial publication failed with a Salesforce internal error; sequential retry 08PgL00001IKpRiUAL completed. Test login and landing pages in a fresh private session.

Task completed: portal creation dispatched — see report.md
