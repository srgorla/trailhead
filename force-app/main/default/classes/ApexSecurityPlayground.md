# Apex sharing and SOQL security playground

These methods query the same fields on `Account` (`Id`, `Name`, and `Industry`) so you can compare their behavior. They do not modify data. Invoke them as users with different record access and object/field permissions; an insufficient permission can cause a query to throw a security exception.

| Example                                                                     | Record sharing             | Object and field permissions                     |
| --------------------------------------------------------------------------- | -------------------------- | ------------------------------------------------ |
| `ApexSecurityPlayground.queryWithSharingOnly()`                             | Enforced by `with sharing` | Not enforced by the query                        |
| `ApexSecurityPlayground.queryUserMode()`                                    | Enforced                   | Enforced, along with user-mode data access rules |
| `ApexSecurityPlayground.querySecurityEnforced()`                            | Enforced by `with sharing` | Legacy CRUD/FLS check for fields in the query    |
| `ApexSecurityPlayground.querySystemModeWithSharing()`                       | Enforced by `with sharing` | Not enforced; explicitly system mode             |
| `ApexSecurityPlaygroundWithoutSharing.queryWithoutSharing()`                | Bypassed                   | Not enforced; explicitly system mode             |
| `ApexSecurityPlaygroundWithoutSharing.queryUserModeDespiteWithoutSharing()` | Enforced by user mode      | Enforced despite the class declaration           |

## What the keywords mean

- `with sharing` and `without sharing` are class-level controls for record-level sharing. `with sharing` does not enforce object permissions or field-level security (FLS).
- `WITH USER_MODE` enforces the running user's record access, object permissions, FLS, and user-mode data access rules. It takes precedence over the class sharing declaration for that database operation.
- `WITH SYSTEM_MODE` makes the query run without object permission/FLS checks; record sharing then follows the class declaration. Use it only when system access is intentional and justified.
- `WITH SECURITY_ENFORCED` is the older query clause for checking object and selected-field permissions. Salesforce recommends `WITH USER_MODE`, which handles more cases, including fields used in filtering and ordering.

## Version note

The two Apex classes intentionally use API 66.0 so the legacy `WITH SECURITY_ENFORCED` method can be compiled and compared. Salesforce's API 67.0 release retires that clause and changes defaults: database operations run in user mode by default and classes without an explicit sharing keyword default to `with sharing`. Keep the explicit modes and sharing declarations in these examples so the comparison stays clear. If you raise the metadata API version to 67.0, remove `querySecurityEnforced()` and its legacy clause.

References: [Secure Apex Classes](https://developer.salesforce.com/docs/platform/lwc/guide/apex-security), [SOQL WITH clause](https://developer.salesforce.com/docs/platform/salesforce-soql-sosl/guide/sforce-api-calls-soql-select-with.html).
