# Manual Org Prerequisites

The implementation goal is code-first and no-Apex-first. Use Salesforce DX metadata, Salesforce CLI commands, scripts, and source control for repeatable setup.

Document only prerequisites that cannot be represented reliably as deployable metadata or CLI automation.

## Current Known Prerequisites

These items must be confirmed before deploying the public LWR app:

- Salesforce Multi-Framework external apps are available in the target org.
- Digital Experiences / Experience Cloud is enabled in the target org.
- A Salesforce domain is configured for Experience Cloud public sites.
- The org can create a `Build Your Own (LWR)` site with unauthenticated access.

## Preferred CLI Site Creation

When an authenticated target org is available, prefer this command over manual Setup:

```bash
sf community create \
  --name "Financial Institution Finder" \
  --template-name "Build Your Own (LWR)" \
  --url-path-prefix "find-your-bank" \
  --description "Public financial institution finder" \
  --target-org <target-org-alias> \
  templateParams.AuthenticationType=UNAUTHENTICATED
```

After site creation, retrieve the generated site metadata and commit it:

```bash
sf project retrieve start --metadata "DigitalExperience" --target-org <target-org-alias>
sf project retrieve start --metadata "DigitalExperienceBundle" --target-org <target-org-alias>
sf project retrieve start --metadata "Network" --target-org <target-org-alias>
sf project retrieve start --metadata "CustomSite" --target-org <target-org-alias>
```

Publish through CLI when ready:

```bash
sf community publish \
  --name "Financial Institution Finder" \
  --target-org <target-org-alias>
```

## Exception Log

Add any unavoidable manual setup item here before doing it.

| Date | Item     | Reason Manual Setup Was Required | Owner | Repeatable? |
| ---- | -------- | -------------------------------- | ----- | ----------- |
| TBD  | None yet | TBD                              | TBD   | TBD         |
