public with sharing class AccountApiController {
    public class FetchResult {
        @AuraEnabled public Integer statusCode;
        @AuraEnabled public String status;
        @AuraEnabled public String body;
        @AuraEnabled public String errorMessage;
        @AuraEnabled public Map<String, String> headers;
    }

    @AuraEnabled(cacheable=false)
    public static FetchResult fetchAccount(String accountId, String apiVersion) {
        if (String.isBlank(accountId)) {
            throw new AuraHandledException('Account Id is required.');
        }
        String version = String.isBlank(apiVersion) ? 'v65.0' : apiVersion;

        HttpRequest req = new HttpRequest();
        req.setMethod('GET');
        // Uses Named Credential SG_AgentForce configured with External Credential (client_credentials)
        req.setEndpoint('callout:SG_AgentForce/services/data/' + version + '/sobjects/Account/' + String.valueOf(accountId));
        req.setHeader('Accept', 'application/json');

        Http http = new Http();
        AccountApiController.FetchResult result = new AccountApiController.FetchResult();
        try {
            HttpResponse res = http.send(req);
            result.statusCode = res.getStatusCode();
            result.status = res.getStatus();
            result.body = res.getBody();
            // collect a few headers for troubleshooting
            result.headers = new Map<String, String>();
            for (String key : res.getHeaderKeys()) {
                result.headers.put(key, res.getHeader(key));
            }
            if (res.getStatusCode() >= 400) {
                result.errorMessage = 'Non-success response from API.';
            }
        } catch (System.CalloutException e) {
            result.statusCode = 0;
            result.status = 'CalloutException';
            result.errorMessage = e.getMessage();
        } catch (Exception e) {
            result.statusCode = 0;
            result.status = 'Exception';
            result.errorMessage = e.getMessage();
        }
        return result;
    }
}
