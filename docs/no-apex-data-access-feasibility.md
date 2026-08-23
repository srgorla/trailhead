# No-Apex Data Access Feasibility

## Target Org

```text
Alias: aforce_de
API Version: 67.0
```

## Result

The no-Apex data path is viable enough to continue prototyping.

Authenticated GraphQL UI API queries against `Account` succeeded after deploying the public financial institution fields.

Validated query shape:

```graphql
query {
  uiapi {
    query {
      Account(
        first: 5
        where: {
          and: [
            { Publicly_Listed__c: { eq: true } }
            { Institution_Status__c: { eq: "Active" } }
          ]
        }
      ) {
        edges {
          node {
            Id
            Name {
              value
            }
            Public_Display_Name__c {
              value
            }
            Website {
              value
            }
            BillingCity {
              value
            }
            BillingState {
              value
            }
            Logo_URL__c {
              value
            }
            Enrollment_URL__c {
              value
            }
            Supports_Enrollment__c {
              value
            }
          }
        }
      }
    }
  }
}
```

The filtered query returned zero rows because sample public financial institution records have not been loaded yet.

## LWR Site Support

`aforce_de` includes the `Build Your Own (LWR)` Experience Cloud template.

The public LWR site was created with the Salesforce CLI. Two platform constraints were confirmed:

- LWR site URL path prefixes must be alphanumeric, so `findyourbank` is valid and `find-your-bank` is not.
- `UNAUTHENTICATED` is not supported for LWR site creation in this org. Use `AUTHENTICATED_WITH_PUBLIC_ACCESS_ENABLED` for public guest access.

```bash
sf community create \
  --name "Financial Institution Finder" \
  --template-name "Build Your Own (LWR)" \
  --url-path-prefix "findyourbank" \
  --target-org aforce_de \
  templateParams.AuthenticationType=AUTHENTICATED_WITH_PUBLIC_ACCESS_ENABLED
```

The generated site metadata can be retrieved and deployed, but the generated site's `appContainer` property is read-only after site creation. If the site must be created as a direct external React app container, that must be done through the `reactexternalapp` metadata creation path before the site exists, not by converting a standard generated LWR site after creation.

## External React App Container Probe

The supported external React path was validated with a generated `reactexternalapp` probe.

The probe dry-run deployed successfully when it included:

- The `financialinstitutionfinder` UIBundle.
- A generated `DigitalExperienceBundle` containing only `sfdc_cms__site`.
- A generated `DigitalExperienceConfig`.
- A generated `Network`.
- A generated `CustomSite`.
- `content.json` with `appContainer` set to `true`.
- `content.json` with `appSpace` set to `c__financialinstitutionfinder`.
- `authenticationType` set to `AUTHENTICATED_WITH_PUBLIC_ACCESS_ENABLED`.

The probe did not require the generated authentication Apex classes for metadata validation.

This confirms that the correct code-first path is not to convert the standard LWR site after creation. Instead, create a separate external React app-container site from `reactexternalapp`-style metadata, or create the final site from that metadata shape before the site exists.

Validated app-container site content shape:

```json
{
  "type": "sfdc_cms__site",
  "title": "fifinderapp",
  "contentBody": {
    "authenticationType": "AUTHENTICATED_WITH_PUBLIC_ACCESS_ENABLED",
    "appContainer": true,
    "appSpace": "c__financialinstitutionfinder"
  },
  "urlName": "fifinderapp"
}
```

## Open Validation

The remaining no-Apex risk is guest-user access.

Authenticated GraphQL works, but unauthenticated public access must still be validated after the LWR site exists and guest permissions are configured.

Next validation targets:

- Deploy the `financialinstitutionfinder` UIBundle.
- Add a source-controlled external React app-container site using the validated `reactexternalapp` metadata shape.
- Decide whether to keep the standard generated LWR site or replace it later with the app-container site as the public entry point.
- Retrieve generated guest profile metadata.
- Configure guest access to only public-safe `Account` fields.
- Test the React app or a minimal public route in an incognito browser.
- Confirm whether `Logo_URL__c`, static resources, CMS images, or Salesforce Files are the best public logo strategy.

## Validation Notes

`sf project deploy validate` ran unrelated existing Apex tests and failed due to existing org test failures and 64% org-wide coverage.

For this no-Apex metadata, the meaningful validation was:

```bash
sf project deploy start \
  --manifest manifest/financialInstitutionPublicApp.xml \
  --target-org aforce_de \
  --dry-run \
  --test-level NoTestRun
```

That dry run succeeded. The same manifest was then deployed with `NoTestRun`.
