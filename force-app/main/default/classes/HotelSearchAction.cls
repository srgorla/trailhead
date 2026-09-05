/**
 * @description Invocable hotel lookup action for MCP clients and agent surfaces.
 */
public with sharing class HotelSearchAction {
  public class Request {
    @InvocableVariable(required=true label='Hotel Name')
    public String hotelName;

    @InvocableVariable(label='City')
    public String city;

    @InvocableVariable(label='State or Region')
    public String stateOrRegion;

    @InvocableVariable(label='Country')
    public String country;
  }

  @InvocableMethod(
    label='Search Hotels'
    description='Returns hotel information for HXL card rendering.'
    category='Hotels'
  )
  public static List<HotelSearchResult> searchHotels(List<Request> requests) {
    List<HotelSearchResult> results = new List<HotelSearchResult>();
    if (requests == null || requests.isEmpty()) {
      return results;
    }

    for (Request request : requests) {
      results.add(searchOne(request));
    }

    return results;
  }

  private static HotelSearchResult searchOne(Request request) {
    HotelSearchResult result = new HotelSearchResult();

    if (request == null || String.isBlank(request.hotelName)) {
      result.isSuccess = false;
      result.errorMessage = 'Hotel name is required.';
      return result;
    }

    HotelSearchResult.Hotel hotel = findHotel(request);
    if (hotel == null) {
      result.isSuccess = false;
      result.errorMessage = 'No matching hotel was found.';
      return result;
    }

    result.isSuccess = true;
    result.hotelInfo = hotel;
    return result;
  }

  private static HotelSearchResult.Hotel findHotel(Request request) {
    String query = request.hotelName.trim().toLowerCase();
    List<HotelSearchResult.Hotel> hotels = getSampleHotels();

    for (HotelSearchResult.Hotel hotel : hotels) {
      if (
        hotel.name.toLowerCase().contains(query) &&
        matchesOptionalFilter(request.city, hotel.city) &&
        matchesOptionalFilter(request.stateOrRegion, hotel.stateOrRegion) &&
        matchesOptionalFilter(request.country, hotel.country)
      ) {
        return hotel;
      }
    }

    return null;
  }

  private static Boolean matchesOptionalFilter(
    String requestedValue,
    String actualValue
  ) {
    return String.isBlank(requestedValue) ||
      (actualValue != null &&
      actualValue.equalsIgnoreCase(requestedValue.trim()));
  }

  private static List<HotelSearchResult.Hotel> getSampleHotels() {
    return new List<HotelSearchResult.Hotel>{
      createHotel(
        'hotel-chi-001',
        'The Lakeshore Grand Chicago',
        'Chicago',
        'IL',
        'US',
        4.7,
        289,
        'USD',
        '3:00 PM',
        '11:00 AM',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
        'https://example.com/hotels/hotel-chi-001',
        'A downtown hotel with lake views, meeting space, and walkable access to restaurants.'
      ),
      createHotel(
        'hotel-maui-001',
        'Four Seasons Resort Maui at Wailea',
        'Wailea',
        'HI',
        'US',
        4.8,
        925,
        'USD',
        '4:00 PM',
        '12:00 PM',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd',
        'https://example.com/hotels/hotel-maui-001',
        'A beachfront resort with ocean-view rooms, pools, dining, and spa services.'
      )
    };
  }

  private static HotelSearchResult.Hotel createHotel(
    String hotelId,
    String name,
    String city,
    String stateOrRegion,
    String country,
    Decimal rating,
    Decimal pricePerNight,
    String currencyCode,
    String checkInTime,
    String checkOutTime,
    String imageUrl,
    String bookingUrl,
    String description
  ) {
    HotelSearchResult.Hotel hotel = new HotelSearchResult.Hotel();
    hotel.hotelId = hotelId;
    hotel.name = name;
    hotel.city = city;
    hotel.stateOrRegion = stateOrRegion;
    hotel.country = country;
    hotel.rating = rating;
    hotel.pricePerNight = pricePerNight;
    hotel.currencyCode = currencyCode;
    hotel.checkInTime = checkInTime;
    hotel.checkOutTime = checkOutTime;
    hotel.imageUrl = imageUrl;
    hotel.bookingUrl = bookingUrl;
    hotel.description = description;
    return hotel;
  }
}
