(function () {
  var header = document.querySelector("[data-header]");
  if (!header) return;

  var button = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-menu]");
  if (!button || !menu) return;

  var setOpen = function (open) {
    menu.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("menu-open", open);
  };

  button.addEventListener("click", function () {
    setOpen(!menu.classList.contains("is-open"));
  });

  menu.querySelectorAll("[data-menu-close]").forEach(function (node) {
    node.addEventListener("click", function () {
      setOpen(false);
    });
  });

  var toggle = document.querySelector("[data-services-toggle]");
  var panel = document.querySelector("[data-services-panel]");
  if (!toggle || !panel) return;

  var closeTimer = null;

  var showServices = function () {
    if (closeTimer) window.clearTimeout(closeTimer);
    panel.classList.add("is-open");
    panel.inert = false;
    toggle.setAttribute("aria-expanded", "true");
  };

  var hideServices = function () {
    if (closeTimer) window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(closeServices, 160);
  };

  var closeServices = function () {
    if (closeTimer) window.clearTimeout(closeTimer);
    panel.classList.remove("is-open");
    panel.inert = true;
    toggle.setAttribute("aria-expanded", "false");
  };

  panel.inert = true;
  toggle.addEventListener("mouseenter", showServices);
  toggle.addEventListener("focus", showServices);
  toggle.addEventListener("click", function () {
    if (panel.classList.contains("is-open")) closeServices();
    else showServices();
  });
  panel.addEventListener("mouseenter", showServices);
  panel.addEventListener("mouseleave", hideServices);
  header.addEventListener("mouseleave", hideServices);
  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeServices();
  });
})();
