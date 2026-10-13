# Okta widget preview implementation

Implemented October 11, 2026 in `aforce_de`.

## Preview links

- Central login page: https://orgfarm-6f61b5a2b9-dev-ed.develop.my.site.com/customer/login
- Main site entry (requires login): https://orgfarm-6f61b5a2b9-dev-ed.develop.my.site.com/customer

- Experience Cloud page: https://orgfarm-6f61b5a2b9-dev-ed.develop.my.site.com/customer/okta-preview
- Standalone asset preview: https://orgfarm-6f61b5a2b9-dev-ed.develop.my.site.com/customer/sfsites/c/resource/oktaSignInWidget/preview.html

The standard login page and the separate diagnostic preview page are public and use the existing Customer LWR site. Its route is `/customer/okta-preview`, even though the Network record currently has a different URL prefix. The published route and Connect API site URL confirm `/customer` for this LWR page.

## What was delivered

- The official **Okta Sign-In Widget 7.50.0**, checked against the latest GitHub release and npm package.
- `oktaSignInPanel`: exposed Experience Builder component with a configurable heading and brand color, responsive blue branding, and a visible preview notice.
- `oktaWidgetHost`: an internal light-DOM component under the shadow-DOM panel, with local stylesheet loading and widget lifecycle handling.
- The standard `login-main` route and Login view now host the Okta panel. A separate public `Okta_Preview__c` route remains available for diagnosis.
- A pinned, integrity-checked static resource containing the official prebuilt JavaScript, CSS, images, fonts, and license notices.
- An independent static HTML preview of the same widget for integration diagnosis.

The widget uses `renderEl` with a display-only Classic Engine configuration and the deliberately non-routable `https://preview.invalid` domain. It has no client ID, redirect URI, OIDC flow, or Salesforce session handling. This renders the real library's initial username/password screen; it is not a hand-built replacement.

The preview mount is inert before initialization. Credential controls are disabled after render, links have no destination, and capture-level guards cancel click, submit, keyboard, input, and change events. No Okta credentials are required. A bounded loading timeout produces a clear error instead of an endless spinner.

The later authentication implementation must use a separately verified tenant configuration and flow. The temporary Classic display setting does not determine the production tenant engine.

## Deployment and verification

| Check                                                         | Result                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Salesforce dry-run                                            | Passed; five metadata components                                                                                   |
| Deployment                                                    | Succeeded, `0AfgL00000a5vDpSAI`                                                                                    |
| Customer publication                                          | Complete, `08PgL00001IZhvPUAT`; no publication error                                                               |
| Guest HTTP request to `/customer/okta-preview`                | HTTP 200 without following redirects                                                                               |
| Published view module                                         | HTTP 200; contains the widget component, heading, and brand color                                                  |
| Public widget JS, CSS, preview script, override CSS, and logo | HTTP 200; exact SHA-256 match with packaged assets                                                                 |
| Actual official widget in DOM harness                         | Rendered username/password/submit controls; controls disabled; all interaction guards passed; no external requests |
| LWC unit tests                                                | Three passed: submission protection, timeout/late-load handling, cleanup/reconnection                              |
| LWC lint                                                      | Passed                                                                                                             |

Browser visual verification and execution inside the live LWR runtime remain pending because no connected browser is available. The DOM harness supplies browser API fixtures for encoding, crypto, and canvas; it does not verify layout, browser CSP enforcement, or Lightning runtime compatibility. The HTTP checks prove publication and asset delivery, rather than interactive rendering.

## Rebuild and test

```sh
python3 scripts/okta-widget/package-widget.py
node scripts/okta-widget/verify-widget.cjs
npm run test:unit -- -- --runTestsByPath force-app/main/default/lwc/oktaWidgetHost/__tests__/oktaWidgetHost.test.js --runInBand
npx eslint force-app/main/default/lwc/oktaSignInPanel/*.js force-app/main/default/lwc/oktaWidgetHost/*.js
```

The packaging script verifies the pinned npm archive's SHA-512 integrity, preserves upstream license notices, and creates a deterministic ZIP. Updating the widget requires changing the exact version and integrity together, rebuilding, and repeating the checks.

## Deployment scope and rollback

Only the two new LWCs, static resource, and Customer preview route/view were deployed. The follow-up delivery replaces the standard Login view and restores authenticated Home access. Google provider configuration is retained, but its standard social-login component has been removed from the Login view to prevent it from bypassing the Okta screen. Merchant was outside this first delivery.

To withdraw the preview, remove its route and view through Builder or a scoped metadata deletion, then republish Customer. Local rollback snapshots were removed. For any future rollback, prepare a scoped route/view change from version control or a verified backup, avoiding unrelated site changes.

## Next verification

Open the Experience Cloud preview link in a fresh private browser window. Check desktop and phone widths, confirm the official card is visible, and verify no Okta requests occur. Test returning to the page without duplicate cards. If the LWR widget integration fails, record the browser error and use the standalone asset preview to distinguish library/configuration issues from LWR DOM or security issues.

## Centralized login routing

The Okta panel is now on the site's standard `/customer/login` page, not on Home. Home is restored to its original content and inherits the authenticated site's access restrictions. The standard Login route is public so guests can view the screen without a login loop.

The site's existing `Network.networkPageOverrides.loginPageOverrideSetting` is `Designer`, selecting the Experience Builder login page. Its standard `login-main` route is preserved. Salesforce handles guest access to protected pages through its shared login route; no per-page redirect component or custom access-control logic was added. Native navigation to login also uses that route.

The default login form, social-login component, employee link, and duplicate logo were replaced with the single Okta panel. This removes the standard social-login UI that can initiate Google SSO while leaving the backend Google provider configuration in place. Explicit Google SSO endpoints remain operational and are outside the disabled Okta preview flow.

The requested protected destination remains in Salesforce's `startURL` query parameter. The preview does not rewrite or follow that value. When authentication is implemented, validate it as a permitted site-relative destination before using it after session creation.

Authentication remains disabled: visitors can view the common login screen but cannot complete an Okta login or access protected pages through it. Browser visual verification remains pending.

### Central login verification

Deployment `0AfgL00000a61RJSAY` succeeded. Publication `08PgL00001IaFHaUAN` completed without errors. Unauthenticated HTTP checks confirmed:

| Request                                              | Result                                                                                                                     |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `/customer/`                                         | 302 to `/customer/login`, preserving `/customer/` in `startURL`                                                            |
| `/customer/news/test`                                | 302 to `/customer/login`, preserving the direct destination in `startURL`                                                  |
| `/customer/news`                                     | 302 to `/customer/login`, preserving the direct destination in `startURL`                                                  |
| `/customer/login`                                    | 200; public route; published view contains the Okta panel and excludes the standard login form and social-login components |
| `/customer/login?startURL=%2Fcustomer%2Fnews%2Ftest` | 200; same shared Okta panel                                                                                                |

These checks confirm centralized guest routing without a Google redirect. The News test paths use placeholder destinations and do not validate record availability after authentication. The disabled widget and live browser rendering limitations described above still apply.

## CDN-based standalone alternative

For the newer reusable component that loads Okta through LWR CDN includes, see [Standalone embedded Okta component for LWR](okta-cdn-widget.md). This document describes the existing static-resource preview.
