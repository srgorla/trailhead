# Google OIDC setup

Provider deployed to aforce_de: GoogleOIDC (0SOgL000002VhXNWA0), display name Google Sign-In, type OpenIdConnect.

Credentials read from .env.google-oidc without printing values. Local env file has permissions 600 and is ignored by Git. Temporary metadata files containing credentials were removed after deployment.

Authorize endpoint: https://accounts.google.com/o/oauth2/v2/auth
Token endpoint: https://oauth2.googleapis.com/token
User-info endpoint: https://openidconnect.googleapis.com/v1/userinfo
Issuer: https://accounts.google.com
Scopes: openid email profile

Validation 0AfgL00000a3K0fSAE and deployment 0AfgL00000a3K3tSAE succeeded.

Callback verified from Salesforce's actual redirect to Google, without signing in:
https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com/services/authcallback/GoogleOIDC

Google action: add this callback under Authorized redirect URIs on the existing Web Application OAuth client, then save.

The current Headless 360 MCP connection failed token refresh with invalid_request: scope parameter not supported. The provider deployment used authenticated sf CLI instead. No Google account login, token exchange, or user login was tested.

Registration handler GoogleOidcRegistrationHandler is now deployed and attached to GoogleOIDC. Execute Registration As is the existing active admin sgorla143@agentforce.com. Remaining: resolve site assignments and the sgorla724 Gmail/Federation ID discrepancy, enable the provider on Customer and Merchant, enforce SSO-only login, apply LWR branding, activate/publish, and run end-to-end tests. Both sites remain unpublished.

## Existing-user mapping

The handler requires a nonempty Google subject and a verified personal Gmail email. It matches the normalized Google email to User.FederationIdentifier using a bind-variable query with WITH USER_MODE. Exactly one matching active user is required. It does not create users, overwrite notification Email or Federation ID, or grant membership. On later logins it revalidates that the identity maps to the same Salesforce user.

Observed records:

- sgorla@gmail.com: active System Administrator, FederationIdentifier sgorla@gmail.com.
- mutyalaswetha@gmail.com: active Customer Community Plus user, FederationIdentifier mutyalaswetha@gmail.com; notification Email sgorla724@gmail.com.
- No user currently matches FederationIdentifier sgorla724@gmail.com.

No user identity fields or access assignments were changed. Asked the user which sites each account should access and whether the external user's Federation ID should stay mutyalaswetha@gmail.com or change to sgorla724@gmail.com. These choices remain pending.

Handler validation 0AfgL00000a3KwjSAE passed. Deployment 0AfgL00000a3L4nSAE passed with four tests, zero failures, and 28/28 handler executable lines covered (100%). Tests cover normalized Federation ID matching, notification-email preservation, unverified/unknown/inactive/non-Gmail rejection, wrong existing links, and verified/malformed raw user-info claims. Actual Google callback/login claims still need an end-to-end test.

Analyzer: Salesforce Code Analyzer PMD found 0 severity-1 and 0 severity-2 violations, 7 moderate and 11 low findings. The temporary raw scan output was removed during cleanup; findings included global modifiers and documentation/style recommendations. The global registration-handler signature follows Salesforce's Auth.RegistrationHandler convention.

User approved keeping all user identity fields unchanged and granting both site memberships to the matching existing users. Assigned Customer_Site_Access and Merchant_Site_Access to the active users with Federation IDs sgorla@gmail.com and mutyalaswetha@gmail.com. Four assignments verified. No user has Federation ID sgorla724@gmail.com, so that Google identity remains unmatched. Sites are still unpublished; membership does not complete SSO configuration.

## Site authentication services

GoogleOIDC enabled for both replacement LWR sites through supported AuthConfigProviders create calls. Customer configuration 07TgL000000QxVtUAK has junction 07UgL0000001xR3UAI; Merchant configuration 07TgL000000QxXVUA0 has junction 07UgL0000001xSfUAI. Both configurations now report AuthOptionsAuthProvider=true.

Both still report AuthOptionsUsernamePassword=true. AuthConfig is not updateable through REST; Tooling API does not expose AuthConfig. Browser runtime discovery returned no available browsers. Thus password-login disabling remains a required UI step: Workspaces > Administration > Login & Registration > Authentication Services > deselect Login Form; retain Google Sign-In. No publishing or activation performed while password login remains enabled.

Additional pending input: confirm Google Authorized redirect URIs contains the verified callback URL. Google account consent and end-to-end login testing require the user's browser interaction.

## Current status — 2026-10-11

User approved retaining Google SSO and username/password options. Disabling native login is no longer required. Both users matching existing Federation IDs have both site permission sets; sgorla724@gmail.com remains unmatched by design.

LoginHistory recorded successful Third Party SSO for sgorla@gmail.com on both site login paths. Both Networks were still UnderConstruction at the time of the reported login loop. Activated both through deployment 0AfgL00000a3OsHSAU and published Customer (08PgL00001IJRkdUAH, Complete) and Merchant (retry 08PgL00001IKpRiUAL, Complete). Initial Merchant publication 08PgL00001IJxXcUAL returned an internal Salesforce error.

Public login URLs: /customer/login and /merchant/login on the org my.site.com domain. Browser authentication/landing-page retest by the user is pending; successful LoginHistory alone does not prove the complete site session works. Distinct LWR branding remains pending. Earlier unpublished/SSO-only notes above are superseded by this status.
