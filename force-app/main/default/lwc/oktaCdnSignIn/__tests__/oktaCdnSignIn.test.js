import { createElement } from "lwc";
import OktaCdnSignIn from "c/oktaCdnSignIn";

const flush = async () => {
  // Sequential microtasks settle the async loader and transaction pipeline.
  // eslint-disable-next-line no-await-in-loop
  for (let i = 0; i < 12; i++) await Promise.resolve();
};

describe("CDN embedded Okta sign-in", () => {
  let config;
  let ready;
  let remove;
  let render;
  let redirect;

  function installInclude() {
    window.OktaSignIn = jest.fn((options) => {
      config = options;
      return {
        on: (name, callback) => {
          ready = callback;
        },
        renderEl: render,
        showSignInAndRedirect: redirect,
        remove
      };
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
    remove = jest.fn();
    render = jest.fn(({ el }) => {
      const form = document.createElement("form");
      const input = document.createElement("input");
      input.name = "username";
      form.appendChild(input);
      el.appendChild(form);
      ready();
      return new Promise(() => {});
    });
    redirect = jest.fn(({ el }) => {
      el.appendChild(document.createElement("input"));
      ready();
      return new Promise(() => {});
    });
    installInclude();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    while (document.body.firstChild)
      document.body.removeChild(document.body.firstChild);
    delete window.OktaSignIn;
    delete global.fetch;
    jest.useRealTimers();
  });

  async function mount(properties = {}) {
    const element = createElement("c-okta-cdn-sign-in", { is: OktaCdnSignIn });
    Object.assign(element, properties);
    document.body.appendChild(element);
    await flush();
    return element;
  }

  async function loadCss(element) {
    element.shadowRoot
      .querySelector("link")
      .dispatchEvent(new CustomEvent("load"));
    await flush();
  }

  const live = {
    enableAuthentication: true,
    issuer: "https://example.okta.com/oauth2/default",
    clientId: "client-id",
    redirectUri: "https://backend.example/callback",
    transactionEndpoint: "https://backend.example/login-transaction"
  };

  it("waits for an asynchronous head include and renders an inert CDN-styled preview", async () => {
    delete window.OktaSignIn;
    const element = await mount();
    await loadCss(element);
    expect(render).not.toHaveBeenCalled();
    installInclude();
    jest.advanceTimersByTime(100);
    await flush();
    const root = element.shadowRoot;
    expect(root.querySelector("link").href).toContain(
      "global.oktacdn.com/okta-signin-widget/7.50.0/css/"
    );
    expect(root.querySelector("link").integrity).toMatch(/^sha384-/);
    expect(root.querySelector(".widget-mount").hasAttribute("inert")).toBe(
      true
    );
    expect(root.querySelector("input").disabled).toBe(true);
    expect(
      root
        .querySelector("form")
        .dispatchEvent(
          new CustomEvent("submit", { bubbles: true, cancelable: true })
        )
    ).toBe(false);
    expect(config.baseUrl).toBe("https://preview.invalid");
    expect(fetch).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("fails closed when live settings or a server transaction are missing", async () => {
    const element = await mount({ enableAuthentication: true });
    await loadCss(element);
    expect(render).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
    expect(element.shadowRoot.textContent).toContain("could not load");
  });

  it("uses fresh server state and PKCE challenge for embedded Identity Engine login", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        state: "s".repeat(43),
        codeChallenge: "c".repeat(43),
        clientSecret: "ignored"
      })
    });
    const element = await mount(live);
    await loadCss(element);
    expect(fetch).toHaveBeenCalledWith(
      live.transactionEndpoint,
      expect.objectContaining({ method: "POST", credentials: "include" })
    );
    expect(config).toMatchObject({
      baseUrl: "https://example.okta.com",
      issuer: live.issuer,
      clientId: live.clientId,
      useClassicEngine: false,
      state: "s".repeat(43),
      codeChallenge: "c".repeat(43)
    });
    expect(config.clientSecret).toBeUndefined();
    expect(redirect).toHaveBeenCalledTimes(1);
    expect(render).not.toHaveBeenCalled();
    expect(element.shadowRoot.querySelector("input").disabled).toBe(false);
  });

  it("rejects malformed PKCE transactions before rendering any credentials", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ state: "static", codeChallenge: "invalid" })
    });
    const element = await mount(live);
    await loadCss(element);
    expect(redirect).not.toHaveBeenCalled();
    expect(element.shadowRoot.querySelector("input")).toBeNull();
  });

  it("times out missing includes and ignores late asset loads", async () => {
    delete window.OktaSignIn;
    const element = await mount();
    const css = element.shadowRoot.querySelector("link");
    jest.advanceTimersByTime(15000);
    await flush();
    installInclude();
    css.dispatchEvent(new CustomEvent("load"));
    await flush();
    expect(render).not.toHaveBeenCalled();
    expect(element.shadowRoot.textContent).toContain("CSP");
    expect(jest.getTimerCount()).toBe(0);
  });

  it("removes the widget and initializes once when reconnected", async () => {
    const element = await mount();
    await loadCss(element);
    document.body.removeChild(element);
    expect(remove).toHaveBeenCalledTimes(1);
    document.body.appendChild(element);
    await flush();
    await loadCss(element);
    expect(render).toHaveBeenCalledTimes(2);
  });

  it("does not report an empty shadow-DOM container as a loaded screen", async () => {
    render.mockImplementation(() => {
      ready();
      return new Promise(() => {});
    });
    const element = await mount();
    await loadCss(element);
    expect(element.shadowRoot.textContent).not.toContain("screen loaded");
    jest.advanceTimersByTime(15000);
    await flush();
    expect(element.shadowRoot.textContent).toContain("CSP");
  });
});
