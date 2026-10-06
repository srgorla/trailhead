# External Client App JWT Bearer IP Restriction Findings

## Test setup

- Org: `aforce_de` (Coral Cloud Resorts)
- External Client App: `JWT IP Restriction Test`
- OAuth flow: JWT bearer
- Test user: `mac@ma.com`
- Permission set assigned to the user: `JWT IP Restriction Test Access`

## Observed results

| Configuration tested                                                                             | Result                                                                                         |
| ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Login IP ranges configured on the user's profile                                                 | This was the only tested configuration that restricted JWT bearer authentication by source IP. |
| ECA IP setting set to **Enforce IP Ranges**                                                      | Did not independently restrict JWT bearer authentication.                                      |
| IP ranges added to the ECA's **Refresh Token IP Allowlist**                                      | Did not restrict JWT bearer authentication.                                                    |
| IP ranges added to **Trusted IP Ranges for OAuth Web Server Flow**                               | Did not restrict JWT bearer authentication.                                                    |
| ECA IP Relaxation set to **Relax IP Restrictions**, while the user's profile had login IP ranges | The user could not authenticate.                                                               |

## Conclusion from this test run

For this ECA and JWT bearer test, profile login IP ranges were the effective control for restricting the test user's authentication by IP. The ECA IP setting and its refresh-token and OAuth web-server trusted-range settings did not provide an independent JWT bearer allowlist in these tests. Setting IP Relaxation to **Relax IP Restrictions** did not allow authentication when the user's profile had IP ranges configured.

These are observed results for the setup above. They document the tested behavior and are not a claim that every ECA policy or org configuration behaves identically.
