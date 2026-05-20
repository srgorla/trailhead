# Purchase Order Data Extraction - Setup & Testing Guide

## Overview

This solution enables automatic extraction of Purchase Order data from PDF or image files using Agentforce agents and Einstein AI. The system can process PO files attached to Cases and extract structured data including vendor information, line items, pricing, and shipping details.

## Architecture

```
User/Customer → Case with PO Attachment → Agentforce Agent → Apex Action → 
Einstein Prompt Template → Einstein Vision AI → Structured PO Data → Salesforce Orders
```

## Components Created

### Apex Classes

1. **PODataModels.cls** - Data structures for PO information
   - Request/Response wrappers for invocable methods
   - Complete PO data model matching the sample PO format
   - Vendor, Buyer, Ship-To, Bill-To information
   - Line items with SKU codes, descriptions, quantities, prices
   - Financial fields (subtotal, tax, shipping, total)

2. **PODataExtractorHelper.cls** - Business logic
   - File retrieval from ContentVersion or Case
   - File type validation
   - Prompt template integration (placeholder for Einstein API)
   - JSON parsing and validation
   - Human-readable formatting

3. **PODataExtractorAction.cls** - Invocable action
   - Callable from Agentforce agents
   - Accepts ContentVersion ID or Case ID
   - Returns structured PO data or error messages

4. **PODataExtractorTest.cls** - Test coverage
   - Comprehensive test coverage for all components
   - Mock data based on sample PO format

## Sample PO Format

Based on the provided PO (PO-2026-10458), the system extracts:

### Header Information
- PO Number: PO-2026-10458
- PO Date: April 15, 2026
- Requested Delivery: April 25, 2026

### Parties
- **Vendor**: Global Supply Inc. (VEND-2041)
- **Buyer**: Acme Retail LLC
- **Ship To**: Acme Retail LLC - Warehouse 3
- **Bill To**: Acme Retail LLC - Accounts Payable

### Line Items (Example)
| Line | SKU | Description | Qty | Unit Price | Total |
|------|-----|-------------|-----|------------|-------|
| 1 | SKU-1001 | Wireless Barcode Scanner | 10 | $85.00 | $850.00 |
| 2 | SKU-2005 | Thermal Label Printer | 4 | $210.00 | $840.00 |
| 3 | SKU-3010 | Printer Labels - 4" x 6" | 25 | $18.00 | $450.00 |

### Financials
- Subtotal: $3,377.44
- Tax (8.25%): $278.64
- Shipping: $55.00
- **Grand Total: $3,711.08**

### Additional Information
- Payment Terms: Net 30
- Shipping Method: Ground
- Authorized By: Sarah Johnson, Procurement Manager

## Setup Instructions

### Step 1: Deploy Apex Classes

```bash
# Deploy to your org
sf project deploy start --source-path force-app/main/default/classes

# Run tests
sf apex run test --test-level RunLocalTests --wait 10
```

### Step 2: Create Einstein Prompt Template

**Name**: `PO_Data_Extraction_Template`

**Prompt Template Content**:

```
You are an AI assistant specialized in extracting purchase order information from documents.

Analyze the provided file and extract ALL information into a structured JSON format.

File ID: {!ContentVersion.Id}
File Name: {!ContentVersion.Title}

Extract the following information from the purchase order:

HEADER INFORMATION:
1. PO Number (e.g., PO-2026-10458)
2. PO Date
3. Requested Delivery Date

VENDOR INFORMATION:
- Company Name
- Vendor ID (if available)
- Full Address (Street, City, State, Zip)
- Phone
- Email

BUYER INFORMATION (Company issuing the PO):
- Company Name
- Contact Name
- Full Address (Street, City, State, Zip)
- Phone
- Email

SHIP TO INFORMATION:
- Name/Location
- Full Address (Street, City, State, Zip)
- Receiving hours (if available)

BILL TO INFORMATION:
- Name/Department
- Full Address (Street, City, State, Zip)

LINE ITEMS (Extract ALL line items):
For each line item, extract:
- Line Number
- Item/SKU Code
- Product Name
- Description (full description text)
- Quantity
- Unit Price
- Line Total

FINANCIAL INFORMATION:
- Subtotal
- Tax Rate (percentage)
- Tax Amount
- Shipping Amount
- Grand Total

ADDITIONAL INFORMATION:
- Payment Terms
- Shipping Method
- Notes
- Authorized By (Name)
- Authorized By Title

Return ONLY valid JSON in this EXACT format (no markdown, no code blocks):

{
  "poNumber": "string",
  "poDate": "YYYY-MM-DD",
  "requestedDeliveryDate": "YYYY-MM-DD",
  "vendor": {
    "companyName": "string",
    "vendorId": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string"
    },
    "phone": "string",
    "email": "string"
  },
  "buyer": {
    "companyName": "string",
    "contactName": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string"
    },
    "phone": "string",
    "email": "string"
  },
  "shipTo": {
    "name": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string"
    }
  },
  "billTo": {
    "name": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string"
    }
  },
  "lineItems": [
    {
      "lineNumber": 1,
      "itemCode": "string",
      "productName": "string",
      "description": "string",
      "quantity": number,
      "unitPrice": number,
      "lineTotal": number
    }
  ],
  "subtotal": number,
  "taxRate": number,
  "taxAmount": number,
  "shippingAmount": number,
  "orderTotal": number,
  "paymentTerms": "string",
  "shippingMethod": "string",
  "notes": "string",
  "authorizedBy": "string",
  "authorizedByTitle": "string"
}
```

### Step 3: Configure Einstein Vision

1. Navigate to **Setup** → **Einstein Setup**
2. Enable **Einstein Vision** and **Einstein Document Reader**
3. Ensure your org has the necessary licenses
4. Connect the Prompt Template to use Einstein Vision for OCR

### Step 4: Update Apex Helper (When Ready)

Once the Prompt Template is configured, update `PODataExtractorHelper.cls`:

```apex
// Replace the placeholder in callPromptTemplate() method:
private static String callPromptTemplate(String contentVersionId) {
    try {
        ConnectApi.EinsteinPromptTemplateGenerationsInput input = 
            new ConnectApi.EinsteinPromptTemplateGenerationsInput();
        input.promptTemplateName = PROMPT_TEMPLATE_NAME;
        input.inputParams = new Map<String, String>{
            'contentVersionId' => contentVersionId
        };
        
        ConnectApi.EinsteinPromptTemplateGenerationsRepresentation result = 
            ConnectApi.EinsteinPromptTemplates.generateMessage(input);
        
        return result.generatedText;
    } catch (Exception e) {
        throw new PODataModels.PODataException(
            'Failed to call prompt template: ' + e.getMessage()
        );
    }
}
```

### Step 5: Create Agentforce Agent

Create an agent using Agent Builder with the following configuration:

**Agent Name**: PO Processing Agent

**Agent Script** (save as `.agent` file):

```yaml
apiVersion: v1
kind: Agent
metadata:
  name: POProcessingAgent
  displayName: Purchase Order Processing Agent
spec:
  instructions: |
    You are an AI assistant that helps process purchase orders by extracting data from attached files.
    
    When a user provides a ContentVersion ID or mentions a Case with an attachment:
    1. Call the Extract Purchase Order Data action
    2. If successful, display the extracted information in a clear format
    3. Summarize key details: PO Number, Vendor, Total Amount, Number of Line Items
    4. Ask if they want to proceed with creating an order (future feature)
    
    If extraction fails, explain the error and suggest solutions:
    - Ensure the file is a PDF or image
    - Check that the file contains a valid purchase order
    - Verify the file is accessible
  
  topics:
    - name: extract_po_data
      instructions: |
        Extract purchase order data from an attached file.
        
        Ask the user for the ContentVersion ID or Case ID.
        Call the extractPOData action with the provided ID.
        Display the results in a formatted way.
      
      actions:
        - name: extractPOData
          type: apex
          apexClass: PODataExtractorAction
          description: Extracts structured data from PO files
          
    - name: display_results
      instructions: |
        When PO data is successfully extracted:
        
        📄 **Purchase Order: [PO Number]**
        
        **Vendor:** [Vendor Company]
        **Buyer:** [Buyer Company]
        **Total:** $[Grand Total]
        **Line Items:** [Count]
        
        **Items:**
        [List each item with SKU, name, qty, price]
        
        Would you like me to create an order in Salesforce with this information?
```

## Testing Guide

### Test 1: Direct Apex Testing

```apex
// Execute Anonymous Apex:

// Upload test PO file to Salesforce first, then get its ContentVersion ID
// Replace with your actual ContentVersion ID
String cvId = '068XXXXXXXXXXXXXXX';

PODataModels.PODataRequest request = new PODataModels.PODataRequest();
request.contentVersionId = cvId;

List<PODataModels.PODataResult> results = 
    PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});

System.debug('Success: ' + results[0].success);
System.debug('PO Number: ' + results[0].poNumber);
System.debug('Extracted Data: ' + results[0].extractedData);
System.debug('Error: ' + results[0].errorMessage);
```

### Test 2: Test with Case

```apex
// Create a test Case
Case testCase = new Case(
    Subject = 'PO Processing - Test',
    Description = 'Testing PO extraction',
    Origin = 'Email'
);
insert testCase;

// Upload PO file and attach to Case
// (Use Files related list in Salesforce UI or API)

// Then test extraction
PODataModels.PODataRequest request = new PODataModels.PODataRequest();
request.caseId = testCase.Id;

List<PODataModels.PODataResult> results = 
    PODataExtractorAction.extractPOData(new List<PODataModels.PODataRequest>{request});

System.debug(results[0]);
```

### Test 3: Agent Builder Preview

1. Open **Agent Builder**
2. Load the **PO Processing Agent**
3. Click **Preview**
4. Test conversation:

```
User: "Extract PO data from ContentVersion 068XXXXXXXXXXXXXXX"

Agent: [Calls action and displays results]

User: "Extract data from Case 500XXXXXXXXXXXXXXX"

Agent: [Finds attachment and extracts]
```

## Troubleshooting

### Issue: "Prompt Template integration not yet configured"
**Solution**: Complete Step 2 and Step 4 above to configure the Einstein Prompt Template.

### Issue: "File not found or not accessible"
**Solution**: Ensure the ContentVersion ID is correct and the running user has access to the file.

### Issue: "Unsupported file type"
**Solution**: Only PDF, PNG, JPG, JPEG, TIFF, and GIF files are supported.

### Issue: "No files found attached to the Case"
**Solution**: Ensure a file is attached to the Case using the Files related list.

### Issue: JSON parsing errors
**Solution**: The Einstein response may need cleaning. Check the `cleanJsonResponse()` method in Helper class.

## Next Steps

1. **Create Order from PO Data**: Add Apex action to create Order and OrderItem records
2. **Account/Product Matching**: Implement fuzzy matching to find existing Accounts and Products
3. **Approval Workflow**: Add human review step before creating orders
4. **Bulk Processing**: Handle multiple POs at once
5. **Dashboard**: Create reports on PO processing metrics

## Sample Data for Testing

You can use the provided sample PO file (PO-2026-10458.pdf) which contains:
- Complete vendor and buyer information
- 5 line items with SKU codes
- Financial calculations including tax and shipping
- Authorized signature

## Support

For issues or questions:
- Check the test class (`PODataExtractorTest.cls`) for usage examples
- Review Einstein setup documentation
- Verify all required licenses are enabled