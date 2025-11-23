String tokenUrl = '[](https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com/services/oauth2/token';)<https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com/services/oauth2/token';> String clientId = '3MVG9dAEux2v1sLvyGcPikl9WBd5DRziM_Vk82fNaSVLhnUUMYcRjMDRu2xWinjAzAdDDHLgfDYbsX5gnb5CU'; String clientSecret = '4BD6CAD3ECBE687DF484833205D2015AF73F9DE64FC6C09A989E4EB1C372A1E6'; String grantType = 'client_credentials';

Http http = new Http();

// 1) Get access token (use x-www-form-urlencoded) HttpRequest tokenReq = new HttpRequest(); tokenReq.setMethod('POST'); tokenReq.setEndpoint(tokenUrl); tokenReq.setHeader('Content-Type', 'application/x-www-form-urlencoded'); String formBody = 'grant_type=' + EncodingUtil.urlEncode(grantType, 'UTF-8') + '\&client_id=' + EncodingUtil.urlEncode(clientId, 'UTF-8') + '\&client_secret=' + EncodingUtil.urlEncode(clientSecret, 'UTF-8'); tokenReq.setBody(formBody);

HttpResponse tokenRes = http.send(tokenReq); System.debug('Token Status: ' + tokenRes.getStatusCode()); System.debug('Token Body: ' + tokenRes.getBody()); if (tokenRes.getStatusCode() != 200) { throw new CalloutException('Failed to obtain token: ' + tokenRes.getStatus() + ' ' + tokenRes.getBody()); }

// Parse token response Map<String, Object> tokenPayload = (Map<String, Object>) JSON.deserializeUntyped(tokenRes.getBody()); String accessToken = (String) tokenPayload.get('access_token'); if (String.isBlank(accessToken)) { throw new CalloutException('No access_token in response.'); }

// 2) Call REST API for Account by Id String instanceBase = '[](https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com';)<https://orgfarm-6f61b5a2b9-dev-ed.develop.my.salesforce.com';> String apiVersion = 'v65.0'; String accountId = '001gL000000DpfAQAS';

HttpRequest apiReq = new HttpRequest(); apiReq.setMethod('GET'); apiReq.setEndpoint(instanceBase + '/services/data/' + apiVersion + '/sobjects/Account/' + accountId); apiReq.setHeader('Authorization', 'Bearer ' + accessToken); apiReq.setHeader('Accept', 'application/json');

HttpResponse apiRes = http.send(apiReq); System.debug('API Status: ' + apiRes.getStatusCode()); System.debug('API Body: ' + apiRes.getBody()); if (apiRes.getStatusCode() == 200) { Map<String, Object> acct = (Map<String, Object>) JSON.deserializeUntyped(apiRes.getBody()); System.debug('Name: ' + (String)acct.get('Name')); System.debug('Type: ' + (String)acct.get('Type')); System.debug('AccountNumber: ' + (String)acct.get('AccountNumber')); }
