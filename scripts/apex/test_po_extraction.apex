// Test PO Data Extraction with ContentVersion ID: 068gL0000072EPRQA2
PODataModels.PODataRequest request = new PODataModels.PODataRequest();
request.contentVersionId = '068gL0000072EPRQA2';

List<PODataModels.PODataResult> results = 
    PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});

PODataModels.PODataResult result = results[0];

System.debug('==========================================');
System.debug('SUCCESS: ' + result.success);
System.debug('PO NUMBER: ' + result.poNumber);
System.debug('BUYER COMPANY: ' + result.buyerCompany);
System.debug('ORDER TOTAL: $' + result.orderTotal);
System.debug('==========================================');
System.debug('EXTRACTED DATA (JSON):');
System.debug(result.extractedData);
System.debug('==========================================');