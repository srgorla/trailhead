@JsonAccess(serializable='always' deserializable='always')
global class HotelSearchResult {
  @AuraEnabled
  @InvocableVariable(label='Success')
  global Boolean isSuccess;

  @AuraEnabled
  @InvocableVariable(label='Error Message')
  global String errorMessage;

  @AuraEnabled
  @InvocableVariable(label='Hotel Information')
  global Hotel hotelInfo;

  @JsonAccess(serializable='always' deserializable='always')
  global class Hotel {
    @AuraEnabled
    @InvocableVariable(label='Hotel ID')
    global String hotelId;

    @AuraEnabled
    @InvocableVariable(label='Name')
    global String name;

    @AuraEnabled
    @InvocableVariable(label='City')
    global String city;

    @AuraEnabled
    @InvocableVariable(label='State or Region')
    global String stateOrRegion;

    @AuraEnabled
    @InvocableVariable(label='Country')
    global String country;

    @AuraEnabled
    @InvocableVariable(label='Rating')
    global Decimal rating;

    @AuraEnabled
    @InvocableVariable(label='Price per Night')
    global Decimal pricePerNight;

    @AuraEnabled
    @InvocableVariable(label='Currency Code')
    global String currencyCode;

    @AuraEnabled
    @InvocableVariable(label='Check-In Time')
    global String checkInTime;

    @AuraEnabled
    @InvocableVariable(label='Check-Out Time')
    global String checkOutTime;

    @AuraEnabled
    @InvocableVariable(label='Image URL')
    global String imageUrl;

    @AuraEnabled
    @InvocableVariable(label='Booking URL')
    global String bookingUrl;

    @AuraEnabled
    @InvocableVariable(label='Description')
    global String description;
  }
}
