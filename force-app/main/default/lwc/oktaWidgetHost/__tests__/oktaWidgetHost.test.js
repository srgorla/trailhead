import { createElement } from "lwc";
import OktaWidgetHost from "c/oktaWidgetHost";
import { loadScript } from "lightning/platformResourceLoader";

jest.mock(
  "lightning/platformResourceLoader",
  () => ({ loadScript: jest.fn() }),
  { virtual: true }
);

const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
};

describe("Okta display-only host", () => {
  let remove;
  let render;
  let ready;
  let options;

  beforeEach(() => {
    jest.useFakeTimers();
    loadScript.mockResolvedValue();
    remove = jest.fn();
    ready = undefined;
    render = jest.fn(({ el }) => {
      const form = document.createElement("form");
      for (const [name, type] of [
        ["username", "text"],
        ["password", "password"],
        ["", "submit"]
      ]) {
        const input = document.createElement("input");
        input.name = name;
        input.type = type;
        form.appendChild(input);
      }
      const link = document.createElement("a");
      link.href = "https://preview.invalid/help";
      link.textContent = "Help";
      form.appendChild(link);
      el.appendChild(form);
      ready();
      return new Promise(() => {});
    });
    window.OktaSignIn = jest.fn((config) => {
      options = config;
      return {
        on: (name, callback) => {
          ready = callback;
        },
        renderEl: render,
        remove
      };
    });
  });

  afterEach(() => {
    while (document.body.firstChild)
      document.body.removeChild(document.body.firstChild);
    delete window.OktaSignIn;
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  async function mount() {
    const element = createElement("c-okta-widget-host", { is: OktaWidgetHost });
    document.body.appendChild(element);
    await flush();
    return element;
  }

  async function loadStyles(element) {
    element
      .querySelectorAll("link")
      .forEach((link) => link.dispatchEvent(new CustomEvent("load")));
    await flush();
  }

  it("uses a non-OIDC preview, disables credentials, and blocks programmatic submission", async () => {
    const element = await mount();
    await loadStyles(element);
    expect(options.baseUrl).toBe("https://preview.invalid");
    expect(options.useClassicEngine).toBe(true);
    expect(options.clientId).toBeUndefined();
    expect(
      element.querySelector(".okta-preview-mount").hasAttribute("inert")
    ).toBe(true);
    element
      .querySelectorAll("input")
      .forEach((input) => expect(input.disabled).toBe(true));
    expect(element.querySelector("a").hasAttribute("href")).toBe(false);
    const event = new CustomEvent("submit", {
      bubbles: true,
      cancelable: true
    });
    expect(element.querySelector("form").dispatchEvent(event)).toBe(false);
    expect(element.textContent).toContain("Authentication is disabled");
  });

  it("shows a bounded error when stylesheet loading never finishes, and ignores late loads", async () => {
    const element = await mount();
    const styles = [...element.querySelectorAll("link")];
    jest.advanceTimersByTime(15000);
    await flush();
    expect(element.textContent).toContain("could not be loaded");
    styles.forEach((link) => link.dispatchEvent(new CustomEvent("load")));
    await flush();
    expect(render).not.toHaveBeenCalled();
  });

  it("cleans up on removal and renders once when reconnected", async () => {
    const element = await mount();
    await loadStyles(element);
    expect(render).toHaveBeenCalledTimes(1);
    document.body.removeChild(element);
    expect(remove).toHaveBeenCalledTimes(1);
    document.body.appendChild(element);
    await flush();
    await loadStyles(element);
    expect(render).toHaveBeenCalledTimes(2);
  });
});
