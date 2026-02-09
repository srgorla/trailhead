public with sharing class ExternalSalesOnCaseController {
    // TODO: CHANGE THESE TWO to your real field API names
    private static final String CASE_EXTERNAL_ID_FIELD = 'External_Id__c';       // e.g. Case.ExternalId__c
    private static final String EXT_LOOKUP_FIELD       = 'Case_Ext_Id__c';   // e.g. Sample_sales__x.CaseExternalId__c

    @AuraEnabled(cacheable=true)
    public static List<Sample_sales__x> getSalesForCase(Id caseId) {
        if (caseId == null) return new List<Sample_sales__x>();

        // Get Case external id value
        String soqlCase = 'SELECT ' + CASE_EXTERNAL_ID_FIELD + ' FROM Case WHERE Id = :caseId';
        SObject c = Database.query(soqlCase);
        String caseExternalId = (String)c.get(CASE_EXTERNAL_ID_FIELD);

        if (String.isBlank(caseExternalId)) {
            return new List<Sample_sales__x>();
        }

        // Query External Object rows that match this Case external id
        String soqlExt =
            'SELECT Id, Id__c, Name__c, Amount__c, Created_date__c ' +
            'FROM Sample_sales__x ' +
            'WHERE ' + EXT_LOOKUP_FIELD + ' = :caseExternalId ' +
            'ORDER BY Id__c ASC';

        return Database.query(soqlExt);
    }
}
