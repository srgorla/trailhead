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

This supports the planned public LWR site creation command:

```bash
sf community create \
  --name "Financial Institution Finder" \
  --template-name "Build Your Own (LWR)" \
  --url-path-prefix "find-your-bank" \
  --target-org aforce_de \
  templateParams.AuthenticationType=UNAUTHENTICATED
```

## Open Validation

The remaining no-Apex risk is guest-user access.

Authenticated GraphQL works, but unauthenticated public access must still be validated after the LWR site exists and guest permissions are configured.

Next validation targets:

- Create the public LWR site.
- Retrieve generated site and guest profile metadata.
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
