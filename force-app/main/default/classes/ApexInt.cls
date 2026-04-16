public without sharing class ApexInt {
    
    @AuraEnabled(cacheable=true)
    public static Map<Id, Integer> getContacts(List<Id> accIds) {
        System.debug('Incoming accIds: ' + accIds);
        Map<Id, Integer> accMap = new Map<Id, Integer>();
        // Return early when nothing to query so callers can safely pass null/empty lists
        if (accIds == null || accIds.isEmpty()) {
            return accMap;
        }

        try {
            List<Account> accts = [
                SELECT Id, (SELECT Id FROM Contacts)
                FROM Account
                WHERE Id IN :accIds
            ];

            for (Account a : accts) {
                Integer count = a.Contacts != null ? a.Contacts.size() : 0;
                if (count > 0) {
                    accMap.put(a.Id, count);
                }
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }

        return accMap;
    }

    @AuraEnabled(cacheable=true)
    public static List<AccountWrapper> getAccountData(List<Id> accIds){
        try {
            List<Account> accList = new List<Account>();
            if (accIds != null && !accIds.isEmpty()) {
                accList = [
                    SELECT Id, Name,
                        (SELECT Id, Name FROM Contacts)
                    FROM Account
                    WHERE Id IN :accIds
                ];
            } else {
                accList = [
                    SELECT Id, Name,
                        (SELECT Id, Name FROM Contacts)
                    FROM Account
                    LIMIT 10
                ];
            }

            List<AccountWrapper> accDataList = new List<AccountWrapper>();
            for (Account acc : accList) {
                
                AccountWrapper accData = new AccountWrapper();
                accData.accId = acc.Id;
                accData.name = acc.name;
                accData.conCount = acc.Contacts.size();
                List<ContactWrapper> conList = new List<ContactWrapper>();
                for (Contact con : acc.Contacts) {
                    ContactWrapper conData = new ContactWrapper();
                    conData.conId = con.Id;
                    conData.Name = con.Name;
                    conList.add(conData);
                }
                accData.conList = conList;
                accDataList.add(accData);
            }
            return accDataList; 
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


        public class AccountWrapper{
        @AuraEnabled
        public Id accId;
        @AuraEnabled
        public String name;
        @AuraEnabled
        public Integer conCount;
        @AuraEnabled
        public List<ContactWrapper> conList;
        
    }
    public class ContactWrapper{
        @AuraEnabled
        public Id conId;
        @AuraEnabled
        public String name;     
    }

    @AuraEnabled(cacheable=true)
    public static List<Opportunity> getAccountOppData(Id accId){
        try {
            return [
                SELECT Id, Name, StageName, Probability, CloseDate, Amount
                FROM Opportunity
                WHERE AccountId = :accId    ]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void markOpportunityClosedWon(Id oppId){
        try {
            Opportunity opp = [
                SELECT Id, StageName
                FROM Opportunity
                WHERE Id = :oppId
                LIMIT 1
            ];

            opp.StageName = 'Closed Won';
            update opp;
        } catch (Exception e) {
            throw new AuraHandledException('Failed to update Opportunity: ' + e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<contact> getContactsByAccountId(Id accId){
        try {
            if (accId == null) {
                throw new AuraHandledException('Account Id is required');
            }
            return [
                SELECT Id, FirstName, LastName, Email, Phone
                FROM Contact
                WHERE AccountId = :accId
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void updateContacts(List<Contact> contactsToUpdate){
        try {
            if (contactsToUpdate == null || contactsToUpdate.isEmpty()) {
                return;
            }
            update contactsToUpdate;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}