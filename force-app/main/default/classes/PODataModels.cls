/**
 * @description Data models for Purchase Order extraction
 * Contains wrapper classes for requests, responses, and PO data structures
 */
public class PODataModels {
    
    /**
     * Input wrapper for the invocable method
     */
    public class PODataRequest {
        @InvocableVariable(label='ContentVersion ID' description='ID of the file to extract data from' required=false)
        public String contentVersionId;
        
        @InvocableVariable(label='Case ID' description='Case ID with attached PO file' required=false)
        public String caseId;
    }
    
    /**
     * Output wrapper for the invocable method
     */
    public class PODataResult {
        @InvocableVariable(label='Success' description='Whether extraction was successful')
        public Boolean success;
        
        @InvocableVariable(label='Extracted Data' description='JSON string of extracted PO data')
        public String extractedData;
        
        @InvocableVariable(label='Error Message' description='Error message if extraction failed')
        public String errorMessage;
        
        @InvocableVariable(label='PO Number' description='Extracted PO Number')
        public String poNumber;
        
        @InvocableVariable(label='Buyer Company' description='Buyer company name')
        public String buyerCompany;
        
        @InvocableVariable(label='Order Total' description='Total order amount')
        public Decimal orderTotal;
    }
    
    /**
     * Complete PO data structure
     */
    public class PurchaseOrderData {
        public String poNumber;
        public Date poDate;
        public Date requestedDeliveryDate;
        public VendorInfo vendor;
        public BuyerInfo buyer;
        public AddressInfo shipTo;
        public AddressInfo billTo;
        public List<LineItem> lineItems;
        public Decimal subtotal;
        public Decimal taxRate;
        public Decimal taxAmount;
        public Decimal shippingAmount;
        public Decimal orderTotal;
        public String paymentTerms;
        public String shippingMethod;
        public String notes;
        public String authorizedBy;
        public String authorizedByTitle;
        
        public PurchaseOrderData() {
            this.lineItems = new List<LineItem>();
        }
    }
    
    /**
     * Vendor information
     */
    public class VendorInfo {
        public String companyName;
        public String vendorId;
        public Address address;
        public String phone;
        public String email;
    }
    
    /**
     * Buyer information (the company issuing the PO)
     */
    public class BuyerInfo {
        public String companyName;
        public String contactName;
        public Address address;
        public String phone;
        public String email;
    }
    
    /**
     * Address information for Ship-To and Bill-To
     */
    public class AddressInfo {
        public String name;
        public Address address;
    }
    
    /**
     * Address structure
     */
    public class Address {
        public String street;
        public String city;
        public String state;
        public String zipCode;
        public String country;
        
        /**
         * Returns formatted address string
         */
        public String toFormattedString() {
            List<String> parts = new List<String>();
            if (String.isNotBlank(street)) parts.add(street);
            if (String.isNotBlank(city)) parts.add(city);
            if (String.isNotBlank(state)) parts.add(state);
            if (String.isNotBlank(zipCode)) parts.add(zipCode);
            if (String.isNotBlank(country)) parts.add(country);
            return String.join(parts, ', ');
        }
    }
    
    /**
     * Line item information
     */
    public class LineItem {
        public Integer lineNumber;
        public String itemCode;
        public String productName;
        public String description;
        public Decimal quantity;
        public Decimal unitPrice;
        public Decimal lineTotal;
        
        /**
         * Calculate line total if not provided
         */
        public Decimal calculateLineTotal() {
            if (quantity != null && unitPrice != null) {
                return quantity * unitPrice;
            }
            return lineTotal != null ? lineTotal : 0;
        }
    }
    
    /**
     * Parse JSON response into PurchaseOrderData
     */
    public static PurchaseOrderData parseFromJSON(String jsonData) {
        try {
            return (PurchaseOrderData) JSON.deserialize(jsonData, PurchaseOrderData.class);
        } catch (Exception e) {
            throw new PODataException('Failed to parse PO data: ' + e.getMessage());
        }
    }
    
    /**
     * Convert PurchaseOrderData to JSON string
     */
    public static String toJSON(PurchaseOrderData poData) {
        return JSON.serialize(poData);
    }
    
    /**
     * Custom exception for PO data processing
     */
    public class PODataException extends Exception {}
}