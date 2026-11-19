# Automatsko ažuriranje vesti

Uputstvo za agenta koji više puta dnevno, bez nadzora, ažurira Mapu vlasti Srbije. Isto uputstvo važi i za ručno pokretanje („uradi ažuriranje po docs/azuriranje-vesti.md“).

Sajt je javan i politički osetljiv. Tačnost je važnija od brzine: bolje je propustiti vest do sledećeg pokretanja nego objaviti netačnu.

## 1. Pripremi se

1. `git pull --rebase origin main`. Neko je možda u međuvremenu menjao fajlove.
2. Pročitaj zaglavlje i poslednjih tridesetak redova `public/data/vesti.js`, pa `STATE` u `public/js/app.js`. Tako znaš šta je već zabeleženo i dokle se stiglo („Stanje DD. MM. YYYY.“).
3. Pogledaj `p:"fu"` stavke (predstojeći događaji i rokovi). One ti govore šta treba posebno proveriti.

## 2. Nađi nove vesti

Traži događaje od datuma poslednjeg stanja do danas: Narodna skupština, Vlada, predsednik Republike, RIK, sudovi i tužilaštva (TOK, VJT, VST), MUP i BIA, REM, NBS, lokalne vlasti Beograda i Novog Sada, EU i studenti. Teme su one koje sajt već prati.

Izvori, redom pouzdanosti:
- zvanični: parlament.gov.rs, srbija.gov.rs, rik.parlament.gov.rs, sajtovi tužilaštava i ministarstava;
- agencije i ozbiljni mediji: Tanjug, Beta, FoNet, N1, Danas, Vreme, Nova, RTS, Slobodna Evropa, BIRN, Insajder, Kurir, Novosti, B92, 021, Al Jazeera, Reuters, AP.

Pravila:
- Vest se unosi samo ako je potvrđuju **najmanje dva nezavisna izvora** ili jedan zvanični. Ako postoji samo jedan medijski izvor ili se izvori razlikuju, unesi je sa `u:1` (nepotvrđeno) ili sačekaj.
- Ne unosi glasine, najave „iz izvora bliskih…“, saopštenja stranaka bez činjenica ni komentare.
- Ne dupliraj: pre unosa proveri da ista stvar već nije u `vesti.js` ili `dopune.js`. Ako jeste, dopuni postojeću stavku (nov podatak, nov izvor) umesto da praviš novu.
- Ako nema ničeg novog i važnog, ne menjaj ništa i ne pravi commit.

## 3. Upiši

### public/data/vesti.js

Svaka vest je jedan red u nizu `EV`:

```js
{d:"2026-11-20",p:"el",t:"Naslov",x:"Tekst vesti.",i:["skupstina","vlada"],s:[["N1","https://..."],["Danas","https://..."]]},
```

- `d`: datum događaja (ne objave), ISO format.
- `p`: `el` za događaje od raspisivanja izbora naovamo; `fu` za ono što tek predstoji (rok, zakazana sednica).
- `t`: kratak, činjenični naslov, bez navodnika i senzacije.
- `x`: jedna do tri rečenice. Ko, šta, kada i po kom osnovu. Neutralno.
- `i`: id-jevi institucija iz `public/data/institucije.js` i `dopune.js` (`INST`). Koristi samo id-jeve koji postoje; proveri grep-om.
- `s`: izvori kao `[naziv, url]`. URL mora biti stvarna adresa članka koju si otvorio.
- `u:1`: dodaj kada je vest nepotvrđena.

Redosled: stavke idu hronološki. Nove `el` stavke stavi posle poslednje `el` stavke, a pre `fu` stavki. Kada se `fu` događaj desi, pretvori ga u `el` stavku sa stvarnim ishodom i izvorima. Kada rok istekne bez događaja, ažuriraj tekst `fu` stavke.

Jezik: srpski, latinica, ekavica, pravopis kao u postojećim stavkama. Datumi u tekstu: „19. 11.“ ili „19. 11. 2026.“.

Pretpostavka nevinosti: prijava, hapšenje, zadržavanje i optužnica nisu presuda. Piši „osumnjičen“, „okrivljen“, „prema navodima tužilaštva“. Inicijali umesto punog imena kada ih koriste i izvori (maloletnici, žrtve, policajci koje tužilaštvo navodi inicijalima).

### Datum stanja

Kada uneseš bar jednu vest, ažuriraj datum na tri mesta:
- prvi red `public/data/vesti.js`: `/* … Stanje: DD. MM. YYYY. */`;
- `public/index.html`: „Stanje DD. MM. YYYY.“ u zaglavlju i „zaključno sa DD. MM. YYYY“ u napomeni.

### Ko je na kojoj funkciji

Kada se promeni nosilac funkcije (izbor, imenovanje, ostavka, smrt), ažuriraj i:
- `public/data/institucije.js` ili `dopune.js`: `head` (pun opis) i `short` (kratko ime) te institucije;
- `public/data/ljudi.js` (`PEOPLE`): `role` i `desc` te osobe;
- `public/data/poslanici.js` (`MP_LIST`): `fn` i `prev` ako je osoba narodni poslanik;
- `STATE` u `public/js/app.js`: pločice stanja ako pominju tu funkciju;
- `public/js/skupstina.js`: `SK_STEPS` (koraci posle izbora) kada se korak završi ili postane tekući.

Nova osoba koja se pominje u vestima dobija unos u `PEOPLE`: `{id, n, m, room, role, desc}`. `m` je regex u template literalu. Pazi: unutar template literala `\s` mora biti napisano kao `\\s`, a `${L}` znači `\\p{L}`. Proveri da novi regex ne hvata nekog drugog (npr. dve osobe istog prezimena).

Mehanizmi: ako vest ilustruje postojeći mehanizam iz `public/data/mehanizmi.js` (hapšenje, pritvor…), dodaj deo naslova vesti u njegov niz `ev`.

## 4. Proveri

1. `node scripts/build.mjs` mora da prođe bez greške. Poruke `upozorenje: slika …` nisu greške.
2. `node -e` provera da svaki id u `i` postoji u `INST` nije obavezna, ali grep pre unosa jeste.
3. Pregledaj `git diff`: samo nameravane izmene, nijedan obrisan red osim onih koje si svesno zamenio.

## 5. Objavi

Commit na `main`, poruka u stilu repozitorijuma:

```
Vesti 20. 11. 2026: kratak opis najvažnijeg

Co-Authored-By: Claude <noreply@anthropic.com>
```

Pa `git push origin main`. Vercel objavljuje sajt automatski. Ako push bude odbijen zbog novih izmena na serveru, uradi `git pull --rebase` i pokušaj ponovo. Ako je push na `main` zabranjen, gurni granu `vesti/DD-MM` i to navedi u obaveštenju.

## 6. Velike vesti: obavesti vlasnika

Velika vest se i dalje upisuje automatski kao i ostale. Pored toga vlasnik dobija obaveštenje i odlučuje da li sajt treba promeniti više od jedne vesti.

Velike vesti su, na primer:
- raspisani ili održani izbori, rezultati, ponovljeni izbori;
- izbor, ostavka ili smena predsednika Republike, predsednika Vlade, Vlade ili predsednika Skupštine;
- predlog mandatara i izbor nove Vlade, novi ministri;
- hapšenje ili optužnica protiv ministra, poslanika, sudije, tužioca ili šefa službe;
- odluka Ustavnog suda o zakonu ili izborima; vanredno stanje; nasilje na protestima sa povređenima;
- nova institucija, ukinuta institucija, promena zakona koja menja ko koga bira;
- sve što bi tražilo novu prostoriju, novu vezu ili nov prikaz na mapi.

Kanal i adresa za obaveštenje navedeni su u zadatku koji pokreće ažuriranje (adresa namerno nije u ovom javnom fajlu). Ako kanal nije dostupan, napiši obaveštenje na kraju svog izveštaja i počni ga sa „VAŽNO:“.

Obaveštenje sadrži: šta se desilo (jedna rečenica), šta je već upisano, i konkretan predlog šta još može da se uradi (npr. „dodati novu Vladu u prikaz Skupštine“, „nova institucija X“), sa izvorima. Ne pravi te veće izmene sam; sačekaj odgovor vlasnika.

## 7. Šta nikad ne radiš

- Ne briši postojeće vesti i ne menjaj im smisao bez novog izvora.
- Ne menjaj kod prikaza (`public/js/*`, osim `STATE` i `SK_STEPS`), stilove ni strukturu podataka.
- Ne dodaj institucije, veze (`LINKS`) ni nove prikaze bez odobrenja.
- Ne objavljuj ništa van ovog repozitorijuma osim obaveštenja vlasniku.
