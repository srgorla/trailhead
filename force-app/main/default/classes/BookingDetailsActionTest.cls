@IsTest
private class BookingDetailsActionTest {
  @TestSetup
  static void setupData() {
    Experience__c experience = new Experience__c(
      Name = 'Booking Card Test',
      Price__c = 50,
      Capacity__c = 10,
      Duration_Hours__c = 2,
      Picture_URL__c = 'https://s3-us-west-2.amazonaws.com/example.jpg'
    );
    insert experience;
    Contact guest = new Contact(LastName = 'Booking Card Test');
    insert guest;
    Session__c session = new Session__c(
      Experience__c = experience.Id,
      Date__c = Date.newInstance(2027, 1, 15),
      Start_Time__c = Time.newInstance(9, 0, 0, 0)
    );
    insert session;
    insert new Booking__c(
      Contact__c = guest.Id,
      Session__c = session.Id,
      Number_of_Guests__c = 2
    );
  }
  private static BookingDetailsAction.Request request(String id) {
    BookingDetailsAction.Request r = new BookingDetailsAction.Request();
    r.bookingId = id;
    return r;
  }
  @IsTest
  static void readsSavedDetailsWithoutWrites() {
    Booking__c booking = [SELECT Id, Name FROM Booking__c LIMIT 1];
    Test.startTest();
    Integer beforeDml = Limits.getDmlStatements();
    List<BookingDetailsAction.Response> responses = BookingDetailsAction.getBookingDetails(
      new List<BookingDetailsAction.Request>{
        request(booking.Id),
        null,
        request(booking.Id),
        request(UserInfo.getUserId()),
        request('bad')
      }
    );
    System.assertEquals(beforeDml, Limits.getDmlStatements());
    System.assertEquals(1, Limits.getQueries());
    Test.stopTest();
    System.assertEquals(5, responses.size());
    BookingDetailsResult result = responses[0].bookingResult;
    System.assertEquals('OK', result.status);
    System.assertEquals(booking.Name, result.bookingReference);
    System.assertEquals(100, result.totalPrice);
    System.assertEquals(2, result.guestCount);
    System.assertEquals('Booked', result.bookingStatus);
    System.assertEquals('Booking Card Test', result.experienceName);
    System.assertEquals('2027-01-15', result.sessionDate);
    System.assertEquals('09:00', result.startTime);
    System.assertEquals('America/Chicago', result.timeZone);
    System.assertEquals(true, result.hasImage);
    System.assertEquals(
      'https://s3-us-west-2.amazonaws.com/example.jpg',
      result.imageUrl
    );
    System.assertEquals('INVALID_INPUT', responses[1].bookingResult.status);
    System.assertEquals(result.bookingId, responses[2].bookingResult.bookingId);
    System.assertEquals('INVALID_INPUT', responses[3].bookingResult.status);
    System.assertEquals('INVALID_INPUT', responses[4].bookingResult.status);
  }
  @IsTest
  static void handlesCanceledAndMissingImage() {
    Booking__c booking = [SELECT Id FROM Booking__c LIMIT 1];
    booking.Is_Canceled__c = true;
    update booking;
    Experience__c experience = [SELECT Id FROM Experience__c LIMIT 1];
    experience.Picture_URL__c = null;
    update experience;
    BookingDetailsResult result = BookingDetailsAction.getBookingDetails(
        new List<BookingDetailsAction.Request>{ request(booking.Id) }
      )[0]
      .bookingResult;
    System.assertEquals('Canceled', result.bookingStatus);
    System.assertEquals(false, result.hasImage);
    System.assertEquals(null, result.imageUrl);
    System.assertEquals('Image unavailable', result.imageMessage);
    experience.Picture_URL__c = 'http://example.com/image.jpg';
    update experience;
    System.assertEquals(
      false,
      BookingDetailsAction.getBookingDetails(
          new List<BookingDetailsAction.Request>{ request(booking.Id) }
        )[0]
        .bookingResult.hasImage
    );
  }
  @IsTest
  static void handlesMissingAndEmptyRequests() {
    Booking__c booking = [SELECT Id FROM Booking__c LIMIT 1];
    delete booking;
    System.assertEquals(
      'NOT_FOUND_OR_INACCESSIBLE',
      BookingDetailsAction.getBookingDetails(
          new List<BookingDetailsAction.Request>{ request(booking.Id) }
        )[0]
        .bookingResult.status
    );
    System.assertEquals(0, BookingDetailsAction.getBookingDetails(null).size());
    System.assertEquals(
      0,
      BookingDetailsAction.getBookingDetails(
          new List<BookingDetailsAction.Request>()
        )
        .size()
    );
  }
  @IsTest
  static void deniesUserWithoutBookingAccess() {
    Id bookingId = [SELECT Id FROM Booking__c LIMIT 1].Id;
    Profile restrictedProfile = [
      SELECT Id
      FROM Profile
      WHERE Name LIKE 'Minimum Access%' AND UserType = 'Standard'
      LIMIT 1
    ];
    User restrictedUser = new User(
      ProfileId = restrictedProfile.Id,
      Username = 'booking-card-' +
        UserInfo.getOrganizationId() +
        '@example.invalid',
      Email = 'booking-card@example.invalid',
      LastName = 'Booking Card Restricted',
      Alias = 'bkcard',
      TimeZoneSidKey = 'America/Chicago',
      LocaleSidKey = 'en_US',
      EmailEncodingKey = 'UTF-8',
      LanguageLocaleKey = 'en_US'
    );
    insert restrictedUser;
    System.runAs(restrictedUser) {
      BookingDetailsResult result = BookingDetailsAction.getBookingDetails(
          new List<BookingDetailsAction.Request>{ request(bookingId) }
        )[0]
        .bookingResult;
      System.assertEquals(false, result.isSuccess);
      System.assert(
        result.status == 'ACCESS_OR_QUERY_ERROR' ||
          result.status == 'NOT_FOUND_OR_INACCESSIBLE'
      );
      System.assertEquals(null, result.bookingReference);
      System.assertEquals(null, result.imageUrl);
    }
  }
  @IsTest
  static void readsWithBookingDetailsPermissionSet() {
    Profile profile = [
      SELECT Id
      FROM Profile
      WHERE Name LIKE 'Minimum Access%' AND UserType = 'Standard'
      LIMIT 1
    ];
    User reader = new User(
      ProfileId = profile.Id,
      Username = 'booking-reader-' +
        UserInfo.getOrganizationId() +
        '@example.invalid',
      Email = 'booking-reader@example.invalid',
      LastName = 'Booking Card Reader',
      Alias = 'bkreader',
      TimeZoneSidKey = 'America/Chicago',
      LocaleSidKey = 'en_US',
      EmailEncodingKey = 'UTF-8',
      LanguageLocaleKey = 'en_US'
    );
    insert reader;
    PermissionSet permission = [
      SELECT Id
      FROM PermissionSet
      WHERE Name = 'CoralCloudBookingDetails'
      LIMIT 1
    ];
    insert new PermissionSetAssignment(
      AssigneeId = reader.Id,
      PermissionSetId = permission.Id
    );
    Id bookingId;
    System.runAs(new User(Id = UserInfo.getUserId())) {
      Booking__c booking = [
        SELECT Id, Contact__c, Session__c, Session__r.Experience__c
        FROM Booking__c
        LIMIT 1
      ];
      bookingId = booking.Id;
      List<SObject> ownedRecords = new List<SObject>{
        new Experience__c(Id = booking.Session__r.Experience__c),
        new Contact(Id = booking.Contact__c),
        new Session__c(Id = booking.Session__c),
        new Booking__c(Id = booking.Id)
      };
      // Transfer ownership where supported; detail records inherit parent sharing.
      for (SObject record : ownedRecords) {
        if (
          record.getSObjectType()
            .getDescribe()
            .fields.getMap()
            .containsKey('OwnerId')
        ) {
          record.put('OwnerId', reader.Id);
          update record;
        }
      }
    }
    System.runAs(reader) {
      Test.startTest();
      BookingDetailsResult result = BookingDetailsAction.getBookingDetails(
          new List<BookingDetailsAction.Request>{ request(bookingId) }
        )[0]
        .bookingResult;
      Test.stopTest();
      System.assertEquals('OK', result.status, result.message);
      System.assertEquals(100, result.totalPrice);
      System.assertEquals('Booking Card Test', result.experienceName);
      System.assertEquals(true, result.hasImage);
      System.assertEquals(
        false,
        Booking__c.SObjectType.getDescribe().isCreateable()
      );
      System.assertEquals(
        false,
        Booking__c.SObjectType.getDescribe().isUpdateable()
      );
      System.assertEquals(
        false,
        Booking__c.SObjectType.getDescribe().isDeletable()
      );
    }
  }
}
