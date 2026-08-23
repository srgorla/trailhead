import { writeFile } from 'node:fs/promises';

const SOURCE_URL = 'https://enroll.zellepay.com/';
const OUTPUT_PATH = new URL('./zelle-financial-institutions-accounts.csv', import.meta.url);

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function getAttribute(markup, name) {
  const match = markup.match(new RegExp(`${name}="([^"]*)"`, 'i'));
  return match ? decodeHtml(match[1].trim()) : '';
}

function absolutizeUrl(value) {
  if (!value) {
    return '';
  }

  return new URL(value, SOURCE_URL).toString();
}

function csvValue(value) {
  const normalized = String(value ?? '').replace(/\r?\n/g, ' ').trim();
  return `"${normalized.replace(/"/g, '""')}"`;
}

function toCsv(rows) {
  const columns = [
    'Name',
    'Public_Display_Name__c',
    'Public_Search_Keywords__c',
    'Publicly_Listed__c',
    'Supports_Enrollment__c',
    'Enrollment_URL__c',
    'Institution_Status__c',
    'Logo_URL__c',
    'Logo_ContentVersionId__c',
    'Website'
  ];

  const lines = [columns.join(',')];
  for (const row of rows) {
    lines.push(columns.map(column => csvValue(row[column])).join(','));
  }

  return `${lines.join('\n')}\n`;
}

const response = await fetch(SOURCE_URL, {
  headers: {
    'user-agent': 'trailhead-salesforce-test-data-prep/1.0'
  }
});

if (!response.ok) {
  throw new Error(`Failed to fetch ${SOURCE_URL}: ${response.status} ${response.statusText}`);
}

const html = await response.text();
const rowsByName = new Map();
const itemPattern =
  /<li class="partner-list-letter-block__partner-name"[^>]*id="item_([^"]+)"[^>]*>\s*<a\b([^>]+)>/g;

for (const match of html.matchAll(itemPattern)) {
  const sourceId = decodeHtml(match[1]);
  const anchor = match[2];
  const name = getAttribute(anchor, 'data-bankname');
  const enrollmentUrl = getAttribute(anchor, 'data-bankurl');
  const logoUrl = absolutizeUrl(getAttribute(anchor, 'data-banklogo'));
  const firstLetter = getAttribute(anchor, 'data-firstletter');

  if (!name || rowsByName.has(name.toLowerCase())) {
    continue;
  }

  const keywordParts = [name, 'Zelle', sourceId, firstLetter].filter(Boolean);

  rowsByName.set(name.toLowerCase(), {
    Name: name,
    Public_Display_Name__c: name,
    Public_Search_Keywords__c: keywordParts.join(' '),
    Publicly_Listed__c: 'true',
    Supports_Enrollment__c: enrollmentUrl ? 'true' : 'false',
    Enrollment_URL__c: enrollmentUrl,
    Institution_Status__c: 'Active',
    Logo_URL__c: logoUrl,
    Logo_ContentVersionId__c: '',
    Website: enrollmentUrl
  });
}

const rows = [...rowsByName.values()].sort((left, right) =>
  left.Public_Display_Name__c.localeCompare(right.Public_Display_Name__c, 'en', { sensitivity: 'base' })
);

if (rows.length === 0) {
  throw new Error('No financial institutions were found in the source page.');
}

await writeFile(OUTPUT_PATH, toCsv(rows), 'utf8');

console.log(`Wrote ${rows.length} rows to ${OUTPUT_PATH.pathname}`);
