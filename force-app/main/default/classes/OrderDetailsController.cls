public with sharing class OrderDetailsController {
    
    @AuraEnabled(cacheable=false)
    public static Map<String, Object> getOrderDetails(String orderId) {
        try {
            // Make callout to Named Credential
            HttpRequest req = new HttpRequest();
            req.setEndpoint('callout:NGrokNC/api/orders/' + orderId);
            req.setMethod('GET');
            req.setHeader('Accept', 'application/json');
            
            Http http = new Http();
            HttpResponse res = http.send(req);
            
            if (res.getStatusCode() == 200) {
                // Parse the response
                Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
                return result;
            } else if (res.getStatusCode() == 404) {
                return new Map<String, Object>{
                    'success' => false,
                    'message' => 'Order not found'
                };
            } else if (res.getStatusCode() == 401) {
                return new Map<String, Object>{
                    'success' => false,
                    'message' => 'Authentication failed. Please check credentials.'
                };
            } else {
                return new Map<String, Object>{
                    'success' => false,
                    'message' => 'Error: ' + res.getStatus()
                };
            }
        } catch (Exception e) {
            throw new AuraHandledException('Error fetching order details: ' + e.getMessage());
        }
    }
}