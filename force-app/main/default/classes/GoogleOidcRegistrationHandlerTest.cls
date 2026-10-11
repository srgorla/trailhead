@IsTest
private with sharing class GoogleOidcRegistrationHandlerTest {
  private static final String APPROVED_EMAIL = 'approved.oidc.test@gmail.com';

  @TestSetup
  static void setupUsers() {
    List<User> users = new List<User>();
    for (Integer index = 0; index < 3; index++) {
      users.add(
        new User(
          Username = 'oidc.' +
            index +
            '.' +
            UserInfo.getOrganizationId() +
            '.' +
            String.valueOf(DateTime.now().getTime()) +
            '@example.test',
          Email = 'notification.' + index + '@example.test',
          LastName = 'OIDC Test ' + index,
          Alias = 'oidct' + index,
          FederationIdentifier = index == 0
            ? APPROVED_EMAIL
            : (index == 1
                ? 'inactive.oidc.test@gmail.com'
                : 'other.oidc.test@gmail.com'),
          IsActive = index != 1,
          ProfileId = UserInfo.getProfileId(),
          TimeZoneSidKey = 'America/Chicago',
          LocaleSidKey = 'en_US',
          EmailEncodingKey = 'UTF-8',
          LanguageLocaleKey = 'en_US'
        )
      );
    }
    insert users;
  }

  private static Auth.UserData identity(String email, Boolean verified) {
    return new Auth.UserData(
      'google-subject',
      'Test',
      'User',
      'Test User',
      email,
      null,
      email,
      'en_US',
      'OpenIdConnect',
      null,
      new Map<String, String>{ 'email_verified' => String.valueOf(verified) }
    );
  }

  @IsTest
  static void matchesFederationIdInsteadOfNotificationEmail() {
    User expected = [
      SELECT Id, Email
      FROM User
      WHERE FederationIdentifier = :APPROVED_EMAIL
    ];
    GoogleOidcRegistrationHandler handler = new GoogleOidcRegistrationHandler();
    Test.startTest();
    User actual = handler.createUser(
      null,
      identity(' APPROVED.OIDC.TEST@gmail.com ', true)
    );
    handler.updateUser(expected.Id, null, identity(APPROVED_EMAIL, true));
    Test.stopTest();
    Assert.areEqual(expected.Id, actual.Id);
    Assert.areEqual(
      expected.Email,
      [SELECT Email FROM User WHERE Id = :expected.Id].Email,
      'Login must not overwrite the notification email.'
    );
  }

  @IsTest
  static void rejectsUnverifiedUnknownInactiveAndNonGoogleIdentities() {
    List<Auth.UserData> denied = new List<Auth.UserData>{
      null,
      identity(APPROVED_EMAIL, false),
      identity('unknown.oidc.test@gmail.com', true),
      identity('inactive.oidc.test@gmail.com', true),
      identity('test@example.com', true),
      identity('', true)
    };
    GoogleOidcRegistrationHandler handler = new GoogleOidcRegistrationHandler();
    for (Auth.UserData data : denied) {
      try {
        handler.createUser(null, data);
        Assert.fail('Unapproved identities must be rejected.');
      } catch (GoogleOidcRegistrationHandler.IdentityMappingException expected) {
        Assert.isTrue(expected.getMessage().contains('not approved'));
      }
    }
  }

  @IsTest
  static void rejectsIdentityLinkedToDifferentUser() {
    User other = [
      SELECT Id
      FROM User
      WHERE FederationIdentifier = 'other.oidc.test@gmail.com'
    ];
    try {
      new GoogleOidcRegistrationHandler()
        .updateUser(other.Id, null, identity(APPROVED_EMAIL, true));
      Assert.fail(
        'Existing identity link must match the approved Federation ID.'
      );
    } catch (GoogleOidcRegistrationHandler.IdentityMappingException expected) {
      Assert.isTrue(expected.getMessage().contains('not approved'));
    }
  }

  @IsTest
  static void acceptsVerifiedUserInfoAndRejectsMalformedUserInfo() {
    Auth.UserData verified = new Auth.UserData(
      'google-subject',
      'Test',
      'User',
      'Test User',
      APPROVED_EMAIL,
      null,
      APPROVED_EMAIL,
      'en_US',
      'OpenIdConnect',
      null,
      new Map<String, String>(),
      null,
      '{"email_verified":true}'
    );
    Assert.isNotNull(
      new GoogleOidcRegistrationHandler().createUser(null, verified).Id
    );
    Auth.UserData malformed = new Auth.UserData(
      'google-subject',
      'Test',
      'User',
      'Test User',
      APPROVED_EMAIL,
      null,
      APPROVED_EMAIL,
      'en_US',
      'OpenIdConnect',
      null,
      new Map<String, String>(),
      null,
      'invalid-json'
    );
    try {
      new GoogleOidcRegistrationHandler().createUser(null, malformed);
      Assert.fail('Malformed identity claims must fail closed.');
    } catch (GoogleOidcRegistrationHandler.IdentityMappingException expected) {
      Assert.isTrue(expected.getMessage().contains('not approved'));
    }
  }
}
