@IsTest
private class CostSavingServiceTest {
    // Simple mocks for success and error paths
    private class SuccessMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            System.assertEquals('POST', req.getMethod(), 'Method should be POST');
            System.assert(req.getEndpoint().contains('callout:NC3/'), 'Endpoint must use Named Credential NC3');
            System.assertEquals('text/plain', req.getHeader('Content-Type'), 'Content-Type must be text/plain');

            HttpResponse res = new HttpResponse();
            res.setStatusCode(200);
            res.setStatus('OK');
            res.setBody('{"success":true,"id":"123"}');
            return res;
        }
    }
    private class ErrorMock implements HttpCalloutMock {
        public HTTPResponse respond(HTTPRequest req) {
            HttpResponse res = new HttpResponse();
            res.setStatusCode(500);
            res.setStatus('Server Error');
            res.setBody('{"success":false,"message":"failure"}');
            return res;
        }
    }

    @IsTest
    static void postCostSavings_success() {
        Test.setMock(HttpCalloutMock.class, new SuccessMock());

        Test.startTest();
        CostSavingService.CalloutResult r = CostSavingService.postCostSavings('{"a":1}');
        Test.stopTest();

        System.assertEquals(200, r.statusCode, 'Expected HTTP 200');
        System.assertEquals('OK', r.status, 'Expected OK');
        System.assertEquals(true, (Boolean) r.parsedJson.get('success'), 'Parsed JSON should indicate success');
        System.assertEquals('123', (String) r.parsedJson.get('id'), 'Parsed id expected');
        System.assertEquals(null, r.errorMessage, 'No error message for success');
    }

    @IsTest
    static void postCostSavings_error() {
        Test.setMock(HttpCalloutMock.class, new ErrorMock());

        Test.startTest();
        CostSavingService.CalloutResult r = CostSavingService.postCostSavings('{"a":1}');
        Test.stopTest();

        System.assertEquals(500, r.statusCode, 'Expected HTTP 500');
        System.assertEquals('Server Error', r.status, 'Expected Server Error status');
        System.assertEquals('Non-success status from external service', r.errorMessage, 'Should set error message');
        System.assertNotEquals(null, r.responseBody, 'Body should be present');
    }

    @IsTest
    static void invocable_flow_happy_path() {
        Test.setMock(HttpCalloutMock.class, new SuccessMock());

        CostSavingInvocable.Request req = new CostSavingInvocable.Request();
        req.jsonBody = '{"test":"value"}';

        Test.startTest();
        List<CostSavingInvocable.Response> resps = CostSavingInvocable.invoke(new List<CostSavingInvocable.Request>{ req });
        Test.stopTest();

        System.assertEquals(1, resps.size(), 'One response expected');
        System.assertEquals(200, resps[0].statusCode);
        System.assertEquals('OK', resps[0].status);
        System.assert(resps[0].responseBody.contains('"success":true'));
        System.assertEquals(null, resps[0].errorMessage);
    }

    @IsTest
    static void invocable_flow_empty_requests() {
        Test.startTest();
        List<CostSavingInvocable.Response> resps = CostSavingInvocable.invoke(new List<CostSavingInvocable.Request>());
        Test.stopTest();
        System.assertEquals(0, resps.size(), 'Empty input should return empty output');
    }
}
