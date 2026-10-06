(function () {
  if (window.__jrContactBound) return;
  window.__jrContactBound = true;

  var ENDPOINT = "https://jr-intelligence-git-cursor-dashboard-crm-ui-f0c4-jr-ef47.vercel.app/api/contact";

  function field(form, name) {
    var node = form.elements.namedItem(name);
    if (!node) return "";
    return String(node.value || "").trim();
  }

  function show(form, kind, text) {
    var box = form.querySelector("[data-jr-status]");
    if (!box) return;
    box.hidden = false;
    box.textContent = text;
    box.classList.toggle("is-error", kind === "error");
  }

  function payloadFrom(form) {
    var source = form.getAttribute("data-jr-contact") || "form";
    var landcode = field(form, "landcode") || "+31";
    var first = field(form, "voornaam");
    var last = field(form, "achternaam");
    var name = [first, last].filter(Boolean).join(" ");
    return {
      source: source,
      name: name,
      email: field(form, "email"),
      phone: field(form, "phone"),
      landcode: landcode,
      subject: field(form, "onderwerp") || (source === "callback" ? "Terugbellen" : ""),
      message: field(form, "body") || (source === "callback" ? "Graag terugbellen." : ""),
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
      show(
        form,
        "ok",
        data.source === "callback" ? "Top. We bellen je zo terug." : "Verstuurd. We reageren zo snel mogelijk.",
      );
    } catch (error) {
      show(form, "error", "Versturen lukte niet. Probeer het opnieuw.");
    } finally {
      if (button) button.disabled = false;
    }
  }

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    if (!form.hasAttribute("data-jr-contact")) return;
    event.preventDefault();
    void send(form);
  });
})();
