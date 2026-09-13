/** Authenticated, read-only export. Never stores or publicly shares booking data. */
public with sharing class BookingCardDownloadController {
  public transient String payload { get; private set; }
  public transient String photo { get; private set; }
  public transient String errorMessage { get; private set; }
  private static final String IMAGE_ROOT = 'https://s3-us-west-2.amazonaws.com/dev-or-devrl-s3-bucket/sample-apps/coral-clouds/';

  public BookingCardDownloadController() {
    ApexPages.currentPage().getHeaders().put('Cache-Control', 'no-store');
    BookingDetailsAction.Request input = new BookingDetailsAction.Request();
    input.bookingId = ApexPages.currentPage().getParameters().get('id');
    BookingDetailsResult result = BookingDetailsAction.getBookingDetails(
        new List<BookingDetailsAction.Request>{ input }
      )[0]
      .bookingResult;
    payload = JSON.serialize(result);
    if (!result.isSuccess) {
      errorMessage = result.message;
      return;
    }
    if (!result.hasImage)
      return;
    // Only fetch known catalog files, not arbitrary record-controlled endpoints.
    if (!isAllowedImage(result.imageUrl)) {
      errorMessage = 'This experience photo cannot be exported. Contact your administrator.';
      return;
    }
    try {
      HttpRequest req = new HttpRequest();
      req.setEndpoint(result.imageUrl);
      req.setMethod('GET');
      req.setTimeout(15000);
      HttpResponse response = new Http().send(req);
      String mime = response.getHeader('Content-Type');
      if (mime != null)
        mime = mime.split(';')[0].trim().toLowerCase();
      if (
        response.getStatusCode() != 200 ||
        (mime != 'image/jpeg' &&
        mime != 'image/png')
      ) {
        throw new ExportException();
      }
      Blob data = response.getBodyAsBlob();
      if (data.size() > 2000000)
        throw new ExportException();
      photo = 'data:' + mime + ';base64,' + EncodingUtil.base64Encode(data);
    } catch (Exception e) {
      errorMessage = 'The experience photo could not be loaded. Reload to retry; your booking has not changed.';
    }
  }
  @TestVisible
  private static Boolean isAllowedImage(String url) {
    return url != null &&
      url.startsWith(IMAGE_ROOT) &&
      Pattern.matches(
        '[A-Za-z0-9_-]+\\.(jpg|jpeg|png)',
        url.substring(IMAGE_ROOT.length())
      );
  }
  private class ExportException extends Exception {
  }
}
