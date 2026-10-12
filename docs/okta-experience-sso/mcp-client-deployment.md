# Headless 360 MCP client deployment

Target: `aforce_de`, Developer Edition, org ID `00DgL000000AF5qUAG`.

App: `CodexHeadless360` (label: Codex Headless 360).

Validation succeeded: `0AfgL00000a1z1VSAQ`.
Deployment succeeded: `0AfgL00000a1z37SAA`; three components created, zero component errors.

Components:

- ExternalClientApplication:CodexHeadless360
- ExtlClntAppOauthSettings:CodexHeadless360OAuth
- ExtlClntAppGlobalOauthSettings:CodexHeadless360GlobalOAuth

Settings: MCP and RefreshToken scopes; PKCE required; named-user JWT enabled; client secret optional; refresh-token secret not required.
Callback registered: `http://localhost:8788/callback/i_5tXcJFjh2O` (Codex-generated callback for the org-specific endpoint).
Contact email reused from the existing Hotel MCP client metadata.

Validation and deployment used explicit --source-dir arguments for these three files. Metadata-name selection initially encountered an unrelated incomplete UIBundle in the repository; no unrelated components were modified.

Callback correction deployed successfully: `0AfgL00000a22CHSAY`.

Further OAuth troubleshooting: retrieved global OAuth metadata confirmed the supplied client ID belongs to CodexHeadless360 and the first callback correction was deployed. Switched from shared login to the org-specific Headless 360 endpoint `https://api.salesforce.com/platform/mcp/v1/d/orgfarm-6f61b5a2b9-dev-ed/develop/platform/headless-360`, which uses the org My Domain for authorization. Codex derived a new callback ID for this endpoint. Salesforce rejected HTTP 127.0.0.1; configured an explicit localhost callback instead. Final callback deployment succeeded: `0AfgL00000a22yfSAA`. Browser authentication is pending. Scopes saved as separate values, `mcp_api` and `refresh_token`.

The user's `.env.headless-360` file contains the credentials, is ignored by Git, and has permissions 600. Credentials were read without printing their values. Codex registered `headless-360` in its user configuration with the supplied client ID and secret, the production-tier server endpoint, and fixed callback port 8788. The user configuration also has permissions 600. The generated authorization URL was opened in the default browser without printing it. OAuth completion remains pending; MCP tool availability and target org are not yet verified.

Remaining: complete browser authentication as the aforce_de user, verify the connection and four tools, and verify the target org before site creation. Salesforce app propagation can take up to 30 minutes. The Salesforce External Client App is separate from the future Okta OIDC application.

MCP authentication completed. Verified successful dispatch against org 00DgL000000AF5qUAG (aforce_de) and used the connection to provision Customer and Merchant.
