# Merchant API key browser decryption POC

Deployed to `aforce_de`: `merchantKeyReveal`, its `merchantKeyCrypto` module, the private `Merchant_Key_Demo__c` object and `MerchantKeyDemoAccess` permission set. Permission set assigned to the current administrator (`sgorla143@agentforce.com`).

## Run in mylwr

The component is available to Experience Builder, but has **not yet been placed on a mylwr page or verified in the live Salesforce browser**. No browser connection was available. The LWR skill also requires `execute_metadata_action` for site page metadata changes; that tool was unavailable. No site bundle changes or publishing were performed.

1. Open Experience Builder for **mylwr** in aforce_de.
2. Create a dedicated authenticated test page and add **Merchant API Key Reveal POC** from Custom Components.
3. Preview the page as the administrator. For merchant testing, assign **Merchant Key Demo Access** to a compatible authenticated Experience Cloud test user. Verify license/object support and site membership. Do not grant guest access.
4. Click **Generate demo decryption key**. Keep a temporary secure copy of the displayed Base64 key. It is random 256-bit key material, not a password.
5. Enter a fake API key such as `demo_merchant_A_123` and click **Encrypt in browser and save ciphertext**.
6. Keep the new record ID. The key and plaintext inputs clear after save.
7. Re-enter the saved decryption key and click **Reveal API key**. The value hides after 30 seconds. **Hide and clear inputs** locks immediately.
8. Refresh, enter the record ID and matching key, and reveal again. This checks Salesforce persistence rather than only an in-memory round trip.
9. Try a different generated key against that record. Decryption must fail.
10. Inspect the save request in browser developer tools: its fields contain only `Encrypted_Payload__c`. Inspect the stored record: the JSON contains version, algorithm, nonce and ciphertext with authentication tag, without plaintext or the key.
11. Test as a second user without record access: reading the record must fail. Separately test a user who can read ciphertext but has a different key: decryption must fail.

## Implementation

The browser generates keys with `crypto.getRandomValues`, imports AES keys as non-extractable, and uses AES-256-GCM with a fresh 96-bit nonce and a 128-bit authentication tag. The static authenticated context binds this demo's payload format/version. `createRecord` sends only the envelope to Salesforce. `getRecord` loads the envelope with Lightning Data Service, enforcing object/field permissions and record access. There is no Apex controller and no server-side decryption.

Object sharing defaults are Private internally and externally. The permission set grants create/read, plus encrypted-field access, without View All or Modify All. This POC uses record ownership/sharing; **it does not implement merchant membership or automatic sharing among a merchant's users**. Administrative permissions may still allow ciphertext access.

Plaintext and entered keys live in component memory and input controls, without localStorage/sessionStorage persistence. Clearing removes application references and displayed values; JavaScript cannot guarantee memory zeroization. The Base64 key input is deliberately visible for this demo's manual key handoff. Browser scripts, extensions and a compromised device remain threats.

This is a manual symmetric-key POC, not the per-user envelope encryption design discussed earlier. It does not implement public-key enrollment, user grants, key backups/recovery, merchant-bound authenticated metadata, rotation, revocation, or a REST integration. Anyone with ciphertext and its matching key can decrypt outside Salesforce. Use fake secrets only.

## Validation

- Salesforce dry-run: succeeded, 5/5 metadata components.
- Deployment: succeeded, job `0AfgL00000aU6pdSAC`.
- Crypto verification (`node scripts/merchant-key-poc/verify-crypto.mjs`): correct-key round trip, wrong-key rejection, ciphertext and nonce tamper rejection, fresh nonce, malformed key rejection, ciphertext-only envelope.
- LWC Jest: 2 passing tests covering ciphertext-only save requests and no plaintext on decryption failure.
- ESLint: passed for the new modules and component tests.
- Live browser / Lightning Web Security / merchant-user / mylwr placement checks: pending.
