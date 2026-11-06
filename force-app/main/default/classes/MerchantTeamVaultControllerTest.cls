/** Exercises the encrypted vault authorization boundary without real secrets. */
@IsTest
private with sharing class MerchantTeamVaultControllerTest {
  private static final String RESOURCE = '11111111-1111-1111-1111-111111111111';
  @TestSetup
  static void setup() {
    MerchantVaultTestDataFactory.createFixture();
  }
  private static User actor(Integer index) {
    return [
      SELECT Id
      FROM User
      WHERE LastName = :('VaultTest' + index)
      LIMIT 1
    ];
  }
  private static Merchant_Vault_Member__c member(Integer index) {
    Id userId = actor(index).Id;
    return [
      SELECT Id, Merchant__c, Member_User__c, Can_Grant__c, Public_Key__c
      FROM Merchant_Vault_Member__c
      WHERE Member_User__c = :userId
      LIMIT 1
    ];
  }
  private static Map<String, Object> call(
    String action,
    Map<String, Object> request
  ) {
    return (Map<String, Object>) JSON.deserializeUntyped(
      MerchantTeamVaultController.execute(action, JSON.serialize(request))
    );
  }
  private static String wrapping() {
    return EncodingUtil.base64Encode(Blob.valueOf('x'.repeat(384)));
  }
  private static Map<String, Object> enrollRequest(
    Merchant_Vault_Member__c membership
  ) {
    Blob publicBytes = Blob.valueOf('k'.repeat(400));
    return new Map<String, Object>{
      'publicKey' => EncodingUtil.base64Encode(publicBytes),
      'backup' => JSON.serialize(
        new Map<String, Object>{
          'version' => 1,
          'userId' => membership.Member_User__c,
          'merchantId' => membership.Merchant__c,
          'fingerprint' => EncodingUtil.convertToHex(
            Crypto.generateDigest('SHA-256', publicBytes)
          ),
          'ciphertext' => 'encrypted-private-key'
        }
      )
    };
  }
  private static Map<String, Object> createRequest(Id merchantId) {
    return new Map<String, Object>{
      'resource' => RESOURCE,
      'label' => 'Demo secret',
      'wrappedKey' => wrapping(),
      'payload' => JSON.serialize(
        new Map<String, Object>{
          'version' => 2,
          'algorithm' => 'AES-GCM',
          'merchantId' => merchantId,
          'resource' => RESOURCE,
          'ciphertext' => 'encrypted-secret'
        }
      )
    };
  }
  private static Id createOwn() {
    call('enroll', enrollRequest(member(0)));
    return (Id) (String) call('create', createRequest(member(0).Merchant__c))
      .get('secretId');
  }
  private static void denied(String action, Map<String, Object> request) {
    try {
      call(action, request);
      Assert.fail('Unauthorized operation must fail: ' + action);
    } catch (AuraHandledException expected) {
      Assert.isNotNull(expected, 'Controller must sanitize denied requests');
    }
  }
  @IsTest
  static void shouldEnrollAndReadOwnSecret() {
    System.runAs(actor(0)) {
      Test.startTest();
      Id secretId = createOwn();
      Map<String, Object> result = call(
        'read',
        new Map<String, Object>{ 'secretId' => secretId }
      );
      Map<String, Object> state = call('state', new Map<String, Object>());
      Test.stopTest();
      Assert.areEqual(
        wrapping(),
        result.get('wrappedKey'),
        'Only own wrapped key should return'
      );
      Assert.areEqual(
        1,
        ((List<Object>) state.get('secrets')).size(),
        'Creator has exactly one grant'
      );
      Assert.isNotNull(
        state.get('backup'),
        'Caller may retrieve own encrypted backup'
      );
    }
  }
  @IsTest
  static void shouldGrantAndRevokeSameMerchant() {
    Id secretId;
    System.runAs(actor(1)) {
      call('enroll', enrollRequest(member(1)));
    }
    System.runAs(actor(0)) {
      Test.startTest();
      secretId = createOwn();
      Map<String, Object> recipient = call(
        'recipient',
        new Map<String, Object>{ 'memberId' => member(1).Id }
      );
      call(
        'grant',
        new Map<String, Object>{
          'memberId' => member(1).Id,
          'secretId' => secretId,
          'fingerprint' => recipient.get('fingerprint'),
          'wrappedKey' => wrapping()
        }
      );
      Test.stopTest();
    }
    System.runAs(actor(1)) {
      Assert.areEqual(
        wrapping(),
        call('read', new Map<String, Object>{ 'secretId' => secretId })
          .get('wrappedKey'),
        'Teammate can retrieve own grant'
      );
    }
    System.runAs(actor(0)) {
      call(
        'revoke',
        new Map<String, Object>{
          'memberId' => member(1).Id,
          'secretId' => secretId
        }
      );
    }
    System.runAs(actor(1)) {
      denied('read', new Map<String, Object>{ 'secretId' => secretId });
    }
  }
  @IsTest
  static void shouldRejectCrossMerchantRequests() {
    System.runAs(actor(2)) {
      call('enroll', enrollRequest(member(2)));
    }
    Id secretId;
    System.runAs(actor(0)) {
      Test.startTest();
      secretId = createOwn();
      denied(
        'recipient',
        new Map<String, Object>{ 'memberId' => member(2).Id }
      );
      denied(
        'grant',
        new Map<String, Object>{
          'secretId' => secretId,
          'memberId' => member(2).Id
        }
      );
      Test.stopTest();
    }
    System.runAs(actor(2)) {
      denied('read', new Map<String, Object>{ 'secretId' => secretId });
      Map<String, Object> state = call('state', new Map<String, Object>());
      Assert.areEqual(
        0,
        ((List<Object>) state.get('teammates')).size(),
        'Other merchant teammates must stay hidden'
      );
      Assert.areEqual(
        0,
        ((List<Object>) state.get('secrets')).size(),
        'Other merchant secrets must stay hidden'
      );
    }
  }
  @IsTest
  static void shouldRejectReplacementEnrollment() {
    System.runAs(actor(0)) {
      Test.startTest();
      call('enroll', enrollRequest(member(0)));
      denied('enroll', enrollRequest(member(0)));
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectMissingPermission() {
    System.runAs(actor(3)) {
      Test.startTest();
      denied('state', new Map<String, Object>());
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectInactiveMember() {
    Merchant_Vault_Member__c inactive = member(0);
    inactive.Active__c = false;
    update inactive;
    System.runAs(actor(0)) {
      Test.startTest();
      denied('state', new Map<String, Object>());
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectGrantWithoutRole() {
    System.runAs(actor(1)) {
      Test.startTest();
      call('enroll', enrollRequest(member(1)));
      denied(
        'recipient',
        new Map<String, Object>{ 'memberId' => member(0).Id }
      );
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectGrantWithoutPossession() {
    Id secretId;
    System.runAs(actor(0)) {
      secretId = createOwn();
    }
    Merchant_Vault_Member__c other = member(1);
    other.Can_Grant__c = true;
    update other;
    System.runAs(actor(1)) {
      Test.startTest();
      call('enroll', enrollRequest(other));
      denied(
        'grant',
        new Map<String, Object>{
          'secretId' => secretId,
          'memberId' => member(0).Id
        }
      );
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectMerchantContextForgery() {
    System.runAs(actor(0)) {
      Test.startTest();
      call('enroll', enrollRequest(member(0)));
      denied('create', createRequest(member(2).Merchant__c));
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectInvalidAndUnknownRequests() {
    System.runAs(actor(0)) {
      Test.startTest();
      denied('bogus', new Map<String, Object>());
      denied('read', new Map<String, Object>{ 'secretId' => 'invalid' });
      denied('read', new Map<String, Object>());
      denied('create', createRequest(member(0).Merchant__c));
      try {
        MerchantTeamVaultController.execute('state', null);
        Assert.fail('Null input must fail');
      } catch (AuraHandledException expected) {
        Assert.isNotNull(expected, 'Null input sanitized');
      }
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldRejectFingerprintMismatchAndDuplicateGrant() {
    System.runAs(actor(1)) {
      call('enroll', enrollRequest(member(1)));
    }
    System.runAs(actor(0)) {
      Test.startTest();
      Id secretId = createOwn();
      Map<String, Object> target = call(
        'recipient',
        new Map<String, Object>{ 'memberId' => member(1).Id }
      );
      Map<String, Object> request = new Map<String, Object>{
        'memberId' => member(1).Id,
        'secretId' => secretId,
        'fingerprint' => 'wrong',
        'wrappedKey' => wrapping()
      };
      denied('grant', request);
      request.put('fingerprint', target.get('fingerprint'));
      call('grant', request);
      denied('grant', request);
      denied(
        'revoke',
        new Map<String, Object>{
          'secretId' => secretId,
          'memberId' => member(0).Id
        }
      );
      Test.stopTest();
    }
  }
  @IsTest
  static void shouldSanitizeMalformedJson() {
    System.runAs(actor(0)) {
      Test.startTest();
      try {
        MerchantTeamVaultController.execute('state', 'not-json');
        Assert.fail('Malformed JSON must fail without leaking internals');
      } catch (AuraHandledException expected) {
        Assert.isNotNull(expected, 'Malformed input must be sanitized');
      }
      Test.stopTest();
    }
  }
}
