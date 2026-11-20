/* Mehanizmi: kako država koristi svoja ovlašćenja, korak po korak.
   Prikaz je pojednostavljen; merodavan je tekst zakona.

   Polja:
   id, n (naziv), b (grana za boju), inst (institucije kojima je ovo bitan mehanizam),
   sum (jedna rečenica), basis (pravni osnov),
   steps: {a: id institucije ili null, w: naziv aktera ako nije institucija ili treba preciznije,
           t: šta se dešava, d: objašnjenje, r: rok ili trajanje (nije obavezno)},
   ends: mogući ishodi [naziv, opis], checks: ko i kako kontroliše,
   path: id vodiča ako postoji širi vodič,
   ev: delovi naslova vesti u kojima je mehanizam korišćen. */
const MECH=[
 /* ---------- Krivični postupak ---------- */
 {id:"zadrzavanje",n:"Hapšenje i zadržavanje do 48 sati",b:"pro",inst:["mup","tok","vjtbg","tuzilastva","vjt"],
  sum:"Policija lišava slobode osumnjičenog po nalogu tužioca ili kad ga zatekne; tužilac ga može zadržati najduže 48 sati, pa ga pušta ili traži pritvor od suda.",
  basis:"Zakonik o krivičnom postupku (ZKP), čl. 291–294",
  steps:[
   {a:"tuzilastva",w:"Javni tužilac",t:"Nalog za hapšenje",d:"Tužilaštvo koje vodi predmet (osnovno, više, TOK ili posebno odeljenje) nalaže policiji da liši slobode osumnjičenog. Policija to može uraditi i sama kad postoje osnovi sumnje, ali ga mora odmah sprovesti tužiocu."},
   {a:"mup",w:"Policija",t:"Lišenje slobode",d:"Osumnjičenom se odmah saopštavaju razlozi i prava: da ćuti, da ima branioca, da o hapšenju obavesti porodicu.",r:"odmah"},
   {a:"tuzilastva",w:"Javni tužilac",t:"Saslušanje i rešenje o zadržavanju",d:"Tužilac sasluša osumnjičenog uz branioca, koji je u ovoj fazi obavezan, i rešenjem ga može zadržati.",r:"najduže 48 h"},
   {a:"osnovni",w:"Sudija za prethodni postupak",t:"Žalba na zadržavanje",d:"Osumnjičeni i branilac mogu se žaliti sudiji, koji o tome hitno odlučuje.",r:"žalba za 6 h, odluka za 4 h"}],
  ends:[["Puštanje na slobodu","Ako nema razloga za pritvor, osumnjičeni se pušta; postupak može da se nastavi."],["Predlog za pritvor","Tužilac traži od suda pritvor ili blažu meru (vidi mehanizam „Pritvor“)."]],
  checks:["Sudija za prethodni postupak odlučuje o žalbi.","Branilac je obavezan od prvog saslušanja zadržanog.","Pretpostavka nevinosti važi do pravnosnažne presude."],
  ev:["Uhapšeni načelnik UKP","Uhapšen vlasnik Alta banke","Uhapšen komandant SAJ","Uhapšen bivši ministar Rade Basta","Uhapšen pokrajinski sekretar","Nalozi za hapšenje vlasnika","Uhapšeni dekan","TOK: uhapšeno šest osoba"]},

 {id:"pritvor",n:"Pritvor i blaže mere",b:"jud",inst:["osnovni","apelacioni","tok","vjtbg","tuzilastva"],
  sum:"Sud na predlog tužioca može odrediti pritvor ako postoji opasnost od bekstva, uticaja na svedoke ili ponavljanja dela; pre toga mora razmotriti blaže mere.",
  basis:"ZKP, čl. 188–223",
  steps:[
   {a:"tuzilastva",w:"Javni tužilac",t:"Predlog za pritvor",d:"Tužilac obrazlaže zakonski razlog: bekstvo, uništavanje dokaza ili uticaj na svedoke, ponavljanje dela, ili, kod najtežih dela, uznemirenje javnosti."},
   {a:"osnovni",w:"Sudija za prethodni postupak",t:"Ročište i rešenje",d:"Sudija sasluša osumnjičenog i branioca i rešenjem određuje pritvor ili blažu meru: zabranu prilaska, zabranu napuštanja boravišta, jemstvo ili zabranu napuštanja stana uz elektronski nadzor."},
   {a:"osnovni",w:"Veće istog suda",t:"Žalba",d:"O žalbi odlučuje veće; žalba ne odlaže pritvor.",r:"odluka o žalbi za 48 h"},
   {a:"osnovni",w:"Sudija za prethodni postupak",t:"Provera i zadržavanje",d:"Sudija na predlog tužioca može zadržati okrivljenog u pritvoru, uz obaveznu proveru razloga svakih 30 dana.",r:"provera svakih 30 dana, najviše 3 meseca"},
   {a:"apelacioni",w:"Veće višeg suda",t:"Dalje produženje",d:"Za dela sa propisanom kaznom većom od pet godina veće neposredno višeg suda može pritvor produžiti još najviše tri meseca.",r:"+3 meseca, ukupno 6"}],
  ends:[["Ukidanje pritvora","Čim prestanu razlozi, pritvor se ukida; tada se može odrediti blaža mera. Ako optužnica ne bude podignuta u roku, okrivljeni se pušta."],["Optužnica","Pošto je podignuta optužnica, o pritvoru odlučuje sud koji sudi, a rokovi se računaju drukčije."]],
  checks:["Pritvor se određuje samo ako se cilj ne može postići blažom merom.","Sud po službenoj dužnosti proverava da li razlozi još postoje.","Ustavna žalba i, na kraju, Evropski sud za ljudska prava."],
  ev:["Uhapšen vlasnik Alta banke","pritvor za Radeta Bastu","Kričku određen pritvor","Uhapšeni dekan","Poternica za Milanom","Dridu i Maksimoviću određen pritvor"]},

 {id:"prijava",n:"Krivična prijava i odluka tužioca",b:"pro",inst:["tuzilastva","tok","vjtbg","vjt","tuzrz"],
  sum:"Svako može tužiocu prijaviti krivično delo; tužilac proverava navode i odlučuje da li će prijavu odbaciti ili pokrenuti istragu.",
  basis:"ZKP, čl. 51, 280–284",
  steps:[
   {a:null,w:"Građanin, organ ili institucija",t:"Podnošenje prijave",d:"Prijava se podnosi nadležnom tužilaštvu, pismeno ili usmeno; može je primiti i policija, koja je prosleđuje tužiocu."},
   {a:"tuzilastva",w:"Javni tužilac",t:"Formiranje predmeta",d:"Prijava dobija broj i tužioca koji je vodi. Ako tužilaštvo nije nadležno, prosleđuje je nadležnom."},
   {a:"mup",w:"Policija ili drugi organi",t:"Prikupljanje obaveštenja",d:"Tužilac može tražiti od policije i drugih organa da prikupe obaveštenja i dostave spise. Ovo je predistražni postupak; tu se mogu pozvati i saslušati građani."},
   {a:"tuzilastva",w:"Javni tužilac",t:"Odluka",d:"Tužilac odbacuje prijavu ako nema osnova sumnje, ili naredbom pokreće istragu."}],
  ends:[["Odbacivanje","Oštećeni se obaveštava i može podneti prigovor neposredno višem tužilaštvu."],["Istraga","Postupak prelazi u istragu protiv poznatog ili nepoznatog učinioca (vidi „Istraga i optužnica“)."]],
  checks:["Prigovor oštećenog višem tužiocu u roku od 8 dana od obaveštenja.","Viši tužilac nadzire rad nižeg i može mu dati obavezno uputstvo.","Podnošenje prijave samo po sebi ne znači krivicu."],
  ev:["TOK otvara predmete protiv direktora BIA","Prijava protiv glavnog tužioca VJT","Bivša tužiteljka za ratne zločine saslušana","Studenti traže istragu „Sky poruka“","hapšenja zbog prijava birača","Agencija prijavila","Treće OJT najavljuje prijave"]},

 {id:"istraga",n:"Istraga i optužnica",b:"pro",inst:["tuzilastva","tok","vjtbg","osnovni","apelacioni","mup"],
  sum:"Tužilac vodi istragu i prikuplja dokaze uz pomoć policije; kad završi, podiže optužnicu, a sud proverava da li ima dovoljno dokaza da se sudi.",
  basis:"ZKP, čl. 295–347",
  steps:[
   {a:"tuzilastva",w:"Javni tužilac",t:"Naredba o sprovođenju istrage",d:"Istraga se pokreće naredbom. Tužilac saslušava osumnjičenog i svedoke, nalaže veštačenja i traži dokumentaciju od organa."},
   {a:"mup",w:"Policija",t:"Dokazne radnje",d:"Policija postupa po nalozima tužioca. Pretres stana i prostorija zahteva naredbu suda; posebne dokazne radnje, kao prisluškivanje, takođe."},
   {a:"tuzilastva",w:"Javni tužilac",t:"Završetak istrage",d:"Ako istraga traje duže od šest meseci, a za dela iz nadležnosti posebnih tužilaštava godinu dana, tužilac o razlozima obaveštava višeg tužioca, koji preduzima mere.",r:"6 meseci / 1 godina"},
   {a:"tuzilastva",w:"Javni tužilac",t:"Optužnica",d:"Tužilac podiže optužnicu sudu ili obustavlja istragu. Umesto suđenja može zaključiti sporazum o priznanju krivičnog dela."},
   {a:"osnovni",w:"Veće prvostepenog suda",t:"Kontrola optužnice",d:"Okrivljeni odgovara na optužnicu, a veće je potvrđuje, vraća tužiocu na dopunu ili odbija ako nema dovoljno dokaza."},
   {a:"apelacioni",w:"Viši sud po žalbi",t:"Žalba na odluku o optužnici",d:"Ako veće odbije ili odbaci optužnicu, tužilac može izjaviti žalbu, pa viši sud može i sam potvrditi optužnicu."}],
  ends:[["Potvrđena optužnica","Zakazuje se glavni pretres (vidi „Suđenje i pravni lekovi“)."],["Obustava","Postupak se završava bez suđenja; oštećeni može podneti prigovor neposredno višem tužiocu."]],
  checks:["Sudija za prethodni postupak odobrava zadiranje u prava: pretres, prisluškivanje, pritvor.","Odbrana ima pravo da razgleda spise i predlaže dokaze.","Viši tužilac nadzire trajanje istrage."],
  ev:["TOK: 13 osumnjičenih","Policija u Ministarstvu građevinarstva","Apelacioni sud potvrđuje optužnicu","Optužnica u slučaju „Konjuh“","TOK otvara predmete protiv direktora BIA"]},

 {id:"prisluskivanje",n:"Tajni nadzor komunikacije",b:"jud",inst:["osnovni","tok","bia","mup","vjtbg"],
  sum:"Prisluškivanje i drugi tajni nadzor su dozvoljeni samo za teška dela i samo uz naredbu sudije, na ograničeno vreme.",
  basis:"ZKP, čl. 161–173; Ustav, čl. 41; zakoni o BIA i o VBA i VOA",
  steps:[
   {a:"tuzilastva",w:"Javni tužilac",t:"Obrazložen zahtev",d:"Tužilac traži nadzor za delo sa liste iz zakona (organizovani kriminal, korupcija, teška dela) i objašnjava zašto se dokazi ne mogu pribaviti drugačije."},
   {a:"osnovni",w:"Sudija za prethodni postupak",t:"Naredba",d:"Sudija odobrava ili odbija nadzor i određuje koga i šta obuhvata.",r:"3 meseca, uz produženja"},
   {a:"mup",w:"Policija, BIA ili VBA",t:"Sprovođenje",d:"Nadzor tehnički sprovode policija, BIA ili VBA. Operater je dužan da omogući pristup."},
   {a:"osnovni",w:"Sudija za prethodni postupak",t:"Izveštaj i zapisi",d:"Posle isteka nadzora sudu se dostavljaju zapisi i izveštaj. Nezakonito pribavljeni zapisi se ne mogu koristiti kao dokaz."}],
  ends:[["Dokaz u postupku","Zapisi se koriste u istrazi i na suđenju."],["Uništavanje","Ako se postupak ne pokrene, materijal se uništava pod nadzorom sudije, a osoba se pod uslovima iz zakona obaveštava."]],
  checks:["Ustav dozvoljava odstupanje od tajnosti komunikacije samo na određeno vreme i na osnovu odluke suda.","Odbor Skupštine za kontrolu službi bezbednosti nadzire BIA i VBA.","Poverenik za informacije nadzire obradu podataka."],
  ev:["TOK o navodnom prisluškivanju","Dolovac formira komisiju"]},

 {id:"sporazum",n:"Sporazum o priznanju krivičnog dela",b:"pro",inst:["tuzilastva","tok","vjtbg","osnovni"],
  sum:"Tužilac i okrivljeni mogu se dogovoriti o priznanju i kazni umesto suđenja; sporazum važi tek kad ga sud prihvati.",
  basis:"ZKP, čl. 313–319",
  steps:[
   {a:"tuzilastva",w:"Javni tužilac",t:"Pregovori",d:"Od pokretanja postupka do kraja glavnog pretresa tužilac i okrivljeni, uz branioca, pregovaraju o priznanju, kazni i imovinskoj koristi."},
   {a:null,w:"Okrivljeni i branilac",t:"Pismeni sporazum",d:"Okrivljeni potpuno priznaje delo; sporazum sadrži kaznu ili meru, troškove i odricanje od žalbe."},
   {a:"osnovni",w:"Sud",t:"Ročište",d:"Sud proverava da li je priznanje dobrovoljno, da li ga potkrepljuju drugi dokazi i da li je kazna u skladu sa zakonom."}],
  ends:[["Prihvatanje","Sud donosi presudu na osnovu sporazuma."],["Odbacivanje ili odbijanje","Postupak se nastavlja, a priznanje se ne sme koristiti kao dokaz."]],
  checks:["Sud ne može izmeniti sporazum, samo ga prihvata ili odbija.","Oštećeni se obaveštava o sporazumu.","Viši tužilac može kontrolisati praksu sporazuma, kao komisija VJT 2026."],
  ev:["Prijava protiv glavnog tužioca VJT","Izveštaj komisije: „paratužilački sistem“"]},

 {id:"imovina",n:"Zabrana raspolaganja i oduzimanje imovine",b:"pro",inst:["tok","tuzilastva","vjtbg","osnovni","minpravde"],
  sum:"Tužilac može hitno zabraniti raspolaganje imovinom za koju sumnja da potiče iz krivičnog dela; trajno je oduzima tek sud posle osuđujuće presude.",
  basis:"Zakon o oduzimanju imovine proistekle iz krivičnog dela",
  steps:[
   {a:"mup",w:"Jedinica za finansijsku istragu",t:"Finansijska istraga",d:"Po naredbi tužioca utvrđuje se imovina osumnjičenog i povezanih lica i njen nesrazmer sa zakonitim prihodima."},
   {a:"tok",w:"Javni tužilac",t:"Naredba o zabrani raspolaganja",d:"Ako postoji opasnost da vlasnik proda ili sakrije imovinu, tužilac naredbom zabranjuje raspolaganje. Naredba važi do odluke suda.",r:"hitno"},
   {a:"osnovni",w:"Sud",t:"Privremeno oduzimanje",d:"Na zahtev tužioca sud odlučuje o privremenom oduzimanju, uz ročište na kome vlasnik može da se izjasni."},
   {a:"minpravde",w:"Direkcija za upravljanje oduzetom imovinom",t:"Upravljanje",d:"Direkcija, organ u sastavu Ministarstva pravde, čuva i upravlja oduzetom imovinom dok traje postupak."},
   {a:"osnovni",w:"Sud",t:"Trajno oduzimanje",d:"Posle potvrđivanja optužnice, a najkasnije godinu dana od pravnosnažne osuđujuće presude, tužilac traži trajno oduzimanje; vlasnik može dokazivati zakonito poreklo imovine."}],
  ends:[["Trajno oduzeta","Imovina prelazi u korist države."],["Vraćena","Ako nema osude ili je poreklo dokazano, imovina se vraća, uz moguću naknadu štete."]],
  checks:["Sud preispituje svaku tužiočevu hitnu meru.","Žalba na rešenja o oduzimanju."],
  ev:["TOK zabranjuje Macuri raspolaganje"]},

 {id:"sudjenje",n:"Suđenje i pravni lekovi",b:"jud",inst:["osnovni","apelacioni","vrhovni","ustavni"],
  sum:"Prvostepeni sud sudi na glavnom pretresu; na presudu se izjavljuje žalba višem ili apelacionom sudu, a protiv pravnosnažne odluke ostaju vanredni pravni lekovi pred Vrhovnim sudom i ustavna žalba.",
  basis:"ZKP, čl. 345–493; Zakon o parničnom postupku za građanske sporove",
  steps:[
   {a:"osnovni",w:"Viši ili osnovni sud",t:"Glavni pretres",d:"Javno suđenje: izvode se dokazi, svedoče svedoci, stranke iznose završne reči. Sud donosi presudu."},
   {a:"apelacioni",w:"Viši ili apelacioni sud",t:"Žalba",d:"O žalbi na presudu osnovnog suda odlučuje viši sud, a na presudu višeg suda apelacioni sud. Drugostepeni sud presudu potvrđuje, preinačuje ili ukida i vraća na ponovno suđenje.",r:"žalba za 15 dana"},
   {a:"vrhovni",w:"Vrhovni sud",t:"Zahtev za zaštitu zakonitosti",d:"Vanredni pravni lek protiv pravnosnažne odluke zbog povrede zakona. Podnose ga Vrhovni javni tužilac i okrivljeni ili branilac; za okrivljenog važi rok od 30 dana od dostavljanja pravnosnažne odluke. U građanskim sporovima sličnu ulogu ima revizija.",r:"okrivljeni: 30 dana"},
   {a:"ustavni",w:"Ustavni sud",t:"Ustavna žalba",d:"Kad su iscrpljeni pravni lekovi, zbog povrede ljudskih prava, na primer prava na pravično suđenje ili suđenje u razumnom roku."}],
  ends:[["Pravnosnažna presuda","Presuda se izvršava; posle nje ostaju samo vanredni pravni lekovi."],["Ponovno suđenje","Ako je presuda ukinuta, predmet se vraća prvostepenom sudu."]],
  checks:["Dvostepenost: o svakoj prvostepenoj presudi može da odlučuje viši sud.","Posle domaćih lekova ostaje predstavka Evropskom sudu za ljudska prava."],
  ev:["Počinje suđenje za „Generalštab“","Nadstrešnica pred Vrhovnim sudom","Poništena presuda o diskriminaciji","druga godišnjica bez suđenja"]},

 {id:"izuzece",n:"Izuzeće sudije ili tužioca",b:"jud",inst:["osnovni","tuzilastva","vjtbg","vjt"],
  sum:"Stranka može tražiti da sudija ili tužilac bude isključen iz predmeta ako postoji sumnja u njegovu nepristrasnost.",
  basis:"ZKP, čl. 37–42; Zakon o javnom tužilaštvu, čl. 37",
  steps:[
   {a:null,w:"Stranka ili branilac",t:"Zahtev za izuzeće",d:"Podnosi se čim se sazna za razlog: srodstvo, ranije učešće u predmetu ili druge okolnosti koje dovode u sumnju nepristrasnost."},
   {a:"vjtbg",w:"Glavni tužilac / predsednik suda",t:"Odluka",d:"O izuzeću tužioca odlučuje glavni javni tužilac tog tužilaštva, o izuzeću glavnog tužioca neposredno viši glavni tužilac, o izuzeću tužioca u Vrhovnom javnom tužilaštvu Vrhovni javni tužilac, a o izuzeću Vrhovnog javnog tužioca Visoki savet tužilaštva, po mišljenju kolegijuma VJT. O izuzeću sudije odlučuje predsednik suda."}],
  ends:[["Usvojen","Predmet dobija drugi tužilac ili sudija."],["Odbijen","Postupak nastavlja isti nosilac funkcije."]],
  checks:["Zloupotreba zahteva radi odugovlačenja može biti sankcionisana.","Izmene Zakona o javnom tužilaštvu iz 2026. nisu menjale pravila o izuzeću."],
  ev:["Nalozi za hapšenje vlasnika","Treće OJT najavljuje prijave"]},

 /* ---------- Tužilačka hijerarhija i saveti ---------- */
 {id:"uputstvo",n:"Obavezno uputstvo i nadzor u tužilaštvu",b:"pro",inst:["vjt","vjtbg","tuzilastva","tok"],
  sum:"Viši tužilac nadzire niže: može im dati obavezno uputstvo, preuzeti predmet ili ga dodeliti drugom tužilaštvu, i kontrolisati njihov rad.",
  basis:"Zakon o javnom tužilaštvu (2023, izmene 9/2026 i 56/2026), čl. 16–22",
  steps:[
   {a:"vjt",w:"Vrhovni javni tužilac",t:"Opšte obavezno uputstvo",d:"Samo Vrhovni javni tužilac daje opšta uputstva svim tužilaštvima radi jednake primene zakona, na primer kako postupati sa izbornim krivičnim delima."},
   {a:"vjtbg",w:"Neposredno viši glavni tužilac",t:"Pojedinačno uputstvo",d:"Daje se u konkretnom predmetu samo kad postoji sumnja u efikasnost ili zakonitost postupanja, pismeno i sa obrazloženjem. Daje ga neposredno viši glavni tužilac (Vrhovni javni tužilac svakom tužilaštvu) ili glavni tužilac svom tužiocu."},
   {a:"vjt",w:"Neposredno viši glavni tužilac",t:"Preuzimanje ili prenošenje predmeta",d:"Viši glavni tužilac može sam preuzeti predmet nižeg tužilaštva (devolucija) ili ga dodeliti drugom nižem tužilaštvu (supstitucija); Vrhovni javni tužilac može predmet dodeliti i TOK-u."},
   {a:null,w:"Tužilac koji je dobio uputstvo ili ostao bez predmeta",t:"Prigovor",d:"Podnosi se preko onoga ko je doneo akt, koji ga može sam preispitati u roku od 3 dana; zatim ga prosleđuje komisiji.",r:"prigovor za 3 dana"},
   {a:"vst",w:"Komisija za prigovore",t:"Odluka o prigovoru",d:"Komisiju od pet tužilaca (dva iz viših, dva iz apelacionih tužilaštava i jedan iz VJT) bira Visoki savet tužilaštva na pet godina; u njoj ne mogu biti članovi Saveta ni glavni tužioci. O prigovorima na akte VJT odlučuje kolegijum VJT.",r:"8 dana; inače akt prestaje da važi"},
   {a:"vjt",w:"Vrhovno javno tužilaštvo",t:"Kontrola rada",d:"Viša tužilaštva mogu proveravati rad nižih, na primer posebnom komisijom koja pregleda predmete."}],
  ends:[["Postupanje po uputstvu","Niži tužilac je dužan da postupi ako prigovor ne uspe."],["Uputstvo pada","Ako komisija usvoji prigovor ili ne odluči u roku, uputstvo, odnosno preuzimanje predmeta, prestaje da važi."],["Disciplina ili gonjenje","Nalazi kontrole mogu dovesti do disciplinskog postupka, razrešenja ili krivične prijave."]],
  checks:["Izmene iz januara 2026. („Mrdićevi zakoni“) ukinule su komisiju, pa je o prigovorima odlučivao viši glavni tužilac. Junske izmene (na snazi od 3. jula 2026) vratile su komisiju u novom sastavu; dok se ona ne obrazuje, odlučuju dosadašnja tela.","Visoki savet tužilaštva štiti samostalnost tužilaca od nedozvoljenog uticaja.","Izvršna vlast ne sme davati uputstva tužiocima."],
  ev:["Obavezno uputstvo za izborna krivična dela","Dolovac formira komisiju","Izveštaj komisije: „paratužilački sistem“"]},

 {id:"tuzioci-izbor",n:"Izbor, upućivanje i v.d. tužilaca",b:"pro",inst:["vst","vjt","tok","tuzrz","skupstina"],
  sum:"Visoki savet tužilaštva bira tužioce i glavne tužioce i odlučuje o njihovom radu u posebnim tužilaštvima; samo Vrhovnog javnog tužioca bira Skupština.",
  basis:"Ustav, čl. 155–165; Zakon o Visokom savetu tužilaštva; Zakon o javnom tužilaštvu (izmene 9/2026 i 56/2026), čl. 41, 62, 69",
  steps:[
   {a:"vst",w:"Visoki savet tužilaštva",t:"Oglas i kandidati",d:"VST oglašava mesta; kandidati se ocenjuju prema merilima iz zakona."},
   {a:"vst",w:"Visoki savet tužilaštva",t:"Izbor",d:"Savet bira tužioce i glavne tužioce. Glavni tužilac ima mandat od šest godina i ne može biti ponovo izabran u istom tužilaštvu.",r:"6 godina"},
   {a:"vst",w:"Visoki savet tužilaštva",t:"Upućivanje u posebna tužilaštva",d:"U TOK, Tužilaštvo za ratne zločine i druga posebna tužilaštva tužioci se upućuju izuzetno, obrazloženim rešenjem Saveta, posle javnog poziva i na obrazložen predlog glavnog tužioca, uz mišljenje oba glavna tužioca. Savet upućivanje preispituje jednom godišnje.",r:"najduže 3 godine, bez ponavljanja"},
   {a:"vst",w:"Visoki savet tužilaštva",t:"Vršilac funkcije",d:"Dok glavni tužilac nije izabran, Savet postavlja vršioca funkcije; isto lice ne može ponovo biti v.d. u istom tužilaštvu.",r:"najduže 1 godina"},
   {a:"skupstina",w:"Narodna skupština",t:"Vrhovni javni tužilac",d:"Samo njega bira Skupština, na predlog VST, tropetinskom većinom svih poslanika; ako ne uspe, bira ga komisija od pet članova propisana Ustavom."}],
  ends:[["Izbor","Tužilac stupa na funkciju."],["Odlazak ili povratak","Odluke o upućivanju menjaju sastav posebnih tužilaštava, kao u TOK-u 2026."]],
  checks:["Januarske izmene 2026. prenele su upućivanje sa Vrhovnog javnog tužioca na VST i dozvolile ponovno upućivanje, ponovni izbor glavnih tužilaca i v.d. do tri godine; posle toga VST 6. marta nije ponovo uputio četvoro tužilaca TOK-a.","Junske izmene (na snazi od 3. jula 2026), posle mišljenja Venecijanske komisije, vratile su zabranu ponovnog izbora i jednogodišnji v.d. i uvele strože uslove za upućivanje; v.d. postavljeni po januarskim pravilima ostaju najduže tri godine.","Ustavna zaštita: žalba Ustavnom sudu protiv odluka o prestanku funkcije."],
  ev:["VST: četvoro tužilaca odlazi","VST vraća tužioce u TOK","VST imenuje v.d. tužioca","Organizacije protiv ponovne kandidature"]},

 {id:"disciplina",n:"Disciplinski postupak i razrešenje",b:"pro",inst:["vst","vss","vjt","vjtbg"],
  sum:"Sudija ili tužilac koji ne vrši funkciju savesno može biti disciplinski kažnjen ili razrešen; odlučuju Visoki savet sudstva, odnosno tužilaštva.",
  basis:"Zakon o sudijama; Zakon o javnom tužilaštvu; Ustav",
  steps:[
   {a:"vjt",w:"Podnosilac",t:"Disciplinska prijava",d:"Prijavu može podneti svako, a predlog za razrešenje ovlašćeni organi, na primer viši tužilac posle kontrole."},
   {a:"vst",w:"Disciplinski tužilac saveta",t:"Ispitivanje",d:"Disciplinski tužilac ispituje navode i podnosi predlog disciplinskoj komisiji ili odbacuje prijavu."},
   {a:"vst",w:"Disciplinska komisija",t:"Odluka komisije",d:"Komisija izriče meru (javna opomena, umanjenje plate, zabrana napredovanja) ili odbija predlog."},
   {a:"vst",w:"Visoki savet",t:"Žalba i razrešenje",d:"O žalbi na odluku komisije odlučuje savet. Za teške disciplinske prekršaje savet može pokrenuti razrešenje.",r:"žalba za 8 dana"}],
  ends:[["Disciplinska mera","Protiv konačne odluke saveta može se voditi upravni spor."],["Razrešenje","Protiv odluke o razrešenju može se izjaviti žalba Ustavnom sudu."],["Odbijanje","Postupak se završava."]],
  checks:["Ustavni sud odlučuje o žalbama na razrešenje.","Disciplinska odgovornost ne isključuje krivičnu.","Izmene iz 2026. nisu menjale disciplinski postupak tužilaca."],
  ev:["Izveštaj komisije: „paratužilački sistem“","Stefanović uzvraća komisiji"]},

 {id:"sudije-izbor",n:"Izbor sudija i predsednika sudova",b:"jud",inst:["vss","vrhovni"],
  sum:"Od ustavnih promena 2022. Visoki savet sudstva bira sve sudije i predsednike sudova, uključujući i predsednika Vrhovnog suda; Skupština više ne učestvuje.",
  basis:"Ustav, čl. 144–153; Zakon o sudijama; Zakon o Visokom savetu sudstva",
  steps:[
   {a:"vss",w:"Visoki savet sudstva",t:"Oglas i ocenjivanje",d:"Savet oglašava mesta i ocenjuje kandidate; za prvi izbor važi i završena Pravosudna akademija ili ispit pred Savetom."},
   {a:"vss",w:"Visoki savet sudstva",t:"Izbor",d:"Savet bira sudije, koji su stalni, i predsednike sudova na mandat. Bira i svog predsednika."},
   {a:"vss",w:"Visoki savet sudstva",t:"Predsednik Vrhovnog suda",d:"Savet ga bira po pribavljenom mišljenju opšte sednice Vrhovnog suda, na pet godina, bez mogućnosti ponovnog izbora. Zakletvu polaže pred Skupštinom.",r:"mandat 5 godina"}],
  ends:[["Izbor","Sudija polaže zakletvu i stupa na funkciju."]],
  checks:["Od 2022. Skupština više ne bira sudije; to je bila glavna promena ustavnih amandmana.","EU i Venecijanska komisija prate nezavisnost Saveta."],
  ev:["Bojana Čogurić predsednica","Miroljub Tomić predsednik Vrhovnog suda"]},

 {id:"ustavni-izbor",n:"Izbor sudija Ustavnog suda",b:"jud",inst:["ustavni","skupstina","predsednik","vrhovni"],
  sum:"Petnaest sudija Ustavnog suda dolazi iz tri izvora: po pet bira Skupština, imenuje predsednik Republike i imenuje opšta sednica Vrhovnog suda.",
  basis:"Ustav, čl. 172",
  steps:[
   {a:"predsednik",w:"Predsednik Republike",t:"Predlaže deset kandidata Skupštini",d:"Skupština od njih bira pet sudija."},
   {a:"skupstina",w:"Narodna skupština",t:"Predlaže deset kandidata predsedniku",d:"Predsednik od njih imenuje pet sudija."},
   {a:"vrhovni",w:"Opšta sednica Vrhovnog suda",t:"Imenuje pet sudija",d:"Sa zajedničke liste koju predlažu Visoki savet sudstva i Visoki savet tužilaštva."},
   {a:"ustavni",w:"Ustavni sud",t:"Bira predsednika",d:"Sudije iz svojih redova biraju predsednika suda.",r:"mandat sudije 9 godina"}],
  ends:[["Sud u punom sastavu","Sud odlučuje većinom svih sudija."]],
  checks:["Ukrštene liste treba da spreče da jedan organ sam odredi sastav suda."],
  ev:["Skupština bira pet sudija Ustavnog suda","Vladan Petrov predsednik Ustavnog suda"]},

 {id:"ocena",n:"Ocena ustavnosti zakona",b:"jud",inst:["ustavni","skupstina"],
  sum:"Ustavni sud može ukinuti zakon ili deo zakona koji nije u skladu sa Ustavom; postupak pokreću ovlašćeni predlagači, a inicijativu može podneti svako.",
  basis:"Ustav, čl. 167–168; Zakon o Ustavnom sudu",
  steps:[
   {a:null,w:"Predlagač ili podnosilac inicijative",t:"Pokretanje",d:"Predlog podnose državni organi, organi pokrajine i lokalne vlasti ili najmanje 25 poslanika; inicijativu može podneti svaki građanin ili organizacija."},
   {a:"ustavni",w:"Ustavni sud",t:"Odlučivanje o pokretanju",d:"Po predlogu sud mora da odlučuje; po inicijativi sam odlučuje da li će pokrenuti postupak."},
   {a:"skupstina",w:"Donosilac zakona",t:"Odgovor",d:"Skupština, odnosno donosilac akta, dostavlja odgovor. Sud može obustaviti izvršenje pojedinačnih akata do konačne odluke."},
   {a:"ustavni",w:"Ustavni sud",t:"Odluka",d:"Ako utvrdi nesaglasnost, zakon ili odredba prestaje da važi danom objavljivanja odluke."}],
  ends:[["Ukinut zakon ili odredba","Odluka je opšteobavezna i izvršna."],["Odbijeno ili odbačeno","Zakon ostaje na snazi."]],
  checks:["Odluke Ustavnog suda su konačne.","Zakon nema rok u kome sud mora da odluči, što se često kritikuje."],
  ev:[]},

 /* ---------- Skupština, predsednik, Vlada ---------- */
 {id:"zakon",n:"Donošenje zakona i suspenzivni veto",b:"leg",inst:["skupstina","vlada","predsednik"],path:"zakon",
  sum:"Zakon predlaže Vlada, poslanik ili drugi ovlašćeni predlagač; Skupština ga usvaja, a predsednik ga proglašava ili jednom vraća na ponovno glasanje.",
  basis:"Ustav, čl. 107–113; Poslovnik Narodne skupštine",
  steps:[
   {a:"vlada",w:"Predlagač",t:"Predlog zakona",d:"Predlažu Vlada, svaki poslanik, Skupština AP Vojvodine ili 30.000 birača; Zaštitnik građana i NBS iz svoje oblasti."},
   {a:"skupstina",w:"Odbori Skupštine",t:"Rasprava u odborima",d:"Nadležni odbor i Odbor za ustavna pitanja razmatraju predlog i amandmane. Po hitnom postupku rokovi se skraćuju."},
   {a:"skupstina",w:"Narodna skupština",t:"Glasanje",d:"Rasprava u načelu i u pojedinostima, pa glasanje u Danu za glasanje; zakon je usvojen većinom glasova prisutnih, uz prisutnu većinu poslanika."},
   {a:"predsednik",w:"Predsednik Republike",t:"Proglašenje ili veto",d:"Predsednik ukazom proglašava zakon ili ga sa obrazloženjem vraća Skupštini na ponovno odlučivanje.",r:"15 dana (7 po hitnom postupku)"},
   {a:"skupstina",w:"Narodna skupština",t:"Ponovno glasanje",d:"Ako zakon bude ponovo izglasan većinom svih poslanika (126), predsednik je dužan da ga proglasi."}],
  ends:[["Objava","Zakon se objavljuje u „Službenom glasniku“ i stupa na snagu, po pravilu osmog dana."],["Ustavni sud","Posle stupanja na snagu može se osporiti ustavnost (vidi „Ocena ustavnosti zakona“)."]],
  checks:["Ustavni sud kontroliše ustavnost.","Javne rasprave su obavezne za sistemske zakone, ali se u hitnom postupku često preskaču."],
  ev:["Podneti „Mrdićevi zakoni“","Usvojeni „Mrdićevi zakoni“","Usvojene revidirane pravosudne izmene"]},

 {id:"raspustanje",n:"Raspuštanje Skupštine i vanredni izbori",b:"leg",inst:["predsednik","vlada","skupstina","rik"],
  sum:"Predsednik Republike može raspustiti Skupštinu na obrazložen predlog Vlade, a mora je raspustiti ako ne izabere Vladu u roku; istovremeno raspisuje izbore.",
  basis:"Ustav, čl. 109",
  steps:[
   {a:"vlada",w:"Vlada",t:"Obrazložen predlog",d:"Vlada predsedniku predlaže raspuštanje. Raspuštanje je obavezno ako Skupština ne izabere Vladu 90 dana od konstituisanja ili 30 dana od pada Vlade."},
   {a:"predsednik",w:"Predsednik Republike",t:"Ukaz o raspuštanju i raspisivanju izbora",d:"Istim aktom raspisuju se izbori. Skupština se ne može raspustiti za vreme ratnog ili vanrednog stanja.",r:"izbori za 45–60 dana"},
   {a:"skupstina",w:"Raspuštena Skupština",t:"Samo tekući poslovi",d:"Do konstituisanja nove Skupštine stara obavlja samo tekuće ili neodložne poslove, a Vlada ima ograničena ovlašćenja."},
   {a:"rik",w:"Republička izborna komisija",t:"Sprovođenje izbora",d:"RIK proglašava liste, organizuje glasanje i utvrđuje rezultate."}],
  ends:[["Nova Skupština","Posle konstituisanja počinje izbor Vlade (vidi vodič „Kako nastaje Vlada“)."]],
  checks:["Raspuštanje ne sme da se koristi tokom ratnog ili vanrednog stanja.","Posmatrači i RIK prate regularnost izbora."],
  ev:["Najavljeni vanredni izbori","Raspuštena Skupština"]},

 {id:"izborni-prigovor",n:"Prigovor RIK-u i ponovno glasanje",b:"leg",inst:["rik","upravni"],
  sum:"Učesnici izbora mogu podneti prigovor zbog nepravilnosti; RIK može poništiti glasanje na biračkom mestu, a o žalbi odlučuje Upravni sud.",
  basis:"Zakon o izboru narodnih poslanika (2022), Zakon o jedinstvenim izbornim postupcima",
  steps:[
   {a:null,w:"Birač, kandidat ili podnosilac liste",t:"Prigovor",d:"Prigovor RIK-u zbog povrede izbornog prava ili nepravilnosti na biračkom mestu.",r:"kratki rokovi, u satima"},
   {a:"rik",w:"Republička izborna komisija",t:"Odluka o prigovoru",d:"RIK usvaja ili odbija prigovor. Ako ga usvoji, može poništiti glasanje na biračkom mestu."},
   {a:"upravni",w:"Upravni sud",t:"Žalba",d:"Protiv odluke RIK-a podnosi se žalba Upravnom sudu, koji odlučuje hitno i konačno."},
   {a:"rik",w:"Republička izborna komisija",t:"Ponovno glasanje",d:"Glasanje se ponavlja tamo gde je poništeno ili gde rezultat nije mogao da se utvrdi; tek tada se objavljuju konačni rezultati."}],
  ends:[["Konačni rezultati","RIK dodeljuje mandate."],["Odbijen prigovor","Rezultat ostaje."]],
  checks:["Upravni sud može preinačiti odluku RIK-a.","Domaći i međunarodni posmatrači prijavljuju nepravilnosti."],
  ev:["RIK određuje ponovno glasanje","Ponovljeno glasanje","Konačni rezultati izbora","Preliminarni rezultati i ocena posmatrača"]},

 {id:"ostavka-predsednika",n:"Ostavka predsednika i vršilac dužnosti",b:"exe",inst:["predsednik","skupstina"],
  sum:"Kad predsedniku prestane mandat, dužnost do najviše tri meseca vrši predsednik Skupštine, a novi izbori moraju se održati u tom roku.",
  basis:"Ustav, čl. 116 i 120",
  steps:[
   {a:"predsednik",w:"Predsednik Republike",t:"Ostavka",d:"Predsednik podnosi ostavku predsedniku Skupštine; mandat prestaje ostavkom, razrešenjem ili istekom."},
   {a:"skupstina",w:"Predsednik Skupštine",t:"Vršilac dužnosti",d:"Predsednik Skupštine postaje vršilac dužnosti predsednika Republike.",r:"najduže 3 meseca"},
   {a:"skupstina",w:"Predsednik Skupštine",t:"Raspisivanje izbora",d:"Raspisuje predsedničke izbore tako da se održe pre isteka tromesečnog roka."},
   {a:"gradjani",w:"Građani",t:"Glasanje",d:"Predsednik se bira neposredno; ako niko ne dobije većinu glasalih, ide se u drugi krug."}],
  ends:[["Novi predsednik","Polaže zakletvu pred Skupštinom."]],
  checks:["Rokovi su ustavni; o sporovima oko njih može odlučivati Ustavni sud."],
  ev:["Vučić podnosi ostavku","Ana Brnabić v.d. predsednika","Čupić postao vršilac dužnosti","Poslednji dan za raspisivanje predsedničkih izbora","Najkasniji dan glasanja za predsednika"]},

 {id:"pomilovanje",n:"Pomilovanje i abolicija",b:"exe",inst:["predsednik","minpravde"],
  sum:"Predsednik Republike može osuđenom oprostiti ili ublažiti kaznu (pomilovanje), ili osloboditi od krivičnog gonjenja (abolicija); odluka ne mora da se obrazloži.",
  basis:"Ustav, čl. 112; Zakon o pomilovanju",
  steps:[
   {a:null,w:"Osuđeni, porodica ili branilac",t:"Molba",d:"Molba se podnosi preko suda ili Ministarstva pravde. Predsednik može dati pomilovanje i bez molbe, po službenoj dužnosti."},
   {a:"minpravde",w:"Ministarstvo pravde",t:"Priprema spisa",d:"Ministarstvo pribavlja presudu, izveštaj zavoda o ponašanju osuđenog i druge podatke i dostavlja ih predsedniku."},
   {a:"predsednik",w:"Predsednik Republike",t:"Ukaz",d:"Predsednik odlučuje ukazom. Pomilovanje može biti potpuno, delimično ili zamena blažom kaznom; abolicija zaustavlja gonjenje."}],
  ends:[["Usvojeno","Kazna se ne izvršava ili se ublažava; kod abolicije postupak se obustavlja."],["Odbijeno","Nova molba može se podneti posle roka iz zakona."]],
  checks:["Zakon ne predviđa žalbu protiv odluke.","Politička kontrola: javnost i Skupština; ukaz o pomilovanju ne mora biti objavljen.","Tužilaštvo može istraživati da li je postupak bio zakonit, ali ne i preispitati samu odluku."],
  ev:["Vučić podnosi ostavku i daje 49 pomilovanja","Objavljena lista pomilovanih","TOK traži spise o pomilovanjima"]},

 {id:"pad-vlade",n:"Ostavka premijera i pad Vlade",b:"exe",inst:["vlada","skupstina","predsednik"],
  sum:"Vlada pada ostavkom premijera ili izglasanim nepoverenjem; ako Skupština u roku ne izabere novu, predsednik je mora raspustiti.",
  basis:"Ustav, čl. 130–132",
  steps:[
   {a:"vlada",w:"Premijer ili 60 poslanika",t:"Ostavka ili predlog nepoverenja",d:"Premijer podnosi ostavku Skupštini; ili najmanje 60 poslanika predlaže glasanje o nepoverenju."},
   {a:"skupstina",w:"Narodna skupština",t:"Konstatovanje ili glasanje",d:"Skupština konstatuje ostavku; nepoverenje je izglasano ako za njega glasa većina svih poslanika."},
   {a:"vlada",w:"Vlada u ostavci",t:"Tekući poslovi",d:"Do izbora nove Vlade stara vrši samo tekuće poslove."},
   {a:"predsednik",w:"Predsednik Republike",t:"Novi mandatar",d:"Predsednik predlaže mandatara, a Skupština bira novu Vladu.",r:"30 dana"}],
  ends:[["Nova Vlada","Izabrana većinom svih poslanika."],["Raspuštanje","Ako nova Vlada nije izabrana u roku, predsednik raspušta Skupštinu."]],
  checks:["Ako predlog nepoverenja ne prođe, isti potpisnici ne mogu ga ponoviti pre isteka 180 dana."],
  ev:["Ostavka premijera Miloša Vučevića","Izabrana Vlada Đura Macuta"]},

 {id:"izbor-vlade",n:"Konstituisanje Skupštine i izbor Vlade",b:"leg",inst:["skupstina","predsednik","vlada"],path:"vlada-nastaje",
  sum:"Posle izbora nova Skupština se konstituiše, predsednik Republike predlaže mandatara, a Skupština bira Vladu većinom svih poslanika.",
  basis:"Ustav, čl. 101, 109, 127; Zakon o Vladi",
  steps:[
   {a:"skupstina",w:"Najstariji poslanik",t:"Konstitutivna sednica",d:"Potvrđuju se mandati; Skupština je konstituisana kad se potvrdi dve trećine mandata. Bira se predsednik Skupštine.",r:"30 dana od rezultata"},
   {a:"predsednik",w:"Predsednik Republike",t:"Predlog mandatara",d:"Posle konsultacija sa predstavnicima izabranih lista predlaže kandidata za premijera."},
   {a:"skupstina",w:"Narodna skupština",t:"Izbor Vlade",d:"Mandatar izlaže program i predlaže ministre; Skupština glasa o svima zajedno.",r:"90 dana od konstituisanja"}],
  ends:[["Izabrana Vlada","Ministri polažu zakletvu."],["Raspuštanje","Ako Vlada ne bude izabrana u roku, Skupština se raspušta i raspisuju se novi izbori."]],
  checks:["Rok od 90 dana je ustavni."],
  ev:["Zakazana konstitutivna sednica","Konstitutivna sednica nove Skupštine","Kos: nova vlada","Konstituisana nova Skupština","Nastavak konstitutivne sednice","Konsultacije pred konstitutivnu","Ni drugog dana nije izabran"]},

 {id:"nadzor-skupstine",n:"Nadzor Skupštine nad Vladom i službama",b:"leg",inst:["skupstina","vlada","bia","vojska","mup"],
  sum:"Skupština kontroliše Vladu poslaničkim pitanjima, interpelacijom, anketnim odborima i javnim slušanjima, a službe bezbednosti preko posebnog odbora.",
  basis:"Ustav, čl. 99 i 129–130; Poslovnik; Zakon o osnovama uređenja službi bezbednosti",
  steps:[
   {a:"skupstina",w:"Poslanici",t:"Pitanja i interpelacija",d:"Poslanička pitanja ministrima; interpelaciju o radu Vlade ili ministra može podneti najmanje 50 poslanika, a posle rasprave sledi glasanje."},
   {a:"skupstina",w:"Odbori",t:"Anketni odbor i javno slušanje",d:"Skupština može obrazovati anketni odbor ili komisiju koja utvrđuje činjenice; odbori organizuju javna slušanja."},
   {a:"skupstina",w:"Odbor za kontrolu službi bezbednosti",t:"Nadzor BIA i VBA",d:"Odbor razmatra izveštaje službi, može obaviti nadzor i tražiti podatke, uz zaštitu tajnosti."}],
  ends:[["Politička odgovornost","Nalazi mogu voditi nepoverenju ministru ili Vladi."],["Prosleđivanje nadležnima","Ako se utvrde nepravilnosti, Skupština obaveštava tužilaštvo ili druge organe."]],
  checks:["Opozicija može inicirati nadzor, ali odluke donosi većina."],
  ev:["Studentska lista traži smene"]},

 {id:"kadrovi-bezbednost",n:"Postavljanje i smena šefova policije i BIA",b:"exe",inst:["vlada","mup","bia"],
  sum:"Direktora BIA i direktora policije postavlja i razrešava Vlada; direktora policije na predlog ministra unutrašnjih poslova, posle javnog konkursa.",
  basis:"Zakon o BIA; Zakon o policiji",
  steps:[
   {a:"mup",w:"Ministar unutrašnjih poslova",t:"Predlog",d:"Za direktora policije ministar predlaže kandidata posle javnog konkursa; direktora BIA predlaže se Vladi bez konkursa."},
   {a:"vlada",w:"Vlada",t:"Rešenje o postavljenju ili razrešenju",d:"Vlada donosi rešenje; direktor policije ima mandat od pet godina, a može biti razrešen iz razloga propisanih zakonom."},
   {a:"skupstina",w:"Odbori Skupštine",t:"Saslušanje i nadzor",d:"Nadležni odbori mogu pozivati direktore i razmatrati izveštaje."}],
  ends:[["Nova postavljenja","Do postavljenja može se odrediti vršilac dužnosti."]],
  checks:["Vlada u ostavci vrši samo tekuće poslove; da li to uključuje kadrovske promene, sporno je.","Razrešenje direktora policije može se osporiti pred sudom."],
  ev:["Studentska lista traži smene","Radar: smene u vrhu BIA","šef VBA"]},

 {id:"kontrola-policije",n:"Pritužba i kontrola rada policije",b:"exe",inst:["mup","ombudsman","tuzilastva","vjtbg"],
  sum:"Građanin može uložiti pritužbu na postupanje policije; zakonitost rada proverava Sektor unutrašnje kontrole, a krivična dela goni tužilaštvo.",
  basis:"Zakon o policiji; Zakon o Zaštitniku građana",
  steps:[
   {a:null,w:"Građanin",t:"Pritužba",d:"Pritužba se podnosi policiji, Zaštitniku građana ili tužilaštvu ako postoji sumnja na krivično delo."},
   {a:"mup",w:"Rukovodilac ili komisija",t:"Postupak po pritužbi",d:"Rukovodilac pokušava da reši pritužbu; ako ne uspe, odlučuje komisija u kojoj su i predstavnici javnosti."},
   {a:"mup",w:"Sektor unutrašnje kontrole",t:"Unutrašnja kontrola",d:"Ispituje zakonitost rada policajaca i podnosi krivične prijave."},
   {a:"tuzilastva",w:"Javni tužilac",t:"Krivično gonjenje",d:"Ako postoji sumnja na krivično delo, na primer prekoračenje ovlašćenja, odlučuje tužilac."}],
  ends:[["Disciplina ili gonjenje","Odgovornost policajca."],["Preporuka","Zaštitnik građana daje preporuku MUP-u."]],
  checks:["Zaštitnik građana kontroliše rad MUP-a.","Skupštinski odbor nadzire policiju."],
  ev:["Veliki protest u Beogradu","na protestu nije korišćen zvučni top","Veselin Milić"]},

 /* ---------- Nezavisna tela ---------- */
 {id:"rem-mere",n:"Mere REM-a prema televizijama",b:"ind",inst:["rem","upravni"],
  sum:"REM nadzire emitere i kad utvrdi kršenje zakona izriče mere od opomene do privremene zabrane sadržaja i oduzimanja dozvole.",
  basis:"Zakon o elektronskim medijima (2023)",
  steps:[
   {a:"rem",w:"REM",t:"Nadzor ili prijava",d:"Postupak se pokreće po službenoj dužnosti ili po prijavi građana i organizacija; u kampanji REM može pratiti emitere posebno."},
   {a:null,w:"Emiter",t:"Izjašnjenje",d:"Emiter se izjašnjava o navodima pre odluke."},
   {a:"rem",w:"Savet REM-a",t:"Odluka o meri",d:"Opomena, upozorenje, privremena zabrana objavljivanja sadržaja ili reklama, oduzimanje dozvole. Mera mora biti srazmerna i postupna."},
   {a:"upravni",w:"Upravni sud",t:"Upravni spor",d:"Emiter može tužbom osporiti odluku pred Upravnim sudom."}],
  ends:[["Izvršenje mere","Emiter mora da je sprovede; za nepoštovanje sledi stroža mera."],["Poništaj","Upravni sud može poništiti odluku."]],
  checks:["Upravni sud.","Skupština bira Savet REM-a i razmatra njegov izveštaj."],
  ev:["REM ne uvodi Informer","REM zabranjuje emisiju","REM: 25 dana zabrane","REM: nove mere"]},

 {id:"izbor-nezavisnih",n:"Izbor nezavisnih tela u Skupštini",b:"ind",inst:["skupstina","rem","poverenik","ombudsman","ravnopravnost","dri","acas"],
  sum:"Skupština bira Zaštitnika građana, Poverenike, Savet REM-a, Savet DRI i Odbor Agencije za sprečavanje korupcije; predloge daju odbori ili ovlašćeni predlagači.",
  basis:"Zakoni o pojedinačnim telima",
  steps:[
   {a:null,w:"Ovlašćeni predlagači ili odbor",t:"Kandidature",d:"Kod REM-a predlažu univerziteti, udruženja i druge organizacije; za Poverenike i Zaštitnika predlog daje skupštinski odbor."},
   {a:"skupstina",w:"Nadležni odbor",t:"Utvrđivanje predloga",d:"Odbor razgovara sa kandidatima i utvrđuje predlog Skupštini."},
   {a:"skupstina",w:"Narodna skupština",t:"Izbor",d:"Glasanje u plenumu; za većinu ovih funkcija potrebna je većina svih poslanika."},
   {a:"rem",w:"Telo",t:"Konstituisanje",d:"Kolektivna tela, kao Savet REM-a, biraju predsednika iz svojih redova."}],
  ends:[["Izabrani","Mandat je duži od skupštinskog da bi tela bila nezavisna od trenutne većine."],["Nepopunjeno mesto","Ako Skupština ne izabere naslednika, funkcija može ostati prazna ili je obavlja zamenik."]],
  checks:["Razrešenje je moguće samo iz razloga propisanih zakonom."],
  ev:["Konstituisan Savet REM-a","Stevica Smederevac predsednik","Ističe mandat Poverenika"]},

 {id:"diskriminacija",n:"Pritužba zbog diskriminacije",b:"ind",inst:["ravnopravnost","osnovni","apelacioni"],
  sum:"Poverenik za zaštitu ravnopravnosti prima pritužbe, daje mišljenja i preporuke, upozorava javnost i može voditi sudske postupke za zaštitu od diskriminacije.",
  basis:"Zakon o zabrani diskriminacije",
  steps:[
   {a:null,w:"Građanin ili organizacija",t:"Pritužba",d:"Pritužba se podnosi Povereniku besplatno; može se odmah ići i na sud."},
   {a:"ravnopravnost",w:"Poverenik",t:"Mišljenje i preporuka",d:"Poverenik utvrđuje da li je bilo diskriminacije i preporučuje kako da se otkloni."},
   {a:"ravnopravnost",w:"Poverenik",t:"Opomena i objavljivanje",d:"Ako se preporuka ne poštuje, Poverenik izriče opomenu i može obavestiti javnost."},
   {a:"osnovni",w:"Sud",t:"Tužba za zaštitu",d:"Poverenik može podneti tužbu ili se pridružiti postupku na strani žrtve; sud može zabraniti diskriminaciju i dosuditi naknadu."}],
  ends:[["Utvrđena diskriminacija","Preporuka ili presuda."],["Bez povrede","Postupak se završava."]],
  checks:["Mišljenja Poverenika nisu obavezujuća kao presude; obavezujuće su sudske odluke.","Teret dokazivanja prelazi na tuženog kad se učini verovatnim da je bilo diskriminacije."],
  ev:["Poništena presuda o diskriminaciji","Poverenik upozorava na diskriminaciju","Poverenik: zaustaviti targetiranje","Poverenik traži više biračkih mesta"]},

 {id:"pristup-informacijama",n:"Zahtev za informacije i žalba Povereniku",b:"ind",inst:["poverenik","upravni"],
  sum:"Svako može tražiti informaciju od javnog značaja od organa vlasti; ako je ne dobije, žali se Povereniku, čije je rešenje obavezujuće.",
  basis:"Zakon o slobodnom pristupu informacijama od javnog značaja",
  steps:[
   {a:null,w:"Tražilac",t:"Zahtev organu",d:"Bez obrazloženja zašto se informacija traži.",r:"organ odgovara za 15 dana"},
   {a:"poverenik",w:"Poverenik",t:"Žalba",d:"Ako organ odbije, ne odgovori ili odgovori delimično, podnosi se žalba Povereniku. Izuzetak su najviši organi (Skupština, predsednik Republike, Vlada, Vrhovni i Ustavni sud, Vrhovni javni tužilac): protiv njih se odmah pokreće upravni spor."},
   {a:"poverenik",w:"Poverenik",t:"Rešenje",d:"Poverenik nalaže organu da dostavi informaciju; rešenje je obavezujuće i izvršno."},
   {a:"upravni",w:"Upravni sud",t:"Tužba",d:"Protiv rešenja Poverenika može se pokrenuti upravni spor."}],
  ends:[["Informacija dostavljena","Postupak se završava."],["Neizvršenje","Poverenik može izreći novčane kazne, a Vlada je dužna da obezbedi izvršenje."]],
  checks:["Neke informacije se mogu uskratiti radi zaštite tajnosti ili privatnosti, ali to mora biti obrazloženo."],
  ev:[]},

 {id:"zastitnik-prituzba",n:"Pritužba Zaštitniku građana",b:"ind",inst:["ombudsman"],
  sum:"Zaštitnik građana ispituje pritužbe na rad organa uprave i daje preporuke; ne može im naložiti odluku, ali može javno ukazati na propuste.",
  basis:"Zakon o Zaštitniku građana (2021)",
  steps:[
   {a:null,w:"Građanin",t:"Pritužba",d:"Posle pokušaja da se problem reši kod samog organa."},
   {a:"ombudsman",w:"Zaštitnik građana",t:"Kontrolni postupak",d:"Zaštitnik traži podatke od organa, koji je dužan da sarađuje."},
   {a:"ombudsman",w:"Zaštitnik građana",t:"Preporuka",d:"Ako utvrdi propust, preporučuje kako da se otkloni; organ mora odgovoriti u roku."}],
  ends:[["Postupanje po preporuci","Organ otklanja propust."],["Javni izveštaj","Ako organ ne postupi, Zaštitnik o tome obaveštava Skupštinu, Vladu i javnost."]],
  checks:["Zaštitnik je i nacionalni mehanizam za prevenciju torture, pa može nenajavljeno obilaziti zatvore i policijske stanice."],
  ev:[]},

 {id:"revizija",n:"Revizija javnog novca (DRI)",b:"ind",inst:["dri","tuzilastva","skupstina"],
  sum:"Državna revizorska institucija proverava kako se troši javni novac; nalaže otklanjanje nepravilnosti i podnosi prijave tužilaštvu.",
  basis:"Zakon o Državnoj revizorskoj instituciji",
  steps:[
   {a:"dri",w:"DRI",t:"Program revizije",d:"Svake godine DRI bira subjekte: ministarstva, javna preduzeća, lokalne vlasti."},
   {a:"dri",w:"DRI",t:"Revizija i izveštaj",d:"Nalazi se objavljuju; subjekt mora podneti odzivni izveštaj o otklanjanju nepravilnosti."},
   {a:"tuzilastva",w:"Tužilaštvo / prekršajni sud",t:"Prijave",d:"DRI podnosi prekršajne i krivične prijave i zahteve za razrešenje odgovornih."}],
  ends:[["Ispravljene nepravilnosti","Odzivni izveštaj."],["Gonjenje","Tužilaštvo odlučuje o krivičnim prijavama."]],
  checks:["DRI odgovara Skupštini."],
  ev:[]},

 {id:"acas-postupak",n:"Provera funkcionera i finansiranja stranaka",b:"ind",inst:["acas","rik"],
  sum:"Agencija za sprečavanje korupcije proverava imovinu i sukob interesa funkcionera i finansiranje stranaka i kampanja.",
  basis:"Zakon o sprečavanju korupcije; Zakon o finansiranju političkih aktivnosti",
  steps:[
   {a:null,w:"Funkcioner ili stranka",t:"Izveštaji",d:"Funkcioneri prijavljuju imovinu, a stranke izveštaje o troškovima kampanje."},
   {a:"acas",w:"Agencija",t:"Provera",d:"Agencija proverava izveštaje, po službenoj dužnosti ili po prijavi."},
   {a:"acas",w:"Agencija",t:"Mera",d:"Opomena, javno objavljivanje odluke ili preporuka za razrešenje; prekršajne i krivične prijave."}],
  ends:[["Mera","Objavljuje se."],["Prijava","Prekršajni sud ili tužilaštvo odlučuje."]],
  checks:["Upravni sud po tužbi protiv odluka Agencije."],
  ev:["Agencija prijavila","Siniša Mali podnosi ostavku"]},

 {id:"banka-stecaj",n:"Oduzimanje dozvole banci i stečaj",b:"ind",inst:["nbs","tok"],
  sum:"NBS nadzire banke; kad banka ne može da posluje zakonito ili solventno, oduzima joj dozvolu, a Agencija za osiguranje depozita isplaćuje štediše.",
  basis:"Zakon o bankama; Zakon o osiguranju depozita; Zakon o stečaju i likvidaciji banaka",
  steps:[
   {a:"nbs",w:"NBS",t:"Nadzor i mere",d:"Kontrola poslovanja; nalozi za otklanjanje nepravilnosti i novčane kazne."},
   {a:"nbs",w:"NBS",t:"Oduzimanje dozvole",d:"Rešenjem kojim se oduzima dozvola utvrđuju se i uslovi za stečaj ili likvidaciju."},
   {a:null,w:"Agencija za osiguranje depozita",t:"Isplata i upravljanje",d:"Agencija postaje stečajni upravnik i isplaćuje osigurane depozite.",r:"do 50.000 € po štediši"},
   {a:"osnovni",w:"Privredni sud",t:"Otvaranje stečaja",d:"Sud otvara stečaj; imovina se prodaje i namiruju poverioci."},
   {a:"tok",w:"Tužilaštvo",t:"Krivična odgovornost",d:"Ako postoji sumnja da je iz banke izvlačen novac, tužilaštvo vodi postupak nezavisno od stečaja."}],
  ends:[["Stečaj","Banka prestaje da postoji."]],
  checks:["Upravni sud po tužbi protiv rešenja NBS.","Skupština bira guvernera i razmatra izveštaje NBS."],
  ev:["NBS oduzima dozvolu Alta banci","Otvoren stečaj nad Alta bankom","NBS kažnjava Alta Group"]},

 /* ---------- Lokalna vlast ---------- */
 {id:"razresenje-gradonacelnika",n:"Razrešenje gradonačelnika",b:"lok",inst:["skupstinabg","gradonacelnik","gradovi","opstine"],
  sum:"Gradonačelnika ili predsednika opštine skupština može razrešiti na obrazložen predlog najmanje trećine odbornika, istom većinom kojom je izabran.",
  basis:"Zakon o lokalnoj samoupravi; Zakon o glavnom gradu; Statut Grada Beograda",
  steps:[
   {a:"skupstinabg",w:"Trećina odbornika",t:"Obrazložen predlog",d:"U Beogradu je to najmanje 37 od 110 odbornika."},
   {a:"skupstinabg",w:"Predsednik skupštine grada",t:"Sednica",d:"Saziva sednicu; za rad je potrebna većina odbornika (kvorum)."},
   {a:"skupstinabg",w:"Skupština grada",t:"Tajno glasanje",d:"Razrešenje prolazi ako za njega glasa većina svih odbornika (u Beogradu 56)."},
   {a:"skupstinabg",w:"Skupština grada",t:"Posledice",d:"Razrešenjem gradonačelnika prestaje mandat i zamenika i gradskog veća; bira se novi gradonačelnik."}],
  ends:[["Razrešen","Skupština bira novog; ako ne uspe u roku, Vlada je raspušta."],["Odbijen predlog","Isti odbornici ne mogu ponoviti predlog pre isteka šest meseci."]],
  checks:["Ostavka je drugi put do prestanka mandata.","Vlada kontroliše zakonitost rada lokalnih organa."],
  ev:["Gradska skupština o razrešenju Šapića","Sednica o smeni Šapića bez kvoruma","Šapić: „Nisam i ne planiram“","Zahtevi za ostavku Šapića","U Novom Sadu traže ostavku gradonačelnika","Dašić o ostavci u Kragujevcu"]},

 {id:"raspustanje-lokalne",n:"Raspuštanje lokalne skupštine",b:"lok",inst:["vlada","skupstinabg","gradovi","opstine"],
  sum:"Vlada raspušta skupštinu opštine ili grada koja ne radi (ne zaseda, ne bira izvršne organe, ne donese budžet) i postavlja privremeni organ do novih izbora.",
  basis:"Zakon o lokalnoj samoupravi; Zakon o glavnom gradu",
  steps:[
   {a:"skupstinabg",w:"Lokalna skupština",t:"Razlog",d:"Skupština ne zaseda duže od tri meseca, ne izabere predsednika opštine ili gradonačelnika u roku, ili ne donese statut ili budžet."},
   {a:"vlada",w:"Vlada",t:"Rešenje o raspuštanju",d:"Na predlog ministarstva za lokalnu samoupravu Vlada raspušta skupštinu i imenuje privremeni organ."},
   {a:"skupstina",w:"Predsednik Narodne skupštine",t:"Raspisivanje izbora",d:"Raspisuje izbore za novu lokalnu skupštinu.",r:"izbori za najviše 60 dana"}],
  ends:[["Novi izbori","Lokalna skupština se bira ponovo."]],
  checks:["Lokalna vlast može pred Ustavnim sudom osporiti rešenje Vlade.","Privremeni organ obavlja samo neodložne poslove."],
  ev:["Lokalni izbori u deset mesta"]}
];

/* Veza vesti sa mehanizmima, po delu naslova */
const MBY=Object.fromEntries(MECH.map(m=>[m.id,m]));
EV.forEach(e=>{const t=e.t.toLowerCase();e.mh=MECH.filter(m=>m.ev.some(s=>t.includes(s.toLowerCase()))).map(m=>m.id)});
/* Mehanizmi bitni za instituciju: oni gde je navedena ili je akter u nekom koraku */
const mechFor=id=>MECH.filter(m=>m.inst.includes(id)||m.steps.some(s=>s.a===id));
/* Vesti u kojima je mehanizam korišćen, najnovije prve */
const mechEv=id=>EV.filter(e=>e.mh.includes(id)).sort((a,b)=>b.d.localeCompare(a.d));
/* Samo ono što se već desilo (bez najavljenih događaja), za „korišćen“ i redosled */
const mechUsed=id=>mechEv(id).filter(e=>e.p!=="fu");
