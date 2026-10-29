from pathlib import Path
import shutil,json
root=Path(__file__).resolve().parents[2];out=Path('/private/tmp/merchant-team-project')
out.mkdir(exist_ok=True)
(out/'sfdx-project.json').write_text(json.dumps({'packageDirectories':[{'path':'force-app','default':True}],'sourceApiVersion':'66.0'}))
(out/'.forceignore').write_text('**/__tests__/**\n**/jsconfig.json\n**/.eslintrc.json\n')
for relative in ['classes/MerchantTeamVaultController.cls','classes/MerchantTeamVaultStore.cls','classes/MerchantTeamVaultControllerTest.cls','classes/MerchantVaultTestDataFactory.cls','lwc/merchantTeamCrypto','lwc/merchantTeamVault','lwc/merchantKeyReveal','lwc/merchantKeyCrypto','objects/Merchant_Vault_Member__c','objects/Merchant_Vault_Secret__c','objects/Merchant_Vault_Grant__c','permissionsets/MerchantTeamVaultAccess.permissionset-meta.xml','permissionsets/MerchantVaultProvisioningAdmin.permissionset-meta.xml','customPermissions/Merchant_Team_Vault.customPermission-meta.xml']:
    source=root/'force-app/main/default'/relative;dest=out/'force-app/main/default'/relative;dest.parent.mkdir(parents=True,exist_ok=True)
    if source.is_dir():shutil.copytree(source,dest,dirs_exist_ok=True)
    else:
        shutil.copy2(source,dest)
        if relative.endswith('.cls'):shutil.copy2(str(source)+'-meta.xml',str(dest)+'-meta.xml')
(out/'manifest').mkdir(exist_ok=True);shutil.copy2(root/'manifest/merchant-team-vault.xml',out/'manifest/merchant-team-vault.xml')
print(out)
