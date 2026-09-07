/** Structured experience search output for MCP and HXL. */
@JsonAccess(serializable='always' deserializable='always')
global class ExperienceSearchResult {
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
  @InvocableVariable(label='hasMoreExperiences')
  global Boolean hasMoreExperiences;

  @AuraEnabled
  @InvocableVariable(label='experiences')
  global List<Experience> experiences;

  @JsonAccess(serializable='always' deserializable='always')
  global class Experience {
    @AuraEnabled
    @InvocableVariable(label='experienceId')
    global String experienceId;

    @AuraEnabled
    @InvocableVariable(label='name')
    global String name;

    @AuraEnabled
    @InvocableVariable(label='description')
    global String description;

    @AuraEnabled
    @InvocableVariable(label='location')
    global String location;

    @AuraEnabled
    @InvocableVariable(label='category')
    global String category;

    @AuraEnabled
    @InvocableVariable(label='activityLevel')
    global String activityLevel;

    @AuraEnabled
    @InvocableVariable(label='durationHours')
    global Decimal durationHours;

    @AuraEnabled
    @InvocableVariable(label='Duration text')
    global String durationText;

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
    @InvocableVariable(label='pricePerGuest')
    global Decimal pricePerGuest;

    @AuraEnabled
    @InvocableVariable(label='currencyCode')
    global String currencyCode;

    @AuraEnabled
    @InvocableVariable(label='guestCount')
    global Integer guestCount;

    @AuraEnabled
    @InvocableVariable(label='estimatedTotal')
    global Decimal estimatedTotal;

    @AuraEnabled
    @InvocableVariable(label='priceText')
    global String priceText;

    @AuraEnabled
    @InvocableVariable(label='rating')
    global Decimal rating;

    @AuraEnabled
    @InvocableVariable(label='ratedReviewCount')
    global Integer ratedReviewCount;

    @AuraEnabled
    @InvocableVariable(label='totalReviewCount')
    global Decimal totalReviewCount;

    @AuraEnabled
    @InvocableVariable(label='ratingText')
    global String ratingText;

    @AuraEnabled
    @InvocableVariable(label='reviewSummary')
    global String reviewSummary;

    @AuraEnabled
    @InvocableVariable(label='availabilityText')
    global String availabilityText;

    @AuraEnabled
    @InvocableVariable(label='hasMoreSessions')
    global Boolean hasMoreSessions;

    @AuraEnabled
    @InvocableVariable(label='sessions')
    global List<SessionInfo> sessions;
  }

  @JsonAccess(serializable='always' deserializable='always')
  global class SessionInfo {
    @AuraEnabled
    @InvocableVariable(label='sessionId')
    global String sessionId;

    @AuraEnabled
    @InvocableVariable(label='dateText')
    global String dateText;

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
    @InvocableVariable(label='capacity')
    global Decimal capacity;

    @AuraEnabled
    @InvocableVariable(label='availableSlots')
    global Decimal availableSlots;

    @AuraEnabled
    @InvocableVariable(label='isBookable')
    global Boolean isBookable;

    @AuraEnabled
    @InvocableVariable(label='status')
    global String status;

    @AuraEnabled
    @InvocableVariable(label='displayText')
    global String displayText;
  }
}
