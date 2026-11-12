/* Pokrajina, Beograd, gradovi i opštine (verzija 4).
   Zamenjuje zajedničku instituciju „lokalna“ sa šest organa i premešta njene vesti, ljude i veze.
   Stanje: 12. 11. 2026. Izvori za brojeve i strukturu: Ustav (čl. 183–192), Zakon o lokalnoj samoupravi, Zakon o glavnom gradu, Statut APV. */

Object.assign(INST,{
 skupstinaapv:{n:"Skupština AP Vojvodine",p:"Skupština AP Vojvodine",b:"lok",head:"Predsednik Balint Juhas (SVM, od 25. 4. 2024.); vladajuća većina oko 78 od 120 mesta",short:"B. Juhas · 120 poslanika",
  role:"Predstavničko telo pokrajine: donosi Statut uz saglasnost Narodne skupštine, pokrajinske odluke i budžet, bira i razrešava Pokrajinsku vladu. Izabrana 17. 12. 2023; redovni pokrajinski izbori očekuju se početkom 2028.",chosen:"Građani, neposredno; 120 poslanika",term:"4 godine"},
 vladaapv:{n:"Pokrajinska vlada AP Vojvodine",p:"Pokrajinska vlada",b:"lok",head:"Predsednica Maja Gojković (od 8. 5. 2024.)",short:"M. Gojković",
  role:"Izvršni organ pokrajine: sprovodi pokrajinske odluke i budžet preko pokrajinskih sekretarijata i odgovara Skupštini AP Vojvodine. Posle izbora 25. 10. opozicija traži ostavku predsednice, a 5. 11. uhapšen je pokrajinski sekretar za socijalnu politiku.",chosen:"Skupština AP Vojvodine, većinom svih poslanika, na predlog predsednika Skupštine",term:"Kao Skupština AP Vojvodine"},
 skupstinabg:{n:"Skupština grada Beograda",p:"Skupština grada Beograda",b:"lok",head:"Predsednik Nikola Nikodijević (SPS, od 21. 6. 2024.); 110 odbornika",short:"N. Nikodijević · 110 odbornika",
  role:"Donosi Statut grada, budžet i planove i bira i razrešava gradonačelnika i Gradsko veće. Sednica o smeni gradonačelnika 13. 10. 2026. nije imala kvorum; nastavak je zakazan za 23. 11.",chosen:"Građani, neposredno; 110 odbornika",term:"4 godine"},
 gradonacelnik:{n:"Gradonačelnik i Gradsko veće Beograda",p:"Gradonačelnik Beograda",b:"lok",head:"Gradonačelnik Aleksandar Šapić (SNS; od 2022, ponovo od 24. 6. 2024.)",short:"A. Šapić",
  role:"Izvršni organ glavnog grada. Gradonačelnik predstavlja grad i predsedava Gradskim većem (gradonačelnik, zamenik i 13 članova), koje sprovodi odluke Skupštine i budžet. Razrešenje može predložiti najmanje trećina odbornika.",chosen:"Skupština grada, tajnim glasanjem, većinom svih odbornika",term:"4 godine"},
 gradovi:{n:"Gradovi",p:"Gradovi",b:"lok",head:"Npr. Novi Sad – Žarko Mićin, Niš – Dragoslav Pavlović, Kragujevac – Nikola Dašić (svi SNS)",short:"Novi Sad · Niš · Kragujevac…",
  role:"Građani biraju skupštinu grada, a ona gradonačelnika i gradsko veće. Posle izbora 25. 10. u Novom Sadu, Nišu i Kragujevcu traže se ostavke gradonačelnika i vanredni lokalni izbori; nijedni nisu raspisani. Do vanrednih izbora vodi razrešenje ili ostavka, pa raspuštanje skupštine koja ne izabere nove organe u roku od mesec dana.",chosen:"Građani biraju skupštinu; skupština bira gradonačelnika",term:"4 godine"},
 opstine:{n:"Opštine",p:"Opštine",b:"lok",head:"Više od sto opština; 29. 3. 2026. glasalo se u deset jedinica lokalne samouprave",short:"skupštine i predsednici opština",
  role:"Izvorni poslovi kao kod gradova, u manjem obimu: komunalne usluge, lokalni putevi, budžet, urbanizam. Skupština opštine bira predsednika opštine i opštinsko veće.",chosen:"Građani biraju skupštinu; skupština bira predsednika opštine",term:"4 godine"}
});
delete INST.lokalna;

/* Veze: ukloni stare veze „lokalne vlasti“ i dodaj nove */
for(let i=LINKS.length-1;i>=0;i--)if(LINKS[i][0]==="lokalna"||LINKS[i][1]==="lokalna")LINKS.splice(i,1);
LINKS.push(
 ["gradjani","skupstinaapv","biraju poslanike"],["gradjani","skupstinabg","biraju odbornike"],["gradjani","gradovi","biraju odbornike"],["gradjani","opstine","biraju odbornike"],
 ["skupstinaapv","vladaapv","bira i razrešava"],["skupstinabg","gradonacelnik","bira i razrešava"],
 ["skupstina","skupstinaapv","daje saglasnost na Statut"],["vlada","vladaapv","nadzire zakonitost rada"],
 ["vlada","skupstinabg","može raspustiti skupštinu"],["vlada","gradovi","nadzire zakonitost; može raspustiti skupštinu"],["vlada","opstine","nadzire zakonitost; može raspustiti skupštinu"],
 ["ravnopravnost","gradovi","postupa po pritužbama na diskriminaciju"]
);

/* Vesti: premesti iz „lokalna“ u nove organe */
const LOK_MAP={
 "2026-10-27":["skupstinabg","gradonacelnik"],
 "2026-11-07":["gradovi"],
 "2026-11-09":["skupstinaapv","vladaapv"],
 "2026-11-23":["skupstinabg","gradonacelnik"]
};
EV.forEach(e=>{const k=e.i.indexOf("lokalna");if(k<0)return;e.i.splice(k,1,...(LOK_MAP[e.d]||["gradovi"]))});
(e=>{if(e)e.s.push(["021","https://www.021.rs/novi-sad/vesti/460600/pokrajina-spremacice-uznemiravane-dok-su-odnosile-smece-slucaj-ce-biti-prijavljen-policiji"],["Novosti","https://www.novosti.rs/hronika/zlocin/1669706/netacno-privedene-22-spremacice-novosadsko-ojt-uprava-zajenicke-poslve-pokrajinskih-organa-demantovali-objave-medijima"])})(EV.find(e=>e.d==="2026-11-09"&&e.i.includes("vladaapv")));

EV.push(
 {d:"2026-03-29",p:"bg",t:"Lokalni izbori u deset mesta",x:"Glasalo se u Aranđelovcu, Bajinoj Bašti, Boru, Kladovu, Knjaževcu, Kuli, Lučanima, Majdanpeku, Smederevskoj Palanci i Sevojnu. Po preliminarnim rezultatima lista SNS je vodila svuda; u Kuli razlika prema listi koju podržavaju studenti bila je oko dva procenta.",i:["opstine","gradovi","gradjani"],s:[["Savremena politika","https://savremenapolitika.com/svi-rezultati-na-jednom-mestu-lokalni-izbori-29-marta-2026/"],["Danas","https://www.danas.rs/vesti/politika/prvi-rezultati-lokalni-izbori-2026-u-deset-mesta-u-srbiji/"]]},
 {d:"2026-10-13",p:"el",t:"Sednica o smeni Šapića bez kvoruma",x:"Posle optužbe odbornice Tatjane Mićić (Kreni-promeni) da ju je gradonačelnik udario, 41 odbornik je tražio vanrednu sednicu o razrešenju. Sednici je prisustvovalo 47 od 110 odbornika, a većina nije došla; predsednik Skupštine Nikodijević zakazao je nastavak za 23. 11.",i:["skupstinabg","gradonacelnik"],s:[["Nova ekonomija","https://novaekonomija.rs/vesti-iz-zemlje/bez-kvoruma-za-sednicu-o-smeni-aleksandra-sapica-nastavak-sednice-23-novembra"],["Nova","https://nova.rs/vesti/politika/moze-li-sns-uskoro-da-padne-i-u-beogradu-vlast-je-izgubila-legitimitet-pobedom-studentske-liste-u-svih-17-beogradskih-opstina-a-23-novembra-nas-ceka-i-vazna-sednica"]]},
 {d:"2026-10-27",p:"el",t:"Radnicima GSP-a kasne plate",x:"Prvi put je izostala akontacija plata radnicima gradskog prevoza. Kritičari navode dugove gradskih preduzeća veće od 30 milijardi dinara; predsednik Skupštine grada osporava da postoji kriza.",i:["gradonacelnik","skupstinabg"],s:[["N1","https://n1info.rs/vesti/radnicima-gsp-a-kasne-plate-iz-psg-a-traze-ostavku-gradonacelnika-sapica"],["Vreme","https://vreme.com/vesti/beograd-na-ivici-bankrota-grad-duguje-30-milijardi-dinara/"],["Al Jazeera Balkans","https://balkans.aljazeera.net/news/balkan/2026/10/27/izborni-sok-i-gradska-kasa-koliko-jos-moze-opstati-sapiceva-vlast"]]},
 {d:"2026-10-28",p:"el",t:"Šapić: „Nisam i ne planiram“ ostavku",x:"Gradonačelnik odbacuje zahteve za ostavku posle izbora na kojima je Studentska lista pobedila u svih 17 beogradskih opština.",i:["gradonacelnik"],s:[["Srpske","https://srpske.rs/vesti/politika/2026/10/28/sapic-posle-poraza-ujedinjene-srbije-ne-podnosim-ostavku"],["Srpska info","https://srpskainfo.com/politika/sapicu-se-trese-fotelja-nakon-izbora-sve-vise-zahtjeva-za-ostavku-gradonacelnika/"]]},
 {d:"2026-10-28",p:"el",t:"U Novom Sadu traže ostavku gradonačelnika",x:"Pokret Bravo traži ostavke gradonačelnika Žarka Mićina i predsednice Skupštine grada Dine Vučinić i vanredne izbore. Mićin odbija i kaže da SNS ima stabilnu većinu; Studentska lista kaže da lokalni izbori dolaze posle formiranja republičke vlasti.",i:["gradovi"],s:[["021","https://www.021.rs/novi-sad/vesti/459499/bravo-danas-trazi-ostavku-micina-on-ne-planira-da-ode-imamo-stabilnu-vecinu-u-skupstini"]]},
 {d:"2026-10-29",p:"el",t:"Gradonačelnik Niša se oglasio posle izbora",x:"Dragoslav Pavlović priznaje poraz SNS-a ali ne govori o ostavci. Građanske grupe skupljaju potpise za njegovu smenu i vanredne lokalne izbore; potpisivanje na ulici je od 12. do 14. novembra.",i:["gradovi"],s:[["Južne vesti","https://www.juznevesti.com/drustvo/pojavio-se-gradonacelnik-nisa-cestitao-i-rekao-da-ce-se-u-skladu-s-novim-talasom-opredeliti-za-dalje-korake/"],["Južne vesti, peticija","https://www.juznevesti.com/politika/potpisivanje-peticije-za-smenu-gradonacelnika-i-za-vanredne-lokalne-izbore-na-tri-lokacije-u-nisu/"]]},
 {d:"2026-11-03",p:"el",t:"Dašić o ostavci u Kragujevcu",x:"Gradonačelnik Kragujevca Nikola Dašić, kome je pokret iz opozicije tražio ostavku, kaže da funkciju „neće braniti životom“, ali ni „sedeti kao fikus“. Ostavku nije podneo.",i:["gradovi"],s:[["iKragujevac (preko Naslovi)","https://naslovi.net/2026-11-03/ikragujevac/dasic-o-izbornim-rezultatima-ostavci-i-buducnosti-kragujevca-necu-braniti-svoju-funkciju-zivotom-ali-necu-ni-sedeti-kao-fikus/42564499"]]},
 {d:"2026-11-05",p:"el",t:"Uhapšen pokrajinski sekretar",x:"Uhapšeni su pokrajinski sekretar za socijalnu politiku, demografiju i ravnopravnost polova Predrag Vuletić i predsednik jedne komisije za dodelu sredstava, zbog sumnje na zloupotrebu položaja i štetu od oko 131 milion dinara. Gojković poziva na poštovanje pretpostavke nevinosti.",i:["vladaapv","tuzilastva","mup"],s:[["N1","https://n1info.rs/vesti/maja-gojkovic-o-hapsenju-pokrajinskog-sekretara-postujte-pretpostavku-nevinosti"]]},
 {d:"2026-11-05",p:"el",t:"Skupština Vojvodine o legitimitetu pokrajinske vlasti",x:"Na sednici o rebalansu budžeta opozicija tvrdi da je vlast izgubila legitimitet. Gojković odgovara da institucije rade dok imaju većinu, a predsednik Skupštine Juhas da se vlast oslanja na izbore iz 2023.",i:["skupstinaapv","vladaapv"],s:[["NS uživo","https://nsuzivo.rs/novi-sad/skupstina-vojvodine-raspravljala-o-legitimitetu-pokrajinske-vlasti-nakon-izbora-gojkovic-odbacila-tvrdnje-opozicije/"]]}
);

/* Ljudi */
PEOPLE.forEach(p=>{if(p.id==="gojkovic")p.room="vladaapv";if(p.id==="sapic")p.room="gradonacelnik"});
PEOPLE.push(
 {id:"juhas",n:"Balint Juhas",m:`Juhas${L}{0,3}`,room:"skupstinaapv",role:"Predsednik Skupštine AP Vojvodine (SVM).",desc:"Na čelu Skupštine Vojvodine od 25. 4. 2024."},
 {id:"nikodijevic",n:"Nikola Nikodijević",m:`Nikodijević${L}{0,3}`,room:"skupstinabg",role:"Predsednik Skupštine grada Beograda (SPS).",desc:"Četvrti mandat zaredom, od 21. 6. 2024. Zakazao je nastavak sednice o smeni gradonačelnika za 23. 11. 2026."},
 {id:"micin",n:"Žarko Mićin",m:`Mićin${L}{0,3}`,room:"gradovi",role:"Gradonačelnik Novog Sada (SNS).",desc:"Na dužnosti od februara 2025. Odbija zahteve za ostavku posle izbora 25. 10. 2026."},
 {id:"pavlovic",n:"Dragoslav Pavlović",m:`Dragoslav${L}{0,2}\\sPavlović${L}{0,3}`,room:"gradovi",role:"Gradonačelnik Niša (SNS).",desc:"Na dužnosti od avgusta 2024. Građanske grupe skupljaju potpise za njegovu smenu."},
 {id:"dasic",n:"Nikola Dašić",m:`Dašić${L}{0,3}`,room:"gradovi",role:"Gradonačelnik Kragujevca (SNS).",desc:"Gradonačelnik od 2020. Opozicioni pokret traži njegovu ostavku i vanredne izbore."},
 {id:"vucinic",n:"Dina Vučinić",m:`Vučinić`,room:"gradovi",role:"Predsednica Skupštine grada Novog Sada.",desc:"Pokret Bravo je 28. 10. 2026. tražio njenu ostavku."},
 {id:"vuletic",n:"Predrag Vuletić",m:`Vuletić${L}{0,3}`,room:"vladaapv",role:"Pokrajinski sekretar za socijalnu politiku, demografiju i ravnopravnost polova.",desc:"Uhapšen 5. 11. 2026. zbog sumnje na zloupotrebu položaja. Optužnice nema; važi pretpostavka nevinosti."},
 {id:"micic",n:"Tatjana Mićić",m:`Tatjan${L}{0,2}\\sMićić`,room:"skupstinabg",role:"Odbornica Skupštine grada Beograda (Kreni-promeni).",desc:"Optužila je gradonačelnika Šapića da ju je udario 28. 9. 2026; on kaže da ju je samo odgurnuo."}
);

/* Nazivi u tekstu */
for(let i=ALIASES.length-1;i>=0;i--)if(ALIASES[i][0]==="lokalna")ALIASES.splice(i,1);
ALIASES.unshift(
 ["skupstinabg",`Skupštin${L}{1,3}\\sgrada(?:\\sBeograda)?`],
 ["skupstinaapv",`Skupštin${L}{1,3}\\s(?:APV|AP\\sVojvodine|Vojvodine)|Skupštin${L}{1,3}\\sAP\\sVojvodine`],
 ["vladaapv",`Pokrajinsk${L}{1,3}\\svlad${L}{1,2}`]
);
