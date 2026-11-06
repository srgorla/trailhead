import { test } from "node:test";
import assert from "node:assert/strict";
import { bridgeSession, salesforceOrigin } from "../salesforce.mjs";

const instanceUrl = "https://demo.my.salesforce.com";
const appId = "1Us000000000001AAA";

test("exchanges a server token for a frontdoor URL without returning the token", async () => {
  const result = await bridgeSession(
    { instanceUrl, appId, accessToken: "private-token" },
    async (url, options) => {
      assert.equal(
        url,
        `${instanceUrl}/services/oauth2/lightningoutsingleaccess`
      );
      assert.equal(options.method, "POST");
      assert.equal(options.body.get("access_token"), "private-token");
      assert.equal(options.body.get("lightning_out_app_id"), appId);
      return Response.json({
        frontdoor_uri: `${instanceUrl}/secur/frontdoor.jsp?otp=one-time`
      });
    }
  );
  assert.equal(result.appId, appId);
  assert.equal(JSON.stringify(result).includes("private-token"), false);
});

test("rejects unsafe Salesforce origins and unexpected redirect targets", async () => {
  for (const value of [
    "http://demo.my.salesforce.com",
    "https://demo.my.salesforce.com.evil.test",
    "https://user:pass@demo.my.salesforce.com"
  ]) {
    assert.throws(() => salesforceOrigin(value));
  }
  await assert.rejects(
    bridgeSession({ instanceUrl, appId, accessToken: "secret" }, async () =>
      Response.json({ frontdoor_uri: "https://evil.test/secur/frontdoor.jsp" })
    ),
    /unexpected session URL/
  );
});

test("does not expose upstream error bodies", async () => {
  await assert.rejects(
    bridgeSession(
      { instanceUrl, appId, accessToken: "secret" },
      async () => new Response("secret upstream data", { status: 401 })
    ),
    (error) => {
      assert.match(error.message, /HTTP 401/);
      assert.equal(error.message.includes("secret"), false);
      return true;
    }
  );
});
