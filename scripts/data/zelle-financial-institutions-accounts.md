# Zelle Financial Institution Test Data

Source page: https://enroll.zellepay.com/

Generated file:

- `zelle-financial-institutions-accounts.csv`

The CSV is formatted for the Account object fields used by the public financial institution finder:

- `Name`
- `Public_Display_Name__c`
- `Public_Search_Keywords__c`
- `Publicly_Listed__c`
- `Supports_Enrollment__c`
- `Enrollment_URL__c`
- `Institution_Status__c`
- `Logo_URL__c`
- `Logo_ContentVersionId__c`
- `Website`

Regenerate the CSV:

```bash
node scripts/data/scrape-zelle-institutions.mjs
```

Load into an org:

```bash
sf data import bulk --sobject Account --file scripts/data/zelle-financial-institutions-accounts.csv --target-org aforce_de
```

Notes:

- `Logo_URL__c` points to the publicly served logo URL from the Zelle enrollment site.
- `Logo_ContentVersionId__c` is left blank because this file does not upload logo files into Salesforce Files.
- All rows are marked `Publicly_Listed__c=true` and `Institution_Status__c=Active` for public directory testing.
