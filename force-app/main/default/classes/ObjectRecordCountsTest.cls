@isTest
private class ObjectRecordCountsTest {

    @isTest static void testAccountCounts() {
        List<Account> accts = new List<Account>{
            new Account(Name='Test A1'),
            new Account(Name='Test A2')
        };
        insert accts;

        Test.startTest();
        Map<String, Integer> counts = ObjectRecordCounts.getCountsFor(new List<String>{'Account'});
        Test.stopTest();

        System.assertNotEquals(null, counts.get('Account'));
        System.assertEquals(2, Integer.valueOf(counts.get('Account')));
    }
}
