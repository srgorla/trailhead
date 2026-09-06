global class HotelSearchResult {
  @InvocableVariable(label='Success')
  global Boolean isSuccess;

  @InvocableVariable(label='Error Message')
  global String errorMessage;

  @InvocableVariable(label='Hotel Information')
  global Hotel hotelInfo;

  global class Hotel {
    @InvocableVariable(label='Hotel ID')
    global String hotelId;

    @InvocableVariable(label='Name')
    global String name;

    @InvocableVariable(label='City')
    global String city;

    @InvocableVariable(label='State or Region')
    global String stateOrRegion;

    @InvocableVariable(label='Country')
    global String country;

    @InvocableVariable(label='Rating')
    global Decimal rating;

    @InvocableVariable(label='Price per Night')
    global Decimal pricePerNight;

    @InvocableVariable(label='Currency Code')
    global String currencyCode;

    @InvocableVariable(label='Check-In Time')
    global String checkInTime;

    @InvocableVariable(label='Check-Out Time')
    global String checkOutTime;

    @InvocableVariable(label='Image URL')
    global String imageUrl;

    @InvocableVariable(label='Booking URL')
    global String bookingUrl;

    @InvocableVariable(label='Description')
    global String description;
  }
}
