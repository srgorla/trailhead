/**
 * @description Invocable Apex action for extracting PO data from files
 * Can be called from Flows, Agents, and other declarative automation
 */
public class PODataExtractorAction {
    
    /**
     * Extract PO data from file - main invocable method
     * Accessible from Agentforce, Flow, and other automation tools
     */
    @InvocableMethod(
        label='Extract Purchase Order Data'
        description='Extracts structured data from PO files (PDF or image) using AI'
        category='Purchase Orders'
    )
    public static List<PODataModels.PODataResult> extractPOData(
        List<PODataModels.PODataRequest> requests
    ) {
        List<PODataModels.PODataResult> results = new List<PODataModels.PODataResult>();
        
        for (PODataModels.PODataRequest request : requests) {
            PODataModels.PODataResult result = new PODataModels.PODataResult();
            
            try {
                // Validate input
                validateRequest(request);
                
                // Extract data based on input type
                PODataModels.PurchaseOrderData poData;
                
                if (String.isNotBlank(request.contentVersionId)) {
                    poData = PODataExtractorHelper.extractFromContentVersion(
                        request.contentVersionId
                    );
                } else if (String.isNotBlank(request.caseId)) {
                    poData = PODataExtractorHelper.extractFromCase(
                        request.caseId
                    );
                } else {
                    throw new PODataModels.PODataException(
                        'Either ContentVersion ID or Case ID must be provided'
                    );
                }
                
                // Build success result
                result.success = true;
                result.extractedData = PODataModels.toJSON(poData);
                result.poNumber = poData.poNumber;
                result.buyerCompany = poData.buyer?.companyName;
                result.orderTotal = poData.orderTotal;
                result.errorMessage = null;
                
            } catch (PODataModels.PODataException e) {
                // Handle known exceptions
                result.success = false;
                result.errorMessage = e.getMessage();
                result.extractedData = null;
                
            } catch (Exception e) {
                // Handle unexpected exceptions
                result.success = false;
                result.errorMessage = 'Unexpected error: ' + e.getMessage();
                result.extractedData = null;
            }
            
            results.add(result);
        }
        
        return results;
    }
    
    /**
     * Validate the request has required fields
     */
    private static void validateRequest(PODataModels.PODataRequest request) {
        if (String.isBlank(request.contentVersionId) && 
            String.isBlank(request.caseId)) {
            throw new PODataModels.PODataException(
                'Either ContentVersion ID or Case ID must be provided'
            );
        }
        
        if (String.isNotBlank(request.contentVersionId) && 
            String.isNotBlank(request.caseId)) {
            throw new PODataModels.PODataException(
                'Provide either ContentVersion ID or Case ID, not both'
            );
        }
    }
    
    /**
     * Test method for direct invocation (useful for testing without deployment)
     */
    public static PODataModels.PODataResult testExtraction(String contentVersionId) {
        PODataModels.PODataRequest request = new PODataModels.PODataRequest();
        request.contentVersionId = contentVersionId;
        
        List<PODataModels.PODataResult> results = extractPOData(
            new List<PODataModels.PODataRequest>{ request }
        );
        
        return results[0];
    }
}