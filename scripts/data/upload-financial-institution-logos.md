# Upload Financial Institution Logos

The no-Apex-first logo strategy is:

1. Prefer a public `Logo_URL__c` field on `Account`.
2. Use Salesforce CMS images or static resources when public file access is unreliable.
3. Use Salesforce Files linked to `Account` only after confirming guest access works safely.
4. Use Apex only as a documented fallback.

## Static Resource Option

For MVP or demos, static resources are the most predictable no-Apex option.

Recommended naming:

```text
force-app/main/default/staticresources/financialInstitutionLogos.resource
force-app/main/default/staticresources/financialInstitutionLogos.resource-meta.xml
```

Store public logo URLs in `Account.Logo_URL__c`, for example:

```text
/resource/financialInstitutionLogos/example-bank.png
```

## Salesforce Files Option

If using Account-linked Files:

1. Upload the logo as a Salesforce File.
2. Link the file to the Account.
3. Store `LatestPublishedVersionId` in `Account.Logo_ContentVersionId__c`.
4. Test the download URL in an incognito browser:

```text
/sfc/servlet.shepherd/version/download/{ContentVersionId}
```

If the URL fails for the guest user, switch to static resources, CMS, or public logo URLs.
