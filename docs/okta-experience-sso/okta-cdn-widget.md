# Standalone embedded Okta component for LWR

`oktaCdnSignIn` is a new Experience Builder component, **Okta Embedded Sign-In (CDN)**. It uses official Okta Sign-In Widget **7.50.0** JavaScript and CSS from Okta's CDN, with pinned SHA-384 integrity hashes. It does not import a static resource or use `platformResourceLoader`. The existing `oktaSignInPanel` remains a separate static-resource preview.

No site page is changed by this implementation. Place the new component on the site's existing **Login** page and remove the previous login component(s) when you are ready. A second custom route is unnecessary for centralized login. Keep the Login page public, configure it as the site's login page in Login & Registration, and publish. Authenticated pages should redirect there with `startURL`.

## Include the JavaScript on each LWR site

In Experience Builder **Settings → Advanced → Edit Head Markup**, append this include, preserving the existing markup:

```html
<x-oasis-script
  src="https://global.oktacdn.com/okta-signin-widget/7.50.0/js/okta-sign-in.min.js"
  integrity="sha384-jX2HA60PztQ56OuBrJOmUy9Z3SoZxDmpMVQeKR/Dk8xrfOEzDWQ0amcYtYtTqhsq"
  crossorigin="anonymous"
  exported-global-names="OktaSignIn"
></x-oasis-script>
```

LWR's privileged script include executes asynchronously and exports the constructor to the outer window. The component waits up to 15 seconds for it. Use the LWR tag rather than changing a `loadScript` URL to a CDN URL.

The privileged execution context matters: Okta also performs global document queries during rendering. A normal script evaluated outside that context can create an empty widget container inside native shadow DOM. Do not replace this include with a plain script tag or load a second Okta constructor on the same page.

The component creates a CSS **include link**, with integrity checking, inside its owned widget mount:

```html
<link
  rel="stylesheet"
  href="https://global.oktacdn.com/okta-signin-widget/7.50.0/css/okta-sign-in.min.css"
  integrity="sha384-9U8L1RVnBthmKe5J3KIxrd6gWekqP7ChxtFciQXAK7XjkEmSo1cQssIbUxPp5h9s"
  crossorigin="anonymous"
/>
```

This placement lets the stylesheet reach the widget inside native shadow DOM. A head-level stylesheet alone cannot do that. Fonts and images also resolve from the pinned CDN asset directory.

In Builder's Security & Privacy settings, select **Relaxed CSP** and allowlist `https://global.oktacdn.com` for script loading. Allow that host for styles, fonts, images, and any widget localization asset requests as required by the generated CSP. Keep Lightning security enabled. Publishing the component alone does not configure these site-specific settings.

Salesforce documents this LWR-specific include mechanism in [Integrate Third-Party Libraries Using the Privileged Script Tag](https://developer.salesforce.com/docs/platform/exp-cloud-lwr/guide/advanced-privileged-script.html). Okta documents the matching includes and widget APIs in the [Sign-In Widget repository](https://github.com/okta/okta-signin-widget#using-the-okta-cdn).

## Preview now

Leave **Enable authentication** off. No tenant settings are needed. The official widget renders a username/password screen through its Classic presentation path, with a non-routable placeholder domain. Controls are disabled and interactions blocked before rendering. This preview setting does not imply that the eventual tenant uses Classic Engine.

## Embedded authentication later

Enable authentication only after implementing the server integration below. Set:

| Builder property                  | Value                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------- |
| Okta issuer URL                   | Your Identity Engine issuer, such as `https://your-org.okta.com/oauth2/default` |
| Okta web application client ID    | Public client ID; never a client secret                                         |
| Server callback URL               | Your server's registered OIDC callback                                          |
| Server login transaction endpoint | HTTPS endpoint that creates a fresh transaction                                 |

The live branch uses `showSignInAndRedirect` for an embedded **web application** with a server callback. That method is supported by current Okta documentation; it is not an obsolete version-6-only API. It redirects after the embedded interaction where the OIDC flow requires it. Preview uses `renderEl` solely to display the screen without a configured tenant.

The transaction endpoint receives a credentialed JSON POST:

```json
{
  "issuer": "https://your-org.okta.com/oauth2/default",
  "clientId": "YOUR_CLIENT_ID",
  "redirectUri": "https://your-server.example/oidc/callback",
  "startURL": "/merchant/orders"
}
```

It must respond with a new transaction:

```json
{
  "state": "SERVER_GENERATED_RANDOM_BASE64URL_VALUE_AT_LEAST_32_CHARS",
  "codeChallenge": "43_CHARACTER_BASE64URL_SHA256_PKCE_CHALLENGE___"
}
```

Values above are illustrative placeholders, not usable transaction values. The server must generate random state and a PKCE verifier, retain them in a short-lived session, and return only state and the S256 challenge. The component validates their format. Never hard-code state or a challenge in Builder. The server must validate the configured issuer/client/callback against its own allowlist rather than trusting the posted values, protect the endpoint against CSRF, and validate the return path against the intended Experience site. Cross-origin endpoints require explicit credentialed CORS, suitable cookies, and a site CSP connect allowlist. Prefer a same-origin integration where possible.

The server callback must validate and consume state, redeem the authorization code with the retained verifier and server-only credentials, validate the tokens, and implement a supported **Salesforce session handoff** before returning to the saved page. An Okta token stored in the browser does not create an Experience Cloud session. A custom callback cannot simply send its Okta code to Salesforce's Auth Provider callback: Salesforce must have initiated and tracked its own federation transaction. Design and test that handoff with your Salesforce identity configuration.

This change supplies the standalone frontend and the transaction contract. It does **not** supply the server endpoint, callback, or Salesforce federation configuration, which require your tenant details and integration architecture. Enabling the switch without that backend fails closed rather than accepting credentials in a disconnected preview.

## Validation

Deployed the component alone to `aforce_de`: deployment `0AfgL00000aDdzhSAC` succeeded. Salesforce compilation, lint, and seven unit tests passed. No Experience site configuration or page was changed or published.

Unit tests cover asynchronous include readiness, disabled preview controls, asset failure, cleanup, and the live transaction configuration. They mock the Okta constructor; they do not establish a real Okta or Salesforce session. Final acceptance requires testing in a published LWR site with its includes/CSP configured, then an actual tenant and callback for live login.

For version upgrades, update the head include, component CDN version, and both integrity hashes together. Do not use a floating `latest` CDN URL.
