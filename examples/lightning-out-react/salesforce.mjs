import { Org } from "@salesforce/core";

export async function developerConnection(target) {
  try {
    const org = await Org.create({ aliasOrUsername: target });
    const connection = org.getConnection();
    // Exercise the refresh mechanism before using the token outside JSforce.
    await connection.identity();
    return connection;
  } catch {
    // SDK errors can contain credentials; never forward their raw details.
    throw new Error(
      "Salesforce login failed. Verify SF_TARGET_ORG and run sf org login web."
    );
  }
}

export function salesforceOrigin(value) {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    !url.hostname.endsWith(".my.salesforce.com") ||
    url.username ||
    url.password ||
    url.port
  ) {
    throw new Error("Expected an HTTPS Salesforce My Domain URL.");
  }
  return url.origin;
}

export async function bridgeSession(
  { instanceUrl, accessToken, appId },
  fetcher = fetch
) {
  const origin = salesforceOrigin(instanceUrl);
  if (!/^[a-zA-Z0-9]{18}$/.test(appId))
    throw new Error("Invalid Lightning Out app ID.");
  const response = await fetcher(
    `${origin}/services/oauth2/lightningoutsingleaccess`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        access_token: accessToken,
        lightning_out_app_id: appId
      }),
      redirect: "error",
      signal: AbortSignal.timeout(20000)
    }
  );
  if (!response.ok) {
    throw new Error(
      `Salesforce UI Bridge returned HTTP ${response.status}. Check that the app is enabled and the login has web scope.`
    );
  }
  const { frontdoor_uri: frontdoorUrl } = await response.json();
  const frontdoor = new URL(frontdoorUrl);
  if (
    frontdoor.origin !== origin ||
    frontdoor.pathname !== "/secur/frontdoor.jsp"
  ) {
    throw new Error("Salesforce returned an unexpected session URL.");
  }
  return {
    appId,
    frontdoorUrl,
    scriptUrl: `${origin}/lightning/lightning.out.latest/index.iife.prod.js`
  };
}

export async function developerSession() {
  const target = process.env.SF_TARGET_ORG || "aforce_de";
  const connection =
    !process.env.SF_ACCESS_TOKEN || !process.env.SF_LIGHTNING_OUT_APP_ID
      ? await developerConnection(target)
      : null;
  const auth = process.env.SF_ACCESS_TOKEN
    ? {
        instanceUrl: process.env.SF_INSTANCE_URL,
        accessToken: process.env.SF_ACCESS_TOKEN
      }
    : {
        instanceUrl: connection.instanceUrl,
        accessToken: connection.accessToken
      };
  let appId = process.env.SF_LIGHTNING_OUT_APP_ID;
  if (!appId) {
    const apps = await connection.tooling.query(
      "SELECT Id FROM LightningOutApp WHERE DeveloperName = 'Simple_React_Demo' LIMIT 1"
    );
    appId = apps.records[0]?.Id;
  }
  if (!appId)
    throw new Error(
      "Deploy Simple_React_Demo first, or set SF_LIGHTNING_OUT_APP_ID."
    );
  return bridgeSession({
    instanceUrl: auth.instanceUrl,
    accessToken: auth.accessToken,
    appId
  });
}
