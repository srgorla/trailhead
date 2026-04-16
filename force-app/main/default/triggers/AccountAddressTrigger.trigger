trigger AccountAddressTrigger on Account (before insert, before update) {
    system.debug('AccountAddressTrigger: Trigger context is ' + Trigger.operationType);
/*
 for(Account a : Trigger.New) {
        if(a.billingpostalcode != null && a.Match_Billing_Address__c == true  ){
        	a.shippingpostalcode = a.billingpostalcode ;
        } 
    } 
*/  
}