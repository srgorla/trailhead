# Salesforce Coding Best Practices

## 🔁 Apex Code Best Practices

### General Design
- **Bulkify all code**: Always handle collections of records (e.g., `trigger.new`, `trigger.old`). Avoid single-record logic.
- **Avoid hard-coded IDs and field names**: Use `Custom Metadata`, `Custom Labels`, or `Schema.describe()`.
- **Use meaningful naming**: Follow camelCase for variables, PascalCase for classes.
- **Use Constants**: Define string literals (statuses, record types, etc.) as constants.

### Trigger Best Practices
- **One trigger per object**: Delegate logic to a Trigger Handler class.
- **Use Trigger Context Variables** (`isInsert`, `isUpdate`, etc.)
- **Avoid DML/queries inside loops**.
- **Use collections (Map/Set/List)** to deduplicate logic.

### DML/SOQL Optimization
- Use `SOQL for loops` when querying large datasets.
- Use selective queries with indexed fields.
- Query only required fields.
- Use `Database.insert()` with `allOrNone=false` for partial success.

### Error Handling
- Use `try-catch` blocks.
- Implement a centralized logging framework.
- Never swallow exceptions silently.

---

## ⚡ Lightning Web Components (LWC) Best Practices

### Component Design
- Use small reusable components.
- Avoid logic in template.
- Use `@wire` for reactivity.

### Apex Integration
- Use `@AuraEnabled(cacheable=true)` when applicable.
- Use `.catch()` to handle errors.
- Validate inputs before Apex calls.

### Performance
- Minimize rerenders with tracked vars.
- Avoid excessive DOM manipulation.
- Debounce inputs.

---

## 🔍 SOQL / SOSL Best Practices
- Use indexed fields in WHERE.
- Avoid SELECT *.
- Use LIMIT to protect governor limits.
- Prefer SOQL over SOSL unless full-text needed.

---

## ✅ Test Class Best Practices
- Aim for 90%+ code coverage.
- Use `@testSetup` for shared data.
- Use `SeeAllData=false`.
- Cover positive/negative/bulk test cases.
- Use `System.assert*` and governor limit checks.

---

## ⚙ Deployment / Metadata
- Use `sfdx` & source-tracked deployments.
- Version control your metadata.
- Use unlocked packages or change sets.

---

## 🔐 Security & Sharing
- Enforce CRUD/FLS.
- Use `with sharing` appropriately.
- Use Custom Permissions, not Profile checks.

---

## 🧠 Maintainability & Docs
- Add inline comments where needed.
- Document public classes/methods.
- Use SRP and cohesive class structure.

---

## 🧩 Advanced Architecture
- Apply Apex Design Patterns: Service, Domain, Factory, Strategy.
- Use Trigger Frameworks.
- Separate controller → service → DAO.
- Store config in Custom Metadata.

---

## 🧪 Apex Examples

### Trigger Handler Framework

```apex
trigger AccountTrigger on Account (before insert, before update) {
    AccountTriggerHandler.handle(Trigger.isInsert, Trigger.isUpdate, Trigger.new, Trigger.oldMap);
}
```

```apex
public class AccountTriggerHandler {
    public static void handle(Boolean isInsert, Boolean isUpdate, List<Account> newList, Map<Id, Account> oldMap) {
        if (isInsert) {
            for (Account acct : newList) {
                acct.Name = acct.Name + ' - New';
            }
        }
    }
}
```

### Service Layer

```apex
public class AccountService {
    public static void updateAccountStatus(List<Id> accountIds, String status) {
        List<Account> accounts = [SELECT Id, Status__c FROM Account WHERE Id IN :accountIds];
        for (Account acct : accounts) {
            acct.Status__c = status;
        }
        update accounts;
    }
}
```

### Test Class Example

```apex
@isTest
private class AccountServiceTest {
    @testSetup
    static void setupData() {
        insert new Account(Name='Test Account');
    }

    @isTest
    static void testUpdateStatus() {
        Account acct = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
        AccountService.updateAccountStatus(new List<Id>{acct.Id}, 'Active');
        Test.stopTest();
        acct = [SELECT Status__c FROM Account WHERE Id = :acct.Id];
        System.assertEquals('Active', acct.Status__c);
    }
}
```

## 🔐 Security & Sharing – Apex Example

### CRUD/FLS Check

```apex
public class ContactService {
    public static void updateEmail(List<Id> contactIds, String newEmail) {
        if (!Schema.sObjectType.Contact.fields.Email.isUpdateable()) {
            throw new System.NoAccessException('No access to update Email field.');
        }
        List<Contact> contacts = [SELECT Id, Email FROM Contact WHERE Id IN :contactIds];
        for (Contact c : contacts) {
            c.Email = newEmail;
        }
        update contacts;
    }
}
```

### With Sharing

```apex
public with sharing class AccountFetcher {
    public static List<Account> getMyAccounts() {
        return [SELECT Id, Name FROM Account];
    }
}
```

---

## 🧩 Advanced Architecture Practices – Apex Example

### Domain Layer Pattern

```apex
public class OpportunityDomain {
    private List<Opportunity> records;

    public OpportunityDomain(List<Opportunity> opps) {
        this.records = opps;
    }

    public void validateOpportunities() {
        for (Opportunity opp : records) {
            if (opp.Amount < 0) {
                opp.addError('Amount cannot be negative');
            }
        }
    }
}
```

### Service + DAO Pattern

```apex
public class OpportunityService {
    public static void closeWon(List<Id> oppIds) {
        List<Opportunity> opps = OpportunityDAO.fetchByIds(oppIds);
        for (Opportunity o : opps) {
            o.StageName = 'Closed Won';
        }
        update opps;
    }
}

public class OpportunityDAO {
    public static List<Opportunity> fetchByIds(List<Id> ids) {
        return [SELECT Id, StageName FROM Opportunity WHERE Id IN :ids];
    }
}
```

---

## ⚡ Lightning Web Components (LWC) Examples

### Wire Adapter with Apex

```js
// accountList.js
import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';

export default class AccountList extends LightningElement {
    @wire(getAccounts)
    accounts;
}
```

```apex
// Apex Controller
public with sharing class AccountService {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account LIMIT 10];
    }
}
```

### Using `lightning/uiRecordApi` to Read Record

```js
// accountDetails.js
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Account.Name', 'Account.Industry'];

export default class AccountDetails extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;
}
```

### Using `lightning/uiRecordApi` to Update Record

```js
import { LightningElement, api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';

export default class UpdateAccount extends LightningElement {
    @api recordId;

    updateName() {
        const fields = { Id: this.recordId, Name: 'Updated Name' };
        const recordInput = { fields };
        updateRecord(recordInput)
            .then(() => {
                console.log('Account updated');
            })
            .catch(error => {
                console.error('Error updating record', error);
            });
    }
}
```

---

## ⚡ LWC Best Practices – Async/Await Example

Instead of using Promises with `.then()` / `.catch()`, use `async/await` for better readability and error handling.

### Imperative Apex with Async/Await

```js
import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountService.getAccounts';

export default class AccountAsyncAwait extends LightningElement {
    accounts = [];
    error;

    async connectedCallback() {
        try {
            this.accounts = await getAccounts();
        } catch (err) {
            this.error = err;
            console.error('Error loading accounts', err);
        }
    }
}
```

---

## 🔄 Asynchronous Apex Examples

### Future Method

```apex
public class AsyncLogger {
    @future
    public static void logData(String msg) {
        System.debug('Logged: ' + msg);
    }
}
```

### Queueable Apex

```apex
public class QueueableAccountUpdater implements Queueable {
    public void execute(QueueableContext context) {
        List<Account> accts = [SELECT Id, Name FROM Account WHERE Name LIKE 'Test%'];
        for (Account a : accts) {
            a.Name += ' - Updated';
        }
        update accts;
    }
}
// Enqueue using: System.enqueueJob(new QueueableAccountUpdater());
```

### Schedulable Apex

```apex
public class DailyBatchScheduler implements Schedulable {
    public void execute(SchedulableContext context) {
        System.enqueueJob(new QueueableAccountUpdater());
    }
}
// Schedule using UI or: 
// String expr = '0 0 0 * * ?'; // Every day at midnight
// System.schedule('Daily Job', expr, new DailyBatchScheduler());
```

### Batch Apex

```apex
public class BatchContactUpdater implements Database.Batchable<SObject> {
    public Database.QueryLocator start(Database.BatchableContext context) {
        return Database.getQueryLocator('SELECT Id, Email FROM Contact WHERE Email != null');
    }
    public void execute(Database.BatchableContext context, List<SObject> scope) {
        List<Contact> contacts = (List<Contact>)scope;
        for (Contact c : contacts) {
            c.Email = c.Email.toLowerCase();
        }
        update contacts;
    }
    public void finish(Database.BatchableContext context) {
        System.debug('Batch completed');
    }
}
// Run using: Database.executeBatch(new BatchContactUpdater(), 200);
```

---

## 📊 Transaction Analyzer Examples

Transaction Analyzer is used to detect common Apex issues in a transaction. Here's how to simulate some of them.

### Example: DML inside a loop (BAD)

```apex
public void badPattern(List<Account> accts) {
    for (Account a : accts) {
        insert a; // BAD: DML inside loop
    }
}
```

### Good Pattern

```apex
public void goodPattern(List<Account> accts) {
    insert accts; // GOOD: DML outside loop
}
```

### Example: Too many SOQL queries (Trigger Recursion)

```apex
trigger ContactTrigger on Contact (before insert) {
    for (Contact c : Trigger.new) {
        List<Account> accs = [SELECT Id FROM Account LIMIT 1]; // BAD: runs for every record
    }
}
```

#### Fix with SOQL outside loop:

```apex
trigger ContactTrigger on Contact (before insert) {
    List<Account> accs = [SELECT Id FROM Account LIMIT 1]; // GOOD
    for (Contact c : Trigger.new) {
        // do something with accs[0]
    }
}
```

---

📝 **Note**: You can upload logs to Salesforce's Transaction Analyzer or use Developer Console → Debug Logs → Open Raw Log → "Analyze" for built-in recommendations.

---

## 🧱 Apex Design Patterns with Examples

### 🔁 Singleton Pattern

Use this when you want to ensure a class has only one instance during execution context.

```apex
public class AppConfig {
    private static AppConfig instance;

    public String appName { get; private set; }

    private AppConfig() {
        appName = 'My App';
    }

    public static AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }
}
```

### 🏭 Factory Pattern

Encapsulates object creation logic and returns a specific implementation based on input.

```apex
public interface PaymentProcessor {
    void process();
}

public class CreditCardProcessor implements PaymentProcessor {
    public void process() {
        System.debug('Processing credit card');
    }
}

public class PayPalProcessor implements PaymentProcessor {
    public void process() {
        System.debug('Processing PayPal');
    }
}

public class PaymentFactory {
    public static PaymentProcessor getProcessor(String method) {
        if (method == 'CreditCard') return new CreditCardProcessor();
        if (method == 'PayPal') return new PayPalProcessor();
        throw new IllegalArgumentException('Unsupported payment method');
    }
}
```

### 🧠 Strategy Pattern

Encapsulates interchangeable behaviors and selects one at runtime.

```apex
public interface DiscountStrategy {
    Decimal applyDiscount(Decimal amount);
}

public class NoDiscount implements DiscountStrategy {
    public Decimal applyDiscount(Decimal amount) {
        return amount;
    }
}

public class TenPercentDiscount implements DiscountStrategy {
    public Decimal applyDiscount(Decimal amount) {
        return amount * 0.9;
    }
}

public class Order {
    public Decimal getTotal(Decimal amount, DiscountStrategy strategy) {
        return strategy.applyDiscount(amount);
    }
}
```

### 🧰 Service Layer

Encapsulates business logic and provides a clear API for controllers.

```apex
public class OrderService {
    public static void placeOrder(Id accountId, Decimal totalAmount) {
        Order__c order = new Order__c(Account__c = accountId, Total__c = totalAmount);
        insert order;
    }
}
```

### 🧾 Unit of Work Pattern

Tracks changes to objects during a transaction and performs batch DML at the end.

```apex
public class UnitOfWork {
    private List<SObject> toInsert = new List<SObject>();
    private List<SObject> toUpdate = new List<SObject>();

    public void registerNew(SObject sObj) {
        toInsert.add(sObj);
    }

    public void registerDirty(SObject sObj) {
        toUpdate.add(sObj);
    }

    public void commitWork() {
        if (!toInsert.isEmpty()) insert toInsert;
        if (!toUpdate.isEmpty()) update toUpdate;
    }
}
```

### 🏛️ Domain Class Pattern

Domain classes encapsulate business rules for a single object type.

```apex
public class AccountDomain {
    private List<Account> accounts;

    public AccountDomain(List<Account> accounts) {
        this.accounts = accounts;
    }

    public void enforceNamePrefix() {
        for (Account a : accounts) {
            if (!a.Name.startsWith('ACCT - ')) {
                a.Name = 'ACCT - ' + a.Name;
            }
        }
    }
}
```

### 📦 DAO (Data Access Object) Pattern

DAO classes abstract database access. This makes SOQL logic reusable and improves testability.

```apex
public class AccountDAO {
    public static List<Account> getAccountsByIndustry(String industry) {
        return [SELECT Id, Name FROM Account WHERE Industry = :industry];
    }
}
```

**✅ Why DAO is useful:**
- Centralizes SOQL logic
- Promotes reuse and separation of concerns
- Simplifies mocking in unit tests (via dependency injection)
- Reduces duplication of query strings

---