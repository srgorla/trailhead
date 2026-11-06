# Deploying fifinderapp to fifinder2

Target: `fifinder2` (`sgorla2@pipeline.com`), Developer Edition org `00Dbm000016LiN3EAK`.

Follow the first-time deployment sequence in
[FINANCIAL_INSTITUTION_PUBLIC_REACT_APP_PLAN.md](../FINANCIAL_INSTITUTION_PUBLIC_REACT_APP_PLAN.md)
and [MANUAL_ORG_PREREQUISITES.md](../MANUAL_ORG_PREREQUISITES.md).
The scratch deployment script documents the same sequence, but creates a new org;
do not run its org-creation step for this existing org.

## Deployment sequence

1. Confirm org connectivity and Experience Cloud availability. `fifinder2` is connected,
   is Developer Edition, and already contains other live Experience Cloud sites.
2. Build the React UI bundle with this target org:

   ```bash
   cd force-app/main/default/uiBundles/financialinstitutionfinder
   VITE_SF_ORG_ALIAS=fifinder2 npm run build
   ```

3. From the project root, validate and deploy the bootstrap manifest. It deliberately
   excludes guest sharing because the guest user does not exist until the site is created:

   ```bash
   sf project deploy start --dry-run --manifest manifest/financialInstitutionPublicAppScratchBootstrap.xml --target-org fifinder2 --wait 30 --json
   sf project deploy start --manifest manifest/financialInstitutionPublicAppScratchBootstrap.xml --target-org fifinder2 --wait 30 --json
   ```

4. Deploy guest sharing after the bootstrap succeeds:

   ```bash
   sf project deploy start --metadata SharingGuestRule:Account.PublicActiveFinancialInstitutions --target-org fifinder2 --wait 20 --json
   ```

5. Assign `Financial_Institution_Public_App_Admin` to the connected admin. Query
   the generated `fifinderapp` guest username, then assign
   `Financial_Institution_Public_App_Guest` to that user. Do not modify the guest profile.
6. Publish `fifinderapp` and verify the Network, CSP trusted site, public HTTP response,
   and rendered application. The public React path is `/fifinderapp`; the Network's
   `fifinderappvforcesite` path is not the public React app URL.
7. Import directory Accounts only when separately authorized. The verified snapshot
   is `scripts/data/snapshots/2026-10-29/crosscheck/zelle-financial-institutions-accounts.csv`
   with 2,589 distinct listing rows. Do not use Name as a unique upsert key.

For later deployments, use `manifest/financialInstitutionPublicApp.xml`, which includes
the guest sharing rule. Keep org-specific site owners out of the shared site metadata.

## Run status

- Completed October 29, 2026. Public URL:
  https://gorlatrails2-dev-ed.develop.my.site.com/fifinderapp/
- React build passed using `VITE_SF_ORG_ALIAS=fifinder2`.
- Bootstrap validation `0Afbm00000liCqQCAU`: succeeded, 33 components, zero errors.
- Bootstrap deployment `0Afbm00000libs3CAA`: succeeded, 33 components, zero errors.
- Guest sharing deployment `0Afbm00000lj84oCAA`: succeeded, one component, zero errors.
- Admin permission set assigned to `sgorla2@pipeline.com`.
- Guest permission set assigned to `fifinderapp@00dbm000016lin3eak.org.force.com`.
- Publish job `08Pbm000017cgyOEAQ`: `Complete`, no error. Network `0DBbm000005xacTGAQ` is Live.
- Bulk import `750bm00001EAEtxAAH`: 2,589 processed, 2,589 successful, zero failed.
- Total Accounts: 2,603. The 14 pre-existing Account IDs were preserved; none overlap
  the imported directory names. All 11 imported fields match the approved CSV on every row.
- `ZellePay_Logos` CSP trusted site is active for `https://enroll.zellepay.com`.
- Unauthenticated HTTP checks: public HTML, JavaScript, and CSS return 200.
  Public JavaScript and CSS bytes match the local production build.
- Unauthenticated guest data verification: 13 pages, 2,589 unique Account IDs, all
  queried directory fields match the approved snapshot, 1st Summit Bank is present,
  and none of the 14 pre-existing Account IDs are returned.
- When independently checking the guest data endpoint, mirror the SDK's
  `X-Chatter-Entity-Encoding: false` header. Without it, strings in the verification
  response contain HTML entities; that does not indicate corrupted imported data.
- The UI bundle's Vitest command finds no test files. Functional verification must
  use the deployed public site; this is not a passing unit-test suite. No browser
  was connected in this session, so visual rendering and interactive clicks were
  not verified. The complete guest data path and public assets were verified directly.
- No `org-setup.config.json`, self-registration configuration, data plan, or GraphQL
  schema/codegen scripts are present for this app. Follow the explicit project
  permission assignments instead. Self-registration remains disabled.

## Local run evidence and scoped data rollback

Run evidence is saved under `.sf/fifinder2-deployment/` (ignored by Git): the guest
verification result, sanitized deployment summary, before/after Account exports,
and a CSV containing only the 2,589 imported Account IDs. It contains no CLI tokens.

If the imported directory must be removed later, review the ID file first and use
this scoped command. It was **not executed** during deployment:

```bash
sf data delete bulk --sobject Account --file .sf/fifinder2-deployment/imported-account-ids.csv --target-org fifinder2 --wait 10 --json
```

This targets only the imported IDs and preserves the 14 pre-existing Accounts.
