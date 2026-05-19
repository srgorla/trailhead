# Transaction Security Policy - Testing Instructions

## ✅ Deployment Complete

The corrected `PreventFileDownloadCondition` Apex class has been successfully deployed with the proper structure:
- Uses `global class` (required for Transaction Security)
- Implements `TxnSecurity.EventCondition` interface
- Takes `SObject event` as parameter

## 🧪 Current Testing Mode: IP-Based Blocking

**The class is currently configured to block downloads from IP: `98.46.133.200`**

This simplified testing approach makes it easy to verify the Transaction Security Policy is working correctly.

## Create the Policy in Salesforce UI

### Step 1: Navigate to Transaction Security
1. Go to **Setup**
2. In Quick Find, search for **Transaction Security**
3. Click **Transaction Security Policies**

### Step 2: Create New Policy (If Not Already Created)
1. Click **New** button
2. Configure the policy:

   **API Name:** `Prevent_Internal_User_File_Downloads`
   
   **Resource:** Select **File Event**
   
   **Condition:**
   - Select **Apex Policy**
   - From the dropdown, select: **PreventFileDownloadCondition**
   
   **Actions When Policy is Triggered:**
   - ✅ **Block**
   - Leave other actions unchecked
   
   **Policy Status:**
   - Check **Active** to enable testing
   
3. Click **Save**

## Testing the IP-Based Blocking

### Test 1: From IP 98.46.133.200 (Should Block)

1. **Access Salesforce from IP 98.46.133.200:**
   - Connect from the target IP
   - Log in to your Salesforce org
   
2. **Try to download a file:**
   - Navigate to **Files** or any record with attachments
   - Click on a file to download it
   
3. **Expected Result:**
   - ❌ **Download should be BLOCKED**
   - You'll see an error message
   - The file will not download

### Test 2: From Any Other IP (Should Allow)

1. **Access Salesforce from a different IP:**
   - Connect from any other IP address
   - Log in to your Salesforce org
   
2. **Try to download a file:**
   - Navigate to **Files** or any record with attachments
   - Click on a file to download it
   
3. **Expected Result:**
   - ✅ **Download should WORK**
   - File downloads normally
   - No error message

## Monitoring Blocked Events

### View Events in the UI

1. Go to **Setup** → **Transaction Security Policies**
2. Click on **Prevent_Internal_User_File_Downloads** (or your policy name)
3. Click the **Events** tab
4. You'll see details about blocked attempts:
   - **Timestamp** of the attempt
   - **User** who tried to download
   - **Source IP** address
   - **Event Type** (FileEvent)
   - **Action Taken** (Blocked)

### View Debug Logs

The Apex class includes debug statements for troubleshooting:

```apex
// For blocked downloads
System.debug('BLOCKED: File download attempt from IP: ' + sourceIp + ' by User: ' + userId);

// For allowed downloads  
System.debug('ALLOWED: File download from IP: ' + sourceIp + ' by User: ' + userId);
```

To view debug logs:
1. **Setup** → **Debug Logs**
2. Click **New** to create a trace flag for your user
3. Set log level to **FINE** for Apex Code
4. Try downloading a file
5. Click **View** on the generated log
6. Search for "BLOCKED" or "ALLOWED" to see the evaluation

## Current Blocking Logic (Deployed)

```apex
global boolean evaluate(SObject event) {
    String sourceIp = (String)event.get('SourceIp');
    String userId = (String)event.get('UserId');
    
    // TESTING: Block downloads from specific IP address
    if (sourceIp == '98.46.133.200') {
        System.debug('BLOCKED: File download attempt from IP: ' + sourceIp + ' by User: ' + userId);
        return true; // Block the download
    }
    
    System.debug('ALLOWED: File download from IP: ' + sourceIp + ' by User: ' + userId);
    return false; // Allow all other downloads
}
```

## After Testing - Switch to Profile-Based Blocking

Once you've verified the Transaction Security Policy works with IP blocking, you can switch to profile-based logic:

### Option 1: Block All Internal Users Except System Administrators

```apex
global boolean evaluate(SObject event) {
    String userId = (String)event.get('UserId');
    String sessionLevel = (String)event.get('SessionLevel');
    
    // Block downloads for internal users (not guest/community users)
    if (sessionLevel == 'Standard') {
        // Query user profile
        List<User> users = [
            SELECT Id, Profile.Name, Username 
            FROM User 
            WHERE Id = :userId 
            LIMIT 1
        ];
        
        if (!users.isEmpty()) {
            String profileName = users[0].Profile.Name;
            
            // Block all internal users except System Administrators
            if (profileName != 'System Administrator') {
                System.debug('Blocking file download for user: ' + users[0].Username + 
                           ', Profile: ' + profileName);
                return true; // Block the download
            }
        }
    }
    
    return false; // Allow System Admins and external users
}
```

**Who is blocked:**
- Standard User
- Read Only
- All custom profiles

**Who is allowed:**
- System Administrator
- External users (Community/Guest)

### Option 2: Block Specific Profiles Only

```apex
global boolean evaluate(SObject event) {
    String userId = (String)event.get('UserId');
    
    // Define profiles to block
    Set<String> blockedProfiles = new Set<String>{
        'Standard User',
        'Read Only',
        'Custom Profile Name'
    };
    
    // Query user profile
    List<User> users = [
        SELECT Id, Profile.Name, Username 
        FROM User 
        WHERE Id = :userId 
        LIMIT 1
    ];
    
    if (!users.isEmpty()) {
        String profileName = users[0].Profile.Name;
        
        if (blockedProfiles.contains(profileName)) {
            System.debug('Blocking file download for user: ' + users[0].Username + 
                       ', Profile: ' + profileName);
            return true; // Block
        }
    }
    
    return false; // Allow
}
```

## Other Customization Examples

### Block Based on File Type

```apex
global boolean evaluate(SObject event) {
    String contentDocId = (String)event.get('ContentDocumentId');
    
    // Query file details
    List<ContentDocument> docs = [
        SELECT FileExtension 
        FROM ContentDocument 
        WHERE Id = :contentDocId 
        LIMIT 1
    ];
    
    // Block PDF downloads
    if (!docs.isEmpty() && docs[0].FileExtension == 'pdf') {
        System.debug('Blocking PDF file download');
        return true;
    }
    
    return false;
}
```

### Block Large Files

```apex
global boolean evaluate(SObject event) {
    String contentDocId = (String)event.get('ContentDocumentId');
    
    List<ContentDocument> docs = [
        SELECT ContentSize 
        FROM ContentDocument 
        WHERE Id = :contentDocId 
        LIMIT 1
    ];
    
    // Block files larger than 10 MB
    if (!docs.isEmpty() && docs[0].ContentSize > 10485760) {
        System.debug('Blocking large file download: ' + docs[0].ContentSize + ' bytes');
        return true;
    }
    
    return false;
}
```

### Combine IP and Profile Blocking

```apex
global boolean evaluate(SObject event) {
    String sourceIp = (String)event.get('SourceIp');
    String userId = (String)event.get('UserId');
    String sessionLevel = (String)event.get('SessionLevel');
    
    // Block specific IP
    if (sourceIp == '98.46.133.200') {
        System.debug('BLOCKED: Restricted IP: ' + sourceIp);
        return true;
    }
    
    // Block internal users except System Admin
    if (sessionLevel == 'Standard') {
        List<User> users = [
            SELECT Profile.Name 
            FROM User 
            WHERE Id = :userId 
            LIMIT 1
        ];
        
        if (!users.isEmpty() && users[0].Profile.Name != 'System Administrator') {
            System.debug('BLOCKED: Non-admin internal user');
            return true;
        }
    }
    
    return false;
}
```

### Use Permission Sets

```apex
global boolean evaluate(SObject event) {
    String userId = (String)event.get('UserId');
    
    // Check if user has the "Allow_File_Downloads" permission set
    List<PermissionSetAssignment> psa = [
        SELECT Id 
        FROM PermissionSetAssignment 
        WHERE AssigneeId = :userId 
        AND PermissionSet.Name = 'Allow_File_Downloads'
        LIMIT 1
    ];
    
    // Block if user doesn't have the permission set
    if (psa.isEmpty()) {
        System.debug('BLOCKED: User does not have Allow_File_Downloads permission set');
        return true;
    }
    
    return false; // Allow users with the permission set
}
```

## Troubleshooting

### Policy Not Appearing in UI
- ✅ Verify the Apex class is `global`
- ✅ Verify it implements `TxnSecurity.EventCondition`
- ✅ Check that it's deployed successfully
- ✅ Refresh the Transaction Security Policies page

### Downloads Not Being Blocked from IP 98.46.133.200
- ✅ Verify policy is **Active**
- ✅ Check you're accessing from the correct IP
- ✅ View debug logs to see evaluation
- ✅ Check the Events tab for blocked attempts
- ✅ Ensure Event Monitoring is enabled

### Testing Your Current IP

Run this anonymous Apex to see your current IP:
```apex
System.debug('Current IP: ' + UserInfo.getUserId());
// Then check the login history or session info
```

Or check in Setup:
1. **Setup** → **Login History**
2. Find your recent login
3. View the **Source IP** column

## Deployment Steps to Update Logic

1. **Modify the Apex class** in VS Code
2. **Save the file**
3. **Deploy:**
   ```bash
   sf project deploy start --source-path force-app/main/default/classes/PreventFileDownloadCondition.cls
   ```
4. **Test the new logic**

## Requirements

- ✅ **Event Monitoring** or **Shield** add-on license required
- ✅ Cannot be fully tested in Developer Edition orgs
- ✅ Must test in Sandbox before deploying to Production
- ✅ Policy must be created via Setup UI (metadata deployment is retired)

## Next Steps

1. ✅ **Test IP blocking** from 98.46.133.200
2. ✅ **Verify in Events tab** that downloads are blocked
3. ✅ **Switch to profile-based logic** if needed
4. ✅ **Deploy to production** after successful sandbox testing

The Apex class is deployed and ready for testing. The Transaction Security Policy should now block file downloads from IP address 98.46.133.200.