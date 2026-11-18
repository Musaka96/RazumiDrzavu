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
    mehanizmi.js        mehanizmi (MECH): koraci, ishodi, kontrola i vesti u kojima su korišćeni
    slike.js            portreti (IMG.p, po id osobe) i grbovi/znakovi (IMG.i, po id institucije), sa autorom, licencom i linkom na Commons
  img/
    ljudi/              portreti sa Wikimedia Commons (male sličice)
    grbovi/             grbovi i znakovi; _srbija.png je mali grb Srbije za organe bez sopstvenog znaka
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

## Dodavanje mehanizma

Mehanizmi (hapšenje, pritvor, pomilovanje, mere REM-a…) su u `public/data/mehanizmi.js`, u nizu `MECH`. Panel mehanizma prikazuje opis, dijagram toka, ishode i vesti u kojima je korišćen; adresa je `#meh-<id>`.

```js
{id:"pritvor", n:"Pritvor i blaže mere", b:"jud", inst:["osnovni","tok"],
 sum:"Jedna rečenica o tome šta mehanizam radi.", basis:"ZKP, čl. 188–223",
 steps:[{a:"tuzilastva", w:"Javni tužilac", t:"Predlog za pritvor", d:"Objašnjenje koraka.", r:"do 30 dana"}],
 ends:[["Ishod","Opis ishoda."]], checks:["Ko i kako kontroliše."], path:"krivicni",
 ev:["Uhapšen vlasnik Alta banke"]}
```

- `b`: grana vlasti (boja panela), kao kod institucija
- `inst`: institucije kojima je mehanizam bitan; mehanizam se prikazuje i kod svake institucije koja je akter u nekom koraku
- `steps`: koraci dijagrama; `a` je id institucije ili `null` (akter van institucija, npr. osuđeni), `w` preciznije ime aktera, `t` naslov, `d` opis, `r` rok ili trajanje (nije obavezno; prikazuje se na spojnici pred korakom)
- `ends`: mogući ishodi `[naslov, opis]`, na dnu dijagrama
- `checks`: ko kontroliše primenu mehanizma
- `path`: id šireg vodiča iz `PATHS` u `shared.js` (nije obavezno)
- `ev`: delovi naslova vesti (bez obzira na velika i mala slova) u kojima je mehanizam korišćen; vest čiji naslov sadrži neki od njih dobija čip „Mehanizam“

## Objavljivanje na Vercel

1. Gurnite repozitorijum na GitHub.
2. Na Vercelu: Add New → Project → izaberite repozitorijum. Framework preset: Other. Ništa drugo nije potrebno, jer `vercel.json` kaže da se služi `public/`.

## Napomena

Nezavisan, nezvaničan pregled. Grbovi, znakovi institucija i portreti (`public/img/`) preuzeti su sa Wikimedia Commons, pod slobodnim licencama ili kao javno dobro; autor, licenca i link na fajl su u `public/data/slike.js` i prikazuju se ispod svake slike. Piktogrami su nacrtani za ovu šemu. Krivične prijave i istrage nisu presude.
