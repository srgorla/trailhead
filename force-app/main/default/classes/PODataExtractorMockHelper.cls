/**
 * @description Mock helper for testing PO extraction without Einstein
 * Returns sample data based on the provided PO format
 */
public class PODataExtractorMockHelper {
    
    /**
     * Generate mock PO data based on the sample PO format
     */
    public static String generateMockPOData() {
        Map<String, Object> poData = new Map<String, Object>();
        
        // Header Information
        poData.put('poNumber', 'PO-2026-10458');
        poData.put('poDate', '2026-04-15');
        poData.put('requestedDeliveryDate', '2026-04-25');
        
        // Vendor Information
        Map<String, Object> vendor = new Map<String, Object>();
        vendor.put('companyName', 'Global Supply Inc.');
        vendor.put('vendorId', 'VEND-2041');
        Map<String, Object> vendorAddress = new Map<String, Object>();
        vendorAddress.put('street', '850 Industrial Avenue');
        vendorAddress.put('city', 'Dallas');
        vendorAddress.put('state', 'TX');
        vendorAddress.put('zipCode', '75201');
        vendor.put('address', vendorAddress);
        vendor.put('phone', '(214) 555-7823');
        vendor.put('email', 'orders@globalsupplyinc.com');
        poData.put('vendor', vendor);
        
        // Buyer Information
        Map<String, Object> buyer = new Map<String, Object>();
        buyer.put('companyName', 'Acme Retail LLC');
        buyer.put('contactName', 'Sarah Johnson');
        Map<String, Object> buyerAddress = new Map<String, Object>();
        buyerAddress.put('street', '1200 W Market Street');
        buyerAddress.put('city', 'Chicago');
        buyerAddress.put('state', 'IL');
        buyerAddress.put('zipCode', '60607');
        buyer.put('address', buyerAddress);
        buyer.put('phone', '(312) 555-0182');
        buyer.put('email', 'procurement@acmeretail.com');
        poData.put('buyer', buyer);
        
        // Ship To Information
        Map<String, Object> shipTo = new Map<String, Object>();
        shipTo.put('name', 'Acme Retail LLC - Warehouse 3');
        Map<String, Object> shipToAddress = new Map<String, Object>();
        shipToAddress.put('street', '2450 Distribution Drive');
        shipToAddress.put('city', 'Aurora');
        shipToAddress.put('state', 'IL');
        shipToAddress.put('zipCode', '60502');
        shipTo.put('address', shipToAddress);
        poData.put('shipTo', shipTo);
        
        // Bill To Information
        Map<String, Object> billTo = new Map<String, Object>();
        billTo.put('name', 'Acme Retail LLC - Accounts Payable');
        Map<String, Object> billToAddress = new Map<String, Object>();
        billToAddress.put('street', '1200 W Market Street');
        billToAddress.put('city', 'Chicago');
        billToAddress.put('state', 'IL');
        billToAddress.put('zipCode', '60607');
        billTo.put('address', billToAddress);
        poData.put('billTo', billTo);
        
        // Line Items
        List<Map<String, Object>> lineItems = new List<Map<String, Object>>();
        
        Map<String, Object> item1 = new Map<String, Object>();
        item1.put('lineNumber', 1);
        item1.put('itemCode', 'SKU-1001');
        item1.put('productName', 'Wireless Barcode Scanner');
        item1.put('description', 'Model: WS-2100, 2D, USB, Black');
        item1.put('quantity', 10);
        item1.put('unitPrice', 85.00);
        item1.put('lineTotal', 850.00);
        lineItems.add(item1);
        
        Map<String, Object> item2 = new Map<String, Object>();
        item2.put('lineNumber', 2);
        item2.put('itemCode', 'SKU-2005');
        item2.put('productName', 'Thermal Label Printer');
        item2.put('description', 'Model: LP-450, 203 DPI, USB & Ethernet');
        item2.put('quantity', 4);
        item2.put('unitPrice', 210.00);
        item2.put('lineTotal', 840.00);
        lineItems.add(item2);
        
        Map<String, Object> item3 = new Map<String, Object>();
        item3.put('lineNumber', 3);
        item3.put('itemCode', 'SKU-3010');
        item3.put('productName', 'Printer Labels - 4" x 6" Thermal Roll');
        item3.put('description', '500 Labels per Roll, 12 Rolls per Case');
        item3.put('quantity', 25);
        item3.put('unitPrice', 18.00);
        item3.put('lineTotal', 450.00);
        lineItems.add(item3);
        
        Map<String, Object> item4 = new Map<String, Object>();
        item4.put('lineNumber', 4);
        item4.put('itemCode', 'SKU-4502');
        item4.put('productName', 'USB Keyboard - Business Standard');
        item4.put('description', 'Model: KB-300, Black, Wired');
        item4.put('quantity', 15);
        item4.put('unitPrice', 22.50);
        item4.put('lineTotal', 337.50);
        lineItems.add(item4);
        
        Map<String, Object> item5 = new Map<String, Object>();
        item5.put('lineNumber', 5);
        item5.put('itemCode', 'SKU-7788');
        item5.put('productName', '27" LED Monitor');
        item5.put('description', 'Model: MN27F, 1920x1080, HDMI, Black');
        item5.put('quantity', 6);
        item5.put('unitPrice', 149.99);
        item5.put('lineTotal', 899.94);
        lineItems.add(item5);
        
        poData.put('lineItems', lineItems);
        
        // Financial Information
        poData.put('subtotal', 3377.44);
        poData.put('taxRate', 8.25);
        poData.put('taxAmount', 278.64);
        poData.put('shippingAmount', 55.00);
        poData.put('orderTotal', 3711.08);
        
        // Additional Information
        poData.put('paymentTerms', 'Net 30');
        poData.put('shippingMethod', 'Ground');
        poData.put('notes', 'Please deliver between 9:00 AM and 3:00 PM. Include packing slip with shipment.');
        poData.put('authorizedBy', 'Sarah Johnson');
        poData.put('authorizedByTitle', 'Procurement Manager');
        
        return JSON.serializePretty(poData);
    }
}