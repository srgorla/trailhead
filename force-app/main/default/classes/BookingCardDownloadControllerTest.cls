@IsTest
private class BookingCardDownloadControllerTest {
  @TestSetup
  static void setupData() {
    Experience__c experience = new Experience__c(
      Name = 'Ocean Export',
      Price__c = 50,
      Capacity__c = 10,
      Duration_Hours__c = 2,
      Picture_URL__c = 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/coral-clouds/photo.jpg'
    );
    insert experience;
    Contact guest = new Contact(FirstName = 'Export', LastName = 'Guest');
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
  private class PhotoMock implements HttpCalloutMock {
    private Integer code;
    PhotoMock(Integer code) {
      this.code = code;
    }
    public HttpResponse respond(HttpRequest request) {
      System.assertEquals('GET', request.getMethod());
      System.assertEquals(
        true,
        BookingCardDownloadController.isAllowedImage(request.getEndpoint())
      );
      HttpResponse response = new HttpResponse();
      response.setStatusCode(code);
      response.setHeader('Content-Type', 'image/png');
      response.setBodyAsBlob(
        EncodingUtil.base64Decode(
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII='
        )
      );
      return response;
    }
  }
  private static void setPage(String id) {
    Test.setCurrentPage(Page.BookingCardDownload);
    if (id != null)
      ApexPages.currentPage().getParameters().put('id', id);
  }
  @IsTest
  static void exportsSavedBookingWithoutWrites() {
    Booking__c booking = [SELECT Id FROM Booking__c LIMIT 1];
    setPage(booking.Id);
    Test.setMock(HttpCalloutMock.class, new PhotoMock(200));
    Test.startTest();
    BookingCardDownloadController controller = new BookingCardDownloadController();
    System.assertEquals(0, Limits.getDmlStatements());
    System.assertEquals(1, Limits.getCallouts());
    Test.stopTest();
    System.assertEquals(null, controller.errorMessage);
    System.assert(controller.photo.startsWith('data:image/png;base64,'));
    BookingDetailsResult result = (BookingDetailsResult) JSON.deserialize(
      controller.payload,
      BookingDetailsResult.class
    );
    System.assertEquals('Export Guest', result.contactName);
    System.assertEquals(100, result.totalPrice);
    System.assertEquals(
      'no-store',
      ApexPages.currentPage().getHeaders().get('Cache-Control')
    );
  }
  @IsTest
  static void invalidInputDoesNotFetchPhoto() {
    setPage('invalid');
    Test.startTest();
    BookingCardDownloadController controller = new BookingCardDownloadController();
    System.assertEquals(0, Limits.getCallouts());
    Test.stopTest();
    System.assertNotEquals(null, controller.errorMessage);
    System.assertEquals(null, controller.photo);
  }
  @IsTest
  static void photoFailureStopsExport() {
    setPage([SELECT Id FROM Booking__c LIMIT 1].Id);
    Test.setMock(HttpCalloutMock.class, new PhotoMock(403));
    Test.startTest();
    BookingCardDownloadController controller = new BookingCardDownloadController();
    Test.stopTest();
    System.assertNotEquals(null, controller.errorMessage);
    System.assertEquals(null, controller.photo);
  }
  @IsTest
  static void rejectsUnapprovedImageDestinations() {
    for (
      String url : new List<String>{
        'https://example.com/photo.jpg',
        'http://s3-us-west-2.amazonaws.com/photo.jpg',
        'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/coral-clouds/../secret.jpg',
        'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/coral-clouds/photo.jpg?redirect=other'
      }
    ) {
      System.assertEquals(
        false,
        BookingCardDownloadController.isAllowedImage(url)
      );
    }
    Experience__c experience = [SELECT Id FROM Experience__c LIMIT 1];
    experience.Picture_URL__c = 'https://example.com/photo.jpg';
    update experience;
    setPage([SELECT Id FROM Booking__c LIMIT 1].Id);
    Test.startTest();
    BookingCardDownloadController controller = new BookingCardDownloadController();
    System.assertEquals(0, Limits.getCallouts());
    Test.stopTest();
    System.assertNotEquals(null, controller.errorMessage);
  }
  @IsTest
  static void missingPhotoStillExportsSavedDetails() {
    Experience__c experience = [SELECT Id FROM Experience__c LIMIT 1];
    experience.Picture_URL__c = null;
    update experience;
    setPage([SELECT Id FROM Booking__c LIMIT 1].Id);
    Test.startTest();
    BookingCardDownloadController controller = new BookingCardDownloadController();
    System.assertEquals(0, Limits.getCallouts());
    Test.stopTest();
    System.assertEquals(null, controller.errorMessage);
    System.assertEquals(null, controller.photo);
  }
}
