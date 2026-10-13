# Standalone embedded Okta component for LWR

`oktaCdnSignIn` is the Builder component **Okta Embedded Sign-In (CDN)**. It uses pinned official Okta Sign-In Widget **7.50.0** CDN JavaScript/CSS and SHA-384 integrity checks. It has no static-resource dependency. The user confirmed the published `/oktalab/login` preview renders the real username/password screen with authentication disabled after configuring Relaxed CSP. Deployment and site configuration are managed manually.

## Required component and head-markup update

The previous implementation polled `window.OktaSignIn` inside the LWC. Published testing showed that the constructor was visible in the page Console but unavailable inside the Lightning Web Security sandbox. The replacement sends JSON requests through DOM events. A privileged head script instantiates, renders, and removes Okta; no constructor, callback, or DOM reference crosses into the LWC's JavaScript sandbox.

1. Deploy the component bundle yourself:

   ```sh
   sf project deploy start \
     --source-dir force-app/main/default/lwc/oktaCdnSignIn \
     --target-org aforce_de \
     --wait 10
   ```

2. In **Experience Builder → Settings → Advanced → Edit Head Markup**, preserve the site's title and stylesheet links. Replace all previous Okta script/guard blocks with **both blocks** from [head-markup.html](../../scripts/okta-widget/cdn/head-markup.html). Copy the file contents directly; this file is not deployed by the LWC command.
3. The first block contains the inline event bridge. The second loads Okta from its CDN into the same privileged context. The constructor is intentionally no longer exported to the outer window. No HTTPS hosting location is required for the bridge.
4. Keep **Relaxed CSP: Permit Access to Inline Scripts and Allowed Hosts**, Lightning Web Security **On**, and an active script allowlist entry for `https://global.oktacdn.com`. The earlier mode that blocked inline execution cannot run the bridge. Check Console if the inline block is blocked after publication.
5. In Setup → Trusted URLs, allow the CDN for **style-src**, **font-src**, and **img-src**. Widget localization assets may require **connect-src**; that also permits DevTools source maps. This implementation doesn't require **frame-src** or **media-src** for the CDN.
6. Place the component on the existing public **Login** page, leave **Enable authentication** off, then **Save and Publish**. Remove other login components if you want only the Okta preview.
7. Test `/oktalab/login` in a fresh incognito window. Expected: real Okta username/password controls, disabled, with “Sign-in screen loaded. Authentication is disabled.”

The component creates its CSS include link inside the owned widget mount so it reaches the native shadow DOM. Do not add a duplicate widget stylesheet to head markup.

Salesforce documents [privileged scripts and inline code in LWR](https://developer.salesforce.com/docs/platform/exp-cloud-lwr/guide/advanced-privileged-script.html). Okta documents the [CDN assets and widget APIs](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

## Lifecycle and the observed Oasis error

The component retries its render request until the bridge acknowledges it. The bridge handles requests idempotently, waits for actual controls rather than trusting an empty `afterRender` event, and sends ready/error responses directly to the matching mount. Disconnect and timeout requests remove the widget and observer, including after the component leaves the document.

Published testing also exposed `Illegal invocation` at `HTMLDocument.parentNode` in Oasis. The bridge includes a narrow conditional compatibility guard: only when reading `document.parentNode` throws a TypeError, it shadows the Document's parent properties with their correct `null` values. It does not change Node, Element, or Slot prototypes. This guard runs inside the privileged rendering context. Its logic passes a simulated invalid-getter test. The user subsequently confirmed the complete preview renders; that observation does not isolate which change resolved the earlier error.

The obsolete standalone guard blocks/files have been removed. Do not re-add them. `head-markup.html` is the single source for the inline bridge and CDN include; it does not need hosting or a separate deployment. The DOM harness tests the inline code directly from that file.

## Preview and embedded authentication

Preview uses the actual widget's Classic presentation path with `https://preview.invalid`, English strings, disabled controls, an inert mount, and interaction guards. It does not require an Okta tenant and does not imply that the production tenant uses Classic Engine.

For live Identity Engine login, set these Builder properties and enable authentication only after the server integration exists:

| Property             | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| Issuer               | Your HTTPS Okta issuer                           |
| Client ID            | Public web-application client ID                 |
| Callback URL         | Registered HTTPS server callback                 |
| Transaction endpoint | HTTPS endpoint that creates fresh state and PKCE |

The transaction endpoint receives a credentialed JSON POST with `issuer`, `clientId`, `redirectUri`, and `startURL`. Return `state` (32–512 base64url characters) and `codeChallenge` (43 base64url characters, S256). Generate cryptographically random state and a verifier on the server, retain them in a short-lived session, and return only state and the challenge. Never configure a static state, challenge, verifier, or client secret in Builder.

The server must independently allowlist issuer/client/callback, protect the endpoint against CSRF, and validate the return path for the intended site. Cross-origin endpoints need explicit credentialed CORS, suitable cookies, and a CSP connect allowlist. Missing configuration or malformed transactions fail before the bridge renders live credential controls.

Live mode uses `showSignInAndRedirect` for a web application with a server callback. The server must validate/consume state, redeem the code with the retained verifier and server-only credentials, validate tokens, and establish a supported Salesforce session handoff. An Okta browser token alone does not create an Experience Cloud session. Do not send a custom transaction's code directly to Salesforce's Auth Provider callback; Salesforce must initiate and track its own federation transaction.

The frontend and transaction contract are provided. The server transaction endpoint, callback, and Salesforce session integration are not implemented and still require tenant details and an agreed identity architecture.

## Verification and limits

- Ten LWC unit tests pass with no `window.OktaSignIn` constructor installed in the component context.
- The actual official 7.50.0 widget renders username/password controls through the head bridge in a DOM harness. Preview disabling, duplicate requests, simulated invalid Document access, cleanup, and absence of auth requests pass.
- Lint passes. The user performed deployment/site configuration; no server integration was implemented.
- The DOM harness uses the existing vendor ZIP as a **test fixture only**. The runtime component still loads assets from the CDN.
- The user's published-site screenshot confirms username/password rendering and the loaded preview status, with no red Console errors visible. Real authentication, Salesforce session creation, and a broader browser/layout check remain unverified.

If the updated component says **bridge did not acknowledge**, check that both new head blocks ran and that the inline bridge isn't CSP-blocked. If it says **controls did not render**, the bridge acknowledged but Okta failed to produce a screen. If it reports **bridge failed**, capture that error and its Console stack. Missing stylesheet loads have their own timeout message.

For upgrades, update the head include, component CDN version, and JavaScript/CSS integrity hashes together. Avoid floating `latest` CDN URLs.
