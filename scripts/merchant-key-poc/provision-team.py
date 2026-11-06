"""Provision the two users explicitly selected for this POC; never handles secrets."""
import json
import subprocess

def sf(*arguments):
    result = subprocess.run(['sf', *arguments, '--json'], capture_output=True, text=True, check=False)
    response = json.loads(result.stdout)
    if result.returncode or response.get('status'):
        raise RuntimeError(response.get('message', result.stderr))
    return response['result']

org = 'aforce_de'
for object_name in ['Merchant_Vault_Member__c', 'Merchant_Vault_Secret__c', 'Merchant_Vault_Grant__c']:
    sf('sobject', 'describe', '--sobject', object_name, '--target-org', org)
users = sf('data', 'query', '--target-org', org, '--query', "SELECT Id, Name, Username, Contact.AccountId FROM User WHERE IsActive = true AND Name IN ('Jack Roger', 'Harry Cane')")['records']
if len(users) != 2 or {user['Name'] for user in users} != {'Jack Roger', 'Harry Cane'}:
    raise RuntimeError('Expected exactly the selected two active users.')
accounts = {user.get('Contact', {}).get('AccountId') for user in users if user.get('Contact')}
if len(accounts) != 1 or any(not user.get('Contact') for user in users):
    raise RuntimeError('Both selected users must belong to the same Contact Account.')
merchant = next(iter(accounts))
for user in users:
    user_id = user['Id']
    records = sf('data', 'query', '--target-org', org, '--query', f"SELECT Id, Merchant__c FROM Merchant_Vault_Member__c WHERE User_Key__c = '{user_id}'")['records']
    grantor = 'true' if user['Name'] == 'Jack Roger' else 'false'
    values = f'Merchant__c={merchant} Member_User__c={user_id} User_Key__c={user_id} Active__c=true Can_Grant__c={grantor}'
    if records:
        if records[0]['Merchant__c'] != merchant:
            raise RuntimeError('Existing membership belongs to another merchant; refusing reassignment.')
        sf('data', 'update', 'record', '--target-org', org, '--sobject', 'Merchant_Vault_Member__c', '--record-id', records[0]['Id'], '--values', values)
        member_id = records[0]['Id']
    else:
        member_id = sf('data', 'create', 'record', '--target-org', org, '--sobject', 'Merchant_Vault_Member__c', '--values', values)['id']
    assignment = sf('org', 'assign', 'permset', '--target-org', org, '--name', 'MerchantTeamVaultAccess', '--on-behalf-of', user['Username'])
    if assignment.get('failures'):
        raise RuntimeError('Permission assignment failed: ' + str(assignment['failures']))
    print(f"{user['Name']}: member {member_id}; merchant {merchant}; can grant: {grantor}")
