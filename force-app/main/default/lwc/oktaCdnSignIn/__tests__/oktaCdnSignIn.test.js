import { createElement } from "lwc";
import OktaCdnSignIn from "c/oktaCdnSignIn";

const flush = async () => {
  // eslint-disable-next-line no-await-in-loop
  for (let i = 0; i < 12; i++) await Promise.resolve();
};

describe("privileged Okta event bridge", () => {
  let element;
  let requests;
  let available;
  let respondReady;
  let listener;
  let rendered;
  const live = {
    enableAuthentication: true,
    issuer: "https://example.okta.com/oauth2/default",
    clientId: "client-id",
    redirectUri: "https://backend.example/callback",
    transactionEndpoint: "https://backend.example/login-transaction"
  };

  function reply(id, type, message) {
    element.shadowRoot.querySelector(".widget-mount").dispatchEvent(
      new CustomEvent("okta-widget-response", {
        detail: JSON.stringify({ id, type, message })
      })
    );
  }

  beforeEach(() => {
    jest.useFakeTimers();
    let sequence = 0;
    Object.defineProperty(crypto, "randomUUID", {
      configurable: true,
      value: () =>
        `00000000-0000-4000-8000-${String(++sequence).padStart(12, "0")}`
    });
    requests = [];
    available = true;
    respondReady = true;
    rendered = false;
    // Deliberately absent: the LWC must never rely on a window constructor.
    delete window.OktaSignIn;
    global.fetch = jest.fn();
    listener = (event) => {
      const request = JSON.parse(event.detail);
      requests.push(request);
      if (!available || request.action !== "render") return;
      reply(request.id, "accepted");
      if (respondReady && !rendered) {
        rendered = true;
        const input = document.createElement("input");
        input.disabled = request.preview;
        element.shadowRoot.querySelector(".widget-mount").appendChild(input);
        reply(request.id, "ready");
      }
    };
    document.addEventListener("okta-widget-request", listener);
  });

  afterEach(() => {
    while (document.body.firstChild)
      document.body.removeChild(document.body.firstChild);
    document.removeEventListener("okta-widget-request", listener);
    delete global.fetch;
    delete crypto.randomUUID;
    jest.useRealTimers();
  });

  async function mount(properties = {}) {
    element = createElement("c-okta-cdn-sign-in", { is: OktaCdnSignIn });
    Object.assign(element, properties);
    document.body.appendChild(element);
    await flush();
    return element;
  }
  async function loadCss() {
    element.shadowRoot
      .querySelector("link")
      .dispatchEvent(new CustomEvent("load"));
    await flush();
  }

  it("renders via JSON events without accessing the constructor in LWS", async () => {
    await mount();
    await loadCss();
    expect(window.OktaSignIn).toBeUndefined();
    const request = requests.find((item) => item.action === "render");
    expect(request.config.baseUrl).toBe("https://preview.invalid");
    expect(request.preview).toBe(true);
    expect(element.shadowRoot.querySelector("input").disabled).toBe(true);
    expect(
      element.shadowRoot.querySelector(".widget-mount").hasAttribute("inert")
    ).toBe(true);
    expect(element.shadowRoot.textContent).toContain("screen loaded");
    expect(fetch).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });

  it("retries when the privileged bridge initializes after the LWC", async () => {
    available = false;
    await mount();
    await loadCss();
    available = true;
    jest.advanceTimersByTime(100);
    await flush();
    expect(requests.filter((item) => item.action === "render")).toHaveLength(2);
    expect(element.shadowRoot.textContent).toContain("screen loaded");
  });

  it("distinguishes missing bridge from missing login controls", async () => {
    available = false;
    await mount();
    await loadCss();
    jest.advanceTimersByTime(15000);
    await flush();
    expect(element.shadowRoot.textContent).toContain(
      "bridge did not acknowledge"
    );
    expect(jest.getTimerCount()).toBe(0);
  });

  it("does not mark an acknowledged but empty mount ready", async () => {
    respondReady = false;
    await mount();
    await loadCss();
    jest.advanceTimersByTime(15000);
    await flush();
    expect(element.shadowRoot.textContent).toContain("controls did not render");
  });

  it("times out styles without dispatching a render request", async () => {
    await mount();
    jest.advanceTimersByTime(15000);
    await flush();
    expect(element.shadowRoot.textContent).toContain("stylesheet");
    expect(requests.some((item) => item.action === "render")).toBe(false);
  });

  it("rejects live mode without settings or a valid fresh transaction", async () => {
    await mount({ enableAuthentication: true });
    await loadCss();
    expect(requests.some((item) => item.action === "render")).toBe(false);
    expect(element.shadowRoot.textContent).toContain("could not load");
  });

  it("passes server state and PKCE to the live bridge without secrets", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        state: "s".repeat(43),
        codeChallenge: "c".repeat(43),
        clientSecret: "ignored"
      })
    });
    await mount(live);
    await loadCss();
    const request = requests.find((item) => item.action === "render");
    expect(request.preview).toBe(false);
    expect(request.config).toMatchObject({
      issuer: live.issuer,
      useClassicEngine: false,
      state: "s".repeat(43),
      codeChallenge: "c".repeat(43)
    });
    expect(request.config.clientSecret).toBeUndefined();
  });

  it("sends cleanup after disconnect and uses a fresh ID on reconnect", async () => {
    await mount();
    await loadCss();
    const firstId = requests[0].id;
    document.body.removeChild(element);
    expect(requests).toContainEqual(
      expect.objectContaining({ action: "remove", id: firstId })
    );
    rendered = false;
    document.body.appendChild(element);
    await flush();
    await loadCss();
    expect(requests.filter((item) => item.action === "render")[1].id).not.toBe(
      firstId
    );
  });

  it("ignores a response for a different component instance", async () => {
    available = false;
    await mount();
    await loadCss();
    reply("wrong-id", "ready");
    await flush();
    expect(element.shadowRoot.textContent).not.toContain("screen loaded");
  });

  it("ignores late readiness after the load was cancelled by timeout", async () => {
    available = false;
    await mount();
    await loadCss();
    const id = requests[0].id;
    jest.advanceTimersByTime(15000);
    await flush();
    reply(id, "ready");
    await flush();
    expect(element.shadowRoot.textContent).toContain(
      "bridge did not acknowledge"
    );
  });
});
