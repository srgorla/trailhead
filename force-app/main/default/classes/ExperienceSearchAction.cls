/** Read-only Coral Cloud experience search with bounded, permission-enforced queries. */
global with sharing class ExperienceSearchAction {
  private static final String RESORT_TIME_ZONE = 'America/Chicago';
  private static final Integer MAX_REQUESTS = 20;
  private static final Integer MAX_EXPERIENCES = 5;
  private static final Integer MAX_SESSIONS = 3;
  @TestVisible
  private static Datetime nowOverride;

  global class Request {
    @InvocableVariable(
      label='Search phrase'
      description='Optional literal phrase in the experience name. Omit to browse.'
    )
    global String searchPhrase;
    @InvocableVariable(
      label='Category'
      description='Optional exact Experience Type picklist value.'
    )
    global String category;
    @InvocableVariable(
      label='Start date'
      description='First session date in Central Time. Defaults to today.'
    )
    global Date startDate;
    @InvocableVariable(
      label='End date'
      description='Last session date, inclusive. Defaults to 30 days after start date.'
    )
    global Date endDate;
    @InvocableVariable(
      label='Guest count'
      description='Party size from 1 to 100. Defaults to 1.'
    )
    global Integer guestCount;
  }

  private class SearchInput {
    String phrase;
    String category;
    Date startDate;
    Date endDate;
    Integer guests;
  }
  private class SearchTooBroadException extends Exception {
  }

  @InvocableMethod(
    label='Search Coral Cloud Experiences'
    description='Search experiences with prices, ratings and sessions in Central Time. Read-only; does not reserve seats. Returns up to 5 experiences and 3 sessions each.'
    category='Coral Cloud'
  )
  global static List<ExperienceSearchResult> searchExperiences(
    List<Request> requests
  ) {
    List<ExperienceSearchResult> results = new List<ExperienceSearchResult>();
    if (requests == null || requests.isEmpty())
      return results;
    Datetime instant = nowOverride == null ? System.now() : nowOverride;
    Date today = Date.valueOf(instant.format('yyyy-MM-dd', RESORT_TIME_ZONE));
    Time localTime = Time.newInstance(
      Integer.valueOf(instant.format('HH', RESORT_TIME_ZONE)),
      Integer.valueOf(instant.format('mm', RESORT_TIME_ZONE)),
      Integer.valueOf(instant.format('ss', RESORT_TIME_ZONE)),
      0
    );
    List<SearchInput> inputs = new List<SearchInput>();
    Map<String, Object> binds = new Map<String, Object>();
    List<String> clauses = new List<String>();
    Date firstDate;
    Date lastDate;
    for (Integer i = 0; i < requests.size(); i++) {
      results.add(emptyResult());
      inputs.add(null);
      String error = requests.size() > MAX_REQUESTS
        ? 'Submit at most 20 search requests.'
        : validate(requests[i], today);
      if (error != null) {
        fail(results[i], 'INVALID_INPUT', error);
        continue;
      }
      Request request = requests[i];
      SearchInput input = new SearchInput();
      input.phrase = String.isBlank(request.searchPhrase)
        ? ''
        : request.searchPhrase.trim();
      input.category = String.isBlank(request.category)
        ? ''
        : request.category.trim();
      input.startDate = request.startDate == null ? today : request.startDate;
      input.endDate = request.endDate == null
        ? input.startDate.addDays(30)
        : request.endDate;
      input.guests = request.guestCount == null ? 1 : request.guestCount;
      inputs[i] = input;
      if (firstDate == null || input.startDate < firstDate)
        firstDate = input.startDate;
      if (lastDate == null || input.endDate > lastDate)
        lastDate = input.endDate;
      binds.put(
        'phrase' + i,
        '%' +
          input.phrase.replace('\\', '\\\\')
            .replace('%', '\\%')
            .replace('_', '\\_') +
          '%'
      );
      String clause = 'Name LIKE :phrase' + i;
      if (input.category != '') {
        binds.put('category' + i, input.category);
        clause += ' AND Type__c = :category' + i;
      }
      clauses.add('(' + clause + ')');
    }
    if (clauses.isEmpty())
      return results;
    try {
      String currencyField = Schema.sObjectType.Experience__c.fields.getMap()
          .containsKey('CurrencyIsoCode')
        ? ', CurrencyIsoCode'
        : '';
      List<Experience__c> experiences = Database.queryWithBinds(
        'SELECT Id, Name, Description__c, Location__c, Type__c, Activity_Level__c, Duration_Hours__c, Picture_URL__c, Price__c, Total_Guest_Reviews__c, Reviews_Summary__c' +
          currencyField +
          ' FROM Experience__c WHERE ' +
          String.join(clauses, ' OR ') +
          ' ORDER BY Name, Id LIMIT 201',
        binds,
        AccessLevel.USER_MODE
      );
      if (experiences.size() > 200)
        throw new SearchTooBroadException();
      Set<Id> experienceIds = new Map<Id, Experience__c>(experiences).keySet();
      Map<Id, List<Session__c>> sessionsByExperience = new Map<Id, List<Session__c>>();
      Map<Id, AggregateResult> ratings = new Map<Id, AggregateResult>();
      if (!experienceIds.isEmpty()) {
        List<Session__c> sessions = [
          SELECT
            Id,
            Experience__c,
            Date__c,
            Start_Time__c,
            End_Time__c,
            Capacity__c,
            Available_Slots__c,
            Is_Canceled__c
          FROM Session__c
          WHERE
            Experience__c IN :experienceIds
            AND Date__c >= :firstDate
            AND Date__c <= :lastDate
          WITH USER_MODE
          ORDER BY Date__c, Start_Time__c ASC NULLS LAST, Id
          LIMIT 2001
        ];
        if (sessions.size() > 2000)
          throw new SearchTooBroadException();
        for (Session__c session : sessions) {
          if (!sessionsByExperience.containsKey(session.Experience__c))
            sessionsByExperience.put(
              session.Experience__c,
              new List<Session__c>()
            );
          sessionsByExperience.get(session.Experience__c).add(session);
        }
        // Count only rated reviews in the average; the org's rollup also counts unrated reviews.
        for (AggregateResult rating : [
          SELECT
            Experience__c experienceId,
            AVG(Rating_Value__c) averageRating,
            COUNT(Id) ratedCount
          FROM Guest_Review__c
          WHERE Experience__c IN :experienceIds AND Rating__c != NULL
          WITH USER_MODE
          GROUP BY Experience__c
        ])
          ratings.put((Id) rating.get('experienceId'), rating);
      }
      for (Integer i = 0; i < inputs.size(); i++) {
        if (inputs[i] == null)
          continue;
        SearchInput input = inputs[i];
        for (Experience__c experience : experiences) {
          if (
            !experience.Name.toLowerCase()
              .contains(input.phrase.toLowerCase()) ||
            (input.category != '' &&
            !input.category.equalsIgnoreCase(experience.Type__c))
          )
            continue;
          if (results[i].experiences.size() == MAX_EXPERIENCES) {
            results[i].hasMoreExperiences = true;
            break;
          }
          results[i]
            .experiences.add(
              projectExperience(
                experience,
                input,
                sessionsByExperience.get(experience.Id),
                ratings.get(experience.Id),
                currencyField != '',
                today,
                localTime
              )
            );
        }
        results[i].status = results[i].experiences.isEmpty()
          ? 'NO_MATCHES'
          : 'OK';
        results[i].message = results[i].experiences.isEmpty()
          ? 'No matching experiences found. Try another name or category.'
          : 'Sessions use America/Chicago (Central Time). Availability is a snapshot; no seats are reserved.';
        if (results[i].hasMoreExperiences)
          results[i]
            .message += ' Showing the first 5 experiences; narrow your search for more.';
      }
    } catch (SearchTooBroadException e) {
      failValid(
        results,
        inputs,
        'SEARCH_TOO_BROAD',
        'Too many records to search safely. Narrow the name, category or date range.'
      );
    } catch (QueryException e) {
      failValid(
        results,
        inputs,
        'ACCESS_OR_QUERY_ERROR',
        'Unable to read the requested experience data. Check object and field access or contact your administrator.'
      );
    }
    return results;
  }

  private static ExperienceSearchResult.Experience projectExperience(
    Experience__c record,
    SearchInput input,
    List<Session__c> sessions,
    AggregateResult rating,
    Boolean multiCurrency,
    Date today,
    Time localTime
  ) {
    ExperienceSearchResult.Experience card = new ExperienceSearchResult.Experience();
    card.experienceId = record.Id;
    card.name = record.Name;
    card.description = shorten(record.Description__c, 500);
    card.location = String.isBlank(record.Location__c)
      ? 'Location not provided'
      : shorten(record.Location__c, 200);
    card.category = String.isBlank(record.Type__c)
      ? 'Experience'
      : record.Type__c;
    card.activityLevel = String.isBlank(record.Activity_Level__c)
      ? 'Not specified'
      : record.Activity_Level__c;
    card.durationHours = record.Duration_Hours__c;
    card.durationText = card.durationHours == null
      ? 'Duration not provided'
      : card.durationHours + ' hour(s)';
    card.imageUrl = record.Picture_URL__c;
    card.hasImage =
      !String.isBlank(card.imageUrl) &&
      card.imageUrl.toLowerCase().startsWith('https://');
    if (!card.hasImage)
      card.imageUrl = null;
    card.imageMessage = card.hasImage ? '' : 'Image unavailable';
    card.pricePerGuest = record.Price__c;
    card.currencyCode = multiCurrency
      ? (String) record.get('CurrencyIsoCode')
      : UserInfo.getDefaultCurrency();
    card.guestCount = input.guests;
    card.estimatedTotal = card.pricePerGuest == null
      ? null
      : card.pricePerGuest * input.guests;
    card.priceText = card.pricePerGuest == null
      ? 'Price unavailable'
      : card.currencyCode +
        ' ' +
        card.pricePerGuest.setScale(2) +
        ' per guest · ' +
        card.currencyCode +
        ' ' +
        card.estimatedTotal.setScale(2) +
        ' estimated for ' +
        input.guests +
        ' guest(s)';
    card.ratedReviewCount = rating == null
      ? 0
      : (Integer) rating.get('ratedCount');
    card.rating = rating == null
      ? null
      : ((Decimal) rating.get('averageRating')).setScale(1);
    card.totalReviewCount = record.Total_Guest_Reviews__c;
    card.ratingText = card.rating == null
      ? 'Not yet rated'
      : card.rating + ' / 10 · ' + card.ratedReviewCount + ' rated review(s)';
    card.reviewSummary = shorten(record.Reviews_Summary__c, 400);
    card.sessions = new List<ExperienceSearchResult.SessionInfo>();
    card.hasMoreSessions = false;
    if (sessions != null)
      for (Session__c session : sessions) {
        if (
          session.Date__c < input.startDate ||
          session.Date__c > input.endDate
        )
          continue;
        if (card.sessions.size() == MAX_SESSIONS) {
          card.hasMoreSessions = true;
          break;
        }
        card.sessions.add(
          projectSession(session, input.guests, today, localTime)
        );
      }
    card.availabilityText = card.sessions.isEmpty()
      ? 'No sessions scheduled in the requested date range.'
      : 'Session availability for ' + input.guests + ' guest(s):';
    if (card.hasMoreSessions)
      card.availabilityText += ' Showing the first 3 sessions; narrow the dates for later sessions.';
    return card;
  }

  private static ExperienceSearchResult.SessionInfo projectSession(
    Session__c record,
    Integer guests,
    Date today,
    Time localTime
  ) {
    ExperienceSearchResult.SessionInfo session = new ExperienceSearchResult.SessionInfo();
    session.sessionId = record.Id;
    session.dateText = String.valueOf(record.Date__c);
    session.startTime = timeText(record.Start_Time__c);
    session.endTime = timeText(record.End_Time__c);
    session.timeZone = RESORT_TIME_ZONE;
    session.capacity = record.Capacity__c;
    session.availableSlots = record.Available_Slots__c;
    Boolean started =
      record.Date__c < today ||
      (record.Date__c == today &&
      record.Start_Time__c != null &&
      record.Start_Time__c <= localTime);
    session.status = record.Is_Canceled__c
      ? 'Canceled'
      : started
          ? 'Already started'
          : record.Start_Time__c == null ||
              record.Available_Slots__c == null
              ? 'Availability unknown'
              : record.Available_Slots__c <= 0
                  ? 'Full'
                  : record.Available_Slots__c < guests
                      ? 'Insufficient seats'
                      : 'Available';
    session.isBookable = session.status == 'Available';
    session.displayText =
      session.dateText +
      ' · ' +
      session.startTime +
      '–' +
      session.endTime +
      ' Central Time · ' +
      session.status;
    if (session.availableSlots != null)
      session.displayText +=
        ' · ' +
        session.availableSlots +
        ' seat(s) remaining';
    return session;
  }

  private static String validate(Request request, Date today) {
    if (request == null)
      return 'A search request is required.';
    if (request.searchPhrase != null && request.searchPhrase.length() > 100)
      return 'Search phrase must be at most 100 characters.';
    if (request.category != null && request.category.length() > 100)
      return 'Category must be at most 100 characters.';
    if (
      request.guestCount != null &&
      (request.guestCount < 1 ||
      request.guestCount > 100)
    )
      return 'Guest count must be from 1 to 100.';
    Date startDate = request.startDate == null ? today : request.startDate;
    Date endDate = request.endDate == null
      ? startDate.addDays(30)
      : request.endDate;
    if (startDate < today || startDate > today.addDays(365))
      return 'Start date must be within the next 365 days in Central Time.';
    if (endDate < startDate || endDate > startDate.addDays(30))
      return 'End date must be from the start date through 30 days later.';
    return null;
  }
  private static String timeText(Time value) {
    return value == null
      ? 'Time not provided'
      : String.valueOf(value.hour()).leftPad(2, '0') +
        ':' +
        String.valueOf(value.minute()).leftPad(2, '0');
  }
  private static String shorten(String value, Integer maxLength) {
    if (String.isBlank(value))
      return '';
    return value.length() > maxLength
      ? value.substring(0, maxLength) + '…'
      : value;
  }
  private static ExperienceSearchResult emptyResult() {
    ExperienceSearchResult result = new ExperienceSearchResult();
    result.isSuccess = true;
    result.hasMoreExperiences = false;
    result.experiences = new List<ExperienceSearchResult.Experience>();
    return result;
  }
  private static void fail(
    ExperienceSearchResult result,
    String status,
    String message
  ) {
    result.isSuccess = false;
    result.status = status;
    result.message = message;
    result.experiences.clear();
    result.hasMoreExperiences = false;
  }
  private static void failValid(
    List<ExperienceSearchResult> results,
    List<SearchInput> inputs,
    String status,
    String message
  ) {
    for (Integer i = 0; i < inputs.size(); i++)
      if (inputs[i] != null)
        fail(results[i], status, message);
  }
}
