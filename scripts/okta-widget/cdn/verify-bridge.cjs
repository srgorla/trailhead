// Exercise the actual head bridge and official widget in a DOM harness.
// The existing ZIP is a test fixture only; deployed CDN code does not reference it.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const util = require('node:util');
const { webcrypto } = require('node:crypto');
const { JSDOM } = require('jsdom');
const markup = fs.readFileSync(path.join(__dirname, 'head-markup.html'), 'utf8');
const bridge = markup.match(/<x-oasis-script hidden="true">([\s\S]*?)<\/x-oasis-script>/)[1];
const archive = path.resolve(__dirname, '../../../force-app/main/default/staticresources/oktaSignInWidget.resource');
const vendor = execFileSync('python3', ['-c', 'import sys,zipfile; print(zipfile.ZipFile(sys.argv[1]).read("js/okta-sign-in.no-polyfill.min.js").decode())', archive], { encoding: 'utf8', maxBuffer: 10000000 });
const dom = new JSDOM('<div data-okta-mount="11111111-1111-4111-8111-111111111111"></div>', {
  url: 'https://preview.example/', runScripts: 'outside-only', pretendToBeVisual: true
});
const w = dom.window;
w.TextEncoder = util.TextEncoder;
w.TextDecoder = util.TextDecoder;
Object.defineProperty(w, 'crypto', { value: webcrypto });
w.HTMLCanvasElement.prototype.getContext = () => ({ backingStorePixelRatio: 1, scale() {} });
const authRequests = [];
w.fetch = (url) => { authRequests.push(String(url)); return Promise.reject(new Error('Network blocked')); };
w.XMLHttpRequest.prototype.open = function (method, url) { authRequests.push(String(url)); throw new Error('Network blocked'); };
w.eval(vendor);
// Simulate the inspected Oasis invalid Document receiver.
const assignedSlot = Object.getOwnPropertyDescriptor(w.Element.prototype, 'assignedSlot').get;
Object.defineProperty(w.document, 'parentNode', { configurable: true, get() { return assignedSlot.call(this); } });
assert.throws(() => w.document.parentNode);
w.eval(bridge);
const mount = w.document.querySelector('[data-okta-mount]');
mount.setAttribute('inert', '');
const id = mount.getAttribute('data-okta-mount');
const responses = [];
mount.addEventListener('okta-widget-response', event => responses.push(JSON.parse(event.detail)));
function request(action) {
  w.document.dispatchEvent(new w.CustomEvent('okta-widget-request', { detail: JSON.stringify({
    id, action, preview: true,
    config: { baseUrl: 'https://preview.invalid', useClassicEngine: true, language: 'en',
      assets: { baseUrl: 'https://global.oktacdn.com/okta-signin-widget/7.50.0' },
      features: { autoFocus: false, rememberMe: false, registration: false } }
  }) }));
}
(async () => {
  try {
    request('render');
    request('render'); // Idempotent retry must not render another widget.
    await new Promise(resolve => setTimeout(resolve, 250));
    assert.ok(responses.some(response => response.type === 'accepted'));
    assert.ok(responses.some(response => response.type === 'ready'), JSON.stringify(responses));
    assert.equal(responses.filter(response => response.type === 'ready').length, 1);
    assert.equal(w.document.parentNode, null);
    assert.equal(w.document.parentElement, null);
    assert.equal(mount.querySelectorAll('#okta-sign-in').length, 1);
    assert.ok(mount.querySelector('input[name="username"]').disabled);
    assert.ok(mount.querySelector('input[name="password"]').disabled);
    assert.deepEqual(authRequests, []);
    request('remove');
    assert.equal(mount.querySelector('#okta-sign-in'), null);
    console.log('Bridge passed: official widget fields rendered and disabled; invalid Document getter handled; duplicate request and cleanup passed; no auth requests. DOM harness only, not Salesforce runtime validation.');
  } finally { dom.window.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
