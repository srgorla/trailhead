# Zelle directory snapshot comparison — October 29, 2026

**Full cross-check:** see [the authoritative cross-check report](zelle-crosscheck-2026-10-29.md) for 2,580 unique names / 2,589 distinct entries and the scraper correction. This report preserves the earlier response.

**Superseded directory counts:** a subsequent fetch includes 1st Summit Bank and two additional listings. See the [verification and correction](zelle-snapshot-verification-2026-10-29.md): 2,580 listings, 65 added names, 34 removed names, net +31 versus August. The figures below describe the earlier saved response only.

## Scope and evidence

Read-only audit of Salesforce org `react-enroll-zelle` and the public Zelle institution directory. No Salesforce Accounts were inserted, updated, or deleted.

- Source: https://enroll.zellepay.com/ (HTTP 200). This is the URL used by the existing scraper; the requested `enroll.zelle.com` was interpreted as this directory.
- Previous evidence: repository CSV committed as `b9d9f76` on August 23, 2026 (06:17:55 -05:00). The original scrape time was not recorded; the commit establishes its provenance.
- Current evidence: archived source HTML, parsed CSV, and complete Salesforce Account query response in [snapshots/2026-10-29](snapshots/2026-10-29/). Audit date uses America/Chicago. Exact download time was not separately recorded.

## Salesforce Accounts by creation date

| Created date (UTC) |  Accounts |
| ------------------ | --------: |
| 2026-08-23         |     2,549 |
| 2026-04-23         |        14 |
| **Total**          | **2,563** |

```sql
SELECT DAY_ONLY(CreatedDate) createdDate, COUNT(Id) accountCount
FROM Account
GROUP BY DAY_ONLY(CreatedDate)
ORDER BY DAY_ONLY(CreatedDate) DESC
```

All 2,549 previous directory names are present in the org (0 missing). The 14 additional org Accounts were created on April 23 and are outside the previous directory snapshot. They are excluded from directory removal counts.

## Directory changes

| Measure           | Count |
| ----------------- | ----: |
| Previous listings | 2,549 |
| Latest listings   | 2,577 |
| Names added       |    63 |
| Names removed     |    35 |
| Net increase      |   +28 |
| Names retained    | 2,514 |

Matching uses institution Name, trimmed and case-insensitive, consistent with the existing scraper’s name-based deduplication. These are listing/name changes, not verified bank openings, closures, or removals from the Zelle network. A rename can appear in both lists.

There are 7 possible rename pairs sharing a source ID among removed and added names. Review [possible-renames.csv](snapshots/2026-10-29/possible-renames.csv) before deciding which Accounts to create or retire. Source IDs are not treated as permanent institution identifiers: some change for retained names and the current directory contains a duplicate ID (`2FB`). Shared source IDs can also reflect mergers or reused entries.

## Changes to retained names

2,514 of the 2,514 retained names have at least one field difference.

| Field                       | Listings changed |
| --------------------------- | ---------------: |
| `Enrollment_URL__c`         |               25 |
| `Logo_URL__c`               |            2,514 |
| `Name`                      |                6 |
| `Public_Display_Name__c`    |                6 |
| `Public_Search_Keywords__c` |               19 |
| `Website`                   |               25 |

Logo URLs changed from `/logos/zellepay/...` to `/sites/default/files/logos/zellepay/...` (for example, 1NB Bank). This records URL changes only; logo image bytes were not compared. Enrollment URL and Website counts overlap because both fields contain the same source URL. Six retained names have capitalization/text-case changes.

## Review files

- [Added listings](snapshots/2026-10-29/added-listings.csv)
- [Removed listings](snapshots/2026-10-29/removed-listings.csv)
- [Possible renames](snapshots/2026-10-29/possible-renames.csv)
- [All field differences](snapshots/2026-10-29/changed-fields.csv)
- [Other org Accounts](snapshots/2026-10-29/org-accounts-outside-previous-snapshot.csv)
- [Machine-readable summary](snapshots/2026-10-29/comparison-summary.json)
- [Evidence hashes](snapshots/2026-10-29/sha256.json)

## Reproduce from saved evidence

```bash
node scripts/data/scrape-zelle-institutions.mjs scripts/data/snapshots/2026-10-29/zelle-directory.html scripts/data/snapshots/2026-10-29/zelle-financial-institutions-accounts.csv --dedupe-by-name
python3 scripts/data/compare-zelle-snapshots.py
```

The complete org export uses: `SELECT Id, Name, CreatedDate, Public_Display_Name__c, Publicly_Listed__c, Enrollment_URL__c, Institution_Status__c, Logo_URL__c, Website FROM Account ORDER BY CreatedDate, Id`.

Before synchronizing the org, review possible renames and all removed listings. This audit does not establish historical Account deletions: there is no previous org export with record IDs or deleted-record history to compare. It does establish that all names in the saved previous directory are still present in the current org.
