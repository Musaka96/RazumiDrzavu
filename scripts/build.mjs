// Proverava sintaksu skripti i pravi dist/artifact.html: jednu stranicu bez <html>/<head>,
// sa ugrađenim CSS-om i JS-om, za objavljivanje kao Claude artifakt.
// Vercel ne koristi ovaj fajl; on služi folder public/ direktno.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => readFileSync(join(root, "public", p), "utf8");

const index = pub("index.html");
const scripts = [...index.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
// Slike iz slike.js (f:"img/...") ugrađuju se kao data URI, da artifakt radi kao jedan fajl.
// Ista slika se ugrađuje jednom (IMG_DATA), a unosi je referišu. Fajl koji nedostaje ostaje putanja, uz upozorenje.
const MIME = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", svg: "image/svg+xml", webp: "image/webp", gif: "image/gif" };
function inlineImages(src) {
  const data = {};
  const out = src.replace(/\bf:"([^"]+)"/g, (m, f) => {
    const file = join(root, "public", f);
    const mime = MIME[f.split(".").pop().toLowerCase()];
    if (!mime || !existsSync(file)) { console.warn(`upozorenje: slika ${f} ne postoji ili nije podržana; ostaje putanja`); return m; }
    if (!(f in data)) data[f] = `data:${mime};base64,${readFileSync(file).toString("base64")}`;
    return `f:IMG_DATA[${JSON.stringify(f)}]`;
  });
  const n = Object.keys(data).length;
  if (n) console.log(`slike: ${n} ugrađeno (${(Object.values(data).join("").length / 1024).toFixed(0)} KB)`);
  return `const IMG_DATA=${JSON.stringify(data)};\n${out}`;
}
const js = scripts.map((s) => `/* ${s} */\n${s === "data/slike.js" ? inlineImages(pub(s)) : pub(s)}`).join("\n");

new Function(js); // baca grešku ako sintaksa nije ispravna

const head = index.slice(index.indexOf("<head>") + 6, index.indexOf("</head>"));
const keep = head
  .split("\n")
  .filter((l) => /<title>|claude:viewport|fonts\.g/.test(l))
  .join("\n");
const body = index.slice(index.indexOf("<!--BODY-->") + 11, index.indexOf("<!--/BODY-->")).trim();

const out = `${keep}\n<style>\n${pub("styles.css")}</style>\n${body}\n<script>\n${js}</script>\n`;
mkdirSync(join(root, "dist"), { recursive: true });
writeFileSync(join(root, "dist", "artifact.html"), out);
console.log(`ok: ${scripts.length} skripti, dist/artifact.html ${(out.length / 1024).toFixed(0)} KB`);
