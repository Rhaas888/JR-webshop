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

  var params = new URLSearchParams(window.location.search);
  var interestParam = params.get("interesse");
  var packageParam = params.get("pakket");
  var interestSelect = document.querySelector("[name='contact[interesse]']");
  if (interestSelect && interestParam) {
    var allowed = ["webshop", "app", "onderhoud", "anders"];
    if (allowed.indexOf(interestParam) !== -1) interestSelect.value = interestParam;
  }

  var formWrap = document.querySelector("[data-contact-form]");
  var form = formWrap && formWrap.querySelector("form");
  if (form) {
    if (document.body.classList.contains("template-page-offerte")) {
      var action = form.getAttribute("action") || window.location.pathname;
      if (action.indexOf("view=offerte") === -1) {
        form.setAttribute(
          "action",
          action + (action.indexOf("?") === -1 ? "?" : "&") + "view=offerte"
        );
      }
    }
    form.addEventListener("submit", function () {
      var interest = form.querySelector("[name='contact[interesse]']");
      var company = form.querySelector("[name='contact[bedrijf]']");
      var budget = form.querySelector("[name='contact[budget]']");
      var timeline = form.querySelector("[name='contact[planning]']");
      var message = form.querySelector("[name='contact[body]']");
      if (!message) return;

      var extra = [];
      if (interest && interest.value) extra.push("Interesse: " + interest.value);
      if (company && company.value) extra.push("Bedrijf: " + company.value);
      if (budget && budget.value) extra.push("Budget: " + budget.value);
      if (timeline && timeline.value) extra.push("Planning: " + timeline.value);
      if (packageParam) extra.push("Pakket: " + packageParam);
      if (extra.length) {
        message.value = extra.join("\n") + "\n\n" + message.value;
      }
    });
  }

  var process = document.querySelector("[data-process]");
  if (process) {
    var fill = process.querySelector("[data-process-fill]");
    var car = process.querySelector("[data-process-car]");
    var steps = process.querySelectorAll("[data-process-step]");
    var reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function updateProcess() {
      var rect = process.getBoundingClientRect();
      var viewport = window.innerHeight;
      var start = viewport * 0.28;
      var distance = Math.max(rect.height - viewport * 0.36, 1);
      var raw = (start - rect.top) / distance;
      var next = reduce ? 1 : Math.min(1, Math.max(0, raw));
      var active = Math.min(steps.length - 1, Math.floor(next * steps.length + 0.01));
      if (fill) fill.style.height = "calc(" + next * 100 + "% - 8px)";
      if (car) car.style.top = "calc(" + next * 100 + "% - 40px)";
      steps.forEach(function (step, index) {
        step.classList.toggle("is-active", index <= active);
      });
    }

    window.addEventListener("scroll", updateProcess, { passive: true });
    window.addEventListener("resize", updateProcess);
    if (window.requestAnimationFrame) window.requestAnimationFrame(updateProcess);
    else updateProcess();
  }

  document.querySelectorAll("[data-review-grid]").forEach(function (grid) {
    var limit = Number(grid.getAttribute("data-review-limit") || "0");
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".jr-review-card"));
    if (limit > 0) {
      cards.forEach(function (card, index) {
        if (index >= limit) card.hidden = true;
      });
    }

    var filters = grid.parentElement.querySelector("[data-review-filters]");
    if (!filters) return;
    filters.addEventListener("click", function (event) {
      var button = event.target.closest("[data-review-filter]");
      if (!button) return;
      var topic = button.getAttribute("data-review-filter");
      filters.querySelectorAll("button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      cards.forEach(function (card) {
        var match = topic === "all" || card.getAttribute("data-topic") === topic;
        card.hidden = !match;
      });
    });
  });
})();
