(function () {
  var toggle = document.querySelector("[data-menu-toggle]");
  var drawer = document.querySelector("[data-menu]");
  var closeButtons = document.querySelectorAll("[data-menu-close]");

  function openMenu() {
    if (!drawer) return;
    drawer.classList.add("is-open");
    document.body.classList.add("menu-open");
    toggle && toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    toggle && toggle.setAttribute("aria-expanded", "false");
  }

  toggle &&
    toggle.addEventListener("click", function () {
      if (drawer && drawer.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

  closeButtons.forEach(function (button) {
    button.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  var header = document.querySelector("[data-header]");
  if (header) {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:12px;pointer-events:none;";
    document.body.insertBefore(sentinel, document.body.firstChild);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
        },
        { threshold: 0 }
      );
      observer.observe(sentinel);
    } else {
      function onHeaderScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop || 0;
        header.classList.toggle("is-scrolled", y > 12);
      }
      onHeaderScroll();
      document.addEventListener("scroll", onHeaderScroll, { passive: true });
    }
  }

  var formWrap = document.querySelector("[data-contact-form]");
  var form = formWrap && formWrap.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function () {
    var interest = form.querySelector("[name='contact[interesse]']");
    var company = form.querySelector("[name='contact[bedrijf]']");
    var message = form.querySelector("[name='contact[body]']");
    if (!message) return;

    var extra = [];
    if (interest && interest.value) extra.push("Interesse: " + interest.value);
    if (company && company.value) extra.push("Bedrijf: " + company.value);
    if (extra.length) {
      message.value = extra.join("\n") + "\n\n" + message.value;
    }
  });
})();
