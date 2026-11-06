/** Authenticated entry point; receives only public keys, ciphertext and wrapped keys. */
public with sharing class MerchantTeamVaultController {
  /**
   * Dispatches one explicit vault action. No passphrase or plaintext is accepted.
   * @param action Vault operation name.
   * @param requestJson Encrypted payload and identifiers for this operation.
   * @return JSON containing only the caller's authorized encrypted material.
   */
  @AuraEnabled
  public static String execute(String action, String requestJson) {
    try {
      return JSON.serialize(
        MerchantTeamVaultStore.execute(action, requestJson)
      );
    } catch (MerchantTeamVaultStore.VaultException error) {
      throw new AuraHandledException(error.getMessage());
    } catch (Exception error) {
      throw new AuraHandledException(
        'Vault operation failed. Check your membership and request, then retry.'
      );
    }
  }
}
