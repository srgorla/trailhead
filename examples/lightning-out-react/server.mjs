import { createServer, loadEnv } from "vite";
import { developerSession } from "./salesforce.mjs";

const localEnv = loadEnv("development", import.meta.dirname, "SF_");
for (const key of [
  "SF_TARGET_ORG",
  "SF_LIGHTNING_OUT_APP_ID",
  "SF_INSTANCE_URL",
  "SF_ACCESS_TOKEN"
]) {
  process.env[key] ||= localEnv[key] || "";
}

// This server deliberately uses the local developer's login and binds to loopback.
// It must never be exposed as a shared application or deployed to production.
const origin = "http://localhost:5174";
const server = await createServer({
  root: import.meta.dirname,
  server: { host: "localhost", port: 5174, strictPort: true },
  plugins: [
    {
      name: "local-salesforce-session",
      configureServer(vite) {
        vite.middlewares.use("/api", async (req, res) => {
          res.setHeader("Cache-Control", "no-store");
          res.setHeader("Content-Type", "application/json");
          if (
            req.method !== "POST" ||
            req.headers.origin !== origin ||
            req.headers.host !== "localhost:5174"
          ) {
            res.statusCode = 403;
            res.end(
              JSON.stringify({
                error: "Use this demo from http://localhost:5174."
              })
            );
            return;
          }
          try {
            const path = req.url.split("?")[0];
            if (path === "/session")
              res.end(JSON.stringify(await developerSession()));
            else {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: "Unknown API endpoint." }));
            }
          } catch (error) {
            res.statusCode = 502;
            // Return only controlled errors; network errors can contain URLs.
            const safe =
              error.message.startsWith("Salesforce") ||
              error.message.startsWith("Deploy Simple_React_Demo");
            res.end(
              JSON.stringify({
                error: safe
                  ? error.message
                  : "Salesforce connection failed. Check your CLI login and org setup."
              })
            );
          }
        });
      }
    }
  ]
});
await server.listen();
server.printUrls();
