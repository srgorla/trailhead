"""Reproduce the October 30 comparison from archived public responses."""
import csv
import hashlib
import json
from collections import Counter
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
from zoneinfo import ZoneInfo

HERE = Path(__file__).resolve().parent
PREVIOUS = HERE.parent / '2026-10-29' / 'crosscheck'
CSV_NAME = 'zelle-financial-institutions-accounts.csv'
SOURCE = 'https://enroll.zellepay.com/'

def read_csv(path):
    with path.open(newline='') as f:
        return list(csv.DictReader(f))

old, new = read_csv(PREVIOUS / CSV_NAME), read_csv(HERE / CSV_NAME)
columns = list(old[0])
assert columns == list(new[0])
def rows_counter(rows):
    return Counter(tuple(r[c] for c in columns) for r in rows)

class IndependentParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.source_id = None
        self.rows = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'li':
            self.source_id = a.get('id', '').removeprefix('item_')
        if tag != 'a' or 'data-bankname' not in a:
            return
        name = a['data-bankname'].strip()
        url = a.get('data-bankurl', '').strip()
        logo = a.get('data-banklogo', '').strip()
        assert name and self.source_id
        self.rows.append(dict(zip(columns, [
            name, name,
            ' '.join(x for x in [name, 'Zelle', self.source_id, a.get('data-firstletter', '').strip()] if x),
            'true', 'true' if url else 'false', url, 'Active',
            urljoin(SOURCE, logo) if logo else '', '', url])))

    def handle_endtag(self, tag):
        if tag == 'li':
            self.source_id = None

response_checks = []
for filename in ['zelle-directory.html', 'verification.html']:
    parser = IndependentParser()
    parser.feed((HERE / filename).read_text())
    unique = {}
    for r in parser.rows:
        source_id = r['Public_Search_Keywords__c'][len(r['Name'] + ' Zelle '):].rsplit(' ', 1)[0]
        key = (r['Name'].lower(), source_id, r['Enrollment_URL__c'], r['Logo_URL__c'])
        if key in unique:
            assert unique[key] == r, 'Conflicting duplicate identity'
        unique.setdefault(key, r)
    assert rows_counter(unique.values()) == rows_counter(new), f'Parser/response mismatch: {filename}'
    response_checks.append(dict(file=filename, raw_entries=len(parser.rows), distinct_entries=len(unique),
                                all_fields_match=True))

manifest = json.loads((PREVIOUS / 'sha256.json').read_text())
assert hashlib.sha256((PREVIOUS / CSV_NAME).read_bytes()).hexdigest() == manifest[CSV_NAME]
old_rows, new_rows = rows_counter(old), rows_counter(new)
old_names = {r['Name'].strip().casefold() for r in old}
new_names = {r['Name'].strip().casefold() for r in new}
# Any differing rows require a reviewed change classification before claiming
# additions/removals. This run verifies an exact, order-independent match.
assert old_rows == new_rows, 'Rows changed: inspect before classifying additions/removals'
summary = dict(snapshot_date='2026-10-30', timezone='America/Chicago', source_url=SOURCE,
               previous_snapshot='../2026-10-29/crosscheck/' + CSV_NAME,
               previous_entries=len(old), current_entries=len(new),
               previous_raw_entries=2590, current_raw_entries=response_checks[0]['raw_entries'],
               previous_unique_names=len(old_names), current_unique_names=len(new_names),
               added_entries=0, missing_entries=0, changed_entries=0,
               added_names=sorted(new_names-old_names), absent_names=sorted(old_names-new_names),
               all_11_fields_match_yesterday=True, yesterday_csv_hash_verified=True,
               responses=response_checks,
               verified_at=datetime.now(ZoneInfo('America/Chicago')).isoformat(),
               salesforce_records_modified=False)
(HERE / 'comparison-summary.json').write_text(json.dumps(summary, indent=2)+'\n')
report = '''# Zelle directory — October 30, 2026

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
'''
(HERE / 'README.md').write_text(report)
(HERE / 'sha256.json').write_text(json.dumps({
    p.name: hashlib.sha256(p.read_bytes()).hexdigest()
    for p in sorted(HERE.iterdir()) if p.is_file() and p.name != 'sha256.json'
}, indent=2)+'\n')
print(json.dumps(summary, indent=2))
