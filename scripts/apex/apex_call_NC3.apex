
String payload =
'{' +
'  "Cost_Savings_Master_Data__c": {' +
'    "Id": "a1n0Z000003ip5VQAQ",' +
'    "Aggvar1_rule__c": "Min",' +
'    "Aggvar2_rule__c": "Sum",' +
'    "Aggvar3_rule__c": "Min",' +
'    "Aggvar4_rule__c": "Sum",' +
'    "Aggvar5_rule__c": "Min",' +
'    "Aggvar6_rule__c": "Min",' +
'    "CreatedDate": "2017-09-09T02:13:55.000Z",' +
'    "Manual__c": true,' +
'    "Name": 14,' +
'    "Sprvar1_rule__c": "None",' +
'    "Sprvar2_rule__c": "Avg",' +
'    "Sprvar3_rule__c": "None",' +
'    "Sprvar4_rule__c": "Avg",' +
'    "Sprvar5_rule__c": "None",' +
'    "Sprvar6_rule__c": "None",' +
'    "Status__c": "Active",' +
'    "Yes_No10__c": false,' +
'    "Yes_No1__c": false,' +
'    "Yes_No2__c": false,' +
'    "Yes_No3__c": false,' +
'    "Yes_No4__c": false,' +
'    "Yes_No5__c": false,' +
'    "Yes_No6__c": false,' +
'    "Yes_No7__c": false,' +
'    "Yes_No8__c": false,' +
'    "Yes_No9__c": false,' +
'    "calculation__c": "((var1)*(var2))-((var3)*(var4))",' +
'    "check_field_for_deploy__c": "((var1)*(var2))-((var3)*(var4))14YesCurrencyNumericCurrencyTextNumericTextNoNoNoNoNoNoNoNoNoNoMinSumMinSumMin",' +
'    "deployed__c": true,' +
'    "var1_type__c": "Currency",' +
'    "var2_type__c": "Numeric",' +
'    "var3_type__c": "Currency",' +
'    "var4_type__c": "Numeric",' +
'    "var5_type__c": "Text",' +
'    "var6_type__c": "Text"' +
'  }' +
'}';

CostSavingService.CalloutResult res = CostSavingService.postCostSavings(payload);
System.debug('StatusCode=' + res.statusCode);
System.debug('Status=' + res.status);
System.debug('Error=' + res.errorMessage);
System.debug('Body=' + res.responseBody);


