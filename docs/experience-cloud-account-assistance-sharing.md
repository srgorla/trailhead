# Experience Cloud Account Assistance Sharing

This sandbox example lets Burlington Textiles customer users work on their own assistance records and lets the distributor account, Express Logistics and Transport, collaborate on Burlington records.

## Access model

- `Account_Assistance__c` uses private organization-wide defaults.
- Its required `Account__c` lookup points to the account receiving assistance. It is a lookup rather than master-detail so the child records can have their own private sharing model and be shared across external accounts.
- The existing Customer Community Plus sharing set maps `Contact.Account` to `Account_Assistance__c.Account__c` with read/edit access. Burlington users see and maintain Burlington records.
- A Partner Community sharing set maps the same fields for a partner user's own account records.
- The `Distributor` Account Relationship sharing rule grants read/edit access to assistance records whose `Account__c` points to the account sharing its records. A relationship from Express Logistics and Transport (Account From) to Burlington Textiles (Account To) grants distributor users access to Burlington records.
- `External Account Assistance Access` grants object create, read, and edit, plus access to the request and resolution text fields. It grants no delete, view-all, or modify-all access. Record access still depends on sharing.

## Test matrix

| User                                  | Expected access to Burlington assistance records | Mechanism                                        |
| ------------------------------------- | ------------------------------------------------ | ------------------------------------------------ |
| Jack Roger and Harry Cane             | Read and edit                                    | Customer Community Plus sharing set              |
| Babara Levy and Josh Davis            | Read and edit                                    | Distributor Account Relationship sharing rule    |
| External user on an unrelated account | No access                                        | Private OWD and no matching account relationship |
| Internal administrator                | Full access                                      | Administrator permissions                        |

The sharing rule is reusable for any account relationship whose type is `Distributor`. Only accounts linked by such a relationship receive access to the records associated with the sharing account.

## Sandbox verification

The metadata deployed successfully to `aforce_de`. Salesforce `UserRecordAccess` reported `Edit` for Jack Roger, Harry Cane, Babara Levy, and Josh Davis on Burlington record `AA-00001`. On control record `AA-00002`, associated with Express Logistics and Transport, the Burlington users had no access and the Express Logistics users had `Edit`. This verifies the sharing direction and that unrelated account records remain private.

The verification queried Salesforce's record access calculation; it did not launch an Experience Cloud browser session. Use the site as each user to verify the rendered pages and navigation.
