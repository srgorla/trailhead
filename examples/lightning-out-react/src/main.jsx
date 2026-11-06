import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { readTaskCreated } from "./task-messages.mjs";
import "./style.css";

let libraryPromise;
function loadLibrary(src) {
  libraryPromise ??= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = () => {
      script.remove();
      reject(new Error("Could not load the Salesforce library."));
    };
    document.head.append(script);
  }).catch((error) => {
    libraryPromise = undefined;
    throw error;
  });
  return libraryPromise;
}

function SalesforcePage({ onCreated }) {
  const container = useRef(null);
  const onCreatedRef = useRef(onCreated);
  onCreatedRef.current = onCreated;
  const [status, setStatus] = useState("Connecting to Salesforce…");

  useEffect(() => {
    let disposed = false;
    let page;
    const controller = new AbortController();
    const root = container.current;
    const cleanups = [];
    const listen = (target, type, handler) => {
      target.addEventListener(type, handler);
      cleanups.push(() => target.removeEventListener(type, handler));
    };
    const timer = setTimeout(
      () =>
        setStatus(
          "Connection timed out. Reconnect after checking Salesforce settings and cookies."
        ),
      60000
    );
    async function connect() {
      try {
        const response = await fetch("/api/session", {
          method: "POST",
          signal: controller.signal
        });
        const config = await response.json();
        if (!response.ok)
          throw new Error(config.error || "Salesforce session failed.");
        const sfOrigin = new URL(config.scriptUrl).origin;
        const origins = [
          sfOrigin,
          sfOrigin.replace(".my.salesforce.com", ".lightning.force.com")
        ];
        const channel = crypto.randomUUID();
        listen(window, "message", (event) => {
          if (disposed) return;
          const task = readTaskCreated(event, { origins, channel });
          if (!task) return;
          onCreatedRef.current({
            ...task,
            url: `${sfOrigin}/lightning/r/Task/${task.taskId}/view`
          });
          page?.setAttribute("delivery-receipt", task.taskId);
          setStatus("Task ID received by React.");
        });
        await loadLibrary(config.scriptUrl);
        if (disposed) return;
        const app = document.createElement("lightning-out-application");
        app.setAttribute("app-id", config.appId);
        app.setAttribute("components", "c-simple-out-page");
        const failed = (event) => {
          clearTimeout(timer);
          const detail =
            typeof event.detail?.message === "string"
              ? event.detail.message
                  .replace(/https?:\/\/\S+/g, "[Salesforce URL]")
                  .slice(0, 350)
              : "No error details were provided.";
          if (!disposed) setStatus(`Salesforce reported an error: ${detail}`);
        };
        listen(app, "lo.application.error", failed);
        root.append(app);
        app.setAttribute("frontdoor-url", config.frontdoorUrl);
        await customElements.whenDefined("c-simple-out-page");
        if (disposed) return;
        page = document.createElement("c-simple-out-page");
        page.setAttribute("host-origin", window.location.origin);
        page.setAttribute("message-channel", channel);
        page.style.height = "920px";
        listen(page, "lo.component.ready", () => {
          clearTimeout(timer);
          if (!disposed) setStatus("Salesforce form ready.");
        });
        listen(page, "lo.component.error", failed);
        root.append(page);
      } catch (error) {
        clearTimeout(timer);
        if (!disposed) setStatus(error.message);
      }
    }
    connect();
    return () => {
      disposed = true;
      controller.abort();
      clearTimeout(timer);
      cleanups.forEach((cleanup) => cleanup());
      root.replaceChildren();
    };
  }, []);

  return (
    <section
      className="panel salesforce-panel"
      aria-labelledby="salesforce-heading"
    >
      <p className="eyebrow">LIGHTNING OUT 2.0</p>
      <h2 id="salesforce-heading">Salesforce form</h2>
      <div className="connection">
        <p role="status">{status}</p>
        <button onClick={() => window.location.reload()}>Reconnect</button>
      </div>
      <div ref={container} />
    </section>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  function created(task) {
    setTasks((previous) =>
      previous.some((item) => item.taskId === task.taskId)
        ? previous
        : [task, ...previous]
    );
  }
  return (
    <main>
      <p className="eyebrow">REACT + LIGHTNING OUT 2.0</p>
      <h1>Create in Salesforce. Receive in React.</h1>
      <p className="intro">
        Select a contact and save a task in the embedded Salesforce form.
      </p>
      <div className="demo-grid">
        <section className="panel react-panel" aria-labelledby="react-heading">
          <p className="eyebrow">HOST APPLICATION</p>
          <h2 id="react-heading">React</h2>
          <p>Saved Task IDs appear here after Salesforce confirms the save.</p>
          <div aria-live="polite" aria-relevant="additions">
            {tasks.length ? (
              tasks.map((task) => (
                <article className="received-task" key={task.taskId}>
                  <h3>{task.subject || "Task created"}</h3>
                  <p>Salesforce Task ID</p>
                  <code>{task.taskId}</code>
                  <p>
                    <a href={task.url} target="_blank" rel="noreferrer">
                      Open task in Salesforce
                    </a>
                  </p>
                </article>
              ))
            ) : (
              <aside>
                <h3>Waiting for a saved task</h3>
                <p>Complete the form on the right and click Save task.</p>
              </aside>
            )}
          </div>
        </section>
        <SalesforcePage onCreated={created} />
      </div>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
