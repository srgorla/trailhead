# Merchant team vault POC

The existing API Keys component now contains **Merchant team vault — personal keys** above the original manual-key demo. It uses new private objects; the original demo records are not migrated or changed.

## Team setup

Target: `aforce_de`, `mylwr`, existing `/api-keys` page.

Merchant: **Burlington Textiles Corp of America**.

- **Jack Roger**: active member, may create secrets, receive grants, and grant/revoke access for secrets he already possesses.
- **Harry Cane**: active member, may create secrets and reveal secrets explicitly granted to him. He cannot grant access onward.
- Other users, including an internal administrator without an explicit vault membership, receive an access-denied response from the application. Salesforce administrators retain their normal platform powers over records and code.

Memberships are administrator-provisioned. External users must also still belong to the membership Account through their Contact; mismatches and inactive users/members are rejected. There is one membership per user in this POC. End users cannot choose their merchant, add members, change grant permissions, or replace registered public keys through the vault API.

## Demonstrate personal-key sharing

1. Log into the site as **Jack**. Open **API Keys**. Enter a separate encryption passphrase of at least 16 characters and click **Enroll my personal key**. Keep the passphrase safe; there is no recovery/reset flow.
2. Log in as **Harry** in another browser/session. Enroll his personal key with his own different passphrase. Harry should send Jack his public-key fingerprint through a trusted channel.
3. As Jack, enter his passphrase again and click **Unlock my key**. Supply a nonconfidential label and a fake API secret, then click **Encrypt and save team secret**. Select the secret and click **Reveal using my key**.
4. Before receiving a grant, Harry has no entry for that secret in **Secrets granted to me**. Knowing the secret record ID is insufficient: the server checks for his own matching recipient grant.
5. As Jack, click **Refresh team and secrets** to see newly enrolled Harry. Select Harry, compare the displayed fingerprint to the value he supplied, and check the verification checkbox. With Jack's key unlocked and his secret selected, click **Grant teammate access**.
6. As Harry, refresh, unlock with **Harry's passphrase**, select the newly granted secret, and click **Reveal using my key**. Neither Jack's passphrase nor his private key is shared.
7. As Jack, select Harry and the secret, then click **Revoke teammate retrieval**. Harry's next read request must fail. A value already displayed stays visible until Hide/Lock/timeout; previously copied values and keys cannot be recalled. Rotate the actual API credential when necessary.

Keys lock after five minutes, on manual Lock, when leaving the component, and when the document becomes hidden. Reveals hide after 30 seconds. Clearing JavaScript references does not guarantee physical memory zeroization.

Existing secrets from the original demo can be revealed there and entered as new team secrets. Use fake secrets. The new vault uses a different encryption envelope and separate recipient grants.

## Cryptography and persistence

- Individual RSA-OAEP 3072-bit key pair, SHA-256; SHA-256 fingerprint over SPKI bytes.
- Private key exported only during enrollment for browser encryption of its backup. The unlocked private key is imported non-extractable and retained only in component memory.
- Encrypted backup: PBKDF2-HMAC-SHA-256, 600,000 iterations, random 128-bit salt; AES-256-GCM with random 96-bit nonce and 128-bit tag. Authenticated data binds backup version, merchant, user and public-key fingerprint.
- Each secret gets an independent random 256-bit data key and 96-bit nonce. AES-GCM authenticated data binds envelope version, merchant and random resource identifier.
- Each data key is wrapped for a recipient with RSA-OAEP. The OAEP label binds merchant, resource and recipient fingerprint, preventing substitution of grants between users/resources.
- Enrollment, creation and sharing requests contain only public keys, encrypted private-key backups, ciphertext, wrapped data keys and identifiers. Passphrases, plaintext private keys, unwrapped data keys and plaintext API secrets are never passed to Apex by these components.
- `Merchant_Vault_Member__c` holds membership, public key, fingerprint and encrypted private-key backup.
- `Merchant_Vault_Secret__c` holds merchant/resource context and encrypted API secret.
- `Merchant_Vault_Grant__c` holds one immutable recipient-wrapped data key per secret/member. Grant uniqueness prevents overwrite. Revocation removes that grant.

The merchant-user permission set grants the custom permission and controller access, **no direct object CRUD**. A thin `with sharing` controller invokes a dedicated `without sharing` store. The store deliberately uses explicit `SYSTEM_MODE` for its private records, guarded by the custom permission, current user membership, current Contact Account, tenant filters and recipient grants. CRUD/FLS is intentionally not the authorization boundary for these objects: direct grants would let users overwrite membership and cryptographic records. PMD `ApexCRUDViolation` is suppressed only on this documented persistence boundary. Access should remain through its guarded controller; do not grant end users direct object permissions.

A separate **Merchant Vault Provisioning Admin** permission set grants membership record/field access to the internal provisioning administrator only. It is never assigned to Jack or Harry.

The service receives no merchant ID to select the caller's tenant; it derives that from administrator-provisioned membership and validates external Contact membership on every request. Public-key replacement is rejected. Grantors need both Can Grant and their own current grant to the secret. Only the current user's encrypted backup is returned by state; teammates' backups are never returned.

## Limits

This is a POC, with no merchant recovery key, lost-passphrase reset, passphrase change, key rotation, multi-merchant membership, API credential rotation, production audit events or external REST integration. Key loss can make data unrecoverable. Ciphertext backups can be subject to offline passphrase guessing, so choose strong unique passphrases. Browser/page-script compromise can expose unlocked secrets; this design trusts the delivered application code. Resource lists are capped at 200, intended for this small demo.

## Validation and deployment

- Local crypto checks: `node scripts/merchant-key-poc/verify-team-crypto.mjs`.
- LWC tests: `npm run test:unit -- -- --runInBand --runTestsByPath force-app/main/default/lwc/merchantTeamVault/__tests__/merchantTeamVault.test.js force-app/main/default/lwc/merchantKeyReveal/__tests__/merchantKeyReveal.test.js`.
- Apex test class: `MerchantTeamVaultControllerTest` (12 tests).
- Deployment scope: `manifest/merchant-team-vault.xml`.
- `scripts/merchant-key-poc/stage-team-package.py` stages an isolated deployment project under `/private/tmp/merchant-team-project` because an unrelated existing UIBundle prevents whole-project manifest resolution. This leaves the original project metadata untouched and excludes Jest test files from deployment.
- `scripts/merchant-key-poc/provision-team.py` validates the three object schemas, verifies Jack and Harry share a Contact Account, provisions their memberships and assigns the permission set. It refuses to reassign an existing membership to another merchant and never touches enrollment keys.
- Live browser verification is pending because no browser connection was available during implementation. Public/private key enrollment must be performed by Jack and Harry in their browsers; no private keys or passphrases are seeded by the deployment.

Validation results: 12 Apex tests passed (controller 100%, store 223/234 lines = 95.3%); 6 LWC tests passed; local crypto checks passed. Code Analyzer reported 0 severity-1 and 0 severity-2 findings, with 43 moderate and 8 low maintainability/documentation findings remaining. See `artifacts/merchant-team-vault-results.json` for the deployment ID and counts.

Deployment completed: `0AfgL00000aUEwrSAG`. Jack and Harry memberships were provisioned and their `MerchantTeamVaultAccess` assignments verified. Both start without enrolled cryptographic keys; each enrolls from their own browser.
