# Zelle directory verification — October 29, 2026

**Superseded by the [full cross-check](zelle-crosscheck-2026-10-29.md):** the 2,580 count below is unique names. The corrected scraper preserves 2,589 distinct entries, including same-name listings. This report preserves the intermediate verification response.

## Correction: 1ST SUMMIT BANK is currently listed

A fresh request to https://enroll.zellepay.com/ confirms **1st Summit Bank** is present. It must not be treated as removed based on the earlier audit.

| Evidence                    | Name            | Source ID | Enrollment URL                                                                     |
| --------------------------- | --------------- | --------- | ---------------------------------------------------------------------------------- |
| August baseline             | 1ST SUMMIT BANK | 36I       | https://www.1stsummit.bank/home/zelle/                                             |
| Earlier October 29 response | Absent          | Absent    | Absent                                                                             |
| Verification response       | 1st Summit Bank | JSV       | https://www.1stsummit.bank/home/personal/ebanking/digital-payments/zelle-payments/ |

The earlier archived HTML contains neither its name, previous source ID, nor bank domain. The new response includes it under a new ID. This is a difference between the fetched source responses, rather than an entry present in the earlier HTML that the parser skipped. The cause is unconfirmed: a site update or differing cached responses could explain it. The original removed-listings file remains evidence of that earlier response, not the current removal list.

## Updated comparison with August baseline

| Measure                           | Earlier October 29 fetch | Verification fetch |
| --------------------------------- | -----------------------: | -----------------: |
| Listings                          |                    2,577 |              2,580 |
| Added names versus 2,549 baseline |                       63 |                 65 |
| Removed names versus baseline     |                       35 |                 34 |
| Net increase                      |                       28 |                 31 |

Name matching is trimmed and case-insensitive, so `1ST SUMMIT BANK` and `1st Summit Bank` match. Added and removed names still require rename/merger review; absence from one response does not establish an institution's departure from Zelle.

Three listings appeared between the two October 29 responses; none disappeared:

- 1st Summit Bank
- First Commerce Bank - NJ
- First Community Credit Union

The Salesforce Account counts remain those from the earlier read-only query: 2,563 total, comprising 2,549 created August 23 and 14 created April 23. No Accounts were changed, and this verification did not re-query the org.

## Saved verification evidence

- [Raw response](snapshots/2026-10-29/verification/zelle-directory.html)
- [Full parsed snapshot](snapshots/2026-10-29/verification/zelle-financial-institutions-accounts.csv)
- [Updated added names](snapshots/2026-10-29/verification/added-listings.csv)
- [Updated removed names](snapshots/2026-10-29/verification/removed-listings.csv)
- [Machine-readable comparison and Summit fields](snapshots/2026-10-29/verification/summary.json)
- [Evidence hashes](snapshots/2026-10-29/verification/sha256.json)

Verification used the existing scraper against a separately archived live response. Counts reconcile: 2,549 + 65 - 34 = 2,580. The original response and its hashes were preserved. Exact fetch time was not separately recorded.
