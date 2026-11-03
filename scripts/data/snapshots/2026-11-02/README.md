# Zelle directory — November 2, 2026

Comparison with the latest saved snapshot, **October 30, 2026**. No October 31 or November 1 snapshot is available; the change dates within that interval are unknown.

| Measure | October 30 | November 2 |
|---|---:|---:|
| Distinct entries | 2,589 | 2,585 |
| Unique names | 2,580 | 2,576 |

**1 added listing; 5 previously listed names absent; 0 retained listings changed. Net change: -4.**

## Added listings

- Morton Community Bank — https://hometownbanks.com/zelle

## Previously listed names absent from both fresh responses

- AdelFi Credit Union
- Dogwood State Bank
- First Bank of Manhattan
- TelComm Credit Union
- Winston-Salem FCU

Absence from the current directory is not confirmation that a bank closed or left Zelle. These entries have neither a same-name nor same-source-ID counterpart in the current snapshot. Renames, mergers, or source changes under different names/IDs remain possible. Do not automatically delete Salesforce Accounts on this evidence alone.

## Verification

The primary request used a dated query string and `Cache-Control: no-cache`; the second used the standard public URL. Both returned HTTP 200 and identical listing data. An independent HTML parser checked all 11 CSV fields against both responses, preserving distinct same-name entries. The previous CSV hash was verified before comparison.

2,584 retained entries match all fields exactly. Matching uses case-insensitive name plus source ID, with uniqueness checks; source IDs alone are not globally unique. Row order does not affect the comparison.

This audit compares directory field values, not logo image bytes, linked-bank website availability, or bank operational status. The status/visibility CSV values are import defaults. No Salesforce records were changed.

## Files

- [Full CSV snapshot](zelle-financial-institutions-accounts.csv)
- [Added listings](added-listings.csv)
- [Absent listings](absent-listings.csv)
- [Field changes](changed-fields.csv) (header only when none)
- [Machine-readable comparison](comparison-summary.json)
- [Primary HTML](zelle-directory.html) and [headers](response-headers.txt)
- [Verification HTML](verification.html) and [headers](verification-headers.txt)
- [Evidence hashes](sha256.json)

## Reproduce from saved evidence

```bash
python3 scripts/data/snapshots/2026-11-02/verify-and-compare.py
```
