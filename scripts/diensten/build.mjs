import * as esbuild from "esbuild"
import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import prefixer from "postcss-prefix-selector"

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.resolve(here, "../..")
const source = fs.realpathSync(process.env.JR_DIENSTEN_SOURCE || "/tmp/JRdiensten")
const themeAssets = path.join(repo, "shopify-theme/assets")
const snippetPath = path.join(repo, "shopify-theme/snippets/diensten-assets.liquid")
const assetPattern = /\/(?:webshop|app|automation)\/[^"'`)\]\s]+/

if (!fs.existsSync(path.join(source, "components/service-detail.tsx"))) {
  throw new Error(`Bron niet gevonden: ${source}`)
}

function rewriteAssets(code) {
  return code
    .replace(
      /(["'])url\((\/(?:webshop|app|automation)\/[^)"']+)\)\1/g,
      '"url(" + __jrAsset("$2") + ")"',
    )
    .replace(
      /(^|[\s{\(])(src|href)=(["'])(\/(?:webshop|app|automation)\/[^"']+)\3/g,
      '$1$2={__jrAsset("$4")}',
    )
    .replace(
      /(?<!__jrAsset\()(["'])(\/(?:webshop|app|automation)\/[^"']+)\1/g,
      '__jrAsset("$2")',
    )
}

const assetPlugin = {
  name: "jr-assets",
  setup(build) {
    build.onLoad({ filter: /\.[cm]?[jt]sx?$/ }, (args) => {
      if (!args.path.startsWith(source)) return null
      const code = rewriteAssets(fs.readFileSync(args.path, "utf8"))
      const loader = args.path.endsWith("tsx") || args.path.endsWith("jsx") ? "tsx" : "ts"
      return { contents: code, loader }
    })
  },
}

await esbuild.build({
  entryPoints: [path.join(here, "entry.tsx")],
  outfile: path.join(themeAssets, "diensten-app.js"),
  bundle: true,
  format: "iife",
  platform: "browser",
  target: "es2020",
  jsx: "automatic",
  minify: true,
  legalComments: "none",
  nodePaths: [path.join(here, "node_modules")],
  alias: {
    "@/components/ui/button": path.join(here, "shims/button.tsx"),
    "@": source,
    "next/link": path.join(here, "shims/link.tsx"),
    "next/navigation": path.join(here, "shims/navigation.ts"),
    cn: path.join(here, "shims/cn.ts"),
  },
  plugins: [assetPlugin],
  banner: {
    js: "function __jrAsset(p){var m=window.__jrFiles;return (m&&m[p])||p;}",
  },
})

const js = fs.readFileSync(path.join(themeAssets, "diensten-app.js"), "utf8")
const used = [...js.matchAll(/__jrAsset\("(\/[^"]+)"\)/g)].map((match) => match[1])
const unique = [...new Set(used)].sort()
if (unique.length === 0) throw new Error("Geen afbeeldingen in de bundle gevonden")

const copied = []
for (const assetPath of unique) {
  const relative = assetPath.replace(/^\//, "")
  const from = path.join(source, "public", relative)
  if (!fs.existsSync(from)) throw new Error(`Afbeelding ontbreekt: ${from}`)
  const name = `jrds-${relative.replaceAll("/", "-")}`
  fs.copyFileSync(from, path.join(themeAssets, name))
  copied.push({ assetPath, name })
}

const lines = copied.map(
  (file) => `    ${JSON.stringify(file.assetPath)}: {{ '${file.name}' | asset_url | json }}`,
)
fs.writeFileSync(
  snippetPath,
  `<script>\n  window.__jrFiles = {\n${lines.join(",\n")}\n  };\n</script>\n`,
)

const globals = fs.readFileSync(path.join(source, "app/globals.css"), "utf8")
const animations = globals.slice(globals.indexOf("@keyframes hero-in"))
const inputCss = `
@import "tailwindcss/theme.css";
@import "tailwindcss/utilities.css";
@source "${source}/components";
@source "${source}/lib";
@source "${here}/shims";
@source "${here}/entry.tsx";
@source "${here}/overview.tsx";
@theme {
  --color-brand: #16a34a;
  --color-brand-dark: #128a3e;
  --color-ink: #141414;
  --color-paper: #f6f6f4;
  --color-mist: #5e5e5e;
  --color-border: #e4e4df;
  --color-ring: #16a34a;
  --color-background: #f6f6f4;
  --color-foreground: #141414;
  --color-primary: #16a34a;
  --color-primary-foreground: #ffffff;
  --color-muted: #efefeb;
  --color-muted-foreground: #5e5e5e;
  --color-destructive: #e11d48;
  --color-secondary: #ffffff;
  --color-secondary-foreground: #141414;
  --color-accent: #eef8f1;
  --color-accent-foreground: #128a3e;
  --color-input: #e4e4df;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.625rem;
  --radius-xl: 0.875rem;
  --radius-2xl: 1.125rem;
}
`
const inputPath = path.join(here, ".input.css")
fs.writeFileSync(inputPath, inputCss)
const rawCss = execFileSync(
  path.join(here, "node_modules/.bin/tailwindcss"),
  ["-i", inputPath, "-o", path.join(here, ".utilities.css"), "--minify"],
  { encoding: "utf8" },
)
void rawCss
const utilities = fs.readFileSync(path.join(here, ".utilities.css"), "utf8")
const prefixed = await postcss([
  prefixer({
    prefix: ".jr-diensten",
    transform(prefix, selector, prefixedSelector) {
      if (selector.startsWith(".jr-diensten")) return selector
      if (selector === ":root" || selector === "html" || selector === "body") return prefix
      return prefixedSelector
    },
  }),
]).process(`${utilities}\n${animations}`, { from: undefined })

const reset = `
@font-face {
  font-family: Geist;
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("geist-latin.woff2") format("woff2");
}
.jr-diensten {
  background: #f6f6f4;
  color: #141414;
  font-family: Geist, Inter, ui-sans-serif, system-ui, sans-serif;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
body:has(.jr-diensten) {
  background: #f6f6f4;
}
.jr-diensten :where(h1, h2, h3, h4, h5, h6, p, ul, ol, figure, blockquote) {
  margin: 0;
  font-size: inherit;
  font-weight: inherit;
}
.jr-diensten :where(ul, ol) {
  list-style: none;
  padding: 0;
}
.jr-diensten :where(button, input, textarea, select) {
  font: inherit;
  color: inherit;
  background: transparent;
  border: 0;
  padding: 0;
  margin: 0;
}
.jr-diensten :where(img, video) {
  max-width: 100%;
}
.jr-diensten :where(a) {
  color: inherit;
  text-decoration: none;
}
`
fs.writeFileSync(path.join(themeAssets, "diensten-app.css"), `${reset}\n${prefixed.css}`)
fs.rmSync(inputPath, { force: true })
fs.rmSync(path.join(here, ".utilities.css"), { force: true })

const css = fs.readFileSync(path.join(themeAssets, "diensten-app.css"), "utf8")
for (const name of ["hero-in", "drift-glow", "shop-page", "aura-scene", "checkout-reel", "bg-brand"]) {
  if (!css.includes(name)) throw new Error(`CSS mist ${name}`)
}
for (const phrase of ["Webshop bouwen", "Open de bouwer", "Vraag een offerte", "Automatisering bouwen", "Zet het scherm in elkaar"]) {
  if (!js.includes(phrase)) throw new Error(`Bundle mist ${phrase}`)
}
if (assetPattern.test("")) void assetPattern
console.log(`bundle ${js.length} css ${css.length} images ${copied.length}`)
