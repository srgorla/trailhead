@IsTest
private class ExperienceAgentActionTest {
  @IsTest
  static void exposesCompleteResultsInRequestOrder() {
    insert new Experience__c(Name = 'Agentforce Test Kayaking', Price__c = 40);
    ExperienceSearchAction.Request found = new ExperienceSearchAction.Request();
    found.searchPhrase = 'Agentforce Test Kayaking';
    found.guestCount = 2;
    ExperienceSearchAction.Request missing = new ExperienceSearchAction.Request();
    missing.searchPhrase = 'NoSuchAgentforceExperience';
    Test.startTest();
    List<ExperienceAgentAction.Response> responses = ExperienceAgentAction.findExperiences(
      new List<ExperienceSearchAction.Request>{ found, missing, null }
    );
    Test.stopTest();
    System.assertEquals(
      3,
      responses.size(),
      'Preserve one response for every input.'
    );
    System.assertEquals('OK', responses[0].searchResult.status);
    System.assertEquals(
      'Agentforce Test Kayaking',
      responses[0].searchResult.experiences[0].name
    );
    System.assertEquals(
      80,
      responses[0].searchResult.experiences[0].estimatedTotal
    );
    System.assertEquals('NO_MATCHES', responses[1].searchResult.status);
    System.assertEquals('INVALID_INPUT', responses[2].searchResult.status);
    System.assertNotEquals(
      null,
      responses[2].searchResult.message,
      'Keep error messages available to the renderer.'
    );
  }
  @IsTest
  static void handlesNoRequests() {
    System.assertEquals(0, ExperienceAgentAction.findExperiences(null).size());
    System.assertEquals(
      0,
      ExperienceAgentAction.findExperiences(
          new List<ExperienceSearchAction.Request>()
        )
        .size()
    );
  }
}
