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
- Use `.catch()` or `async/await` to handle errors.
- Validate inputs before Apex calls.

### Performance
- Minimize rerenders with tracked vars.
- Avoid excessive DOM manipulation.
- Debounce inputs.

### Async/Await Example

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

### Using lightning/uiRecordApi

#### Read Record

```js
import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = ['Account.Name', 'Account.Industry'];

export default class AccountDetails extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;
}
```

#### Update Record

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

### FLS Check Example

```apex
if (!Schema.sObjectType.Contact.fields.Email.isUpdateable()) {
    throw new System.NoAccessException('No access to update Email field.');
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

## 🧠 Maintainability & Docs
- Add inline comments where needed.
- Document public classes/methods.
- Use SRP and cohesive class structure.

---

## 🔄 Asynchronous Apex

### Future

```apex
@future
public static void logInfo(String message) {
    System.debug(message);
}
```

### Queueable

```apex
public class MyQueueableJob implements Queueable {
    public void execute(QueueableContext context) {
        // logic
    }
}
```

### Schedulable

```apex
public class DailyJob implements Schedulable {
    public void execute(SchedulableContext context) {
        System.enqueueJob(new MyQueueableJob());
    }
}
```

### Batchable

```apex
global class MyBatch implements Database.Batchable<SObject> {
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return Database.getQueryLocator('SELECT Id FROM Contact');
    }
    global void execute(Database.BatchableContext BC, List<SObject> scope) {
        update scope;
    }
    global void finish(Database.BatchableContext BC) {}
}
```

---

## 🧩 Transaction Finalizer – Apex Example

```apex
public class AccountInsertFinalizer implements Database.Finalizer {
    public void afterFinalize(Database.FinalizerContext context) {
        if (context.wasSuccessful()) {
            System.debug('✅ Async Insert Success');
        } else {
            System.debug('❌ Async Insert Failed: ' + context.getException().getMessage());
        }
    }
}

public class AccountAsyncService {
    public static void createAccountsAsync() {
        List<Account> accounts = new List<Account>{
            new Account(Name = 'Valid Account'),
            new Account() // Invalid
        };
        Database.insertAsync(accounts, new AccountInsertFinalizer());
    }
}
```

---

## 🧱 Apex Design Patterns

### Singleton

```apex
public class ConfigSingleton {
    private static ConfigSingleton instance;
    public String configValue;

    private ConfigSingleton() {}

    public static ConfigSingleton getInstance() {
        if (instance == null) {
            instance = new ConfigSingleton();
        }
        return instance;
    }
}
```

### Factory

```apex
public interface Animal { void speak(); }

public class Dog implements Animal {
    public void speak() { System.debug('Woof'); }
}

public class Cat implements Animal {
    public void speak() { System.debug('Meow'); }
}

public class AnimalFactory {
    public static Animal getAnimal(String type) {
        if (type == 'Dog') return new Dog();
        if (type == 'Cat') return new Cat();
        return null;
    }
}
```

### Strategy

```apex
public interface ShippingStrategy {
    Decimal calculate(Decimal weight);
}

public class FedEx implements ShippingStrategy {
    public Decimal calculate(Decimal weight) { return weight * 2; }
}

public class UPS implements ShippingStrategy {
    public Decimal calculate(Decimal weight) { return weight * 1.8; }
}
```

### Service

```apex
public class OrderService {
    public static void placeOrder(Id accountId) {
        insert new Order__c(Account__c = accountId);
    }
}
```

### Unit of Work

```apex
public class UnitOfWork {
    List<SObject> inserts = new List<SObject>();

    public void register(SObject s) { inserts.add(s); }
    public void commit() { if (!inserts.isEmpty()) insert inserts; }
}
```

### Domain

```apex
public class ContactDomain {
    List<Contact> contacts;
    public ContactDomain(List<Contact> contacts) { this.contacts = contacts; }

    public void normalizeEmails() {
        for (Contact c : contacts) {
            if (c.Email != null) c.Email = c.Email.toLowerCase();
        }
    }
}
```

### DAO (Data Access Object)

```apex
public class AccountDAO {
    public static List<Account> getAccountsByType(String type) {
        return [SELECT Id, Name FROM Account WHERE Type = :type];
    }
}
```

**DAO Benefits:**
- Encapsulates SOQL logic
- Improves code reuse and testing
- Enables separation of concerns
- Centralizes access patterns

---