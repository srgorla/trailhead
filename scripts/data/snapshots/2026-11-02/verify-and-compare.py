"""Reproduce the November 2 comparison from archived public responses."""
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
PREVIOUS = HERE.parent / '2026-10-30'
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

checks = []
for filename in ['zelle-directory.html', 'verification.html']:
    parser = IndependentParser()
    parser.feed((HERE / filename).read_text())
    unique = {}
    for r in parser.rows:
        sid = r['Public_Search_Keywords__c'][len(r['Name'] + ' Zelle '):].rsplit(' ', 1)[0]
        key = (r['Name'].lower(), sid, r['Enrollment_URL__c'], r['Logo_URL__c'])
        if key in unique:
            assert unique[key] == r
        unique.setdefault(key, r)
    assert rows_counter(unique.values()) == rows_counter(new), filename
    checks.append(dict(response=filename, raw_entries=len(parser.rows),
                       distinct_entries=len(unique), all_fields_match=True))

manifest = json.loads((PREVIOUS / 'sha256.json').read_text())
assert hashlib.sha256((PREVIOUS / CSV_NAME).read_bytes()).hexdigest() == manifest[CSV_NAME]
# Preserve duplicate names. Match only an unambiguous name + source-ID pair;
# IDs are not globally unique and can change or be reused over time.
def identity(r):
    sid = r['Public_Search_Keywords__c'][len(r['Name'] + ' Zelle '):].rsplit(' ', 1)[0]
    return r['Name'].strip().casefold(), sid
a, b = {identity(r):r for r in old}, {identity(r):r for r in new}
assert len(a) == len(old) and len(b) == len(new), 'Ambiguous name/source ID; manual matching required'
added = [b[k] for k in sorted(b.keys()-a.keys())]
absent = [a[k] for k in sorted(a.keys()-b.keys())]
changes = [dict(Name=b[k]['Name'], SourceId=k[1], Field=f, Previous=a[k][f], Current=b[k][f])
           for k in sorted(a.keys() & b.keys()) for f in columns if a[k][f] != b[k][f]]
def write_csv(filename, rows, fields):
    with (HERE / filename).open('w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fields, lineterminator='\n')
        writer.writeheader()
        writer.writerows(rows)
write_csv('added-listings.csv', added, columns)
write_csv('absent-listings.csv', absent, columns)
write_csv('changed-fields.csv', changes, ['Name','SourceId','Field','Previous','Current'])
old_names = {r['Name'].strip().casefold() for r in old}
new_names = {r['Name'].strip().casefold() for r in new}
assert len(old)+len(added)-len(absent)==len(new)
# No source-ID or same-name matches for added/absent entries in this run;
# don't silently classify a same-ID rename or same-name ID change as new/removed.
assert all(identity(r)[1] not in {k[1] for k in b} and identity(r)[0] not in new_names for r in absent)
assert all(identity(r)[1] not in {k[1] for k in a} and identity(r)[0] not in old_names for r in added)
summary = dict(snapshot_date='2026-11-02', timezone='America/Chicago', source_url=SOURCE,
               previous_snapshot_date='2026-10-30', previous_entries=len(old), current_entries=len(new),
               previous_unique_names=len(old_names), current_unique_names=len(new_names),
               added_entries=len(added), absent_entries=len(absent),
               changed_entries=len({(r['Name'],r['SourceId']) for r in changes}),
               unchanged_entries=sum(a[k]==b[k] for k in a.keys() & b.keys()),
               added_names=[r['Name'] for r in added], absent_names=[r['Name'] for r in absent],
               net_change=len(new)-len(old), response_checks=checks, previous_csv_hash_verified=True,
               verified_at=datetime.now(ZoneInfo('America/Chicago')).isoformat(),
               salesforce_records_modified=False)
(HERE / 'comparison-summary.json').write_text(json.dumps(summary,indent=2)+'\n')
lines = ['# Zelle directory — November 2, 2026', '',
         'Comparison with the latest saved snapshot, **October 30, 2026**. No October 31 or November 1 snapshot is available; the change dates within that interval are unknown.', '',
         '| Measure | October 30 | November 2 |','|---|---:|---:|',
         f'| Distinct entries | {len(old):,} | {len(new):,} |',
         f'| Unique names | {len(old_names):,} | {len(new_names):,} |','',
         f'**{len(added)} added listing; {len(absent)} previously listed names absent; {summary["changed_entries"]} retained listings changed. Net change: {len(new)-len(old):+}.**','',
         '## Added listings','', *[f'- {r["Name"]} — {r["Enrollment_URL__c"]}' for r in added], '',
         '## Previously listed names absent from both fresh responses','',
         *[f'- {r["Name"]}' for r in absent], '',
         'Absence from the current directory is not confirmation that a bank closed or left Zelle. These entries have neither a same-name nor same-source-ID counterpart in the current snapshot. Renames, mergers, or source changes under different names/IDs remain possible. Do not automatically delete Salesforce Accounts on this evidence alone.', '',
         '## Verification','',
         'The primary request used a dated query string and `Cache-Control: no-cache`; the second used the standard public URL. Both returned HTTP 200 and identical listing data. An independent HTML parser checked all 11 CSV fields against both responses, preserving distinct same-name entries. The previous CSV hash was verified before comparison.', '',
         f'{summary["unchanged_entries"]:,} retained entries match all fields exactly. Matching uses case-insensitive name plus source ID, with uniqueness checks; source IDs alone are not globally unique. Row order does not affect the comparison.', '',
         'This audit compares directory field values, not logo image bytes, linked-bank website availability, or bank operational status. The status/visibility CSV values are import defaults. No Salesforce records were changed.', '',
         '## Files','',
         '- [Full CSV snapshot](zelle-financial-institutions-accounts.csv)',
         '- [Added listings](added-listings.csv)', '- [Absent listings](absent-listings.csv)',
         '- [Field changes](changed-fields.csv) (header only when none)',
         '- [Machine-readable comparison](comparison-summary.json)',
         '- [Primary HTML](zelle-directory.html) and [headers](response-headers.txt)',
         '- [Verification HTML](verification.html) and [headers](verification-headers.txt)',
         '- [Evidence hashes](sha256.json)', '', '## Reproduce from saved evidence', '',
         '```bash', 'python3 scripts/data/snapshots/2026-11-02/verify-and-compare.py', '```', '']
(HERE / 'README.md').write_text('\n'.join(lines))
(HERE / 'sha256.json').write_text(json.dumps({p.name:hashlib.sha256(p.read_bytes()).hexdigest()
    for p in sorted(HERE.iterdir()) if p.is_file() and p.name!='sha256.json'},indent=2)+'\n')
print(json.dumps(summary,indent=2))

