# Okta Sign-In Widget for Salesforce Experience Cloud

Implementation plan | October 11, 2026

**Implementation status:** The official 7.50.0 widget, reusable LWCs, local static resource, and public Customer preview route have been deployed and published. The standard Customer Login page now hosts the panel; Home retains authenticated access, allowing protected-page requests to use the shared login route. The real widget renders in the DOM harness without external requests. Published route and asset checks passed. Live browser rendering remains to be verified. See [implementation and verification record](okta-widget-implementation.md).

## 1. Objective

Build an Experience Cloud sign-in page using the latest stable official Okta Sign-In Widget, with a visual preview fallback only if real-library rendering cannot be demonstrated without tenant configuration. The current milestone is the visible screen and its integration with the site. Completing authentication is deferred until Okta configuration is available.

Start with the existing Customer Enhanced LWR site. Build a reusable component so Merchant can use the same implementation with different branding. Treat Customer-first delivery as a planning assumption that can be changed before implementation.

## 2. Existing foundation

The workspace contains Customer and Merchant Enhanced LWR site metadata, saved creation/publication reports, and an investigation of the reference page at https://my.earlywarning.com/customer/signin.

Historical observations from that reference site (not implementation choices):

- An LWR component named `c/oktaCustomerLoginPage`.
- An embedded Okta widget with a redirect-based authentication method. Its legacy package and authentication method are not the baseline for this implementation.
- Runtime configuration supplied by `OktaSetupController.getOktaSetupMetadataRecord`.
- Portal-specific redirect configuration and an observed dark blue panel (`#24334D`) with blue widget branding (`#4C6E9E`).

**Our implementation baseline is Okta Sign-In Widget 7.50.0, or a newer stable release verified when implementation begins.** For the current screen-only milestone, investigate `renderEl` in an isolated display-only preview; do not invoke `showSignInAndRedirect`. Choose the production authentication method separately when Okta details are available.

The reference investigation supports the proposed page/component structure. It does not establish how that site creates a Salesforce session or whether its final federation is OIDC or SAML. Reproduce the presentation pattern without copying its authentication assumptions.

Saved reports also describe Google OIDC and Salesforce password login on the existing sites. Keep those functioning while developing a separate Okta preview route. Current org state should be verified before deployment.

## 3. Rendering without Okta details

There are three distinct outcomes:

| Outcome                                               | Available now?                                                                                            | What it proves                                                                          |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Branded screen preview, implemented locally in an LWC | Yes                                                                                                       | Layout, responsiveness, accessibility, and site placement                               |
| Actual Okta library rendering its sign-in screen      | Demonstrated in the DOM harness with a display-only Classic configuration; live LWR browser check pending | Initial library rendering; tenant-driven Identity Engine behavior remains a later check |
| Successful Okta login and Salesforce site session     | Deferred                                                                                                  | End-to-end authentication and user access                                               |

For the normal embedded Identity Engine/OIDC flow, Okta documents `issuer`, `clientId`, and `redirectUri`. This does not establish that every rendering path needs all three. The release also retains a Classic Engine non-OIDC `renderEl` path with a smaller configuration surface. Investigate that path for an isolated display-only preview; it is not the proposed production authentication flow. Neither documentation nor source inspection alone proves that a placeholder domain can render without network traffic. [OIDC configuration](https://github.com/okta/okta-signin-widget#configuration), [release-specific Classic Engine documentation](https://github.com/okta/okta-signin-widget/blob/okta-signin-widget-7.50.0/docs/classic.md).

**Recommended approach:** attempt real-widget rendering first with the latest stable package. Test the display-only Classic `renderEl` path with `useClassicEngine: true`, no OIDC application settings, and a deliberately non-routable placeholder such as `https://preview.invalid`. Make the mount inert before rendering, block form/link interaction, and inspect all requests, including initialization, localization, telemetry, and assets. Package required assets locally. Accept this path only if the actual screen renders and no external requests are attempted. If it needs a real tenant, use the labeled visual fallback. Do not patch private SDK internals, fabricate Identity Engine responses in the deployed site, or use an old package to avoid this check. The Classic display-only configuration must remain isolated from the later Identity Engine configuration.

### Version policy

As of October 11, 2026, the repository's latest stable release is **7.50.0**, published October 2, 2026. Use `@okta/okta-signin-widget@7.50.0` as the current baseline. Recheck the latest stable release when implementation begins, adopt any newer stable release, and pin that exact tested version in the package lock and deployed assets. Use matching JavaScript and CSS versions; avoid floating `latest` URLs in a deployed site. [Official 7.50.0 release](https://github.com/okta/okta-signin-widget/releases/tag/okta-signin-widget-7.50.0).

Package version 7.x is compatible with the second-generation embedded deployment model; it does not mean we must choose an old release. Okta's third-generation UI does not support self-hosting. [Okta generation comparison](https://help.okta.com/oie/en-us/Content/Topics/Reference/siw-compare-generations.htm).

## 4. Current scope

Deliver:

- A public, guest-accessible preview page within the Customer LWR site; proposed route: `/okta-preview`, with the final URL confirmed in Builder.
- A reusable `oktaSignInPanel` LWC with configurable heading, logo, accent color, and preview mode.
- A responsive branded panel and sign-in card, using the observed reference colors as an initial design direction.
- A visible message: “Sign-in preview. Authentication is not connected.”
- A disabled sign-in action and no operational recovery, registration, or identity-provider links in preview mode.
- Loading and failure states for library integration, without an endless spinner or a blank screen.
- A configuration contract and implementation notes for enabling the real widget later.

Defer Okta tenant/app setup, credential submission, MFA, redirects, token handling, Salesforce Auth Provider changes, registration handlers, account provisioning, session creation, and logout integration.

The preview must not submit, persist, or log credentials. Prefer disabled sample fields in the credentials-free preview so visitors do not mistake it for an operational login page.

## 5. Proposed implementation

### Page and component

Place `oktaSignInPanel` on an LWR page exposed to guests. Begin on a separate preview route so the existing login page remains available. Use Experience Builder for placement, or supported metadata editing after retrieving the current site bundle and checking its schemas.

Keep the brand shell separate from the widget mount area. This allows the visual preview and future actual widget to share the same layout without rewriting the page.

### Options analysis and recommendation

The recommendation below is an engineering assessment based on documented platform features. Compatibility with this org's Enhanced LWR runtime remains to be tested.

| Option                                                        | Benefits                                                                                              | Costs / constraints                                                                                                  | Decision                                                                 |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| LWC + locally packaged official widget                        | Fits existing sites; reproducible deployment; component controls lifecycle; no runtime CDN dependency | Must verify DOM, CSS, asset paths, loader support, and runtime isolation                                             | Preferred for the embedded screen                                        |
| Contained light-DOM widget host inside a shadow-DOM LWC shell | Makes third-party DOM and CSS integration easier while retaining an outer boundary                    | Light DOM has weaker encapsulation; ancestor shadow boundaries can still affect global queries                       | Use if the normal component mount fails                                  |
| Okta CDN via LWR privileged scripts                           | Official LWR mechanism for scripts needing access across shadow boundaries                            | Requires host allowlisting and Relaxed CSP for remote head markup; asynchronous/global loading complicates lifecycle | Conditional fallback after component approaches                          |
| Separate HTML / Visualforce / external page in an iframe      | Gives the widget its own document and stylesheet environment                                          | Adds hosting, framing policy, resizing, accessibility, and later cross-origin redirect/session work                  | Avoid as the initial architecture                                        |
| Okta-hosted sign-in + Salesforce OIDC provider                | Less widget maintenance; authentication controlled by Okta; strong candidate for production SSO       | Needs tenant details; sign-in screen is hosted outside the Experience page                                           | Reconsider for the authentication milestone if redirect UX is acceptable |
| Hand-built sign-in screen                                     | Can demonstrate the design without tenant details                                                     | Does not demonstrate actual Okta widget compatibility                                                                | Visual fallback only                                                     |

Salesforce supports third-party resources in LWCs and documents `lwc:dom="manual"` for a library-owned mount. Start there. [LWC library guidance](https://developer.salesforce.com/docs/platform/lwc/guide/js-third-party-library).

If DOM or CSS behavior requires it, create an internal `oktaWidgetHost` light-DOM child beneath the exposed shadow-DOM `oktaSignInPanel` shell. Use an owned element reference rather than document-wide selectors, load styles where they reach the mount, and keep branding overrides within the widget container. Salesforce recommends placing light-DOM components beneath a shadow-DOM ancestor. This structure eases integration but does not guarantee compatibility with a library that traverses the global document. [Light DOM guidance](https://developer.salesforce.com/docs/platform/lwc/guide/create-light-dom.html).

For a library that demonstrably needs access across shadow boundaries, LWR provides `<x-oasis-script>`. It runs asynchronously in a special iframe and requires explicit global import/export where needed. Remote head-markup loading requires Relaxed CSP and allowlisting. This is a supported alternative with a broader execution scope, not a default requirement for embedding Okta. [LWR privileged scripts](https://developer.salesforce.com/docs/platform/exp-cloud-lwr/guide/advanced-privileged-script.html).

For future production authentication, Okta recommends hosted redirect login for most integrations. If keeping the credential form inside Experience Cloud is essential, continue the embedded approach and prove its Salesforce session integration. If that requirement is flexible, evaluate an Okta-hosted branded page and Salesforce-managed OIDC callback first. This may reduce maintenance and custom session handling. [Okta deployment models](https://developer.okta.com/docs/concepts/redirect-vs-embedded/).

### Library integration

Acquire the exact stable npm package and package its prebuilt distribution assets as a Salesforce static resource, preserving license notices. Do not import npm source directly into Salesforce LWC source or add React solely to host the widget: the widget is self-contained. Keep a lockfile and a packaging script so upgrades are repeatable. Use a bundle that supports the preview experiment; once the actual tenant engine is known, evaluate the smaller engine-specific bundle. [Official widget packaging guidance](https://github.com/okta/okta-signin-widget#embedded-self-hosted).

Load JavaScript and CSS once through the platform-supported loader, verified in Enhanced LWR. Mount only after assets and the component-owned container are ready. Use the widget's `ready` / `afterRender` event to detect a visible screen; its rendering promise represents the authentication result and must not be treated as a load-completion signal. Remove the widget and listeners when leaving the page. [Release-specific widget implementation](https://github.com/okta/okta-signin-widget/blob/okta-signin-widget-7.50.0/src/widget/OktaSignIn.ts).

Maintain explicit modes: `previewClassic` for the isolated real-library display experiment, `previewVisual` for the fallback, and a future `configuredIdentityEngine` mode. Authentication remains unavailable in both preview modes. Enforce an inert mount plus capture-level interaction guards before widget initialization; CSS-only disabling is insufficient. Verify this with keyboard and network checks. A successful preview must not be described as proof of Identity Engine, MFA, OIDC, or Salesforce session behavior.

Do not disable Lightning Web Security or Locker to make the component work. If a broader supported integration mechanism is needed, record the failed check and the exact CSP/runtime changes before choosing it.

### Configuration

Use Builder properties for presentation settings and a small configuration adapter for future Okta settings. Apex is unnecessary for a static preview. Later, a dedicated Custom Metadata record and narrowly scoped configuration service can supply public configuration if needed.

| Setting                                | Current milestone                                       | Later use                                              |
| -------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------ |
| Mode                                   | `previewClassic` if verified; otherwise `previewVisual` | `configuredIdentityEngine` after separate verification |
| Heading, logo, accent color            | Configured per page                                     | Shared branding shell                                  |
| Okta domain / issuer                   | Unset                                                   | Verified tenant and authorization server               |
| Client ID                              | Unset                                                   | Approved OIDC application                              |
| Redirect URI                           | Unset                                                   | Defined by the chosen Salesforce session flow          |
| Identity Engine / widget compatibility | Pending                                                 | Confirm with Okta administrator                        |

No client secret belongs in component properties, static resources, or browser responses. Do not copy the reference site's configuration field names unless they serve the final design.

## 6. Work sequence and deliverables

| Step                     | Work                                                                                                                                                  | Exit condition                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 1. Baseline              | Verify target site, current login behavior, page metadata, and branding                                                                               | Target and preview route documented                                                                              |
| 2. Rendering spike       | Confirm latest stable release; test official library display-only rendering, then normal and contained light-DOM mounts; inspect all network requests | Exact version and mount choice recorded; actual rendering demonstrated or configuration/runtime blocker recorded |
| 3. Screen implementation | Build the brand shell and preview behavior; retain the widget adapter                                                                                 | Visible screen without authentication or credential submission                                                   |
| 4. Site integration      | Add the component to the preview page and validate guest access                                                                                       | Page opens outside an authenticated Salesforce session                                                           |
| 5. Browser review        | Check mobile/desktop layout, keyboard behavior, errors, and requests                                                                                  | Acceptance criteria pass with screenshots and a short test record                                                |
| 6. Handoff               | Record files, route, widget version, configuration needs, and rollback                                                                                | Reviewable implementation and later-authentication checklist                                                     |

Planning estimate: approximately 2–4 working days for one site, subject to the rendering spike and access to the org. Merchant reuse is a separate follow-on after Customer review. These are estimates, not commitments.

## 7. Acceptance criteria

- The preview route opens in a fresh private browser session without requiring Salesforce login.
- The sign-in panel is usable at phone, tablet, and desktop widths, without horizontal overflow.
- Labels, text contrast, focus behavior, and status messaging are accessible; disabled controls remain understandable.
- Both preview modes make no external network requests beyond approved site delivery; specifically, no Okta initialization, authentication, authorization, token, telemetry, or session requests and no sign-in redirect. Validate the real-library experiment under blocked outbound network conditions as well as normal browser conditions.
- No passwords or tokens appear in storage, logs, analytics, or network submissions.
- The exact stable package version is recorded; JavaScript and CSS match; static resource paths resolve without a runtime CDN dependency.
- Repeated navigation does not create duplicate widget instances or duplicate event handlers.
- Missing configuration and library failures display a clear state.
- Existing Customer and Merchant login paths continue working.
- Delivery explicitly records whether the screen uses the actual Okta widget or the visual preview. Actual-widget acceptance requires evidence of the official library rendering; a visual preview does not satisfy that criterion.

## 8. Authentication milestone later

When Okta details become available, obtain the domain, issuer, client ID, engine, application type, enabled grants, policies, trusted origins, and intended redirect/logout URLs. Secrets, if a server-side flow needs them, should be configured through an appropriate secure channel.

Select and prove the flow that establishes a Salesforce Experience Cloud session. An Okta token or Okta session alone is not proof of a Salesforce site session. Do not assume the embedded widget can directly feed the existing Google OIDC provider or a Salesforce callback.

The later plan must cover the callback/session bridge, user mapping, site membership, MFA and recovery, error handling, logout, and tests with authorized and unauthorized users. Only after those checks should the preview replace the operational login page. Remove the temporary Classic preview configuration when enabling production authentication; do not infer the tenant engine from the preview setting.

## 9. Decisions to confirm before implementation

1. Customer first, Merchant first, or both? Current assumption: Customer first.
2. Match the dark blue reference closely, or use another logo and brand? Current assumption: reference-inspired Customer branding.
3. Is a clearly labeled visual preview acceptable if the official widget needs tenant details to render? Current recommendation: yes for the immediate screen milestone, with actual-widget rendering tracked separately.
4. Keep `/okta-preview` during development, or make this the main sign-in page immediately? Current recommendation: preview route until real authentication is verified.

## 10. Workspace references

- `docs/okta-experience-sso/company-portal-sso-investigation.json`: observed reference-site structure and widget integration.
- `docs/okta-experience-sso/report.md`: existing Customer/Merchant LWR sites and saved publication status.
- `docs/okta-experience-sso/google-widget-feasibility.md`: earlier distinction between an identity-provider widget and a Salesforce browser session.
- `force-app/main/default/digitalExperiences/site/Customer2/` and `Merchant2/`: existing site source.
