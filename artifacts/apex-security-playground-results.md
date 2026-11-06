# Apex Security Playground test results

- Date: 2026-09-30 (America/Chicago)
- Org alias: `aforce_de`
- Deployment: succeeded
- App: Coral Cloud Resorts
- Page: Apex Security Playground
- Current test user: System Administrator

## UI run

Clicked **Run All Examples** on the deployed page. All six Apex calls completed successfully and each returned 20 Account records:

| Example                                | Result      |
| -------------------------------------- | ----------- |
| `with sharing` only                    | 20 Accounts |
| `WITH USER_MODE`                       | 20 Accounts |
| `WITH SECURITY_ENFORCED`               | 20 Accounts |
| `WITH SYSTEM_MODE` + `with sharing`    | 20 Accounts |
| `without sharing` + `WITH SYSTEM_MODE` | 20 Accounts |
| `without sharing` + `WITH USER_MODE`   | 20 Accounts |

No Apex call errors appeared. Salesforce deployment did not run Apex unit tests (`0` tests); these results come from executing the live LWC and its Apex methods in the org.

Because the test user is a System Administrator, this run confirms the page and methods work, but does not demonstrate reduced record visibility or CRUD/FLS failures for a restricted user.
