# Transaction Security Policy: Prevent Internal User File Downloads

## Overview
This solution uses Salesforce Transaction Security Policies to prevent internal users from downloading files. The policy monitors `ContentDocument` download events and blocks them based on user profiles.

## Components Created

### 1. Apex Condition Class
**File:** `force-app/main/default/classes/PreventFileDownloadCondition.cls`

- Implements `TxnSecurity.PolicyCondition` interface
- Evaluates download events in real-time
- Blocks downloads for internal users (SessionLevel = 'Standard')
- Exempts System Administrators
- Can be customized for additional conditions

### 2. Test Class
**File:** `force-app/main/default/classes/PreventFileDownloadConditionTest.cls`

- Provides test coverage for the condition class
- Note: Full transaction security testing requires real events in sandbox

### 3. Transaction Security Policy
**File:** `force-app/main/default/transactionSecurityPolicies/PreventInternalUserFileDownloads.transactionSecurityPolicy-meta.xml`

- **Event Type:** ContentDocumentEvent
- **Event Name:** ContentDownload
- **Action:** Block
- **Type:** CustomCondition
- **Status:** Inactive (by default, must be activated manually)

## Deployment Steps

### 1. Deploy to Your Org
```bash
# Deploy all components
sf project deploy start --source-path force-app/main/default/classes/PreventFileDownloadCondition.cls,force-app/main/default/classes/PreventFileDownloadConditionTest.cls,force-app/main/default/transactionSecurityPolicies/PreventInternalUserFileDownloads.transactionSecurityPolicy-meta.xml

# Or deploy all metadata
sf project deploy start
```

### 2. Activate the Policy
After deployment, you must activate the policy in Salesforce Setup:

1. Go to **Setup** → **Security** → **Transaction Security Policies**
2. Find "Prevent Internal User File Downloads"
3. Click **Edit**
4. Check the **Active** checkbox
5. Click **Save**

**⚠️ Important:** Test in a sandbox first! Activating this policy will immediately start blocking file downloads for internal users.

## How It Works

### Event Flow
1. User attempts to download a file (ContentDocument)
2. Salesforce fires a `ContentDownload` event
3. Transaction Security Policy intercepts the event
4. Apex condition class (`PreventFileDownloadCondition`) evaluates:
   - Is this an internal user? (SessionLevel = 'Standard')
   - What is the user's profile?
   - System Administrator? → Allow
   - Other internal user? → Block
5. Action taken: Block or Allow

### Current Configuration
- **Blocked:** All internal users except System Administrators
- **Allowed:** 
  - System Administrators
  - External users (Community/Guest users)

## Customization Options

### 1. Block Specific Profiles Only
Modify the Apex class to block only certain profiles:

```apex
// Block only Standard Users and Read Only users
Set<String> blockedProfiles = new Set<String>{
    'Standard User',
    'Read Only'
};

if (blockedProfiles.contains(profileName)) {
    return true; // Block
}
```

### 2. Block Specific File Types
Add file type checking:

```apex
String fileExtension = event.ContentDocumentId; // Get file details
// Query ContentDocument to check file type
List<ContentDocument> docs = [
    SELECT FileExtension 
    FROM ContentDocument 
    WHERE Id = :event.ContentDocumentId
];

if (!docs.isEmpty() && docs[0].FileExtension == 'pdf') {
    return true; // Block PDF downloads
}
```

### 3. Time-Based Restrictions
Block downloads outside business hours:

```apex
Time currentTime = Time.newInstance(System.now().hour(), 0, 0, 0);
Time startTime = Time.newInstance(9, 0, 0, 0);  // 9 AM
Time endTime = Time.newInstance(17, 0, 0, 0);   // 5 PM

if (currentTime < startTime || currentTime > endTime) {
    return true; // Block outside business hours
}
```

### 4. File Size Restrictions
Block large file downloads:

```apex
List<ContentDocument> docs = [
    SELECT ContentSize 
    FROM ContentDocument 
    WHERE Id = :event.ContentDocumentId
];

if (!docs.isEmpty() && docs[0].ContentSize > 10485760) { // 10 MB
    return true; // Block files larger than 10MB
}
```

### 5. Use Permission Sets
Instead of profiles, check for specific permissions:

```apex
List<PermissionSetAssignment> psa = [
    SELECT Id 
    FROM PermissionSetAssignment 
    WHERE AssigneeId = :userId 
    AND PermissionSet.Name = 'Allow_File_Downloads'
];

if (psa.isEmpty()) {
    return true; // Block if user doesn't have permission set
}
```

## Alternative Actions

Instead of blocking, you can configure different actions in the policy metadata:

### Block with Notification
```xml
<action>BlockAndNotify</action>
<notificationUser>admin@yourorg.com</notificationUser>
```

### Two-Factor Authentication
```xml
<action>TwoFactorAuthentication</action>
```

### End Session
```xml
<action>EndSession</action>
```

### Freeze User
```xml
<action>FreezeUser</action>
```

## Testing

### 1. Test in Sandbox
1. Deploy to sandbox
2. Activate the policy
3. Log in as a Standard User
4. Try to download a file from Files or Chatter
5. Verify the download is blocked
6. Log in as System Administrator
7. Verify download works

### 2. Monitor Policy Events
View blocked events in Setup:
- **Setup** → **Security** → **Transaction Security**
- Click on "Prevent Internal User File Downloads"
- View **Events** tab

### 3. Debug Logs
Enable debug logs for users to see policy evaluation:
```apex
System.debug('Blocking file download for user: ' + userId);
```

## Troubleshooting

### Policy Not Blocking Downloads
- Verify policy is **Active** in Setup
- Check event type is `ContentDocumentEvent`
- Review debug logs for condition evaluation
- Ensure user is internal (SessionLevel = 'Standard')

### Policy Blocking Too Much
- Review Apex condition logic
- Add exemptions for specific profiles/users
- Consider notification instead of blocking

### Performance Issues
- Keep SOQL queries efficient (use limits)
- Avoid complex logic in condition class
- Consider governor limits (10 SOQL queries per evaluation)

## Security Considerations

### Event Monitoring License Required
Transaction Security Policies require an **Event Monitoring** add-on license.

### Governor Limits
- Maximum 10 SOQL queries per policy evaluation
- Maximum 5 policies can be active per event type
- CPU time limit applies

### Audit Trail
All blocked events are logged and can be viewed in:
- Transaction Security Policy detail page
- Event Log Files (if Event Monitoring is enabled)

## Additional Resources

- [Transaction Security Policies Documentation](https://help.salesforce.com/s/articleView?id=sf.security_transaction_security.htm)
- [Event Monitoring Documentation](https://help.salesforce.com/s/articleView?id=sf.event_monitoring.htm)
- [TxnSecurity Namespace](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_namespace_TxnSecurity.htm)

## License Requirements

- **Event Monitoring** add-on license
- **Shield** (includes Event Monitoring)

Contact your Salesforce Account Executive to enable these features.