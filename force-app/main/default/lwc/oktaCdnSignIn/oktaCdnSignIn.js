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
  mountId;
  mount;
  timeout;
  poll;
  abort;
  loadingStage = "styles";
  bridgeAccepted = false;
  bridgeActive = false;

  handleBridgeResponse = (event) => {
    let response;
    try {
      response = JSON.parse(event.detail);
    } catch {
      return;
    }
    if (!this.isConnected || !this.bridgeActive || response.id !== this.mountId)
      return;
    if (response.type === "accepted") {
      this.bridgeAccepted = true;
      clearTimeout(this.poll);
      this.loadingStage = "render";
    } else if (response.type === "ready") {
      this.bridgeAccepted = true;
      clearTimeout(this.poll);
      clearTimeout(this.timeout);
      this.status = this.isPreview
        ? "Sign-in screen loaded. Authentication is disabled."
        : "";
    } else if (response.type === "error") {
      this.fail(this.generation, `Okta bridge failed: ${response.message}`);
    }
  };

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
    this.bridgeActive = true;
    this.mount = this.template.querySelector(".widget-mount");
    this.mountId = crypto.randomUUID();
    this.mount.setAttribute("data-okta-mount", this.mountId);
    this.mount.addEventListener(
      "okta-widget-response",
      this.handleBridgeResponse
    );
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
          this.loadingStage === "render"
            ? "Okta loaded, but its login controls did not render. Check the Console for an Oasis or widget error."
            : this.loadingStage === "styles"
              ? "Okta stylesheet did not finish loading. Check the CSS request and style-src allowlist."
              : "Okta bridge did not acknowledge the component. Check both head-markup includes and the Console."
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
      await stylesReady;
      if (!this.isCurrent(generation)) return;
      this.loadingStage = "bridge";
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
      this.requestRender(generation, config);
    } catch {
      this.fail(
        generation,
        "Sign-in could not load. Check the CDN includes, CSP, and authentication settings."
      );
    }
  }

  sendBridge(action, config) {
    if (!this.mountId) return;
    document.dispatchEvent(
      new CustomEvent("okta-widget-request", {
        bubbles: true,
        composed: true,
        detail: JSON.stringify({
          id: this.mountId,
          action,
          preview: this.isPreview,
          config
        })
      })
    );
  }

  requestRender(generation, config) {
    if (!this.isCurrent(generation) || this.bridgeAccepted) return;
    this.sendBridge("render", config);
    // Retry until acknowledged: privileged includes run asynchronously.
    if (this.isCurrent(generation) && !this.bridgeAccepted) {
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.poll = setTimeout(() => this.requestRender(generation, config), 100);
    }
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
    this.bridgeActive = false;
    clearTimeout(this.timeout);
    clearTimeout(this.poll);
    this.abort?.abort();
    this.sendBridge("remove");
    this.mount?.replaceChildren();
  }

  disconnectedCallback() {
    ++this.generation;
    this.cleanup();
    this.mount?.removeEventListener(
      "okta-widget-response",
      this.handleBridgeResponse
    );
    BLOCKED_EVENTS.forEach((name) =>
      this.mount?.removeEventListener(name, this.blockInteraction, true)
    );
    this.mount = undefined;
    this.initialized = false;
    this.mountId = undefined;
    this.bridgeAccepted = false;
    this.loadingStage = "styles";
    this.status = "Loading sign-in screen…";
  }
}
