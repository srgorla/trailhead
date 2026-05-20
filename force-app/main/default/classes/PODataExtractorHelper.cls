/**
 * @description Helper class for PO data extraction business logic
 * Handles file retrieval, prompt template invocation, and data parsing
 */
public class PODataExtractorHelper {
    
    private static final String PROMPT_TEMPLATE_NAME = 'PO_Data_Extraction_Template';
    
    /**
     * Extract PO data from ContentVersion
     */
    public static PODataModels.PurchaseOrderData extractFromContentVersion(String contentVersionId) {
        if (String.isBlank(contentVersionId)) {
            throw new PODataModels.PODataException('ContentVersion ID is required');
        }
        
        // Validate ContentVersion exists and is accessible
        ContentVersion cv = getContentVersion(contentVersionId);
        if (cv == null) {
            throw new PODataModels.PODataException('File not found or not accessible');
        }
        
        // Validate file type
        validateFileType(cv.FileType);
        
        // Call prompt template with ContentVersion ID
        String extractedJson = callPromptTemplate(contentVersionId);
        
        // Parse and return structured data
        return parseAndValidate(extractedJson);
    }
    
    /**
     * Extract PO data from Case (finds first attachment)
     */
    public static PODataModels.PurchaseOrderData extractFromCase(String caseId) {
        if (String.isBlank(caseId)) {
            throw new PODataModels.PODataException('Case ID is required');
        }
        
        // Find ContentDocumentLinks for the Case
        List<ContentDocumentLink> links = [
            SELECT ContentDocumentId
            FROM ContentDocumentLink
            WHERE LinkedEntityId = :caseId
            AND ContentDocument.LatestPublishedVersionId != null
            ORDER BY ContentDocument.CreatedDate DESC
            LIMIT 1
        ];
        
        if (links.isEmpty()) {
            throw new PODataModels.PODataException('No files found attached to the Case');
        }
        
        // Get the ContentVersion
        List<ContentVersion> versions = [
            SELECT Id, Title, FileType, FileExtension
            FROM ContentVersion
            WHERE ContentDocumentId = :links[0].ContentDocumentId
            AND IsLatest = true
            LIMIT 1
        ];
        
        if (versions.isEmpty()) {
            throw new PODataModels.PODataException('File version not found');
        }
        
        return extractFromContentVersion(versions[0].Id);
    }
    
    /**
     * Retrieve ContentVersion record
     */
    private static ContentVersion getContentVersion(String contentVersionId) {
        List<ContentVersion> versions = [
            SELECT Id, Title, FileType, FileExtension, VersionData
            FROM ContentVersion
            WHERE Id = :contentVersionId
            LIMIT 1
        ];
        
        return versions.isEmpty() ? null : versions[0];
    }
    
    /**
     * Validate file type is supported
     */
    private static void validateFileType(String fileType) {
        Set<String> supportedTypes = new Set<String>{
            'PDF', 'PNG', 'JPG', 'JPEG', 'TIFF', 'GIF'
        };
        
        if (!supportedTypes.contains(fileType?.toUpperCase())) {
            throw new PODataModels.PODataException(
                'Unsupported file type: ' + fileType + 
                '. Supported types: PDF, PNG, JPG, JPEG, TIFF, GIF'
            );
        }
    }
    
    /**
     * Call Einstein Prompt Template
     * Currently using mock data - integrate with actual Einstein API when available
     */
    private static String callPromptTemplate(String contentVersionId) {
        try {
            // TEMPORARY: Return mock data for testing
            // The GenAiPromptTemplate has been deployed: PO_Data_Extraction_Template
            // Once Einstein API integration is available, replace this with actual API call
            return PODataExtractorMockHelper.generateMockPOData();
            
            /* 
             * TODO: Replace with actual Einstein integration
             * The exact API depends on your Einstein setup and may involve:
             * 1. Flow-based integration calling the Prompt Template
             * 2. Custom REST callout to Einstein API
             * 3. Future ConnectApi methods when available
             * 
             * The Prompt Template is deployed and ready at:
             * Setup → Prompt Builder → PO_Data_Extraction_Template
             */
            
        } catch (Exception e) {
            throw new PODataModels.PODataException(
                'Failed to extract PO data: ' + e.getMessage()
            );
        }
    }
    
    /**
     * Parse and validate the JSON response from Einstein
     */
    private static PODataModels.PurchaseOrderData parseAndValidate(String jsonData) {
        try {
            // Clean up the JSON if needed (remove markdown code blocks, etc.)
            String cleanJson = cleanJsonResponse(jsonData);
            
            // Parse into PurchaseOrderData
            PODataModels.PurchaseOrderData poData = 
                PODataModels.parseFromJSON(cleanJson);
            
            // Validate required fields
            validatePOData(poData);
            
            // Calculate line totals if missing
            if (poData.lineItems != null) {
                for (PODataModels.LineItem item : poData.lineItems) {
                    if (item.lineTotal == null) {
                        item.lineTotal = item.calculateLineTotal();
                    }
                }
            }
            
            return poData;
            
        } catch (Exception e) {
            throw new PODataModels.PODataException(
                'Failed to parse PO data: ' + e.getMessage()
            );
        }
    }
    
    /**
     * Clean JSON response (remove markdown code blocks, extra whitespace, etc.)
     */
    private static String cleanJsonResponse(String jsonData) {
        if (String.isBlank(jsonData)) {
            throw new PODataModels.PODataException('Empty response from extraction');
        }
        
        // Remove markdown code blocks if present
        String cleaned = jsonData.trim();
        if (cleaned.startsWith('```json')) {
            cleaned = cleaned.substring(7);
        } else if (cleaned.startsWith('```')) {
            cleaned = cleaned.substring(3);
        }
        if (cleaned.endsWith('```')) {
            cleaned = cleaned.substring(0, cleaned.length() - 3);
        }
        
        return cleaned.trim();
    }
    
    /**
     * Validate required PO data fields
     */
    private static void validatePOData(PODataModels.PurchaseOrderData poData) {
        List<String> errors = new List<String>();
        
        if (String.isBlank(poData.poNumber)) {
            errors.add('PO Number is required');
        }
        
        if (poData.vendor == null || String.isBlank(poData.vendor.companyName)) {
            errors.add('Vendor company name is required');
        }
        
        if (poData.buyer == null || String.isBlank(poData.buyer.companyName)) {
            errors.add('Buyer company name is required');
        }
        
        if (poData.lineItems == null || poData.lineItems.isEmpty()) {
            errors.add('At least one line item is required');
        }
        
        if (!errors.isEmpty()) {
            throw new PODataModels.PODataException(
                'Validation errors: ' + String.join(errors, '; ')
            );
        }
    }
    
    /**
     * Format PO data as human-readable text
     */
    public static String formatPODataAsText(PODataModels.PurchaseOrderData poData) {
        List<String> lines = new List<String>();
        
        lines.add('=== PURCHASE ORDER ===');
        lines.add('PO Number: ' + poData.poNumber);
        if (poData.poDate != null) {
            lines.add('PO Date: ' + poData.poDate.format());
        }
        lines.add('');
        
        if (poData.buyer != null) {
            lines.add('BUYER:');
            lines.add('  Company: ' + poData.buyer.companyName);
            if (String.isNotBlank(poData.buyer.contactName)) {
                lines.add('  Contact: ' + poData.buyer.contactName);
            }
            if (poData.buyer.address != null) {
                lines.add('  Address: ' + poData.buyer.address.toFormattedString());
            }
            lines.add('');
        }
        
        if (poData.shipTo != null) {
            lines.add('SHIP TO:');
            lines.add('  Name: ' + poData.shipTo.name);
            if (poData.shipTo.address != null) {
                lines.add('  Address: ' + poData.shipTo.address.toFormattedString());
            }
            lines.add('');
        }
        
        if (poData.lineItems != null && !poData.lineItems.isEmpty()) {
            lines.add('LINE ITEMS:');
            Integer lineNum = 1;
            for (PODataModels.LineItem item : poData.lineItems) {
                lines.add('  ' + lineNum + '. ' + item.productName);
                lines.add('     Qty: ' + item.quantity + 
                         ' | Unit Price: $' + item.unitPrice.setScale(2) +
                         ' | Total: $' + item.calculateLineTotal().setScale(2));
                lineNum++;
            }
            lines.add('');
        }
        
        if (poData.orderTotal != null) {
            lines.add('ORDER TOTAL: $' + poData.orderTotal.setScale(2));
        }
        
        return String.join(lines, '\n');
    }
}