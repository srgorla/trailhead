/**
 * @description Test class for PO Data Extractor components
 * Tests PODataModels, PODataExtractorHelper, and PODataExtractorAction
 */
@isTest
private class PODataExtractorTest {
    
    /**
     * Create test ContentVersion with PO file
     */
    @TestSetup
    static void setupTestData() {
        // Create a test ContentVersion (simulating uploaded PO file)
        ContentVersion cv = new ContentVersion(
            Title = 'Test_PO_12345.pdf',
            PathOnClient = 'Test_PO_12345.pdf',
            VersionData = Blob.valueOf('Mock PDF content for testing')
        );
        insert cv;
        
        // Create a test Case
        Case testCase = new Case(
            Subject = 'PO Processing Test',
            Description = 'Test case for PO extraction',
            Origin = 'Email'
        );
        insert testCase;
        
        // Link ContentVersion to Case
        ContentVersion insertedCV = [SELECT Id, ContentDocumentId FROM ContentVersion WHERE Id = :cv.Id];
        ContentDocumentLink cdl = new ContentDocumentLink(
            ContentDocumentId = insertedCV.ContentDocumentId,
            LinkedEntityId = testCase.Id,
            ShareType = 'V'
        );
        insert cdl;
    }
    
    /**
     * Test PODataModels - JSON parsing
     */
    @isTest
    static void testPODataModels_ParseJSON() {
        // Create mock JSON response
        String mockJson = '{"poNumber":"PO-2024-001","poDate":"2024-01-15",' +
            '"buyer":{"companyName":"Acme Corp","contactName":"John Doe",' +
            '"address":{"street":"123 Main St","city":"San Francisco","state":"CA","zipCode":"94102"}},' +
            '"shipTo":{"name":"John Doe","address":{"street":"456 Oak Ave","city":"Oakland","state":"CA","zipCode":"94601"}},' +
            '"billTo":{"name":"Acme Corp","address":{"street":"123 Main St","city":"San Francisco","state":"CA","zipCode":"94102"}},' +
            '"lineItems":[{"productName":"Widget A","productCode":"WID-001","quantity":100,"unitPrice":10.50,"lineTotal":1050.00},' +
            '{"productName":"Widget B","productCode":"WID-002","quantity":50,"unitPrice":25.00,"lineTotal":1250.00}],' +
            '"orderTotal":2300.00}';
        
        Test.startTest();
        PODataModels.PurchaseOrderData poData = PODataModels.parseFromJSON(mockJson);
        Test.stopTest();
        
        // Verify parsed data
        System.assertEquals('PO-2024-001', poData.poNumber, 'PO Number should match');
        System.assertEquals('Acme Corp', poData.buyer.companyName, 'Buyer company should match');
        System.assertEquals(2, poData.lineItems.size(), 'Should have 2 line items');
        System.assertEquals(2300.00, poData.orderTotal, 'Order total should match');
    }
    
    /**
     * Test PODataModels - JSON serialization
     */
    @isTest
    static void testPODataModels_ToJSON() {
        // Create PurchaseOrderData object
        PODataModels.PurchaseOrderData poData = new PODataModels.PurchaseOrderData();
        poData.poNumber = 'PO-TEST-001';
        poData.poDate = Date.newInstance(2024, 1, 15);
        
        PODataModels.BuyerInfo buyer = new PODataModels.BuyerInfo();
        buyer.companyName = 'Test Corp';
        poData.buyer = buyer;
        
        PODataModels.LineItem item = new PODataModels.LineItem();
        item.productName = 'Test Product';
        item.quantity = 10;
        item.unitPrice = 100;
        poData.lineItems.add(item);
        
        Test.startTest();
        String jsonResult = PODataModels.toJSON(poData);
        Test.stopTest();
        
        // Verify JSON contains expected data
        System.assert(jsonResult.contains('PO-TEST-001'), 'JSON should contain PO number');
        System.assert(jsonResult.contains('Test Corp'), 'JSON should contain company name');
    }
    
    /**
     * Test Address formatting
     */
    @isTest
    static void testAddress_Formatting() {
        PODataModels.Address addr = new PODataModels.Address();
        addr.street = '123 Main St';
        addr.city = 'San Francisco';
        addr.state = 'CA';
        addr.zipCode = '94102';
        
        Test.startTest();
        String formatted = addr.toFormattedString();
        Test.stopTest();
        
        System.assert(formatted.contains('123 Main St'), 'Should contain street');
        System.assert(formatted.contains('San Francisco'), 'Should contain city');
        System.assert(formatted.contains('CA'), 'Should contain state');
        System.assert(formatted.contains('94102'), 'Should contain zip');
    }
    
    /**
     * Test LineItem calculation
     */
    @isTest
    static void testLineItem_Calculate() {
        PODataModels.LineItem item = new PODataModels.LineItem();
        item.quantity = 10;
        item.unitPrice = 25.50;
        
        Test.startTest();
        Decimal total = item.calculateLineTotal();
        Test.stopTest();
        
        System.assertEquals(255.00, total, 'Line total should be calculated correctly');
    }
    
    /**
     * Test PODataExtractorHelper - file type validation
     */
    @isTest
    static void testHelper_ValidateFileType() {
        ContentVersion cv = [SELECT Id FROM ContentVersion LIMIT 1];
        
        Test.startTest();
        try {
            // This will throw an exception because prompt template isn't configured
            PODataExtractorHelper.extractFromContentVersion(cv.Id);
            System.assert(false, 'Should have thrown exception');
        } catch (PODataModels.PODataException e) {
            System.assert(e.getMessage().contains('Prompt Template'), 
                'Should indicate prompt template issue');
        }
        Test.stopTest();
    }
    
    /**
     * Test PODataExtractorHelper - Case extraction
     */
    @isTest
    static void testHelper_ExtractFromCase() {
        Case testCase = [SELECT Id FROM Case LIMIT 1];
        
        Test.startTest();
        try {
            // This will throw an exception because prompt template isn't configured
            PODataExtractorHelper.extractFromCase(testCase.Id);
            System.assert(false, 'Should have thrown exception');
        } catch (PODataModels.PODataException e) {
            System.assert(e.getMessage().contains('Prompt Template'), 
                'Should indicate prompt template issue');
        }
        Test.stopTest();
    }
    
    /**
     * Test PODataExtractorHelper - invalid Case ID
     */
    @isTest
    static void testHelper_InvalidCase() {
        Test.startTest();
        try {
            PODataExtractorHelper.extractFromCase('500000000000000AAA');
            System.assert(false, 'Should have thrown exception');
        } catch (PODataModels.PODataException e) {
            System.assert(e.getMessage().contains('No files found'), 
                'Should indicate no files found');
        }
        Test.stopTest();
    }
    
    /**
     * Test PODataExtractorHelper - format as text
     */
    @isTest
    static void testHelper_FormatAsText() {
        // Create test PO data
        PODataModels.PurchaseOrderData poData = new PODataModels.PurchaseOrderData();
        poData.poNumber = 'PO-2024-001';
        poData.poDate = Date.newInstance(2024, 1, 15);
        
        PODataModels.BuyerInfo buyer = new PODataModels.BuyerInfo();
        buyer.companyName = 'Test Corp';
        buyer.contactName = 'John Doe';
        poData.buyer = buyer;
        
        PODataModels.LineItem item = new PODataModels.LineItem();
        item.productName = 'Widget A';
        item.quantity = 10;
        item.unitPrice = 25.50;
        poData.lineItems.add(item);
        poData.orderTotal = 255.00;
        
        Test.startTest();
        String formatted = PODataExtractorHelper.formatPODataAsText(poData);
        Test.stopTest();
        
        System.assert(formatted.contains('PO-2024-001'), 'Should contain PO number');
        System.assert(formatted.contains('Test Corp'), 'Should contain company name');
        System.assert(formatted.contains('Widget A'), 'Should contain product name');
    }
    
    /**
     * Test PODataExtractorAction - with ContentVersion ID
     */
    @isTest
    static void testAction_WithContentVersionId() {
        ContentVersion cv = [SELECT Id FROM ContentVersion LIMIT 1];
        
        PODataModels.PODataRequest request = new PODataModels.PODataRequest();
        request.contentVersionId = cv.Id;
        
        Test.startTest();
        List<PODataModels.PODataResult> results = 
            PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});
        Test.stopTest();
        
        System.assertEquals(1, results.size(), 'Should return one result');
        System.assertEquals(false, results[0].success, 
            'Should fail because prompt template not configured');
        System.assertNotEquals(null, results[0].errorMessage, 
            'Should have error message');
    }
    
    /**
     * Test PODataExtractorAction - with Case ID
     */
    @isTest
    static void testAction_WithCaseId() {
        Case testCase = [SELECT Id FROM Case LIMIT 1];
        
        PODataModels.PODataRequest request = new PODataModels.PODataRequest();
        request.caseId = testCase.Id;
        
        Test.startTest();
        List<PODataModels.PODataResult> results = 
            PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});
        Test.stopTest();
        
        System.assertEquals(1, results.size(), 'Should return one result');
        System.assertEquals(false, results[0].success, 
            'Should fail because prompt template not configured');
    }
    
    /**
     * Test PODataExtractorAction - missing input
     */
    @isTest
    static void testAction_MissingInput() {
        PODataModels.PODataRequest request = new PODataModels.PODataRequest();
        
        Test.startTest();
        List<PODataModels.PODataResult> results = 
            PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});
        Test.stopTest();
        
        System.assertEquals(1, results.size(), 'Should return one result');
        System.assertEquals(false, results[0].success, 'Should fail');
        System.assert(results[0].errorMessage.contains('must be provided'), 
            'Error should mention missing input');
    }
    
    /**
     * Test PODataExtractorAction - both inputs provided
     */
    @isTest
    static void testAction_BothInputs() {
        ContentVersion cv = [SELECT Id FROM ContentVersion LIMIT 1];
        Case testCase = [SELECT Id FROM Case LIMIT 1];
        
        PODataModels.PODataRequest request = new PODataModels.PODataRequest();
        request.contentVersionId = cv.Id;
        request.caseId = testCase.Id;
        
        Test.startTest();
        List<PODataModels.PODataResult> results = 
            PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});
        Test.stopTest();
        
        System.assertEquals(1, results.size(), 'Should return one result');
        System.assertEquals(false, results[0].success, 'Should fail');
        System.assert(results[0].errorMessage.contains('not both'), 
            'Error should mention both inputs provided');
    }
    
    /**
     * Test PODataExtractorAction - test extraction method
     */
    @isTest
    static void testAction_TestExtraction() {
        ContentVersion cv = [SELECT Id FROM ContentVersion LIMIT 1];
        
        Test.startTest();
        PODataModels.PODataResult result = 
            PODataExtractorAction.testExtraction(cv.Id);
        Test.stopTest();
        
        System.assertNotEquals(null, result, 'Should return a result');
        System.assertEquals(false, result.success, 
            'Should fail because prompt template not configured');
    }
}