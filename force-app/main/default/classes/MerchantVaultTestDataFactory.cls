/** Creates isolated users, permissions and merchant memberships for vault tests. */
@IsTest
public with sharing class MerchantVaultTestDataFactory {
  /** Creates four users across two merchants; the last has no vault permission. */
  public static void createFixture() {
    List<User> users = new List<User>();
    String suffix = EncodingUtil.convertToHex(Crypto.generateAesKey(128));
    for (Integer index = 0; index < 4; index++) {
      users.add(
        new User(
          Username = 'vault.' + index + '.' + suffix + '@example.invalid',
          Email = 'vault@example.invalid',
          LastName = 'VaultTest' + index,
          Alias = 'vtest' + index,
          TimeZoneSidKey = 'America/Chicago',
          LocaleSidKey = 'en_US',
          EmailEncodingKey = 'UTF-8',
          LanguageLocaleKey = 'en_US',
          ProfileId = UserInfo.getProfileId()
        )
      );
    }
    insert users;
    PermissionSet permission = [
      SELECT Id
      FROM PermissionSet
      WHERE Name = 'MerchantTeamVaultAccess'
      LIMIT 1
    ];
    List<PermissionSetAssignment> assignments = new List<PermissionSetAssignment>();
    for (Integer index = 0; index < 3; index++)
      assignments.add(
        new PermissionSetAssignment(
          AssigneeId = users[index].Id,
          PermissionSetId = permission.Id
        )
      );
    insert assignments;
    System.runAs(new User(Id = UserInfo.getUserId())) {
      List<Account> merchants = new List<Account>{
        new Account(Name = 'Vault Merchant A'),
        new Account(Name = 'Vault Merchant B')
      };
      insert merchants;
      List<Merchant_Vault_Member__c> members = new List<Merchant_Vault_Member__c>();
      for (Integer index = 0; index < 4; index++) {
        members.add(
          new Merchant_Vault_Member__c(
            Merchant__c = merchants[index == 2 ? 1 : 0].Id,
            Member_User__c = users[index].Id,
            User_Key__c = String.valueOf(users[index].Id),
            Active__c = true,
            Can_Grant__c = index == 0
          )
        );
      }
      insert members;
    }
  }
}
