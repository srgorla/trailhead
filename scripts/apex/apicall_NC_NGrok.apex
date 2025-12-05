HttpRequest req = new HttpRequest();
req.setMethod('GET'); 
req.setEndpoint('callout:NGrokNC/api/orders/ORD-001' ) ; 
req.setHeader('Accept', 'application/json');

Http http = new Http(); 
HttpResponse res; 
try { 
    res = http.send(req); 
    System.debug('Status: ' + res.getStatusCode()); 
    System.debug('Body: ' + res.getBody()); 
if (res.getStatusCode() == 200) 
    {   
        Map<String, Object> result = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
        Map<String, Object> order = (Map<String, Object>) result.get('order');
        System.debug('Order ID: ' + order.get('order_id'));
        //System.debug('Customer: ' + order.get('customer_name'));
        //System.debug('Total: ' + order.get('total_amount'));
        
        // Process order items
        List<Object> items = (List<Object>) order.get('items');
        for (Object itemObj : items) {
            Map<String, Object> item = (Map<String, Object>) itemObj;
            System.debug('Item: ' + item.get('product_name') + ' - Quantity: ' + item.get('quantity'));
        }
    } 
} catch (System.CalloutException e) {
     System.debug('Callout exception: ' + e.getMessage()); throw e; 
}
