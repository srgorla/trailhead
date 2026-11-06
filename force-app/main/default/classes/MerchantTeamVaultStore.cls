/**
 * Guarded persistence boundary for private vault records, intentionally in system mode.
 * End users have no direct CRUD/FLS on these records. Every operation requires the
 * custom permission and an active administrator-provisioned membership. All selectors
 * constrain merchant and recipient explicitly. No @AuraEnabled methods exist here.
 */
@SuppressWarnings('PMD.ApexCRUDViolation')
public without sharing class MerchantTeamVaultStore {
  public class VaultException extends Exception {
  }
  private static final String DENIED = 'Vault access denied. Ask an administrator to verify your merchant membership.';

  /**
   * @param action Operation name.
   * @param requestJson Ciphertext/public material only.
   * @return Caller-scoped response.
   */
  public static Object execute(String action, String requestJson) {
    Merchant_Vault_Member__c member = currentMember();
    if (
      String.isBlank(action) ||
      String.isBlank(requestJson) ||
      requestJson.length() > 60000
    ) {
      throw new VaultException('Invalid vault request.');
    }
    Map<String, Object> request = (Map<String, Object>) JSON.deserializeUntyped(
      requestJson
    );
    if (request == null)
      throw new VaultException('Invalid vault request.');
    switch on action {
      when 'state' {
        return state(member);
      }
      when 'enroll' {
        return enroll(member, request);
      }
      when 'create' {
        return createSecret(member, request);
      }
      when 'read' {
        return readSecret(member, identifier(request, 'secretId'));
      }
      when 'recipient' {
        return recipient(member, identifier(request, 'memberId'));
      }
      when 'grant' {
        return grant(member, request);
      }
      when 'revoke' {
        return revoke(member, request);
      }
      when else {
        throw new VaultException('Unknown vault action.');
      }
    }
  }

  private static Merchant_Vault_Member__c currentMember() {
    if (
      UserInfo.getUserType() == 'Guest' ||
      !FeatureManagement.checkPermission('Merchant_Team_Vault')
    ) {
      throw new VaultException(DENIED);
    }
    Id userId = UserInfo.getUserId();
    List<Merchant_Vault_Member__c> members = [
      SELECT
        Id,
        Merchant__c,
        Merchant__r.Name,
        Member_User__c,
        Active__c,
        Can_Grant__c,
        Public_Key__c,
        Encrypted_Private_Key__c,
        Key_Fingerprint__c,
        Member_User__r.IsActive,
        Member_User__r.ContactId,
        Member_User__r.Contact.AccountId
      FROM Merchant_Vault_Member__c
      WHERE
        User_Key__c = :String.valueOf(userId)
        AND Member_User__c = :userId
        AND Active__c = TRUE
      WITH SYSTEM_MODE
      LIMIT 1
    ];
    if (members.isEmpty() || !validMembership(members[0]))
      throw new VaultException(DENIED);
    return members[0];
  }

  private static Boolean validMembership(Merchant_Vault_Member__c member) {
    return member.Merchant__c != null &&
      member.Member_User__r.IsActive &&
      (member.Member_User__r.ContactId == null ||
      member.Member_User__r.Contact.AccountId == member.Merchant__c);
  }

  private static Map<String, Object> state(Merchant_Vault_Member__c member) {
    List<Object> teammates = new List<Object>();
    for (Merchant_Vault_Member__c target : [
      SELECT
        Id,
        Merchant__c,
        Member_User__r.Name,
        Member_User__r.IsActive,
        Member_User__r.ContactId,
        Member_User__r.Contact.AccountId,
        Key_Fingerprint__c
      FROM Merchant_Vault_Member__c
      WHERE
        Merchant__c = :member.Merchant__c
        AND Active__c = TRUE
        AND Id != :member.Id
      WITH SYSTEM_MODE
      ORDER BY CreatedDate
      LIMIT 200
    ]) {
      if (
        validMembership(target) && !String.isBlank(target.Key_Fingerprint__c)
      ) {
        teammates.add(
          new Map<String, Object>{
            'id' => target.Id,
            'name' => target.Member_User__r.Name,
            'fingerprint' => target.Key_Fingerprint__c
          }
        );
      }
    }
    List<Object> secrets = new List<Object>();
    for (Merchant_Vault_Grant__c access : [
      SELECT Secret__c, Secret__r.Display_Label__c
      FROM Merchant_Vault_Grant__c
      WHERE
        Member__c = :member.Id
        AND Secret__r.Merchant__c = :member.Merchant__c
        AND Key_Fingerprint__c = :member.Key_Fingerprint__c
      WITH SYSTEM_MODE
      ORDER BY CreatedDate DESC
      LIMIT 200
    ]) {
      secrets.add(
        new Map<String, Object>{
          'id' => access.Secret__c,
          'label' => access.Secret__r.Display_Label__c
        }
      );
    }
    return new Map<String, Object>{
      'memberId' => member.Id,
      'merchantId' => member.Merchant__c,
      'merchantName' => member.Merchant__r.Name,
      'userId' => member.Member_User__c,
      'canGrant' => member.Can_Grant__c,
      'publicKey' => member.Public_Key__c,
      'fingerprint' => member.Key_Fingerprint__c,
      'backup' => member.Encrypted_Private_Key__c,
      'teammates' => teammates,
      'secrets' => secrets
    };
  }

  private static Object enroll(
    Merchant_Vault_Member__c member,
    Map<String, Object> request
  ) {
    // Serialize first enrollment so keys cannot be silently replaced, even concurrently.
    Merchant_Vault_Member__c locked = [
      SELECT Id, Public_Key__c
      FROM Merchant_Vault_Member__c
      WHERE Id = :member.Id
      WITH SYSTEM_MODE
      FOR UPDATE
    ];
    if (!String.isBlank(locked.Public_Key__c))
      throw new VaultException(
        'Already enrolled. Key replacement requires a separate recovery process.'
      );
    String publicKey = text(request, 'publicKey', 1000);
    Blob publicBytes = EncodingUtil.base64Decode(publicKey);
    if (publicBytes.size() < 380 || publicBytes.size() > 600)
      throw new VaultException('Invalid public key.');
    String fingerprint = EncodingUtil.convertToHex(
      Crypto.generateDigest('SHA-256', publicBytes)
    );
    String backup = text(request, 'backup', 16000);
    Map<String, Object> envelope = (Map<String, Object>) JSON.deserializeUntyped(
      backup
    );
    if (
      String.valueOf(envelope.get('userId')) !=
      String.valueOf(member.Member_User__c) ||
      String.valueOf(envelope.get('merchantId')) !=
      String.valueOf(member.Merchant__c) ||
      String.valueOf(envelope.get('fingerprint')) != fingerprint ||
      String.valueOf(envelope.get('version')) != '1'
    )
      throw new VaultException('Invalid private key backup context.');
    locked.Public_Key__c = publicKey;
    locked.Key_Fingerprint__c = fingerprint;
    locked.Encrypted_Private_Key__c = backup;
    Database.update(locked, AccessLevel.SYSTEM_MODE);
    return new Map<String, Object>{ 'enrolled' => true };
  }

  private static Object createSecret(
    Merchant_Vault_Member__c member,
    Map<String, Object> request
  ) {
    requireEnrolled(member);
    String resource = text(request, 'resource', 36);
    if (!Pattern.matches('[a-f0-9-]{36}', resource))
      throw new VaultException('Invalid resource key.');
    String payload = text(request, 'payload', 16000);
    Map<String, Object> envelope = (Map<String, Object>) JSON.deserializeUntyped(
      payload
    );
    if (
      String.valueOf(envelope.get('merchantId')) !=
      String.valueOf(member.Merchant__c) ||
      String.valueOf(envelope.get('resource')) != resource ||
      String.valueOf(envelope.get('version')) != '2' ||
      String.valueOf(envelope.get('algorithm')) != 'AES-GCM'
    )
      throw new VaultException('Invalid secret encryption context.');
    String wrapped = wrappedKey(request);
    Merchant_Vault_Secret__c secret = new Merchant_Vault_Secret__c(
      Merchant__c = member.Merchant__c,
      Resource_Key__c = resource,
      Display_Label__c = text(request, 'label', 80),
      Encrypted_Payload__c = payload
    );
    Database.insert(secret, AccessLevel.SYSTEM_MODE);
    Database.insert(
      new Merchant_Vault_Grant__c(
        Secret__c = secret.Id,
        Member__c = member.Id,
        Grant_Key__c = grantKey(secret.Id, member.Id),
        Wrapped_Key__c = wrapped,
        Key_Fingerprint__c = member.Key_Fingerprint__c
      ),
      AccessLevel.SYSTEM_MODE
    );
    return new Map<String, Object>{ 'secretId' => secret.Id };
  }

  private static Map<String, Object> readSecret(
    Merchant_Vault_Member__c member,
    Id secretId
  ) {
    requireEnrolled(member);
    List<Merchant_Vault_Grant__c> grants = [
      SELECT
        Wrapped_Key__c,
        Secret__r.Encrypted_Payload__c,
        Secret__r.Resource_Key__c,
        Secret__r.Display_Label__c,
        Secret__r.Merchant__c
      FROM Merchant_Vault_Grant__c
      WHERE
        Secret__c = :secretId
        AND Member__c = :member.Id
        AND Key_Fingerprint__c = :member.Key_Fingerprint__c
        AND Secret__r.Merchant__c = :member.Merchant__c
      WITH SYSTEM_MODE
      LIMIT 1
    ];
    if (grants.isEmpty())
      throw new VaultException(
        'No grant exists for this secret and your enrolled key.'
      );
    Merchant_Vault_Grant__c access = grants[0];
    return new Map<String, Object>{
      'payload' => access.Secret__r.Encrypted_Payload__c,
      'resource' => access.Secret__r.Resource_Key__c,
      'merchantId' => access.Secret__r.Merchant__c,
      'wrappedKey' => access.Wrapped_Key__c,
      'label' => access.Secret__r.Display_Label__c
    };
  }

  private static Merchant_Vault_Member__c targetMember(
    Merchant_Vault_Member__c member,
    Id memberId
  ) {
    List<Merchant_Vault_Member__c> targets = [
      SELECT
        Id,
        Merchant__c,
        Public_Key__c,
        Key_Fingerprint__c,
        Member_User__r.Name,
        Member_User__r.IsActive,
        Member_User__r.ContactId,
        Member_User__r.Contact.AccountId
      FROM Merchant_Vault_Member__c
      WHERE
        Id = :memberId
        AND Merchant__c = :member.Merchant__c
        AND Active__c = TRUE
      WITH SYSTEM_MODE
      LIMIT 1
    ];
    if (targets.isEmpty() || !validMembership(targets[0]))
      throw new VaultException(DENIED);
    requireEnrolled(targets[0]);
    return targets[0];
  }

  private static Object recipient(
    Merchant_Vault_Member__c member,
    Id memberId
  ) {
    requireGrantor(member);
    Merchant_Vault_Member__c target = targetMember(member, memberId);
    return new Map<String, Object>{
      'id' => target.Id,
      'publicKey' => target.Public_Key__c,
      'fingerprint' => target.Key_Fingerprint__c,
      'name' => target.Member_User__r.Name
    };
  }

  private static Object grant(
    Merchant_Vault_Member__c member,
    Map<String, Object> request
  ) {
    requireGrantor(member);
    Id secretId = identifier(request, 'secretId');
    readSecret(member, secretId); // Grantor must possess a current grant, not just a role.
    Merchant_Vault_Member__c target = targetMember(
      member,
      identifier(request, 'memberId')
    );
    if (text(request, 'fingerprint', 64) != target.Key_Fingerprint__c)
      throw new VaultException(
        'Recipient key changed. Refresh and verify their fingerprint.'
      );
    String key = grantKey(secretId, target.Id);
    List<Merchant_Vault_Grant__c> existing = [
      SELECT Id
      FROM Merchant_Vault_Grant__c
      WHERE Grant_Key__c = :key
      WITH SYSTEM_MODE
      LIMIT 1
    ];
    if (!existing.isEmpty())
      throw new VaultException('This teammate already has access.');
    Database.insert(
      new Merchant_Vault_Grant__c(
        Secret__c = secretId,
        Member__c = target.Id,
        Grant_Key__c = key,
        Wrapped_Key__c = wrappedKey(request),
        Key_Fingerprint__c = target.Key_Fingerprint__c
      ),
      AccessLevel.SYSTEM_MODE
    );
    return new Map<String, Object>{ 'granted' => true };
  }

  private static Object revoke(
    Merchant_Vault_Member__c member,
    Map<String, Object> request
  ) {
    requireGrantor(member);
    Id secretId = identifier(request, 'secretId');
    readSecret(member, secretId);
    Id memberId = identifier(request, 'memberId');
    if (memberId == member.Id)
      throw new VaultException('Self-revocation is not supported in this POC.');
    targetMember(member, memberId);
    String key = grantKey(secretId, memberId);
    List<Merchant_Vault_Grant__c> existing = [
      SELECT Id
      FROM Merchant_Vault_Grant__c
      WHERE Grant_Key__c = :key
      WITH SYSTEM_MODE
      LIMIT 1
    ];
    Database.delete(existing, AccessLevel.SYSTEM_MODE);
    return new Map<String, Object>{ 'revoked' => true };
  }

  private static void requireEnrolled(Merchant_Vault_Member__c member) {
    if (
      String.isBlank(member.Public_Key__c) ||
      String.isBlank(member.Key_Fingerprint__c)
    )
      throw new VaultException('Enroll your personal key first.');
  }
  private static void requireGrantor(Merchant_Vault_Member__c member) {
    requireEnrolled(member);
    if (!member.Can_Grant__c)
      throw new VaultException('Your merchant membership cannot grant access.');
  }
  private static String wrappedKey(Map<String, Object> request) {
    String wrapped = text(request, 'wrappedKey', 1024);
    if (EncodingUtil.base64Decode(wrapped).size() != 384)
      throw new VaultException('Invalid wrapped data key.');
    return wrapped;
  }
  private static String grantKey(Id secretId, Id memberId) {
    return String.valueOf(secretId) + ':' + String.valueOf(memberId);
  }
  private static String text(
    Map<String, Object> request,
    String name,
    Integer maxLength
  ) {
    String value = (String) request.get(name);
    if (String.isBlank(value) || value.length() > maxLength)
      throw new VaultException('Invalid ' + name + '.');
    return value;
  }
  private static Id identifier(Map<String, Object> request, String name) {
    String value = text(request, name, 18);
    try {
      return Id.valueOf(value);
    } catch (StringException error) {
      throw new VaultException('Invalid identifier.');
    }
  }
}
