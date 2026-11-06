import { LightningElement, api } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import widgetResource from "@salesforce/resourceUrl/oktaSignInWidget";

const READY_TIMEOUT = 15000;
const BLOCKED_EVENTS = ["click", "submit", "keydown", "input", "change"];

export default class OktaWidgetHost extends LightningElement {
  static renderMode = "light";
  @api brandColor = "#4c6e9e";
  isLoading = true;
  hasError = false;
  initialized = false;
  generation = 0;
  widget;
  mount;
  timeout;

  blockInteraction = (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
  };

  renderedCallback() {
    if (this.initialized) return;
    this.initialized = true;
    this.mount = this.querySelector(".okta-preview-mount");
    this.mount.setAttribute("inert", "");
    BLOCKED_EVENTS.forEach((name) =>
      this.mount.addEventListener(name, this.blockInteraction, true)
    );
    const generation = ++this.generation;
    // A bounded timeout prevents a failed asset load from leaving a permanent spinner.
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.timeout = setTimeout(() => this.fail(generation), READY_TIMEOUT);
    this.initialize(generation);
  }

  async initialize(generation) {
    try {
      // A stylesheet inside this owned mount also reaches a native shadow ancestor.
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = `${widgetResource}/css/okta-sign-in.min.css`;
      const styleReady = new Promise((resolve, reject) => {
        stylesheet.onload = resolve;
        stylesheet.onerror = reject;
      });
      this.mount.appendChild(stylesheet);
      const overrides = document.createElement("link");
      overrides.rel = "stylesheet";
      overrides.href = `${widgetResource}/preview-overrides.css`;
      const overridesReady = new Promise((resolve, reject) => {
        overrides.onload = resolve;
        overrides.onerror = reject;
      });
      this.mount.appendChild(overrides);
      await Promise.all([
        styleReady,
        overridesReady,
        loadScript(this, `${widgetResource}/js/okta-sign-in.no-polyfill.min.js`)
      ]);
      if (!this.isCurrent(generation)) return;
      const container = document.createElement("div");
      this.mount.appendChild(container);
      this.widget = new window.OktaSignIn({
        baseUrl: "https://preview.invalid",
        useClassicEngine: true,
        language: "en",
        logo: `${widgetResource}/customer-mark.svg`,
        logoText: "Customer portal",
        colors: { brand: this.brandColor },
        assets: { baseUrl: widgetResource },
        features: { autoFocus: false, rememberMe: false, registration: false }
      });
      this.widget.on("afterRender", () => {
        if (!this.isCurrent(generation)) return;
        // Inert prevents user input; disabled controls also communicate preview state.
        this.mount
          .querySelectorAll("input, button, select, textarea")
          .forEach((control) => {
            control.disabled = true;
            control.setAttribute("aria-disabled", "true");
          });
        this.mount.querySelectorAll("a").forEach((link) => {
          link.removeAttribute("href");
          link.setAttribute("aria-disabled", "true");
          link.setAttribute("tabindex", "-1");
        });
        clearTimeout(this.timeout);
        this.isLoading = false;
        this.hasError = false;
      });
      // This promise resolves on authentication, not on the initial render.
      this.widget
        .renderEl({ el: container })
        .catch(() => this.fail(generation));
    } catch {
      this.fail(generation);
    }
  }

  isCurrent(generation) {
    return this.isConnected && this.generation === generation;
  }

  fail(generation) {
    if (!this.isCurrent(generation)) return;
    ++this.generation;
    clearTimeout(this.timeout);
    this.widget?.remove();
    this.widget = undefined;
    this.mount?.replaceChildren();
    this.isLoading = false;
    this.hasError = true;
  }

  disconnectedCallback() {
    ++this.generation;
    clearTimeout(this.timeout);
    this.widget?.remove();
    this.widget = undefined;
    if (this.mount) {
      BLOCKED_EVENTS.forEach((name) =>
        this.mount.removeEventListener(name, this.blockInteraction, true)
      );
      this.mount.replaceChildren();
    }
    this.mount = undefined;
    this.initialized = false;
    this.isLoading = true;
    this.hasError = false;
  }
}
