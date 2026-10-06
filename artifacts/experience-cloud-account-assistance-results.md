# Experience Cloud Account Assistance Sharing Results

**Sandbox:** `aforce_de`
**Branch:** `feature/experience-cloud-record-sharing`

## Configuration deployed

- `Account_Assistance__c` is private by default and has a required lookup to Account.
- The existing Customer Community Plus sharing set maps a user's contact Account to the record's Account lookup with edit access.
- A Partner Community sharing set provides the equivalent access to records for the partner user's own Account.
- The `Distributor` Account Relationship sharing rule grants edit access to assistance records associated with the Account To (the account sharing its records).
- An Account Relationship links Express Logistics and Transport (Account From) to Burlington Textiles Corp of America (Account To).
- Four external users have `ExternalAccountAssistanceAccess`. It grants object read/create/edit, but no delete, view-all, or modify-all. Request Details and Resolution Notes have read/edit field access.

## Access checks

| Test record                       | Related Account                     | Jack Roger | Harry Cane | Babara Levy | Josh Davis |
| --------------------------------- | ----------------------------------- | ---------- | ---------- | ----------- | ---------- |
| `AA-00001` (`a06gL00000XWNWLQA5`) | Burlington Textiles Corp of America | Edit       | Edit       | Edit        | Edit       |
| `AA-00002` (`a06gL00000XWNZZQA5`) | Express Logistics and Transport     | None       | None       | Edit        | Edit       |

The results were read from Salesforce `UserRecordAccess` for each external user and record. This confirms both Burlington's own-account access and the one-way distributor sharing boundary.

## my lwr site

- Added a live, login-required `Account Assistance` item (Salesforce object target `Account_Assistance__c`) at position 3 in the `Default Navigation` menu for the `mylwr` site.
- Granted the `Account_Assistance__c` tab through permission sets: `ExternalAccountAssistanceAccess` for the four external test users and the tab-only `AccountAssistanceTabAccess` for the admin who configures the site. The corresponding Admin, Customer Community Plus User, and Partner Community User profile tab settings are now **Hidden**.
- Deployed the shared `All Account Assistances` list view (`All_Account_Assistances`) with record name, related Account, Assistance Type, and Status columns and an Everything scope. Record sharing still determines which rows each user can see.
- Confirmed the site is live and the navigation item is live in Salesforce.
- Opening the site while signed out redirects to the site's login page. The menu item is therefore ready for an authenticated Experience Cloud session.
- Rechecked record access after adding the menu: Jack and Harry can edit the Burlington test record but not the Express Logistics record; Babara and Josh can edit both.

## Verification limit

The org's record-level access calculation and published menu configuration were verified. A signed-in Experience Cloud browser session was not available, so the rendered page and navigation link could not be exercised as Jack, Harry, Babara, or Josh.
