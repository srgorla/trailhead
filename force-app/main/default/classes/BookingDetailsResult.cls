/** Read-only booking details for the booking confirmation renderer. */
@JsonAccess(serializable='always' deserializable='always')
global class BookingDetailsResult {
  @AuraEnabled
  @InvocableVariable(label='isSuccess')
  global Boolean isSuccess;

  @AuraEnabled
  @InvocableVariable(label='status')
  global String status;

  @AuraEnabled
  @InvocableVariable(label='message')
  global String message;

  @AuraEnabled
  @InvocableVariable(label='bookingId')
  global String bookingId;

  @AuraEnabled
  @InvocableVariable(label='bookingReference')
  global String bookingReference;

  @AuraEnabled
  @InvocableVariable(label='bookingStatus')
  global String bookingStatus;

  @AuraEnabled
  @InvocableVariable(label='experienceName')
  global String experienceName;

  @AuraEnabled
  @InvocableVariable(label='imageUrl')
  global String imageUrl;

  @AuraEnabled
  @InvocableVariable(label='hasImage')
  global Boolean hasImage;

  @AuraEnabled
  @InvocableVariable(label='imageMessage')
  global String imageMessage;

  @AuraEnabled
  @InvocableVariable(label='sessionDate')
  global String sessionDate;

  @AuraEnabled
  @InvocableVariable(label='startTime')
  global String startTime;

  @AuraEnabled
  @InvocableVariable(label='endTime')
  global String endTime;

  @AuraEnabled
  @InvocableVariable(label='timeZone')
  global String timeZone;

  @AuraEnabled
  @InvocableVariable(label='guestCount')
  global Decimal guestCount;

  @AuraEnabled
  @InvocableVariable(label='totalPrice')
  global Decimal totalPrice;

  @AuraEnabled
  @InvocableVariable(label='currencyCode')
  global String currencyCode;
}
