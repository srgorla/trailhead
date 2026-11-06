/**
 * Companion example: without sharing bypasses record-level sharing in system-mode
 * operations. User-mode database operations still enforce the running user's access.
 */
public without sharing class ApexSecurityPlaygroundWithoutSharing {
  /** System-mode query follows this class's without-sharing context. */
  @AuraEnabled(cacheable=true)
  public static List<Account> queryWithoutSharing() {
    return [
      SELECT Id, Name, Industry
      FROM Account
      WITH SYSTEM_MODE
      ORDER BY Name
      LIMIT 50
    ];
  }

  /** User mode overrides the class sharing mode and enforces the user's access. */
  @AuraEnabled(cacheable=true)
  public static List<Account> queryUserModeDespiteWithoutSharing() {
    return [
      SELECT Id, Name, Industry
      FROM Account
      WITH USER_MODE
      ORDER BY Name
      LIMIT 50
    ];
  }
}
