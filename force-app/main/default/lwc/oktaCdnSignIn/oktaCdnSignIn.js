import { LightningElement, api } from "lwc";

const CDN = "https://global.oktacdn.com/okta-signin-widget/7.50.0";
const CSS_INTEGRITY =
  "sha384-9U8L1RVnBthmKe5J3KIxrd6gWekqP7ChxtFciQXAK7XjkEmSo1cQssIbUxPp5h9s";
const BLOCKED_EVENTS = ["click", "submit", "keydown", "input", "change"];

export default class OktaCdnSignIn extends LightningElement {
  @api heading = "Sign in";
  @api brandColor = "#4c6e9e";
  @api enableAuthentication = false;
  @api issuer;
  @api clientId;
  @api redirectUri;
  @api transactionEndpoint;
  status = "Loading sign-in screen…";
  initialized = false;
  generation = 0;
  widget;
  mount;
  timeout;
  poll;
  abort;

  get isPreview() {
    return !this.enableAuthentication;
  }

  blockInteraction = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  renderedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.mount = this.template.querySelector(".widget-mount");
    if (this.isPreview) {
      this.mount.setAttribute("inert", "");
      BLOCKED_EVENTS.forEach((name) =>
        this.mount.addEventListener(name, this.blockInteraction, true)
      );
    }
    const generation = ++this.generation;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.timeout = setTimeout(
      () =>
        this.fail(
          generation,
          "Okta assets did not load. Check the CDN include and the site's CSP settings."
        ),
      15000
    );
    this.initialize(generation);
  }

  async initialize(generation) {
    try {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = `${CDN}/css/okta-sign-in.min.css`;
      css.integrity = CSS_INTEGRITY;
      css.crossOrigin = "anonymous";
      const stylesReady = new Promise((resolve, reject) => {
        css.onload = resolve;
        css.onerror = reject;
      });
      // A head-level CSS link cannot style the widget inside native shadow DOM.
      this.mount.appendChild(css);
      const [Constructor] = await Promise.all([
        this.waitForInclude(generation),
        stylesReady
      ]);
      if (!this.isCurrent(generation)) return;
      let config = {
        baseUrl: "https://preview.invalid",
        useClassicEngine: true,
        language: "en",
        assets: { baseUrl: CDN },
        colors: {
          brand: /^#[0-9a-f]{6}$/i.test(this.brandColor)
            ? this.brandColor
            : "#4c6e9e"
        },
        features: { autoFocus: false, rememberMe: false, registration: false }
      };
      if (!this.isPreview) {
        clearTimeout(this.timeout);
        this.status = "Preparing secure sign-in…";
        config = { ...config, ...(await this.getTransaction(generation)) };
        config.useClassicEngine = false;
        if (!this.isCurrent(generation)) return;
      }
      const container = document.createElement("div");
      this.mount.appendChild(container);
      this.widget = new Constructor(config);
      this.widget.on("afterRender", () => {
        if (!this.isCurrent(generation)) return;
        // An unprivileged constructor can emit this event for an empty shadow mount.
        // Keep the readiness timeout active until the actual screen exists.
        if (!container.querySelector("input, button, form")) return;
        clearTimeout(this.timeout);
        if (this.isPreview) {
          this.mount
            .querySelectorAll("input, button, select, textarea")
            .forEach((control) => {
              control.disabled = true;
              control.setAttribute("aria-disabled", "true");
            });
          this.mount.querySelectorAll("a").forEach((link) => {
            link.removeAttribute("href");
            link.setAttribute("tabindex", "-1");
          });
        }
        this.status = this.isPreview
          ? "Sign-in screen loaded. Authentication is disabled."
          : "";
      });
      const result = this.isPreview
        ? this.widget.renderEl({ el: container })
        : this.widget.showSignInAndRedirect({ el: container });
      result.catch(() =>
        this.fail(
          generation,
          "Sign-in could not start. Check the Okta application and login transaction configuration."
        )
      );
    } catch {
      this.fail(
        generation,
        "Sign-in could not load. Check the CDN includes, CSP, and authentication settings."
      );
    }
  }

  waitForInclude(generation) {
    return new Promise((resolve) => {
      const check = () => {
        if (!this.isCurrent(generation)) return;
        if (typeof window.OktaSignIn === "function") {
          resolve(window.OktaSignIn);
        } else {
          // Privileged head includes execute asynchronously, including after LWC render.
          // eslint-disable-next-line @lwc/lwc/no-async-operation
          this.poll = setTimeout(check, 100);
        }
      };
      check();
    });
  }

  async getTransaction(generation) {
    if (
      !this.issuer ||
      !this.clientId ||
      !this.redirectUri ||
      !this.transactionEndpoint
    )
      throw new Error("Missing authentication configuration");
    for (const value of [
      this.issuer,
      this.redirectUri,
      this.transactionEndpoint
    ]) {
      if (new URL(value, window.location.origin).protocol !== "https:")
        throw new Error("HTTPS required");
    }
    this.abort = new AbortController();
    // The server stores state and the PKCE verifier; neither comes from Builder settings.
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.timeout = setTimeout(() => this.abort?.abort(), 15000);
    const requested = new URLSearchParams(window.location.search).get(
      "startURL"
    );
    const startURL =
      requested?.startsWith("/") &&
      !requested.startsWith("//") &&
      !requested.includes("\\")
        ? requested
        : "/";
    const response = await fetch(this.transactionEndpoint, {
      method: "POST",
      credentials: "include",
      signal: this.abort.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        issuer: this.issuer,
        clientId: this.clientId,
        redirectUri: this.redirectUri,
        startURL
      })
    });
    if (!response.ok) throw new Error("Login transaction failed");
    const transaction = await response.json();
    if (!this.isCurrent(generation))
      throw new Error("Cancelled login transaction");
    if (
      !/^[A-Za-z0-9_-]{43}$/.test(transaction.codeChallenge) ||
      !/^[A-Za-z0-9_-]{32,512}$/.test(transaction.state)
    )
      throw new Error("Invalid login transaction");
    clearTimeout(this.timeout);
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.timeout = setTimeout(
      () => this.fail(generation, "The sign-in screen did not become ready."),
      15000
    );
    return {
      baseUrl: new URL(this.issuer).origin,
      issuer: this.issuer,
      clientId: this.clientId,
      redirectUri: this.redirectUri,
      state: transaction.state,
      codeChallenge: transaction.codeChallenge,
      scopes: ["openid", "profile", "email"]
    };
  }

  isCurrent(generation) {
    return this.isConnected && generation === this.generation;
  }

  fail(generation, message) {
    if (!this.isCurrent(generation)) return;
    ++this.generation;
    this.cleanup();
    this.status = message;
  }

  cleanup() {
    clearTimeout(this.timeout);
    clearTimeout(this.poll);
    this.abort?.abort();
    this.widget?.remove();
    this.widget = undefined;
    this.mount?.replaceChildren();
  }

  disconnectedCallback() {
    ++this.generation;
    this.cleanup();
    BLOCKED_EVENTS.forEach((name) =>
      this.mount?.removeEventListener(name, this.blockInteraction, true)
    );
    this.mount = undefined;
    this.initialized = false;
    this.status = "Loading sign-in screen…";
  }
}
