# Create Financial Institution Sample Data

Use a repeatable no-Apex data import process for sample records.

## Recommended MVP Records

Create `Account` records where:

```text
Type = Financial Institution
Publicly_Listed__c = true
Institution_Status__c = Active
```

Recommended fields:

```text
Name
Type
Website
BillingCity
BillingState
Public_Display_Name__c
Public_Search_Keywords__c
Publicly_Listed__c
Supports_Enrollment__c
Enrollment_URL__c
Institution_Status__c
Logo_URL__c
Logo_ContentVersionId__c
```

## CLI Import Options

Use Salesforce CLI data import once a target org is authenticated.

Example CSV flow:

```bash
sf data import bulk \
  --sobject Account \
  --file scripts/data/financial-institutions.csv \
  --target-org <target-org-alias>
```

If the exact command differs by CLI version or org constraints, document the working command here before committing the data workflow.

## Sample CSV Shape

```csv
Name,Type,Website,BillingCity,BillingState,Public_Display_Name__c,Public_Search_Keywords__c,Publicly_Listed__c,Supports_Enrollment__c,Enrollment_URL__c,Institution_Status__c,Logo_URL__c
Example Bank,Financial Institution,https://example.com,Chicago,IL,Example Bank,example bank,true,true,https://example.com/enroll,Active,/resource/ExampleBankLogo
```
