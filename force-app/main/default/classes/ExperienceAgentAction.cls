/** Exposes the complete search result as one renderable Agentforce output. */
global with sharing class ExperienceAgentAction {
  global class Response {
    @InvocableVariable(
      label='Experience Search Results'
      description='Complete search result. Render with the Experience Search Result Lightning Type and show in conversation.'
    )
    global ExperienceSearchResult searchResult;
  }

  @InvocableMethod(
    label='Find Coral Cloud Experiences'
    description='Find Coral Cloud resort experiences, prices, ratings and session availability. Returns one structured HXL card result. Does not create bookings or reserve seats.'
    category='Coral Cloud'
  )
  global static List<Response> findExperiences(
    List<ExperienceSearchAction.Request> requests
  ) {
    List<Response> responses = new List<Response>();
    for (
      ExperienceSearchResult result : ExperienceSearchAction.searchExperiences(
        requests
      )
    ) {
      Response response = new Response();
      response.searchResult = result;
      responses.add(response);
    }
    return responses;
  }
}
