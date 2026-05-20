// Get Transaction Security Event types
Schema.DescribeFieldResult eventNameField = Schema.sObjectType.TransactionSecurityPolicy.fields.EventName;
List<Schema.PicklistEntry> eventNames = eventNameField.getPicklistValues();

System.debug('=== Valid Transaction Security Event Names ===');
for(Schema.PicklistEntry entry : eventNames) {
    System.debug('EventName: ' + entry.getValue() + ' - Label: ' + entry.getLabel());
}
