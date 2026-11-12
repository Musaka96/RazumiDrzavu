# Mapa vlasti Srbije

Šema državne vlasti Srbije nacrtana kao zgrada: grane vlasti su krila, institucije su prostorije, a linije pokazuju ko koga bira i kontroliše. Uz svaku instituciju su vesti od vanrednih parlamentarnih izbora 2026, sa izvorima.

Čista statička stranica: HTML, CSS i JavaScript, bez frameworka i bez build koraka za sajt.

## Struktura

```
public/
  index.html            stranica (okvir: gornja traka, pozornica, panel)
  styles.css            izgled; svaka grana vlasti ima boju i šrafuru
  favicon.svg
  js/
    shared.js           grane, piktogrami, vodiči, slučajevi, skraćenice, prepoznavanje imena, ćirilica, opisi odnosa
    lanac.js            prikaz „Ko koga bira“ (lanac legitimiteta; nivoi se računaju iz LEGIT veza)
    nadredjenost.js     prikaz „Ko je kome nadređen“ (stabla HIER, opisi linija HIER_INFO, veze između stabala HIER_CROSS)
    nivoi.js            prikaz „Nivoi vlasti“ (pojasevi LEVELS, veze LEVEL_LINKS, opisi LEVEL_INFO)
    app.js              okvir: stanje, prekidač prikaza, panel sa karticama, istorija „Nazad“, pretraga, mobilni donji list
  data/
    institucije.js      institucije (INST) i sve veze (LINKS)
    vesti.js            vesti (EV) sa izvorima
    dopune.js           institucije, sajtovi i vesti dodati u verziji 3
    ljudi.js            ljudi (PEOPLE) i nazivi institucija (ALIASES) koji se prepoznaju u tekstu
    lokalno.js          pokrajina, Beograd, gradovi i opštine; zamenjuje staru zajedničku instituciju „lokalna“
scripts/build.mjs       provera sintakse i pravljenje dist/artifact.html (za Claude artifakt)
vercel.json             Vercel služi folder public/
```

Svaki prikaz je objekat sa `render(stage)`, `update()` i `focusCard(id)`, registrovan u `VIEWS` u `app.js`.

## Lokalno

```bash
npm run dev
```

Otvorite http://localhost:5178.

## Dodavanje vesti

U `public/data/vesti.js` (ili `dopune.js`) dodajte objekat:

```js
{d:"2026-11-12", p:"el", t:"Naslov", x:"Tekst vesti.", i:["tok","bia"], s:[["N1","https://..."],["Vreme","https://..."]]}
```

- `p`: `bg` pozadina, `el` od raspisivanja izbora, `fu` predstoji
- `i`: id-jevi prostorija iz `institucije.js` ili `dopune.js`
- `u:1` označava vest kao nepotvrđenu
- Imena iz `ljudi.js` i nazivi institucija u tekstu postaju linkovi automatski.

Posle izmene pokrenite `npm run build` da proverite sintaksu.

## Objavljivanje na Vercel

1. Gurnite repozitorijum na GitHub.
2. Na Vercelu: Add New → Project → izaberite repozitorijum. Framework preset: Other. Ništa drugo nije potrebno, jer `vercel.json` kaže da se služi `public/`.

## Napomena

Nezavisan, nezvaničan pregled. Ne koristi zvanične grbove ni znakove institucija; piktogrami su nacrtani za ovu šemu. Krivične prijave i istrage nisu presude.
