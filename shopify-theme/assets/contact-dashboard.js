(function () {
  if (window.__jrContactBound) return;
  window.__jrContactBound = true;

  var ENDPOINT = "https://jr-intelligence-git-cursor-dashboard-crm-ui-f0c4-jr-ef47.vercel.app/api/contact";
  var ALREADY = {
    Website: "al_website",
    Webshop: "al_webshop",
    App: "al_app",
    Automatisering: "al_automatisering",
  };

  function field(form, name) {
    var node = form.elements.namedItem(name);
    if (!node) return "";
    if (node instanceof RadioNodeList) {
      return String(node.value || "").trim();
    }
    return String(node.value || "").trim();
  }

  function checkedValues(form, name) {
    var node = form.elements.namedItem(name);
    if (!node) return [];
    if (node instanceof RadioNodeList) {
      return Array.prototype.filter
        .call(node, function (input) {
          return input.checked;
        })
        .map(function (input) {
          return String(input.value);
        });
    }
    return node.checked ? [String(node.value)] : [];
  }

  function show(form, kind, text) {
    var box = form.querySelector("[data-jr-status]");
    if (!box) return;
    box.hidden = false;
    box.textContent = text;
    box.classList.toggle("is-error", kind === "error");
  }

  function syncAlready(form) {
    var looking = checkedValues(form, "zoek");
    form.querySelectorAll("[data-jr-already-item]").forEach(function (row) {
      var key = row.getAttribute("data-jr-already-item") || "";
      var on = looking.indexOf(key) !== -1;
      row.hidden = !on;
      row.querySelectorAll("input").forEach(function (input) {
        input.required = on;
        if (!on) input.checked = false;
      });
    });
  }

  function payloadFrom(form) {
    var source = form.getAttribute("data-jr-contact") || "form";
    var landcode = field(form, "landcode") || "+31";
    var first = field(form, "voornaam");
    var last = field(form, "achternaam");
    var name = [first, last].filter(Boolean).join(" ");
    var looking = checkedValues(form, "zoek");
    var already = looking.map(function (item) {
      var key = ALREADY[item];
      var value = key ? field(form, key) : "";
      return item + ": " + (value || "");
    });
    var parts = [];
    var company = field(form, "bedrijf");
    var website = field(form, "website");
    var does = field(form, "bedrijf_doet");
    var need = field(form, "moet_doen");
    var extra = field(form, "body");
    if (does) parts.push("Wat het bedrijf doet:\n" + does);
    if (need) parts.push("Wat het nieuwe moet doen:\n" + need);
    if (extra) parts.push(extra);

    return {
      source: source,
      name: name,
      email: field(form, "email"),
      phone: field(form, "phone"),
      landcode: landcode,
      subject:
        field(form, "onderwerp") ||
        (source === "callback" ? "Terugbellen" : looking.join(", ")),
      message:
        source === "offerte"
          ? parts.join("\n\n")
          : extra || (source === "callback" ? "Graag terugbellen." : ""),
      company: company,
      website: website,
      looking: looking,
      already: already,
      company_url: field(form, "company_url"),
    };
  }

  async function send(form) {
    var button = form.querySelector("button[type='submit']");
    var data = payloadFrom(form);
    if (data.source === "callback" && !data.phone) {
      show(form, "error", "Vul je telefoonnummer in.");
      return;
    }
    if (data.source === "form" && !data.email) {
      show(form, "error", "Vul je e-mailadres in.");
      return;
    }
    if (data.source === "offerte") {
      if (!data.email) {
        show(form, "error", "Vul je e-mailadres in.");
        return;
      }
      if (!data.looking.length) {
        show(form, "error", "Kies wat je zoekt.");
        return;
      }
      var missing = data.already.some(function (line) {
        return /: $/.test(line);
      });
      if (missing) {
        show(form, "error", "Zeg bij elke keuze of je het al hebt.");
        return;
      }
    }
    if (button) button.disabled = true;
    try {
      var response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      var result = {};
      try {
        result = await response.json();
      } catch (error) {
        result = {};
      }
      if (!response.ok || result.ok === false) {
        show(form, "error", result.message || "Versturen lukte niet. Probeer het opnieuw.");
        return;
      }
      form.reset();
      syncAlready(form);
      var thanks = "Verstuurd. We reageren zo snel mogelijk.";
      if (data.source === "callback") thanks = "Top. We bellen je zo terug.";
      if (data.source === "offerte") thanks = "Binnen 1 werkdag hoor je van ons.";
      show(form, "ok", thanks);
    } catch (error) {
      show(form, "error", "Versturen lukte niet. Probeer het opnieuw.");
    } finally {
      if (button) button.disabled = false;
    }
  }

  document.addEventListener("change", function (event) {
    var input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    if (input.name !== "zoek") return;
    if (!(input.form instanceof HTMLFormElement)) return;
    syncAlready(input.form);
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.hasAttribute("data-jr-contact")) return;
    event.preventDefault();
    void send(form);
  });
})();
