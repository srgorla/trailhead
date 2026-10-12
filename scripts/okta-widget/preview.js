/* global OktaSignIn */
(() => {
  const mount = document.getElementById("widget-mount");
  const status = document.getElementById("status");
  let widget;
  let failed = false;
  const fail = () => {
    failed = true;
    clearTimeout(timeout);
    widget?.remove();
    status.textContent =
      "The sign-in preview could not be loaded. Please reload the page.";
  };
  const timeout = setTimeout(fail, 15000);
  for (const name of ["click", "submit", "keydown", "input", "change"]) {
    mount.addEventListener(
      name,
      (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
      },
      true
    );
  }
  try {
    widget = new OktaSignIn({
      baseUrl: "https://preview.invalid",
      useClassicEngine: true,
      language: "en",
      logo: "customer-mark.svg",
      logoText: "Customer portal",
      colors: { brand: "#4c6e9e" },
      assets: { baseUrl: "." },
      features: { autoFocus: false, rememberMe: false, registration: false }
    });
    widget.on("afterRender", () => {
      if (failed) return;
      for (const control of mount.querySelectorAll(
        "input, button, select, textarea"
      )) {
        control.disabled = true;
        control.setAttribute("aria-disabled", "true");
      }
      for (const link of mount.querySelectorAll("a")) {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
        link.setAttribute("tabindex", "-1");
      }
      clearTimeout(timeout);
      status.textContent = "Sign-in screen loaded. Authentication is disabled.";
    });
    widget.renderEl({ el: mount }).catch(fail);
  } catch {
    fail();
  }
  window.addEventListener(
    "pagehide",
    () => {
      clearTimeout(timeout);
      widget?.remove();
    },
    { once: true }
  );
})();
