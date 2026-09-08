# Coral Cloud MCP in Postman

Import `CoralCloud.postman_environment.json` and select **Coral Cloud MCP — aforce_de**.
Set `coral_client_id` locally to the Consumer Key of **Coral Cloud MCP Client**
in Salesforce External Client App Manager. No client secret is needed.

Create a new **MCP** request named **Coral Cloud Experiences**, select **HTTP**
(Streamable HTTP), and set the URL to `{{coral_mcp_url}}`.

In Authorization, select OAuth 2.0, add authorization to request headers, and
configure a token with these values:

| Setting                 | Value                                |
| ----------------------- | ------------------------------------ |
| Token name              | Coral Cloud MCP                      |
| Header prefix           | Bearer                               |
| Grant type              | Authorization Code (With PKCE)       |
| Authorize using browser | Enabled                              |
| Callback URL            | `{{coral_callback_url}}`             |
| Auth URL                | `{{coral_auth_url}}`                 |
| Access Token URL        | `{{coral_token_url}}`                |
| Client ID               | `{{coral_client_id}}`                |
| Client Secret           | Leave blank                          |
| Code Challenge Method   | SHA-256                              |
| Code Verifier           | Leave blank for automatic generation |
| Scope                   | `{{coral_scope}}`                    |
| Client Authentication   | Send client credentials in body      |

The environment uses this org's My Domain for authentication. Both Postman
callbacks are registered: `https://oauth.pstmn.io/v1/browser-callback` and
`https://oauth.pstmn.io/v1/callback`. If Postman selects the desktop callback,
set `coral_callback_url` to that exact value.

Select **Get New Access Token**, sign in to `aforce_de`, authorize the application,
then select **Use Token** and **Connect**. Keep tokens local to Postman; do not
export them into these repository files.

## Verify the experience tool

Select **Search Coral Cloud Experiences** from the discovered tools. Its API name
is `ExperienceSearchActionapex_ExperienceSearchAction`. Use the discovered input
schema to enter `searchPhrase` = `Yoga` and `guestCount` = `2`; leave other optional
inputs unset. If Postman displays an input array wrapper, enter one request in it.

Expect Beach Yoga Retreat and Sunrise Mountain Yoga, image URLs, USD prices and
two-guest totals, review status, and session availability. Current sample sessions
are in the past, so the default date range can return no scheduled sessions.
Repeat with `searchPhrase` = `ZZZNoSuchExperienceXYZ` to verify `NO_MATCHES`.

Inspect the tool's UI resource association and returned structured data.
The resource is `ui://widget/lightningType/c__experienceSearchMcpResult`.
Postman connection and data verification do not by themselves verify visual HXL
rendering; that still depends on the client's renderer support.

For authentication failures, check the MCP request's OAuth Debugger, the exact
callback match, PKCE SHA-256, and scopes `mcp_api refresh_token`.

## References

- [Salesforce: Configure Postman](https://developer.salesforce.com/docs/platform/hosted-mcp-servers/guide/postman.html)
- [Postman: MCP authorization](https://learning.postman.com/latest-v-12/docs/use/send-requests/protocols/mcp-requests/manage)
- [Postman: OAuth and PKCE](https://learning.postman.com/latest-v-12/docs/use/send-requests/authorization/oauth-20)
