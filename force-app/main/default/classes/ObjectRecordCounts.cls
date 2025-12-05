public with sharing class ObjectRecordCounts {

    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getCountsFor(List<String> objectApiNames) {
        Map<String, Integer> results = new Map<String, Integer>();
        if (objectApiNames == null) return results;
        for (String name : objectApiNames) {
            try {
                Integer c = Database.countQuery('SELECT count() FROM ' + name);
                results.put(name, c);
            } catch (Exception e) {
                results.put(name, null);
            }
        }
        return results;
    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getAllCounts() {
        Map<String, Integer> results = new Map<String, Integer>();
        Map<String, Schema.SObjectType> all = Schema.getGlobalDescribe();
        for (String name : all.keySet()) {
            try {
                Integer c = Database.countQuery('SELECT count() FROM ' + name);
                results.put(name, c);
            } catch (Exception e) {
                // object not queryable or inaccessible in this context; set null
                results.put(name, null);
            }
        }
        return results;
    }
}
