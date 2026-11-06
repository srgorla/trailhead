@IsTest
private class HotelSearchActionTest {
  @IsTest
  static void searchHotelsReturnsMatchingHotel() {
    HotelSearchAction.Request request = new HotelSearchAction.Request();
    request.hotelName = 'Four Seasons';
    request.city = 'Wailea';

    Test.startTest();
    List<HotelSearchResult> results = HotelSearchAction.searchHotels(
      new List<HotelSearchAction.Request>{ request }
    );
    Test.stopTest();

    System.assertEquals(1, results.size(), 'One result should be returned.');
    System.assertEquals(
      true,
      results[0].isSuccess,
      'A matching hotel should succeed.'
    );
    System.assertEquals(
      'Four Seasons Resort Maui at Wailea',
      results[0].hotelInfo.name,
      'Hotel name should match the sample data.'
    );
    System.assertEquals(
      'USD',
      results[0].hotelInfo.currencyCode,
      'Currency should be populated.'
    );
  }

  @IsTest
  static void searchHotelsReturnsErrorForMissingName() {
    HotelSearchAction.Request request = new HotelSearchAction.Request();

    List<HotelSearchResult> results = HotelSearchAction.searchHotels(
      new List<HotelSearchAction.Request>{ request }
    );

    System.assertEquals(1, results.size(), 'One result should be returned.');
    System.assertEquals(
      false,
      results[0].isSuccess,
      'Missing hotel name should fail.'
    );
    System.assertEquals('Hotel name is required.', results[0].errorMessage);
    System.assertEquals(
      null,
      results[0].hotelInfo,
      'No hotel should be returned.'
    );
  }

  @IsTest
  static void searchHotelsReturnsErrorForNoMatch() {
    HotelSearchAction.Request request = new HotelSearchAction.Request();
    request.hotelName = 'Unknown Hotel';

    List<HotelSearchResult> results = HotelSearchAction.searchHotels(
      new List<HotelSearchAction.Request>{ request }
    );

    System.assertEquals(1, results.size(), 'One result should be returned.');
    System.assertEquals(
      false,
      results[0].isSuccess,
      'Unknown hotel should fail.'
    );
    System.assertEquals(
      'No matching hotel was found.',
      results[0].errorMessage
    );
  }

  @IsTest
  static void searchHotelsReturnsEmptyListForNoRequests() {
    List<HotelSearchResult> results = HotelSearchAction.searchHotels(
      new List<HotelSearchAction.Request>()
    );

    System.assertEquals(
      0,
      results.size(),
      'No requests should return no results.'
    );
  }
}
