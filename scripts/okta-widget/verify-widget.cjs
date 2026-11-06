/* Verify the actual packaged widget in a DOM harness, with all resources local. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { webcrypto } = require('node:crypto');
const util = require('node:util');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');

const root = path.resolve(__dirname, '../..');
const archive = path.join(root, 'force-app/main/default/staticresources/oktaSignInWidget.resource');
const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'okta-widget-check-'));
execFileSync('python3', ['-c', 'import sys,zipfile; zipfile.ZipFile(sys.argv[1]).extractall(sys.argv[2])', archive, directory]);
const resources = [];
const externalRequests = [];
const errors = [];
const origin = 'https://preview.example/';

class LocalResources extends ResourceLoader {
    fetch(url) {
        resources.push(url);
        if (!url.startsWith(origin)) {
            externalRequests.push(url);
            return Promise.reject(new Error('External resource blocked'));
        }
        const file = path.join(directory, decodeURIComponent(new URL(url).pathname));
        return Promise.resolve(fs.readFileSync(file));
    }
}

const console = new VirtualConsole();
console.on('jsdomError', (error) => errors.push(error.message));
const dom = new JSDOM(fs.readFileSync(path.join(directory, 'preview.html'), 'utf8'), {
    url: `${origin}preview.html`,
    resources: new LocalResources(),
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: console,
    beforeParse(window) {
        // jsdom omits browser crypto, encoding, and canvas APIs used by the vendor bundle.
        window.TextEncoder = util.TextEncoder;
        window.TextDecoder = util.TextDecoder;
        Object.defineProperty(window, 'crypto', { value: webcrypto });
        window.HTMLCanvasElement.prototype.getContext = () => ({ backingStorePixelRatio: 1, scale() {} });
        window.fetch = (url) => {
            externalRequests.push(String(url));
            return Promise.reject(new Error('Network blocked'));
        };
        window.XMLHttpRequest.prototype.open = function (method, url) {
            externalRequests.push(String(url));
            throw new Error('Network blocked');
        };
    }
});

async function verify() {
    try {
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('Widget did not render')), 10000);
            const observer = new dom.window.MutationObserver(() => {
                if (dom.window.document.getElementById('status').textContent.includes('screen loaded')) {
                    clearTimeout(timeout);
                    observer.disconnect();
                    resolve();
                }
            });
            observer.observe(dom.window.document, { subtree: true, childList: true, characterData: true });
        });
        const document = dom.window.document;
        const mount = document.getElementById('widget-mount');
        assert.ok(mount.querySelector('#okta-sign-in'), 'Official widget DOM rendered');
        assert.ok(mount.hasAttribute('inert'), 'Mount remains inert');
        assert.ok(mount.querySelector('input[name="username"]').disabled);
        assert.ok(mount.querySelector('input[name="password"]').disabled);
        assert.ok(mount.querySelector('input[type="submit"]').disabled);
        for (const link of mount.querySelectorAll('a')) {
            assert.equal(link.hasAttribute('href'), false);
            assert.equal(link.getAttribute('tabindex'), '-1');
        }
        for (const name of ['submit', 'click', 'keydown', 'input', 'change']) {
            const event = new dom.window.Event(name, { bubbles: true, cancelable: true });
            assert.equal(mount.querySelector('form').dispatchEvent(event), false, `${name} blocked`);
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
        assert.deepEqual(externalRequests, []);
        assert.deepEqual(errors, []);
        assert.equal(document.querySelector('meta[http-equiv="Content-Security-Policy"]').content.includes("connect-src 'none'"), true);
        process.stdout.write(JSON.stringify({
            version: JSON.parse(fs.readFileSync(path.join(directory, 'manifest.json'))).version,
            officialWidgetRendered: true,
            credentialControlsDisabled: true,
            interactionsBlocked: true,
            externalRequests,
            localResourceCount: resources.length,
            limitations: 'DOM harness only; does not verify browser layout, CSP enforcement, or LWR runtime compatibility.'
        }, null, 2) + '\n');
        dom.window.dispatchEvent(new dom.window.Event('pagehide'));
        assert.equal(mount.querySelector('#okta-sign-in'), null, 'Widget cleaned up');
    } finally {
        dom.window.close();
        fs.rmSync(directory, { recursive: true, force: true });
    }
}

verify().catch((error) => {
    process.stderr.write(error.stack + '\n');
    process.exitCode = 1;
});
