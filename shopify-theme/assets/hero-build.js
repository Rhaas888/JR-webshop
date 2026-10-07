(function () {
  var root = document.querySelector("[data-jr-build]");
  if (!root) return;

  var body = root.querySelector("[data-jr-lines]");
  if (!(body instanceof HTMLElement)) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("is-measure", "is-frames", "is-slide", "is-shop");
    return;
  }

  var LINES = [
    "const shop = createShop({",
    '  name: "JR Shop",',
    '  color: "#059b60",',
    "});",
    "",
    'shop.addProduct("Leren jas", 129);',
    'shop.addProduct("Leren tas", 64);',
    "",
    "function render(page) {",
    "  header(page);",
    '  hero("Nieuwe collectie");',
    "  grid(page.products);",
    "}",
    "",
    "render(shop.build());",
  ];

  var running = false;

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function paint(line) {
    return line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(
        /(".*?")/g,
        '<span class="v2-scene-code__str">$1</span>'
      )
      .replace(
        /\b(const|function)\b/g,
        '<span class="v2-scene-code__kw">$1</span>'
      )
      .replace(
        /\b(createShop|addProduct|render|header|hero|grid|build)\b/g,
        '<span class="v2-scene-code__fn">$1</span>'
      )
      .replace(/\b(\d+)\b/g, '<span class="v2-scene-code__num">$1</span>');
  }

  function typeLine(text) {
    return new Promise(function (resolve) {
      var row = document.createElement("div");
      row.className = "v2-scene-code__line";
      var written = document.createElement("span");
      var cursor = document.createElement("span");
      cursor.className = "v2-scene-code__cursor";
      row.appendChild(written);
      row.appendChild(cursor);
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;

      var i = 0;
      var step = function () {
        i += 1;
        written.innerHTML = paint(text.slice(0, i));
        body.scrollTop = body.scrollHeight;
        if (i < text.length) {
          window.setTimeout(step, text[i - 1] === " " ? 8 : 16);
          return;
        }
        cursor.remove();
        resolve();
      };

      if (!text) {
        cursor.remove();
        resolve();
        return;
      }
      window.setTimeout(step, 12);
    });
  }

  async function play() {
    running = true;
    while (running && document.body.contains(root)) {
      root.classList.remove("is-shop", "is-measure", "is-frames", "is-slide", "is-scroll");
      body.replaceChildren();
      await wait(220);
      var n = 0;
      while (n < LINES.length) {
        await typeLine(LINES[n]);
        n += 1;
        await wait(LINES[n - 1] ? 70 : 40);
      }
      await wait(420);
      root.classList.add("is-measure");
      await wait(1700);
      root.classList.add("is-frames");
      await wait(720);
      root.classList.add("is-slide");
      await wait(980);
      root.classList.add("is-shop");
      await wait(1400);
      root.classList.add("is-scroll");
      await wait(3800);
      root.classList.remove("is-shop", "is-measure", "is-frames", "is-slide", "is-scroll");
      await wait(700);
    }
  }

  play();
})();
