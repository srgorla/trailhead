Id targetAccountId = '001gL000000DpfAQAS'; String apiVersion = 'v65.0';

HttpRequest req = new HttpRequest(); req.setMethod('GET'); req.setEndpoint('callout:SG_AgentForce/services/data/' + apiVersion + '/sobjects/Account/' + targetAccountId); req.setHeader('Accept', 'application/json');

Http http = new Http(); HttpResponse res; try { res = http.send(req); System.debug('Status: ' + res.getStatusCode()); System.debug('Body: ' + res.getBody()); if (res.getStatusCode() == 200) { Map<String, Object> acct = (Map<String, Object>) JSON.deserializeUntyped(res.getBody()); System.debug('Name: ' + (String)acct.get('Name')); System.debug('Type: ' + (String)acct.get('Type')); System.debug('AccountNumber: ' + (String)acct.get('AccountNumber')); } } catch (System.CalloutException e) { System.debug('Callout exception: ' + e.getMessage()); throw e; }
