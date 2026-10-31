# Zelle directory — October 30, 2026

**No data changes from yesterday's final verified snapshot.**

| Measure | October 29 | October 30 |
|---|---:|---:|
| Distinct directory entries | 2,589 | 2,589 |
| Unique institution names | 2,580 | 2,580 |

- Added entries: **0**
- Missing entries: **0**
- Changed entries: **0**
- All 11 CSV fields match yesterday, including names, source keywords/IDs, enrollment URLs, and logo URLs.
- 1st Summit Bank remains present.

Comparison baseline: [October 29 full cross-check CSV](../2026-10-29/crosscheck/zelle-financial-institutions-accounts.csv),
not the superseded initial scrape or intermediate verification.

## Today's files

- [Full CSV snapshot](zelle-financial-institutions-accounts.csv)
- [Machine-readable comparison](comparison-summary.json)
- [Raw downloaded HTML](zelle-directory.html) and [HTTP headers](response-headers.txt)
- [Second response](verification.html) and [its headers](verification-headers.txt)
- [Evidence hashes](sha256.json)

The primary request used a dated query string and `Cache-Control: no-cache`; a second
request used the standard public URL, https://enroll.zellepay.com/. An independent
HTML parser verified every CSV field against both responses. Each response contains
2,589 raw entries and 2,589 distinct entries. Yesterday's raw page had 2,590 entries,
including an identical repeated Lead Bank entry; that redundant duplicate is absent
today. No distinct listing was removed. Distinct same-name entries are preserved.
Yesterday's CSV hash was verified before comparison. Row
order is ignored; duplicate row multiplicity and all field values are compared.

This compares directory listing data, not logo image bytes or the operational status
of linked bank websites. CSV status/visibility fields remain the scraper's import
defaults. No Salesforce records were changed.

## Reproduce from saved evidence

```bash
python3 scripts/data/snapshots/2026-10-30/verify-and-compare.py
```
