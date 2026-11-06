/** Maps a verified Google identity to an existing, active Salesforce Federation ID. */
global with sharing class GoogleOidcRegistrationHandler implements Auth.RegistrationHandler {
  private static final String DENIED = 'Google identity is not approved for this Salesforce account.';

  /** Returns an existing user; automatic user provisioning is deliberately disabled. */
  global User createUser(Id portalId, Auth.UserData data) {
    return resolveUser(data);
  }

  /** Revalidates an existing identity link without changing user identity fields. */
  global void updateUser(Id userId, Id portalId, Auth.UserData data) {
    if (userId == null || resolveUser(data).Id != userId) {
      throw new IdentityMappingException(DENIED);
    }
  }

  private static User resolveUser(Auth.UserData data) {
    if (
      data == null ||
      String.isBlank(data.identifier) ||
      String.isBlank(data.email) ||
      !hasVerifiedEmail(data)
    ) {
      throw new IdentityMappingException(DENIED);
    }
    String identityEmail = data.email.trim().toLowerCase();
    // This handler is limited to personal Gmail identities for the approved proof of concept.
    if (!identityEmail.endsWith('@gmail.com')) {
      throw new IdentityMappingException(DENIED);
    }
    // Execute Registration As must have access to these fields. No CRUD/FLS bypass is used.
    List<User> matches = [
      SELECT Id, IsActive, FederationIdentifier
      FROM User
      WHERE FederationIdentifier = :identityEmail
      WITH USER_MODE
      LIMIT 2
    ];
    if (matches.size() != 1 || !matches[0].IsActive) {
      throw new IdentityMappingException(DENIED);
    }
    return matches[0];
  }

  private static Boolean hasVerifiedEmail(Auth.UserData data) {
    if (
      data.attributeMap != null &&
      'true'.equalsIgnoreCase(data.attributeMap.get('email_verified'))
    ) {
      return true;
    }
    if (String.isBlank(data.userInfoJSONString)) {
      return false;
    }
    try {
      Map<String, Object> claims = (Map<String, Object>) JSON.deserializeUntyped(
        data.userInfoJSONString
      );
      return claims != null && claims.get('email_verified') == true;
    } catch (Exception error) {
      throw new IdentityMappingException(DENIED, error);
    }
  }

  global class IdentityMappingException extends Exception {
  }
}
