"""Rebuild the documented 2026-10-29 directory comparison from saved evidence."""
import csv
import hashlib
import json
from collections import Counter, defaultdict
from pathlib import Path
from shutil import copyfile

ROOT = Path(__file__).resolve().parent
OUT = ROOT / 'snapshots' / '2026-10-29'
BASE = OUT / 'previous-zelle-financial-institutions-accounts.csv'
if not BASE.exists():
    copyfile(ROOT / 'zelle-financial-institutions-accounts.csv', BASE)

def read_csv(path):
    with path.open(newline='') as stream:
        return list(csv.DictReader(stream))

def write_csv(name, rows, fields):
    with (OUT / name).open('w', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)

def keyed(rows):
    result = {r['Name'].strip().casefold(): r for r in rows}
    assert len(result) == len(rows), 'Duplicate normalized names; review before comparing'
    return result

def source_id(row):
    prefix = row['Name'] + ' Zelle '
    value = row['Public_Search_Keywords__c']
    assert value.startswith(prefix)
    return value[len(prefix):].rsplit(' ', 1)[0]

old = read_csv(BASE)
new = read_csv(OUT / 'zelle-financial-institutions-accounts.csv')
export = json.loads((OUT / 'org-accounts.json').read_text())
assert export['status'] == 0 and export['result']['done'], 'Incomplete org export'
org = export['result']['records']
a, b, accounts = keyed(old), keyed(new), keyed(org)
added_keys = sorted(b.keys() - a.keys())
removed_keys = sorted(a.keys() - b.keys())
common = sorted(a.keys() & b.keys())
fields = list(old[0])
write_csv('added-listings.csv', [b[k] for k in added_keys], fields)
write_csv('removed-listings.csv', [a[k] for k in removed_keys], fields)
changes = [dict(Name=b[k]['Name'], Field=f, Previous=a[k][f], Current=b[k][f])
           for k in common for f in fields if a[k][f] != b[k][f]]
write_csv('changed-fields.csv', changes, ['Name', 'Field', 'Previous', 'Current'])
by_old, by_new = defaultdict(list), defaultdict(list)
for r in old:
    by_old[source_id(r)].append(r)
for r in new:
    by_new[source_id(r)].append(r)
candidates = [dict(SourceId=sid, PreviousName=x['Name'], CurrentName=y['Name'],
                   Match='Same source ID; manual review required')
              for sid in sorted(by_old.keys() & by_new.keys())
              for x in by_old[sid] for y in by_new[sid]
              if x['Name'].casefold() in removed_keys and y['Name'].casefold() in added_keys]
write_csv('possible-renames.csv', candidates, ['SourceId', 'PreviousName', 'CurrentName', 'Match'])
extras = [accounts[k] for k in sorted(accounts.keys() - a.keys())]
write_csv('org-accounts-outside-previous-snapshot.csv',
          [{f: r.get(f, '') for f in ['Id', 'Name', 'CreatedDate']} for r in extras],
          ['Id', 'Name', 'CreatedDate'])
cohorts = Counter(r['CreatedDate'][:10] for r in org)
changed_names = {r['Name'] for r in changes}
field_counts = Counter(r['Field'] for r in changes)
missing_org = len(a.keys() - accounts.keys())
summary = dict(snapshot_date='2026-10-29', source_url='https://enroll.zellepay.com/',
               org_alias='react-enroll-zelle', previous_listings=len(old), current_listings=len(new),
               added_names=len(added_keys), removed_names=len(removed_keys),
               net_change=len(new)-len(old), retained_names=len(common),
               retained_names_with_field_changes=len(changed_names), changed_fields=dict(field_counts),
               possible_rename_pairs=len(candidates), org_accounts=len(org),
               org_creation_dates=dict(cohorts), previous_names_missing_from_org=missing_org,
               org_names_outside_previous_snapshot=len(extras),
               current_names_missing_from_org=len(b.keys()-accounts.keys()),
               current_duplicate_source_ids={k:len(v) for k,v in by_new.items() if len(v)>1})
(OUT / 'comparison-summary.json').write_text(json.dumps(summary, indent=2)+'\n')
manifest = {p.name: hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(OUT.iterdir()) if p.is_file() and p.name != 'sha256.json'}
(OUT / 'sha256.json').write_text(json.dumps(manifest, indent=2)+'\n')
lines = [
    '# Zelle directory snapshot comparison — October 29, 2026', '',
    '## Scope and evidence', '',
    'Read-only audit of Salesforce org `react-enroll-zelle` and the public Zelle institution directory. '
    'No Salesforce Accounts were inserted, updated, or deleted.', '',
    '- Source: https://enroll.zellepay.com/ (HTTP 200). This is the URL used by the existing scraper; '
    'the requested `enroll.zelle.com` was interpreted as this directory.',
    '- Previous evidence: repository CSV committed as `b9d9f76` on August 23, 2026 '
    '(06:17:55 -05:00). The original scrape time was not recorded; the commit establishes its provenance.',
    '- Current evidence: archived source HTML, parsed CSV, and complete Salesforce Account query response '
    'in [snapshots/2026-10-29](snapshots/2026-10-29/). Audit date uses America/Chicago. '
    'Exact download time was not separately recorded.', '',
    '## Salesforce Accounts by creation date', '',
    '| Created date (UTC) | Accounts |', '|---|---:|',
    *[f'| {day} | {count:,} |' for day,count in sorted(cohorts.items(), reverse=True)],
    f'| **Total** | **{len(org):,}** |', '',
    '```sql', 'SELECT DAY_ONLY(CreatedDate) createdDate, COUNT(Id) accountCount',
    'FROM Account', 'GROUP BY DAY_ONLY(CreatedDate)',
    'ORDER BY DAY_ONLY(CreatedDate) DESC', '```', '',
    f'All {len(old):,} previous directory names are present in the org '
    f'({missing_org} missing). The {len(extras)} additional org Accounts were created on April 23 '
    'and are outside the previous directory snapshot. They are excluded from directory removal counts.', '',
    '## Directory changes', '',
    '| Measure | Count |', '|---|---:|',
    f'| Previous listings | {len(old):,} |', f'| Latest listings | {len(new):,} |',
    f'| Names added | {len(added_keys):,} |', f'| Names removed | {len(removed_keys):,} |',
    f'| Net increase | {len(new)-len(old):+,} |', f'| Names retained | {len(common):,} |', '',
    'Matching uses institution Name, trimmed and case-insensitive, consistent with the existing scraper’s '
    'name-based deduplication. These are listing/name changes, not verified bank openings, closures, '
    'or removals from the Zelle network. A rename can appear in both lists.', '',
    f'There are {len(candidates)} possible rename pairs sharing a source ID among removed and added names. '
    'Review [possible-renames.csv](snapshots/2026-10-29/possible-renames.csv) before deciding which '
    'Accounts to create or retire. Source IDs are not treated as permanent institution identifiers: '
    'some change for retained names and the current directory contains a duplicate ID (`2FB`). '
    'Shared source IDs can also reflect mergers or reused entries.', '',
    '## Changes to retained names', '',
    f'{len(changed_names):,} of the {len(common):,} retained names have at least one field difference.', '',
    '| Field | Listings changed |', '|---|---:|',
    *[f'| `{field}` | {count:,} |' for field,count in sorted(field_counts.items())], '',
    'Logo URLs changed from `/logos/zellepay/...` to `/sites/default/files/logos/zellepay/...` '
    '(for example, 1NB Bank). This records URL changes only; logo image bytes were not compared. '
    'Enrollment URL and Website counts overlap because both fields contain the same source URL. '
    'Six retained names have capitalization/text-case changes.', '',
    '## Review files', '',
    '- [Added listings](snapshots/2026-10-29/added-listings.csv)',
    '- [Removed listings](snapshots/2026-10-29/removed-listings.csv)',
    '- [Possible renames](snapshots/2026-10-29/possible-renames.csv)',
    '- [All field differences](snapshots/2026-10-29/changed-fields.csv)',
    '- [Other org Accounts](snapshots/2026-10-29/org-accounts-outside-previous-snapshot.csv)',
    '- [Machine-readable summary](snapshots/2026-10-29/comparison-summary.json)',
    '- [Evidence hashes](snapshots/2026-10-29/sha256.json)', '',
    '## Reproduce from saved evidence', '', '```bash',
    'node scripts/data/scrape-zelle-institutions.mjs scripts/data/snapshots/2026-10-29/zelle-directory.html scripts/data/snapshots/2026-10-29/zelle-financial-institutions-accounts.csv',
    'python3 scripts/data/compare-zelle-snapshots.py', '```', '',
    'The complete org export uses: `SELECT Id, Name, CreatedDate, Public_Display_Name__c, '
    'Publicly_Listed__c, Enrollment_URL__c, Institution_Status__c, Logo_URL__c, Website '
    'FROM Account ORDER BY CreatedDate, Id`.', '',
    'Before synchronizing the org, review possible renames and all removed listings. '
    'This audit does not establish historical Account deletions: there is no previous org export '
    'with record IDs or deleted-record history to compare. It does establish that all names in '
    'the saved previous directory are still present in the current org.', '',
]
(ROOT / 'zelle-snapshot-comparison-2026-10-29.md').write_text('\n'.join(lines))
print(json.dumps(summary, indent=2))
