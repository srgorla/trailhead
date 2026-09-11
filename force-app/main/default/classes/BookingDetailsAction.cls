/** Reads saved bookings; never creates, confirms, or changes a booking. */
global with sharing class BookingDetailsAction {
  global class Request {
    @InvocableVariable(
      required=true
      label='Booking ID'
      description='ID of the saved Booking__c record to display.'
    )
    global String bookingId;
  }
  global class Response {
    @InvocableVariable(
      label='Booking Details'
      description='Saved booking details and experience image for rendering.'
    )
    global BookingDetailsResult bookingResult;
  }
  @InvocableMethod(
    label='Get Coral Cloud Booking Details'
    description='Read an existing booking and its experience image. Does not create or modify records.'
    category='Coral Cloud'
  )
  global static List<Response> getBookingDetails(List<Request> requests) {
    List<Response> responses = new List<Response>();
    if (requests == null)
      return responses;
    Set<Id> ids = new Set<Id>();
    List<Id> orderedIds = new List<Id>();
    for (Request request : requests) {
      Id bookingId;
      try {
        if (request != null && !String.isBlank(request.bookingId)) {
          bookingId = Id.valueOf(request.bookingId.trim());
          if (bookingId.getSObjectType() != Booking__c.SObjectType)
            bookingId = null;
        }
      } catch (Exception e) {
        bookingId = null;
      }
      orderedIds.add(bookingId);
      if (bookingId != null)
        ids.add(bookingId);
    }
    Map<Id, Booking__c> records = new Map<Id, Booking__c>();
    Boolean queryFailed = false;
    Boolean multiCurrency = Booking__c.SObjectType.getDescribe()
      .fields.getMap()
      .containsKey('CurrencyIsoCode');
    if (!ids.isEmpty()) {
      try {
        String query =
          'SELECT Id, Name, Number_of_Guests__c, Total_Price__c, Is_Canceled__c, Session__r.Date__c, Session__r.Start_Time__c, Session__r.End_Time__c, Session__r.Experience__r.Name, Session__r.Experience__r.Picture_URL__c' +
          (multiCurrency ? ', CurrencyIsoCode' : '') +
          ' FROM Booking__c WHERE Id IN :ids';
        records = new Map<Id, Booking__c>(
          (List<Booking__c>) Database.queryWithBinds(
            query,
            new Map<String, Object>{ 'ids' => ids },
            AccessLevel.USER_MODE
          )
        );
      } catch (Exception e) {
        queryFailed = true;
      }
    }
    for (Id bookingId : orderedIds) {
      Response response = new Response();
      BookingDetailsResult result = new BookingDetailsResult();
      response.bookingResult = result;
      responses.add(response);
      result.isSuccess = false;
      result.hasImage = false;
      result.imageMessage = 'Image unavailable';
      if (bookingId == null) {
        result.status = 'INVALID_INPUT';
        result.message = 'Provide a valid Booking record ID.';
      } else if (queryFailed) {
        result.status = 'ACCESS_OR_QUERY_ERROR';
        result.message = 'Booking details could not be read. Do not create another booking.';
      } else if (!records.containsKey(bookingId)) {
        result.status = 'NOT_FOUND_OR_INACCESSIBLE';
        result.message = 'Booking not found or unavailable to this user. Do not create another booking.';
      } else {
        Booking__c record = records.get(bookingId);
        result.isSuccess = true;
        result.status = 'OK';
        result.message = 'Saved booking details.';
        result.bookingId = record.Id;
        result.bookingReference = record.Name;
        result.bookingStatus = record.Is_Canceled__c ? 'Canceled' : 'Booked';
        result.guestCount = record.Number_of_Guests__c;
        result.totalPrice = record.Total_Price__c;
        result.currencyCode = multiCurrency
          ? (String) record.get('CurrencyIsoCode')
          : UserInfo.getDefaultCurrency();
        result.timeZone = 'America/Chicago';
        if (record.Session__r != null) {
          result.sessionDate = record.Session__r.Date__c == null
            ? null
            : String.valueOf(record.Session__r.Date__c);
          result.startTime = formatTime(record.Session__r.Start_Time__c);
          result.endTime = formatTime(record.Session__r.End_Time__c);
          if (record.Session__r.Experience__r != null) {
            result.experienceName = record.Session__r.Experience__r.Name;
            String url = record.Session__r.Experience__r.Picture_URL__c;
            result.hasImage =
              !String.isBlank(url) &&
              url.trim().toLowerCase().startsWith('https://');
            result.imageUrl = result.hasImage ? url.trim() : null;
            result.imageMessage = result.hasImage ? '' : 'Image unavailable';
          }
        }
      }
    }
    return responses;
  }
  private static String formatTime(Time value) {
    return value == null
      ? null
      : String.valueOf(value.hour()).leftPad(2, '0') +
        ':' +
        String.valueOf(value.minute()).leftPad(2, '0');
  }
}
