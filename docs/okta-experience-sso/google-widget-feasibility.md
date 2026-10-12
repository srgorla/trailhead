# Google widget feasibility verification

Checked 2026-10-11 against official Google and Salesforce documentation and aforce_de.

## Result

A custom integration has documented building blocks. It is not yet end-to-end tested or deployed. The existing GoogleOIDC provider cannot consume the Google Identity Services JavaScript credential callback as a drop-in login replacement.

Proposed flow:

1. Salesforce-hosted LWR page loads the official Google Identity Services client and presents a button or One Tap.
2. Google returns an ID token. Credential entry, if required, occurs in Google-controlled UI.
3. A dedicated Salesforce External Client App enables token exchange and the web scope. Avoid reusing the MCP client.
4. Custom Auth.Oauth2TokenExchangeHandler validates the signed Google token (signature, issuer, audience, expiration, verified email and nonce/replay protections) and maps to exactly one active existing Salesforce user by FederationIdentifier. Enforce site membership. Never trust a decoded token without validation; never create users implicitly.
5. Exchange the Google ID token at the site's /services/oauth2/token endpoint with subject_token_type urn:ietf:params:oauth:token-type:id_token.
6. Exchange the resulting web-scoped Salesforce access token through the site's /services/oauth2/singleaccess endpoint. Navigate to the returned one-use frontdoor URL to establish the site session.

Keep tokens out of logs and local storage, do not put client secrets in browser code, and do not return admin sessions. The single-use bridge URL is sensitive and must not be logged.

## Live checks

- sf org list metadata --metadata-type OauthTokenExchangeHandler returned no handlers.
- Both public site singleaccess endpoints returned HTTP 403 Bad_OAuth_Token to a request with no credential. This confirms endpoint behavior only; it does not verify Google token exchange or a user session.
- Public /login pages returned frame-ancestors CSP only in their response headers. This is not a sufficient check of the rendered LWR page's effective CSP or widget compatibility.
- No site or authentication metadata was changed.
- Headless 360 again failed token refresh; authenticated SF CLI fallback was used for metadata inventory.

## Remaining proof-of-concept checks

- Add https://orgfarm-6f61b5a2b9-dev-ed.develop.my.site.com as a Google Authorized JavaScript origin (host only; no /customer or /merchant path). Existing callback URLs are different settings and must be retained.
- Verify loading Google's hosted script via supported LWR head markup / privileged script configuration with required allowlists. Do not upload a static copy of GIS; Google does not support self-hosting it.
- Verify FedCM/popup behavior, CSP and LWR runtime isolation in actual published browser pages. One Tap is conditional on browser support, opt-outs, and an active Google session.
- Create a dedicated token-exchange client/handler and test with the existing external user whose FederationIdentifier is mutyalaswetha@gmail.com. Test the internal admin separately; do not assume the external-user flow works for internal users.
- Confirm successful UI-session creation, identity, correct site landing and negative validation cases. Only then replace the current login experience.

## Sources

- Google widget and One Tap: https://developers.google.com/identity/gsi/web/guides/offerings
- GIS hosted script, origin and CSP requirements: https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
- LWR third-party script integration: https://developer.salesforce.com/docs/platform/exp-cloud-lwr/guide/advanced-privileged-script.html
- Salesforce ID-token exchange and web scope: https://help.salesforce.com/s/articleView?id=sf.remoteaccess_token_exchange_configure.htm&type=5
- External Client App token-exchange setup: https://help.salesforce.com/s/articleView?id=sf.remoteaccess_token_exchange_integrate.htm&type=5
- UI Bridge API: https://help.salesforce.com/s/articleView?id=sf.frontdoor_singleaccess.htm&type=5
