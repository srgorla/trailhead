@isTest
private class OrderDetailsControllerTest {
    
    @isTest
    static void testGetOrderDetailsSuccess() {
        // Set up mock response
        Test.setMock(HttpCalloutMock.class, new OrderDetailsMockSuccess());
        
        Test.startTest();
        Map<String, Object> result = OrderDetailsController.getOrderDetails('ORD-001');
        Test.stopTest();
        
        System.assert(result != null, 'Result should not be null');
        System.assertEquals(true, result.get('success'), 'Success should be true');
    }
    
    @isTest
    static void testGetOrderDetailsNotFound() {
        // Set up mock response
        Test.setMock(HttpCalloutMock.class, new OrderDetailsMockNotFound());
        
        Test.startTest();
        Map<String, Object> result = OrderDetailsController.getOrderDetails('ORD-999');
        Test.stopTest();
        
        System.assertEquals(false, result.get('success'), 'Success should be false');
    }
        // Mock class for successful response
    private class OrderDetailsMockSuccess implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"success":true,"order":{"order_id":"ORD-001","customer_name":"John Doe","customer_email":"john.doe@example.com","order_date":"2024-11-20","status":"shipped","total_amount":459.97,"items":[{"item_id":"ITEM-101","product_name":"Wireless Headphones","quantity":1,"unit_price":129.99,"total":129.99}]}}');
            res.setStatusCode(200);
            return res;
        }
    }
    
    // Mock class for not found response
    private class OrderDetailsMockNotFound implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse res = new HttpResponse();
            res.setHeader('Content-Type', 'application/json');
            res.setBody('{"success":false,"error":"not_found","message":"Order ORD-999 not found"}');
            res.setStatusCode(404);
            return res;
        }
    }
}