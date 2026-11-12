// Proverava sintaksu skripti i pravi dist/artifact.html: jednu stranicu bez <html>/<head>,
// sa ugrađenim CSS-om i JS-om, za objavljivanje kao Claude artifakt.
// Vercel ne koristi ovaj fajl; on služi folder public/ direktno.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p) => readFileSync(join(root, "public", p), "utf8");

const index = pub("index.html");
const scripts = [...index.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => m[1]);
const js = scripts.map((s) => `/* ${s} */\n${pub(s)}`).join("\n");

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
