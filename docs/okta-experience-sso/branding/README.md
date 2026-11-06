# Customer and Merchant brand references

Prepared from the official websites on 2026-10-11. These assets and colors are not yet deployed to Salesforce.

| Site                     | Main/background | Accent  | Light surface | Text on dark background |
| ------------------------ | --------------- | ------- | ------------- | ----------------------- |
| Merchant / Paze          | #0F42F8         | #0506BD | #F4F7FF       | #FFFFFF                 |
| Customer / Early Warning | #24334D         | #D6001C | #F4F8FA       | #FFFFFF                 |

Paze primary and secondary colors come from www.paze.com website CSS variables --paze-blue and --secondary-navy. Early Warning colors come from earlywarning.com website CSS. These are exact website values; the Early Warning page does not publish a formal palette specification.

Original, unmodified Paze and Early Warning logos and icons were downloaded from https://www.earlywarning.com/early-warning-trademarks. Source URLs and asset hashes are recorded in brand-manifest.json. Use the originals without recoloring or distortion.

Implementation TODO:

- Obtain the brandingSet schema via execute_metadata_action as required by the LWR skill.
- Apply Merchant and Customer palettes and recalculate dependent contrast tokens.
- Upload corresponding original logo/icon assets and configure site branding.
- Validate scoped site metadata, deploy, publish sequentially, and verify both sites.
- Separately configure Default login branding; LWR theme colors do not establish Default login styling. Preserve the working Google SSO configuration.

Connection verified after reload: metadata-experts execute_metadata_action is exposed and authenticated. The required ExperienceSiteLwr / getSiteContentMetadata / sfdc_cms__brandingSet request returns: "Invalid request: Access to experts knowledge is not enabled for metadata type: ExperienceSiteLwr". Headless 360 discovery also works. Schema retrieval is blocked by this server-side capability response. No Salesforce branding changed.
