/**
 * Small, read-only examples for comparing Apex record sharing and SOQL access modes.
 * Run each method as a user with deliberately limited Account access and compare results.
 *
 * This class is compiled at API 66 so the legacy WITH SECURITY_ENFORCED example remains
 * available. See ApexSecurityPlayground.md before changing its API version.
 */
public with sharing class ApexSecurityPlayground {
  /** Class sharing applies; object and field permissions are not checked by this query. */
  @AuraEnabled(cacheable=true)
  public static List<Account> queryWithSharingOnly() {
    return [SELECT Id, Name, Industry FROM Account ORDER BY Name LIMIT 50];
  }

  /** User mode enforces sharing, object permissions, FLS, and other user data-access rules. */
  @AuraEnabled(cacheable=true)
  public static List<Account> queryUserMode() {
    return [
      SELECT Id, Name, Industry
      FROM Account
      WITH USER_MODE
      ORDER BY Name
      LIMIT 50
    ];
  }

  /**
   * Legacy CRUD/FLS query check. Class sharing still applies, but this clause has
   * limitations compared with USER_MODE. Retained solely for learning/comparison.
   */
  @AuraEnabled(cacheable=true)
  public static List<Account> querySecurityEnforced() {
    return [
      SELECT Id, Name, Industry
      FROM Account
      WITH SECURITY_ENFORCED
      ORDER BY Name
      LIMIT 50
    ];
  }

  /** Explicit system-mode query; class sharing still applies to record visibility. */
  @AuraEnabled(cacheable=true)
  public static List<Account> querySystemModeWithSharing() {
    return [
      SELECT Id, Name, Industry
      FROM Account
      WITH SYSTEM_MODE
      ORDER BY Name
      LIMIT 50
    ];
  }
}
