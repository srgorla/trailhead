"""Validate saved directory responses independently and rebuild the full audit."""
import csv
import hashlib
import json
import subprocess
from collections import Counter, defaultdict
from difflib import SequenceMatcher
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parent
DAY = ROOT / 'snapshots' / '2026-10-29'
OUT = DAY / 'crosscheck'
SOURCE = 'https://enroll.zellepay.com/'
COLUMNS = ['Name', 'Public_Display_Name__c', 'Public_Search_Keywords__c',
           'Publicly_Listed__c', 'Supports_Enrollment__c', 'Enrollment_URL__c',
           'Institution_Status__c', 'Logo_URL__c', 'Logo_ContentVersionId__c', 'Website']

def read_csv(path):
    with path.open(newline='') as f:
        return list(csv.DictReader(f))

def write_csv(name, rows, fields):
    with (OUT / name).open('w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fields, lineterminator='\n')
        writer.writeheader()
        writer.writerows(rows)

def norm(name):
    return name.strip().casefold()

def source_id(row):
    return row['Public_Search_Keywords__c'][len(row['Name'] + ' Zelle '):].rsplit(' ', 1)[0]

def host(row):
    return (urlparse(row['Enrollment_URL__c']).hostname or '').removeprefix('www.')

class IndependentParser(HTMLParser):
    """Use HTML tokenization rather than the production regular expression."""
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
        enrollment = a.get('data-bankurl', '').strip()
        logo = a.get('data-banklogo', '').strip()
        assert name and self.source_id, 'Missing name or source ID'
        self.rows.append(dict(zip(COLUMNS, [
            name, name, ' '.join(x for x in [name, 'Zelle', self.source_id,
                                           a.get('data-firstletter', '').strip()] if x),
            'true', 'true' if enrollment else 'false', enrollment, 'Active',
            urljoin(SOURCE, logo) if logo else '', '', enrollment])))

    def handle_endtag(self, tag):
        if tag == 'li':
            self.source_id = None

def identity(row):
    return (norm(row['Name']), source_id(row), row['Enrollment_URL__c'], row['Logo_URL__c'])

def parse(path):
    parser = IndependentParser()
    parser.feed(path.read_text())
    unique = {}
    for row in parser.rows:
        key = identity(row)
        if key in unique:
            assert row == unique[key], 'Conflicting duplicate listing'
        unique.setdefault(key, row)
    return parser.rows, list(unique.values())

def row_set(rows):
    return {tuple(r[c] for c in COLUMNS) for r in rows}

checks = []
def passed(label):
    checks.append(label)

baseline = read_csv(DAY / 'previous-zelle-financial-institutions-accounts.csv')
repo = ROOT.parent.parent
committed_baseline = subprocess.check_output(
    ['git', 'show', 'b9d9f76:scripts/data/zelle-financial-institutions-accounts.csv'], cwd=repo)
assert committed_baseline == (DAY / 'previous-zelle-financial-institutions-accounts.csv').read_bytes()
assert committed_baseline == (ROOT / 'zelle-financial-institutions-accounts.csv').read_bytes()
passed('August baseline is byte-for-byte identical to commit b9d9f76 and the preserved original CSV')
for folder in [DAY, DAY / 'verification']:
    for filename, digest in json.loads((folder / 'sha256.json').read_text()).items():
        assert hashlib.sha256((folder / filename).read_bytes()).hexdigest() == digest
passed('All original audit and follow-up verification evidence hashes are intact')

production = read_csv(OUT / 'zelle-financial-institutions-accounts.csv')
response_stats = []
for filename in ['standard.html', 'nocache.html', 'browser-user-agent.html']:
    raw, unique = parse(OUT / filename)
    assert row_set(unique) == row_set(production), f'Response or parser mismatch: {filename}'
    assert len(unique) == len(production)
    response_stats.append(dict(response=filename, raw_entries=len(raw), distinct_entries=len(unique),
                               unique_names=len({norm(r['Name']) for r in unique})))
passed('All fields of all 2,589 output rows match an independent HTML parser')
passed('Standard, cache-bypassed, and browser-user-agent responses contain identical listing data')
raw, current = parse(OUT / 'standard.html')
old_by_name = {norm(r['Name']): r for r in baseline}
new_by_name = defaultdict(list)
for r in current:
    new_by_name[norm(r['Name'])].append(r)
assert len(old_by_name) == len(baseline)
old_names, new_names = set(old_by_name), set(new_by_name)
added_names, absent_names = new_names - old_names, old_names - new_names
assert len(old_names) + len(added_names) - len(absent_names) == len(new_names)
assert '1st summit bank' in new_names and '1st summit bank' not in absent_names
passed('All unique-name additions/removals reconcile; 1st Summit Bank is retained')

# Recheck earlier CSVs using first-by-name behavior of the old scraper.
for folder, html_name in [(DAY, 'zelle-directory.html'), (DAY / 'verification', 'zelle-directory.html')]:
    _, independent = parse(folder / html_name)
    first = {}
    for r in independent:
        first.setdefault(norm(r['Name']), r)
    assert row_set(first.values()) == row_set(read_csv(folder / 'zelle-financial-institutions-accounts.csv'))
passed('Earlier 2,577-name and follow-up 2,580-name CSVs match their archived HTML under the previous deduplication rule')

org_export = json.loads((OUT / 'org-accounts.json').read_text())
assert org_export['status'] == 0 and org_export['result']['done']
org = org_export['result']['records']
previous_org = json.loads((DAY / 'org-accounts.json').read_text())['result']['records']
org_by_id = {r['Id']: r for r in org}
previous_by_id = {r['Id']: r for r in previous_org}
assert len(org_by_id) == len(org)
assert org_by_id == previous_by_id, 'Org data changed since earlier export; review'
org_names = {norm(r['Name']) for r in org}
assert old_names <= org_names
cohorts = Counter(r['CreatedDate'][:10] for r in org)
assert sum(cohorts.values()) == len(org)
passed('Complete fresh org export matches every selected field and Account ID in the earlier export')
passed('All 2,549 baseline names remain in the org; date counts reconcile to 2,563 Accounts')

write_csv('added-name-listings.csv', [r for r in current if norm(r['Name']) in added_names], COLUMNS)
write_csv('absent-name-listings.csv', [old_by_name[k] for k in sorted(absent_names)], COLUMNS)
duplicates = [dict(Name=r['Name'], SourceId=source_id(r), EnrollmentURL=r['Enrollment_URL__c'],
                   LogoURL=r['Logo_URL__c'])
              for key in sorted(new_by_name) if len(new_by_name[key]) > 1 for r in new_by_name[key]]
write_csv('same-name-distinct-listings.csv', duplicates, ['Name', 'SourceId', 'EnrollmentURL', 'LogoURL'])

# Every absent name and every added name gets a reproducible candidate review.
# Candidate similarity is evidence for review, not a declaration of a rename.
generic_hosts = {'paymentsemails.com', 'zelle.jhapaycenter.com', ''}
def candidates_for(row, others):
    matches = []
    for other in others:
        reasons = []
        if source_id(row) == source_id(other): reasons.append('same source ID (IDs can be reused)')
        if row['Enrollment_URL__c'] and row['Enrollment_URL__c'] == other['Enrollment_URL__c']:
            reasons.append('same enrollment URL')
        if host(row) not in generic_hosts and host(row) == host(other): reasons.append('same enrollment hostname')
        score = SequenceMatcher(None, norm(row['Name']), norm(other['Name'])).ratio()
        if score >= .80: reasons.append(f'name similarity {score:.2f}')
        if reasons:
            matches.append(dict(name=other['Name'], source_id=source_id(other),
                                enrollment_url=other['Enrollment_URL__c'], reasons=reasons))
    return matches

review = []
for direction, rows, others in [
    ('absent baseline name', [old_by_name[k] for k in sorted(absent_names)], current),
    ('added current name', [r for r in current if norm(r['Name']) in added_names], baseline)]:
    for r in rows:
        matches = candidates_for(r, others)
        review.append(dict(Direction=direction, Name=r['Name'], SourceId=source_id(r),
                           EnrollmentURL=r['Enrollment_URL__c'],
                           Status='Candidate match; manual review' if matches else 'No automated candidate; absence/addition only',
                           Candidates=json.dumps(matches, ensure_ascii=False)))
write_csv('all-added-and-absent-name-review.csv', review,
          ['Direction', 'Name', 'SourceId', 'EnrollmentURL', 'Status', 'Candidates'])

field_changes, baseline_review = [], []
for key, old in sorted(old_by_name.items()):
    matches = new_by_name.get(key, [])
    exact = [r for r in matches if source_id(r) == source_id(old)]
    selected = exact[0] if len(exact) == 1 else matches[0] if len(matches) == 1 else None
    status = ('absent name; review required' if not matches else
              'retained name/source ID' if len(exact) == 1 else
              'retained name; source ID changed' if selected else 'ambiguous same-name listings; review required')
    baseline_review.append(dict(Name=old['Name'], PreviousSourceId=source_id(old), Status=status,
                                CurrentMatches=json.dumps([dict(name=r['Name'], source_id=source_id(r),
                                                                url=r['Enrollment_URL__c']) for r in matches])))
    if selected:
        for field in COLUMNS:
            if old[field] != selected[field]:
                field_changes.append(dict(Name=selected['Name'], Field=field, Previous=old[field], Current=selected[field]))
write_csv('every-baseline-listing-review.csv', baseline_review,
          ['Name', 'PreviousSourceId', 'Status', 'CurrentMatches'])
write_csv('retained-listing-field-changes.csv', field_changes, ['Name', 'Field', 'Previous', 'Current'])

source_ids = defaultdict(list)
for r in current:
    source_ids[source_id(r)].append(r['Name'])
summary = dict(previous_unique_names=len(old_names), latest_unique_names=len(new_names),
               latest_distinct_entries=len(current), latest_raw_entries=len(raw),
               added_names=len(added_names), absent_names=len(absent_names), net_name_change=len(new_names)-len(old_names),
               retained_names=len(old_names & new_names), same_name_groups=len(duplicates)//2,
               additional_same_name_entries=len(current)-len(new_names),
               exact_duplicate_entries=len(raw)-len(current),
               source_id_collisions={k:v for k,v in source_ids.items() if len(v)>1},
               org_accounts=len(org), org_creation_dates=dict(cohorts),
               org_baseline_names_missing=len(old_names-org_names),
               org_extra_names=len(org_names-old_names),
               org_added_ids_since_earlier_export=len(org_by_id.keys()-previous_by_id.keys()),
               org_removed_ids_since_earlier_export=len(previous_by_id.keys()-org_by_id.keys()),
               baseline_review_status_counts=dict(Counter(r['Status'] for r in baseline_review)),
               field_change_counts=dict(Counter(r['Field'] for r in field_changes)),
               responses=response_stats, checks_passed=checks)
(OUT / 'summary.json').write_text(json.dumps(summary, indent=2)+'\n')
manifest = {p.name: hashlib.sha256(p.read_bytes()).hexdigest()
            for p in sorted(OUT.iterdir()) if p.is_file() and p.name != 'sha256.json'}
(OUT / 'sha256.json').write_text(json.dumps(manifest, indent=2)+'\n')
absent_review = [r for r in review if r['Direction'] == 'absent baseline name']
lines = [
    '# Zelle directory full cross-check — October 29, 2026', '',
    'This report supersedes the directory conclusions in the earlier October 29 audit and '
    'the intermediate 1st Summit Bank verification. All saved source responses remain available. '
    'No Salesforce records were created, updated, or deleted.', '',
    '## Verified results', '',
    '| Measure | Verified result |', '|---|---:|',
    f'| August baseline unique names | {len(old_names):,} |',
    f'| Current unique names | {len(new_names):,} |',
    f'| Current distinct source entries | {len(current):,} |',
    f'| Names present in current directory but absent from baseline | {len(added_names)} |',
    f'| Baseline names absent from current directory | {len(absent_names)} |',
    f'| Net increase in unique names | +{len(new_names)-len(old_names)} |',
    f'| Baseline names retained | {len(old_names & new_names):,} |',
    f'| Current Salesforce Accounts | {len(org):,} |',
    '| Salesforce Accounts created August 23, 2026 (UTC) | 2,549 |',
    '| Salesforce Accounts created April 23, 2026 (UTC) | 14 |',
    '| Account IDs added / removed since the earlier October 29 export | 0 / 0 |', '',
    '**1st Summit Bank is retained**, matching the previous `1ST SUMMIT BANK` case-insensitively. '
    'Its source ID changed from `36I` to `JSV`, and its enrollment URL changed. '
    'It is excluded from the 34 absent names.', '',
    'The 65 / 34 figures are name-set differences, not verified counts of new financial institutions '
    'or institutions leaving Zelle. Renames, mergers, and source variations can affect them. '
    'Every added and absent name has a review row; candidate matching is not a verified rename. '
    'No Account deletion or automatic import is justified by these files alone.', '',
    '## What was cross-checked', '',
    *[f'- {check}.' for check in checks], '',
    'The live checks used https://enroll.zellepay.com/ at HTTP response times 16:11:16–16:11:49 UTC '
    '(11:11:16–11:11:49 AM America/Chicago), October 29. The standard and browser-user-agent '
    'responses report cache HIT; the no-cache request with a unique query string reports cache MISS '
    'and a current Last-Modified time. All three contain identical parsed field values, including '
    'the Summit listing. Headers and complete HTML are archived. This is strong cross-response '
    'agreement, not a guarantee that future responses cannot change.', '',
    '## Scraper correction and counting limits', '',
    'The old scraper kept only the first occurrence of each case-insensitive name. '
    'That discarded distinct listings. The corrected scraper keys by name, source ID, enrollment URL, '
    'and logo URL, collapsing only identical directory-entry identities. An independent HTML parser '
    'compared every output field, not just names, across all three responses.', '',
    'There are 2,590 raw entries. One repeated Lead Bank entry is identical. The remaining '
    '2,589 distinct entries have 2,580 unique names: nine names have two distinct entries each. '
    'Those are Cornerstone Bank, Farmers State Bank, First Federal Savings Bank, Hometown Bank, '
    'Jefferson Bank, Midwest Bank, Polam Federal Credit Union, The Savings Bank, and Woodlands Bank. '
    'Distinct entries do not necessarily imply distinct legal institutions; Woodlands Bank, for '
    'example, has two IDs and URLs at the same bank domain.', '',
    'The source ID `2FB` is also shared by CorePlus Federal Credit Union and Waypoint Credit Union. '
    'Names and source IDs must not be used alone as unique institution identifiers. The CSV’s '
    '`Publicly_Listed__c=true` and `Institution_Status__c=Active` are import defaults, not independently '
    'verified bank status; `Supports_Enrollment__c` only indicates a non-empty enrollment URL. '
    'The audit compares URL strings and does not certify every bank URL works or compare logo image bytes.', '',
    'The August baseline has 2,549 unique names and no preserved raw HTML. Therefore it is not '
    'possible to recover same-name entries discarded in August or to compute an apples-to-apples '
    'distinct-entry increase. **Do not describe 2,589 - 2,549 = 40 as 40 new institutions.** '
    'The comparable net figure is +31 unique names.', '',
    'The initial 2,577-name response genuinely lacks three names present in subsequent responses: '
    '1st Summit Bank, First Commerce Bank - NJ, and First Community Credit Union. The parser did '
    'not omit those names from the earlier HTML. The exact cause of that response difference '
    'remains unconfirmed. The earlier 63 / 35 figures describe that response only.', '',
    '## Review of every absent baseline name', '',
    'All 34 names below are absent from every fresh response, using trimmed case-insensitive '
    'name matching. The candidate column includes source-ID, exact-URL, or same-hostname matches. '
    'It does not assert these are the same institution; source-ID-only reuse can be misleading '
    '(for example, First Southern Bank and Community First CU of Florida). Fuzzy-name suggestions '
    'are available separately in the complete CSV review.', '',
    '| Baseline name absent from fresh responses | Current candidates for manual review |',
    '|---|---|',
]
for r in absent_review:
    strong = [c for c in json.loads(r['Candidates']) if any(
        'source ID' in reason or 'URL' in reason or 'hostname' in reason for reason in c['reasons'])]
    label = '; '.join(c['name'] + ' (' + ', '.join(c['reasons']) + ')' for c in strong)
    lines.append(f"| {r['Name']} | {label or 'No ID/URL/hostname candidate'} |")
lines += [
    '', '## Changes to retained baseline listings', '',
    'Match a retained name to its previous source ID when available; otherwise match its sole '
    'current listing. This handles duplicate-name order changes that could otherwise produce '
    'false field changes. All 2,549 baseline names have a row in the baseline review CSV.', '',
    '| Field | Matched baseline listings changed |', '|---|---:|',
    *[f'| `{field}` | {count} |' for field,count in sorted(summary['field_change_counts'].items())], '',
    'These counts overlap across fields. Logo URL differences include the source path migration '
    'to `/sites/default/files/logos/`. Name and Public_Display_Name changes are case-sensitive '
    'field comparisons; identity comparison is case-insensitive. Earlier counts used the first '
    'same-name entry and an earlier response, so they are historical, not the current update plan.', '',
    '## Files and reproduction', '',
    '- [Full corrected snapshot: 2,589 distinct entries](snapshots/2026-10-29/crosscheck/zelle-financial-institutions-accounts.csv)',
    '- [Every baseline listing reviewed](snapshots/2026-10-29/crosscheck/every-baseline-listing-review.csv)',
    '- [Every added and absent name reviewed](snapshots/2026-10-29/crosscheck/all-added-and-absent-name-review.csv)',
    '- [Added-name listings](snapshots/2026-10-29/crosscheck/added-name-listings.csv)',
    '- [Absent-name listings](snapshots/2026-10-29/crosscheck/absent-name-listings.csv)',
    '- [Same-name distinct entries](snapshots/2026-10-29/crosscheck/same-name-distinct-listings.csv)',
    '- [Retained listing field changes](snapshots/2026-10-29/crosscheck/retained-listing-field-changes.csv)',
    '- [Summary and completed checks](snapshots/2026-10-29/crosscheck/summary.json)',
    '- [Evidence hashes](snapshots/2026-10-29/crosscheck/sha256.json)', '',
    '```bash',
    'node scripts/data/scrape-zelle-institutions.mjs scripts/data/snapshots/2026-10-29/crosscheck/standard.html scripts/data/snapshots/2026-10-29/crosscheck/zelle-financial-institutions-accounts.csv',
    'python3 scripts/data/crosscheck-zelle-snapshots.py', '```', '',
    'For historical reproduction only, add `--dedupe-by-name` to the scraper invocation to '
    'reproduce the previous name-only behavior. Do not overwrite original evidence with corrected '
    'output. Historical Account deletions before the first saved org export remain unverified.', '',
]
(ROOT / 'zelle-crosscheck-2026-10-29.md').write_text('\n'.join(lines))
print(json.dumps(summary, indent=2))
