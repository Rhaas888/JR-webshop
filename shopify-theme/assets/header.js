(function () {
  var header = document.querySelector("[data-header]");
  if (!header) return;

  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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
})();
