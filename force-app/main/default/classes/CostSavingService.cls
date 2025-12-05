/**
 * @description Service to post Cost Savings payload to external API via Named Credential NC3.
 * Mirrors curl with Content-Type: text/plain and raw JSON string body.
 * Uses with sharing and robust error handling.
 */
public with sharing class CostSavingService {
    public class CalloutResult {
        @AuraEnabled public Integer statusCode;
        @AuraEnabled public String status;
        @AuraEnabled public String responseBody;
        @AuraEnabled public String errorMessage;
        @AuraEnabled public Map<String, Object> parsedJson;
    }

    /**
     * Post payload to /businesssystem/v1/qa/cds-totalcostsavings/post/costSavingsMaster
     * Endpoint is resolved by Named Credential "NC3".
     * Content-Type is text/plain per provided curl.
     * @param jsonBody Raw JSON string to send as-is.
     */
    public static CalloutResult postCostSavings(String jsonBody) {
        CalloutResult result = new CalloutResult();
        Http http = new Http();
        HttpRequest req = new HttpRequest();

        // Named Credential NC3. Appends path to NC base URL.
        req.setEndpoint('callout:NC3');
        req.setMethod('POST');

        // Match provided curl header
        req.setHeader('Content-Type', 'text/plain');

        // Raw JSON body
        req.setBody(jsonBody);

        // Reasonable timeout
        req.setTimeout(120000);

        try {
            HttpResponse res = http.send(req);
            result.statusCode = res.getStatusCode();
            result.status = res.getStatus();
            result.responseBody = res.getBody();

            // Attempt to parse JSON body if applicable; non-fatal if fails
            if (String.isNotBlank(result.responseBody)) {
                try {
                    result.parsedJson = (Map<String, Object>) JSON.deserializeUntyped(result.responseBody);
                } catch (Exception parseEx) {
                    // Ignore parse errors; keep raw body
                }
            }

            if (result.statusCode < 200 || result.statusCode >= 300) {
                result.errorMessage = 'Non-success status from external service';
            }
        } catch (CalloutException ex) {
            result.statusCode = -1;
            result.status = 'Callout Exception';
            result.errorMessage = ex.getMessage();
        } catch (Exception ex) {
            result.statusCode = -1;
            result.status = 'Unhandled Exception';
            result.errorMessage = ex.getMessage();
        }
        return result;
    }
}
