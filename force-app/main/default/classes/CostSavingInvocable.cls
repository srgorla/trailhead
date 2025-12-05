/**
 * @description Invocable wrapper to post Cost Savings payload using Named Credential NC3.
 * Accepts a raw JSON String and returns status details, suitable for Flow.
 */
public with sharing class CostSavingInvocable {
    public class Request {
        @InvocableVariable(required=true)
        public String jsonBody;
    }

    public class Response {
        @InvocableVariable public Integer statusCode;
        @InvocableVariable public String status;
        @InvocableVariable public String responseBody;
        @InvocableVariable public String errorMessage;
    }

    @InvocableMethod(label='Post Cost Savings' description='POST the provided JSON to the external service via Named Credential NC3')
    public static List<Response> invoke(List<Request> requests) {
        List<Response> results = new List<Response>();
        if (requests == null || requests.isEmpty()) {
            return results;
        }

        for (Request r : requests) {
            CostSavingService.CalloutResult svcRes = CostSavingService.postCostSavings(r.jsonBody);
            Response resp = new Response();
            resp.statusCode = svcRes.statusCode;
            resp.status = svcRes.status;
            resp.responseBody = svcRes.responseBody;
            resp.errorMessage = svcRes.errorMessage;
            results.add(resp);
        }
        return results;
    }
}
