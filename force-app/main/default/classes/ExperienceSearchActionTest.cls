@IsTest
private class ExperienceSearchActionTest {
  private static final Date SEARCH_DATE = Date.newInstance(2027, 1, 15);
  private static void setClock() {
    ExperienceSearchAction.nowOverride = Datetime.newInstanceGmt(
      2027,
      1,
      15,
      16,
      0,
      0
    ); // 10:00 CST
  }
  @TestSetup
  static void setupData() {
    Experience__c experience = new Experience__c(
      Name = 'Coral Test Snorkeling',
      Price__c = 55,
      Capacity__c = 10,
      Duration_Hours__c = 2,
      Type__c = 'Water Sports',
      Activity_Level__c = 'Medium',
      Picture_URL__c = 'https://s3-us-west-2.amazonaws.com/example.jpg'
    );
    insert experience;
    insert new Experience__c(Name = 'Coral Test Yoga');
    Contact guest = new Contact(LastName = 'Coral Test Guest');
    insert guest;
    List<Session__c> sessions = new List<Session__c>{
      new Session__c(
        Experience__c = experience.Id,
        Date__c = SEARCH_DATE,
        Start_Time__c = Time.newInstance(9, 0, 0, 0)
      ),
      new Session__c(
        Experience__c = experience.Id,
        Date__c = SEARCH_DATE,
        Start_Time__c = Time.newInstance(11, 0, 0, 0)
      ),
      new Session__c(
        Experience__c = experience.Id,
        Date__c = SEARCH_DATE.addDays(1),
        Start_Time__c = Time.newInstance(11, 0, 0, 0),
        Is_Canceled__c = true
      ),
      new Session__c(
        Experience__c = experience.Id,
        Date__c = SEARCH_DATE.addDays(2),
        Start_Time__c = Time.newInstance(11, 0, 0, 0)
      )
    };
    insert sessions;
    insert new List<Booking__c>{
      new Booking__c(
        Session__c = sessions[1].Id,
        Contact__c = guest.Id,
        Number_of_Guests__c = 8
      ),
      new Booking__c(
        Session__c = sessions[1].Id,
        Contact__c = guest.Id,
        Number_of_Guests__c = 2,
        Is_Canceled__c = true
      ),
      new Booking__c(
        Session__c = sessions[3].Id,
        Contact__c = guest.Id,
        Number_of_Guests__c = 10
      )
    };
    insert new List<Guest_Review__c>{
      new Guest_Review__c(
        Experience__c = experience.Id,
        Contact__c = guest.Id,
        Rating__c = '8'
      ),
      new Guest_Review__c(
        Experience__c = experience.Id,
        Contact__c = guest.Id,
        Rating__c = '10'
      ),
      new Guest_Review__c(Experience__c = experience.Id, Contact__c = guest.Id)
    };
  }
  private static ExperienceSearchAction.Request request(
    String phrase,
    Integer guests
  ) {
    ExperienceSearchAction.Request request = new ExperienceSearchAction.Request();
    request.searchPhrase = phrase;
    request.guestCount = guests;
    request.startDate = SEARCH_DATE;
    request.endDate = SEARCH_DATE.addDays(3);
    return request;
  }
  private static ExperienceSearchResult search(
    ExperienceSearchAction.Request request
  ) {
    setClock();
    return ExperienceSearchAction.searchExperiences(
      new List<ExperienceSearchAction.Request>{ request }
    )[0];
  }
  @IsTest
  static void pricesRatingsAndCanceledBookings() {
    ExperienceSearchResult result = search(request('Coral Test Snorkeling', 2));
    System.assertEquals('OK', result.status, result.message);
    ExperienceSearchResult.Experience card = result.experiences[0];
    System.assertEquals(110, card.estimatedTotal);
    System.assertEquals(UserInfo.getDefaultCurrency(), card.currencyCode);
    System.assertEquals(
      9,
      card.rating,
      'Unrated reviews must not lower the average.'
    );
    System.assertEquals(2, card.ratedReviewCount);
    System.assertEquals(3, card.totalReviewCount);
    System.assertEquals('Already started', card.sessions[0].status);
    System.assertEquals(
      2,
      card.sessions[1].availableSlots,
      'Canceled bookings do not consume seats.'
    );
    System.assertEquals(true, card.sessions[1].isBookable);
    System.assertEquals('Canceled', card.sessions[2].status);
    System.assertEquals(true, card.hasMoreSessions);
  }
  @IsTest
  static void insufficientSeatsAndFullSession() {
    ExperienceSearchAction.Request input = request('Coral Test Snorkeling', 3);
    ExperienceSearchResult result = search(input);
    System.assertEquals(
      'Insufficient seats',
      result.experiences[0].sessions[1].status
    );
    input.startDate = SEARCH_DATE.addDays(2);
    result = search(input);
    System.assertEquals('Full', result.experiences[0].sessions[0].status);
    System.assertEquals(false, result.experiences[0].sessions[0].isBookable);
  }
  @IsTest
  static void emptyOptionalFieldsAndNoSessions() {
    ExperienceSearchResult result = search(request('Coral Test Yoga', null));
    ExperienceSearchResult.Experience card = result.experiences[0];
    System.assertEquals('Price unavailable', card.priceText);
    System.assertEquals('Not yet rated', card.ratingText);
    System.assertEquals('Duration not provided', card.durationText);
    System.assertEquals(false, card.hasImage);
    System.assertEquals(0, card.sessions.size());
    System.assertEquals(1, card.guestCount);
  }
  @IsTest
  static void literalSearchAndCategoryFilter() {
    System.assertEquals(
      'NO_MATCHES',
      search(request('%', 1)).status,
      'Wildcard characters are literal.'
    );
    System.assertEquals(
      'NO_MATCHES',
      search(request('\' OR Name != \'', 1)).status
    );
    ExperienceSearchAction.Request input = request('Coral Test', 1);
    input.category = 'Water Sports';
    System.assertEquals(1, search(input).experiences.size());
  }
  @IsTest
  static void bulkPreservesOrderWithFixedQueryCount() {
    setClock();
    List<ExperienceSearchAction.Request> requests = new List<ExperienceSearchAction.Request>();
    for (Integer i = 0; i < 20; i++)
      requests.add(
        request(
          Math.mod(i, 2) == 0 ? 'Coral Test Snorkeling' : 'Coral Test Yoga',
          1
        )
      );
    Test.startTest();
    Integer beforeQueries = Limits.getQueries();
    Integer beforeDml = Limits.getDmlStatements();
    List<ExperienceSearchResult> results = ExperienceSearchAction.searchExperiences(
      requests
    );
    Integer queryCount = Limits.getQueries() - beforeQueries;
    System.assertEquals(
      0,
      Limits.getDmlStatements() - beforeDml,
      'Search must be read-only.'
    );
    Test.stopTest();
    System.assertEquals(20, results.size());
    System.assertEquals(3, queryCount, 'Queries must not grow per request.');
    System.assertEquals(
      'Coral Test Snorkeling',
      results[0].experiences[0].name
    );
    System.assertEquals('Coral Test Yoga', results[1].experiences[0].name);
  }
  @IsTest
  static void invalidInputsAreIsolated() {
    setClock();
    List<ExperienceSearchResult> results = ExperienceSearchAction.searchExperiences(
      new List<ExperienceSearchAction.Request>{
        null,
        request('Coral Test', 0),
        request('Coral Test Yoga', 1)
      }
    );
    System.assertEquals('INVALID_INPUT', results[0].status);
    System.assertEquals('INVALID_INPUT', results[1].status);
    System.assertEquals('OK', results[2].status);
    ExperienceSearchAction.Request input = request('Coral Test', 1);
    input.endDate = SEARCH_DATE.addDays(31);
    System.assertEquals('INVALID_INPUT', search(input).status);
    input.endDate = SEARCH_DATE.addDays(-1);
    System.assertEquals('INVALID_INPUT', search(input).status);
    System.assertEquals(
      0,
      ExperienceSearchAction.searchExperiences(null).size()
    );
    System.assertEquals(
      0,
      ExperienceSearchAction.searchExperiences(
          new List<ExperienceSearchAction.Request>()
        )
        .size()
    );
  }
  @IsTest
  static void missingStartTimeIsNotBookable() {
    Experience__c experience = [
      SELECT Id
      FROM Experience__c
      WHERE Name = 'Coral Test Yoga'
      LIMIT 1
    ];
    insert new Session__c(Experience__c = experience.Id, Date__c = SEARCH_DATE);
    ExperienceSearchResult result = search(request('Coral Test Yoga', 1));
    System.assertEquals(
      'Availability unknown',
      result.experiences[0].sessions[0].status
    );
    System.assertEquals(false, result.experiences[0].sessions[0].isBookable);
  }
  @IsTest
  static void centralDaylightTimeBoundary() {
    Experience__c experience = [
      SELECT Id
      FROM Experience__c
      WHERE Name = 'Coral Test Snorkeling'
      LIMIT 1
    ];
    Date summer = Date.newInstance(2027, 7, 15);
    insert new Session__c(
      Experience__c = experience.Id,
      Date__c = summer,
      Start_Time__c = Time.newInstance(10, 0, 0, 0)
    );
    ExperienceSearchAction.nowOverride = Datetime.newInstanceGmt(
      2027,
      7,
      15,
      15,
      0,
      0
    ); // 10:00 CDT
    ExperienceSearchAction.Request input = request('Coral Test Snorkeling', 1);
    input.startDate = summer;
    input.endDate = summer;
    ExperienceSearchResult result = ExperienceSearchAction.searchExperiences(
      new List<ExperienceSearchAction.Request>{ input }
    )[0];
    System.assertEquals(
      'Already started',
      result.experiences[0].sessions[0].status
    );
  }
  @IsTest
  static void multipleMatchesHaveExplicitTruncation() {
    List<Experience__c> extra = new List<Experience__c>();
    for (Integer i = 0; i < 6; i++)
      extra.add(new Experience__c(Name = 'Coral Extra ' + i));
    insert extra;
    ExperienceSearchResult result = search(request('Coral Extra', 1));
    System.assertEquals(5, result.experiences.size());
    System.assertEquals(true, result.hasMoreExperiences);
    System.assertEquals('Coral Extra 0', result.experiences[0].name);
  }
  @IsTest
  static void missingObjectAccessReturnsNoData() {
    Profile profile = [
      SELECT Id
      FROM Profile
      WHERE Name = 'Minimum Access - Salesforce'
      LIMIT 1
    ];
    User restricted = new User(
      Alias = 'coralro',
      Email = 'coral-test@example.invalid',
      EmailEncodingKey = 'UTF-8',
      LastName = 'Coral Restricted',
      LanguageLocaleKey = 'en_US',
      LocaleSidKey = 'en_US',
      ProfileId = profile.Id,
      TimeZoneSidKey = 'America/Chicago',
      Username = 'coral.' +
        UserInfo.getOrganizationId() +
        '.' +
        System.now().getTime() +
        '@example.invalid'
    );
    insert restricted;
    System.runAs(restricted) {
      ExperienceSearchResult result = search(request('Coral Test', 1));
      System.assertEquals(false, result.isSuccess);
      System.assertEquals('ACCESS_OR_QUERY_ERROR', result.status);
      System.assertEquals(0, result.experiences.size());
    }
  }
  @IsTest
  static void browsesByTypeWithoutNameAndSupportsOptionalNames() {
    insert new List<Experience__c>{
      new Experience__c(
        Name = 'Canopy Zipline',
        Type__c = 'Adventure Activities',
        Price__c = 75
      ),
      new Experience__c(
        Name = 'Cliffside Climbing',
        Type__c = 'Adventure Activities',
        Price__c = 90
      ),
      new Experience__c(
        Name = 'Sunset Putting',
        Type__c = 'Golf',
        Price__c = 30
      )
    };
    ExperienceSearchAction.Request adventure = request(null, 2);
    adventure.category = 'Adventure Activities';
    ExperienceSearchResult result = search(adventure);
    System.assertEquals('OK', result.status);
    System.assertEquals(2, result.experiences.size());
    System.assertEquals('Canopy Zipline', result.experiences[0].name);
    System.assertEquals(150, result.experiences[0].estimatedTotal);
    for (ExperienceSearchResult.Experience item : result.experiences)
      System.assertEquals('Adventure Activities', item.category);
    ExperienceSearchAction.Request golf = request('', 1);
    golf.category = ' golf ';
    result = search(golf);
    System.assertEquals(1, result.experiences.size());
    System.assertEquals('Sunset Putting', result.experiences[0].name);
    adventure.searchPhrase = 'Cliffside';
    System.assertEquals(1, search(adventure).experiences.size());
    adventure.searchPhrase = 'Sunset';
    System.assertEquals('NO_MATCHES', search(adventure).status);
    System.assertEquals(
      'Sunset Putting',
      search(request('Sunset Putting', 1)).experiences[0].name
    );
    golf.category = 'No Such Type';
    System.assertEquals('NO_MATCHES', search(golf).status);
  }
}
