public class HotelSearchResult {
  @InvocableVariable(label='Success')
  public Boolean isSuccess;

  @InvocableVariable(label='Error Message')
  public String errorMessage;

  @InvocableVariable(label='Hotel Information')
  public Hotel hotelInfo;

  public class Hotel {
    @InvocableVariable(label='Hotel ID')
    public String hotelId;

    @InvocableVariable(label='Name')
    public String name;

    @InvocableVariable(label='City')
    public String city;

    @InvocableVariable(label='State or Region')
    public String stateOrRegion;

    @InvocableVariable(label='Country')
    public String country;

    @InvocableVariable(label='Rating')
    public Decimal rating;

    @InvocableVariable(label='Price per Night')
    public Decimal pricePerNight;

    @InvocableVariable(label='Currency Code')
    public String currencyCode;

    @InvocableVariable(label='Check-In Time')
    public String checkInTime;

    @InvocableVariable(label='Check-Out Time')
    public String checkOutTime;

    @InvocableVariable(label='Image URL')
    public String imageUrl;

    @InvocableVariable(label='Booking URL')
    public String bookingUrl;

    @InvocableVariable(label='Description')
    public String description;
  }
}
