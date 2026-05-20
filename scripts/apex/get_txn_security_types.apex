// Get Transaction Security Policy types
Schema.DescribeFieldResult typeField = Schema.sObjectType.TransactionSecurityPolicy.fields.Type;
List<Schema.PicklistEntry> types = typeField.getPicklistValues();

System.debug('=== Valid Transaction Security Policy Types ===');
for(Schema.PicklistEntry entry : types) {
    System.debug('Type: ' + entry.getValue() + ' - Label: ' + entry.getLabel());
}
