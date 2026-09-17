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
  var allowedInterest = ["webshop", "app", "onderhoud", "anders"];

  function parsePackageOptions(wrap) {
    var node = wrap.querySelector("[data-package-options]");
    if (!node) return {};
    try {
      return JSON.parse(node.textContent || "{}");
    } catch (error) {
      return {};
    }
  }

  function fillPackageSelect(wrap, interest, selectedId) {
    var field = wrap.querySelector("[data-package-field]");
    var select = wrap.querySelector("[data-package-select]");
    if (!field || !select) return;
    var packs = parsePackageOptions(wrap)[interest] || [];
    var current = (selectedId || "").toLowerCase();
    select.innerHTML = "";
    var empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "Nog niet gekozen";
    select.appendChild(empty);
    packs.forEach(function (pack) {
      var option = document.createElement("option");
      option.value = pack.id;
      option.textContent = pack.name + " (" + pack.price + ")";
      if (current && (current === pack.id || current === pack.name.toLowerCase())) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    field.hidden = packs.length === 0;
  }

  document.querySelectorAll("[data-contact-form]").forEach(function (formWrap) {
    var form = formWrap.querySelector("form");
    var interestSelect = formWrap.querySelector("[data-interest-select], [name='contact[interesse]']");
    if (interestSelect && interestParam && allowedInterest.indexOf(interestParam) !== -1) {
      interestSelect.value = interestParam;
    }
    if (formWrap.getAttribute("data-form-variant") === "offerte") {
      fillPackageSelect(formWrap, interestSelect ? interestSelect.value : "", packageParam);
      if (interestSelect) {
        interestSelect.addEventListener("change", function () {
          fillPackageSelect(formWrap, interestSelect.value, "");
        });
      }
    }
    if (!form) return;
    if (formWrap.getAttribute("data-form-variant") === "offerte") {
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
      var packageSelect = form.querySelector("[data-package-select]");
      var message = form.querySelector("[name='contact[body]']");
      if (!message) return;

      var extra = [];
      if (interest && interest.value) extra.push("Interesse: " + interest.value);
      if (company && company.value) extra.push("Bedrijf: " + company.value);
      if (budget && budget.value) extra.push("Budget: " + budget.value);
      if (timeline && timeline.value) extra.push("Planning: " + timeline.value);
      if (packageSelect && packageSelect.value) {
        var chosen = packageSelect.options[packageSelect.selectedIndex];
        extra.push("Pakket: " + (chosen ? chosen.textContent : packageSelect.value));
      } else if (packageParam) {
        extra.push("Pakket: " + packageParam);
      }
      if (extra.length) {
        message.value = extra.join("\n") + "\n\n" + message.value;
      }
    });
  });

  document.querySelectorAll("[data-pricing-switcher]").forEach(function (root) {
    var tabs = root.querySelectorAll("[data-dienst]");
    var panels = root.querySelectorAll("[data-panel]");
    var allowed = ["webshop", "app", "onderhoud"];

    function show(id, updateUrl) {
      if (allowed.indexOf(id) === -1) return;
      root.setAttribute("data-active", id);
      tabs.forEach(function (tab) {
        var on = tab.getAttribute("data-dienst") === id;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach(function (panel) {
        var on = panel.getAttribute("data-panel") === id;
        panel.classList.toggle("is-active", on);
        if (on) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      });
      if (updateUrl && window.history && window.history.replaceState) {
        var url = new URL(window.location.href);
        url.searchParams.set("dienst", id);
        history.replaceState({}, "", url.pathname + url.search + url.hash);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        show(tab.getAttribute("data-dienst"), true);
      });
      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        var list = Array.prototype.slice.call(tabs);
        var index = list.indexOf(tab);
        var next = event.key === "ArrowRight" ? index + 1 : index - 1;
        if (next < 0) next = list.length - 1;
        if (next >= list.length) next = 0;
        list[next].focus();
        show(list[next].getAttribute("data-dienst"), true);
      });
    });
  });

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

  function playHeroVideos() {
    document.querySelectorAll(".jr-showcase__video").forEach(function (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.playsInline = true;
      var attempt = video.play();
      if (attempt && attempt.catch) {
        attempt.catch(function () {});
      }
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".jr-showcase__video").forEach(function (video) {
      video.removeAttribute("autoplay");
      video.pause();
    });
  } else {
    playHeroVideos();
    document.addEventListener("DOMContentLoaded", playHeroVideos);
    window.addEventListener("pageshow", playHeroVideos);
    document.addEventListener("touchstart", playHeroVideos, { once: true, passive: true });
  }

  var bento = document.querySelector("[data-bento]");
  if (bento) {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function countTo(node, end) {
      if (!node) return;
      if (reduceMotion) {
        node.textContent = String(end);
        return;
      }
      var start = 0;
      var started = performance.now();
      var duration = 1100;
      function tick(now) {
        var t = Math.min(1, (now - started) / duration);
        var eased = 1 - Math.pow(1 - t, 3);
        node.textContent = String(Math.round(start + (end - start) * eased));
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    function revealBento() {
      bento.classList.add("is-inview");
      countTo(bento.querySelector("[data-bento-score]"), 96);
      countTo(bento.querySelector("[data-bento-growth]"), 38);
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealBento();
    } else {
      var bentoObs = new IntersectionObserver(
        function (entries) {
          if (!entries[0] || !entries[0].isIntersecting) return;
          revealBento();
          bentoObs.disconnect();
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
      );
      bentoObs.observe(bento);
    }
  }
})();
