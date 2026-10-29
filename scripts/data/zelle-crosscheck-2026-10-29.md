# Zelle directory full cross-check — October 29, 2026

This report supersedes the directory conclusions in the earlier October 29 audit and the intermediate 1st Summit Bank verification. All saved source responses remain available. No Salesforce records were created, updated, or deleted.

## Verified results

| Measure                                                         | Verified result |
| --------------------------------------------------------------- | --------------: |
| August baseline unique names                                    |           2,549 |
| Current unique names                                            |           2,580 |
| Current distinct source entries                                 |           2,589 |
| Names present in current directory but absent from baseline     |              65 |
| Baseline names absent from current directory                    |              34 |
| Net increase in unique names                                    |             +31 |
| Baseline names retained                                         |           2,515 |
| Current Salesforce Accounts                                     |           2,563 |
| Salesforce Accounts created August 23, 2026 (UTC)               |           2,549 |
| Salesforce Accounts created April 23, 2026 (UTC)                |              14 |
| Account IDs added / removed since the earlier October 29 export |           0 / 0 |

**1st Summit Bank is retained**, matching the previous `1ST SUMMIT BANK` case-insensitively. Its source ID changed from `36I` to `JSV`, and its enrollment URL changed. It is excluded from the 34 absent names.

The 65 / 34 figures are name-set differences, not verified counts of new financial institutions or institutions leaving Zelle. Renames, mergers, and source variations can affect them. Every added and absent name has a review row; candidate matching is not a verified rename. No Account deletion or automatic import is justified by these files alone.

## What was cross-checked

- August baseline is byte-for-byte identical to commit b9d9f76 and the preserved original CSV.
- All original audit and follow-up verification evidence hashes are intact.
- All fields of all 2,589 output rows match an independent HTML parser.
- Standard, cache-bypassed, and browser-user-agent responses contain identical listing data.
- All unique-name additions/removals reconcile; 1st Summit Bank is retained.
- Earlier 2,577-name and follow-up 2,580-name CSVs match their archived HTML under the previous deduplication rule.
- Complete fresh org export matches every selected field and Account ID in the earlier export.
- All 2,549 baseline names remain in the org; date counts reconcile to 2,563 Accounts.

The live checks used https://enroll.zellepay.com/ at HTTP response times 16:11:16–16:11:49 UTC (11:11:16–11:11:49 AM America/Chicago), October 29. The standard and browser-user-agent responses report cache HIT; the no-cache request with a unique query string reports cache MISS and a current Last-Modified time. All three contain identical parsed field values, including the Summit listing. Headers and complete HTML are archived. This is strong cross-response agreement, not a guarantee that future responses cannot change.

## Scraper correction and counting limits

The old scraper kept only the first occurrence of each case-insensitive name. That discarded distinct listings. The corrected scraper keys by name, source ID, enrollment URL, and logo URL, collapsing only identical directory-entry identities. An independent HTML parser compared every output field, not just names, across all three responses.

There are 2,590 raw entries. One repeated Lead Bank entry is identical. The remaining 2,589 distinct entries have 2,580 unique names: nine names have two distinct entries each. Those are Cornerstone Bank, Farmers State Bank, First Federal Savings Bank, Hometown Bank, Jefferson Bank, Midwest Bank, Polam Federal Credit Union, The Savings Bank, and Woodlands Bank. Distinct entries do not necessarily imply distinct legal institutions; Woodlands Bank, for example, has two IDs and URLs at the same bank domain.

The source ID `2FB` is also shared by CorePlus Federal Credit Union and Waypoint Credit Union. Names and source IDs must not be used alone as unique institution identifiers. The CSV’s `Publicly_Listed__c=true` and `Institution_Status__c=Active` are import defaults, not independently verified bank status; `Supports_Enrollment__c` only indicates a non-empty enrollment URL. The audit compares URL strings and does not certify every bank URL works or compare logo image bytes.

The August baseline has 2,549 unique names and no preserved raw HTML. Therefore it is not possible to recover same-name entries discarded in August or to compute an apples-to-apples distinct-entry increase. **Do not describe 2,589 - 2,549 = 40 as 40 new institutions.** The comparable net figure is +31 unique names.

The initial 2,577-name response genuinely lacks three names present in subsequent responses: 1st Summit Bank, First Commerce Bank - NJ, and First Community Credit Union. The parser did not omit those names from the earlier HTML. The exact cause of that response difference remains unconfirmed. The earlier 63 / 35 figures describe that response only.

## Review of every absent baseline name

All 34 names below are absent from every fresh response, using trimmed case-insensitive name matching. The candidate column includes source-ID, exact-URL, or same-hostname matches. It does not assert these are the same institution; source-ID-only reuse can be misleading (for example, First Southern Bank and Community First CU of Florida). Fuzzy-name suggestions are available separately in the complete CSV review.

| Baseline name absent from fresh responses | Current candidates for manual review                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Adirondack RFCU                           | Adirondack Regional Federal CU (same enrollment hostname)                                                                                  |
| American Bank                             | No ID/URL/hostname candidate                                                                                                               |
| bankHometown                              | No ID/URL/hostname candidate                                                                                                               |
| Boston Firefighters CU                    | First Responders Credit Union (same source ID (IDs can be reused))                                                                         |
| CBTX Zelle                                | No ID/URL/hostname candidate                                                                                                               |
| Christian Community CU                    | No ID/URL/hostname candidate                                                                                                               |
| Comerica Bank                             | No ID/URL/hostname candidate                                                                                                               |
| Community State Bank                      | Community State Bank (CSB) (same enrollment hostname, name similarity 0.87)                                                                |
| CorTrust Bank                             | CorTrust Bank, NA (same enrollment hostname, name similarity 0.87)                                                                         |
| Country Club Bank, div of FNBO            | No ID/URL/hostname candidate                                                                                                               |
| Dime Community Bank                       | Dime Commercial Bank (same source ID (IDs can be reused), same enrollment hostname); Dime Commercial Bank - SMB (same enrollment hostname) |
| Farmers Savings Bank WI                   | Farmers Savings Div of CMG (same source ID (IDs can be reused), same enrollment hostname)                                                  |
| Field & Main Bank, INC                    | No ID/URL/hostname candidate                                                                                                               |
| First Commerce Bank                       | First Commerce Bank - NJ (same enrollment hostname, name similarity 0.88)                                                                  |
| First Foundation Bank                     | No ID/URL/hostname candidate                                                                                                               |
| First Southern Bank                       | Community First CU of Florida (same source ID (IDs can be reused))                                                                         |
| Flushing Bank                             | No ID/URL/hostname candidate                                                                                                               |
| Gateway Metro Federal CU                  | No ID/URL/hostname candidate                                                                                                               |
| Georgia Community Bank                    | No ID/URL/hostname candidate                                                                                                               |
| Hancock Federal Credit Union              | No ID/URL/hostname candidate                                                                                                               |
| iGObanking                                | No ID/URL/hostname candidate                                                                                                               |
| Iroquois Federal Savings                  | No ID/URL/hostname candidate                                                                                                               |
| Legacy National Bank                      | Legacy Bank (same source ID (IDs can be reused), same enrollment hostname)                                                                 |
| Madison County Bank                       | No ID/URL/hostname candidate                                                                                                               |
| Mid Oregon FCU                            | Mid Oregon CU (same source ID (IDs can be reused), same enrollment URL, same enrollment hostname, name similarity 0.96)                    |
| National Bank of Coxsackie                | No ID/URL/hostname candidate                                                                                                               |
| Pacific West Bank                         | No ID/URL/hostname candidate                                                                                                               |
| Peoples Bank of Altenburg                 | No ID/URL/hostname candidate                                                                                                               |
| SaviBank                                  | No ID/URL/hostname candidate                                                                                                               |
| Solutions First Credit Union              | No ID/URL/hostname candidate                                                                                                               |
| South Metro Federal CU                    | NorthWinds FCU (same source ID (IDs can be reused))                                                                                        |
| SpiritBank                                | No ID/URL/hostname candidate                                                                                                               |
| Ukrainian Selfreliance FCU                | No ID/URL/hostname candidate                                                                                                               |
| WESTconsin Credit Union                   | No ID/URL/hostname candidate                                                                                                               |

## Changes to retained baseline listings

Match a retained name to its previous source ID when available; otherwise match its sole current listing. This handles duplicate-name order changes that could otherwise produce false field changes. All 2,549 baseline names have a row in the baseline review CSV.

| Field                       | Matched baseline listings changed |
| --------------------------- | --------------------------------: |
| `Enrollment_URL__c`         |                                18 |
| `Logo_URL__c`               |                              2515 |
| `Name`                      |                                 1 |
| `Public_Display_Name__c`    |                                 1 |
| `Public_Search_Keywords__c` |                                12 |
| `Website`                   |                                18 |

These counts overlap across fields. Logo URL differences include the source path migration to `/sites/default/files/logos/`. Name and Public_Display_Name changes are case-sensitive field comparisons; identity comparison is case-insensitive. Earlier counts used the first same-name entry and an earlier response, so they are historical, not the current update plan.

## Files and reproduction

- [Full corrected snapshot: 2,589 distinct entries](snapshots/2026-10-29/crosscheck/zelle-financial-institutions-accounts.csv)
- [Every baseline listing reviewed](snapshots/2026-10-29/crosscheck/every-baseline-listing-review.csv)
- [Every added and absent name reviewed](snapshots/2026-10-29/crosscheck/all-added-and-absent-name-review.csv)
- [Added-name listings](snapshots/2026-10-29/crosscheck/added-name-listings.csv)
- [Absent-name listings](snapshots/2026-10-29/crosscheck/absent-name-listings.csv)
- [Same-name distinct entries](snapshots/2026-10-29/crosscheck/same-name-distinct-listings.csv)
- [Retained listing field changes](snapshots/2026-10-29/crosscheck/retained-listing-field-changes.csv)
- [Summary and completed checks](snapshots/2026-10-29/crosscheck/summary.json)
- [Evidence hashes](snapshots/2026-10-29/crosscheck/sha256.json)

```bash
node scripts/data/scrape-zelle-institutions.mjs scripts/data/snapshots/2026-10-29/crosscheck/standard.html scripts/data/snapshots/2026-10-29/crosscheck/zelle-financial-institutions-accounts.csv
python3 scripts/data/crosscheck-zelle-snapshots.py
```

For historical reproduction only, add `--dedupe-by-name` to the scraper invocation to reproduce the previous name-only behavior. Do not overwrite original evidence with corrected output. Historical Account deletions before the first saved org export remain unverified.
