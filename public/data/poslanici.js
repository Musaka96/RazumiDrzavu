/* Poslanici novog saziva Narodne skupštine (konstituisan 17. 11. 2026) — ključna imena, uz izvore. Stanje: 18. 11. 2026, uveče; predsednik Skupštine još nije izabran.
   Unos: id (postojeća osoba iz ljudi.js ili nova), za novu osobu i n, m, role, desc;
   g = lista (sl, sns, svm, alb, sdp, sda, spp), party = stranka, fn = funkcija u Skupštini,
   prev = [[id institucije ili null, funkcija]], s = izvori, u:1 = nepotvrđeno (jedan izvor ili samo provladini/tabloidni mediji).
   Nove osobe se dodaju u PEOPLE sa room:"skupstina", pa rade pretraga, prepoznavanje imena u vestima i panel. */
const _S={
 r021:["021.rs, 17. 11.","https://www.021.rs/info/srbija/461594/gotovo-za-danas-aleksandar-cupic-ce-biti-predsednik-skupstine-vucicev-govor-trajao-sat-i-40-minuta"],
 danas:["Danas, prenos 18. 11.","https://www.danas.rs/vesti/politika/sednica-skupstine-konstitutivna-uzivo-nastavak-predsednik/"],
 n1:["N1, prenos 18. 11.","https://n1info.rs/vesti/blog-nastavak-konstitutivne-sednice-skupstine-srbije-uzivo-2026/"],
 b92:["B92, 18. 11.","https://www.b92.net/info/politika/285954/konstitutivna-sednica-skupstine-18-novembar/vest"],
 mondo:["Mondo, spisak 250 poslanika","https://mondo.rs/Info/Politika/a2312139/kompletan-spisak-svih-250-poslanika-i-raspodela-mandata-po-listama.html"],
 kons:["Novosti, konsultacije","https://www.novosti.rs/vesti/politika/1670765/skupstini-odrzane-konsultacije-stolom-predstavnici-studentske-liste-ujedinjene-srbije-manjina"],
 kurir:["Kurir, poznata imena","https://www.kurir.rs/vesti/politika/10155150/poznata-imena-u-novom-sazivu-skupstine-srbije"]
};
const MP_LIST=[
 /* Studentska lista */
 {id:"bakic",n:"Jovo Bakić",m:`Bakić${L}{0,3}`,role:"Šef poslaničke grupe Studentske liste.",desc:"Sociolog, profesor Filozofskog fakulteta u Beogradu. Jedno od najistaknutijih lica Studentske liste.",
  g:"sl",party:"nestranački",fn:"Šef poslaničke grupe",prev:[],s:[_S.r021,_S.danas,_S.n1]},
 {id:"stimac",n:"Aleksandra Štimac",m:`Štimac`,role:"Zamenica šefa poslaničke grupe Studentske liste.",desc:"Najavila je da će Studentska lista predlog za predsednika Skupštine podneti pismeno.",
  g:"sl",party:"nestranački",fn:"Zamenica šefa poslaničke grupe",prev:[],u:1,s:[_S.r021,_S.mondo]},
 {id:"cupic",n:"Aleksandar Čupić",m:`Čupić${L}{0,3}`,role:"Kandidat Studentske liste za predsednika Skupštine.",desc:"Docent Saobraćajnog fakulteta u Beogradu, rođen 1978. u Prokuplju. Predlog je potpisalo svih 140 poslanika Studentske liste; podršku su najavili SVM i SPP.",
  g:"sl",party:"nestranački",fn:"Kandidat za predsednika Skupštine",prev:[["studenti","Pregovarač na konsultacijama 13. 11. 2026."]],s:[["021.rs, ko je Čupić","https://www.021.rs/info/srbija/461600/ko-je-aleksandar-cupic-predsednik-skupstine-i-vd-predsednik-srbije"],_S.danas,_S.n1]},
 {id:"srdanovic",g:"sl",party:"nestranački",fn:"Nosilac liste",prev:[],s:[_S.r021,_S.danas]},
 {id:"reljanovic",n:"Mario Reljanović",m:`Reljanović${L}{0,3}`,role:"Poslanik Studentske liste.",desc:"Stručnjak za radno pravo. Predstavljao je Studentsku listu na konsultacijama pred konstitutivnu sednicu.",
  g:"sl",party:"nestranački",fn:null,prev:[["studenti","Pregovarač na konsultacijama 13. 11. 2026."]],u:1,s:[_S.kons,_S.mondo]},
 {id:"jgasic",n:"Jugoslav Gašić",m:`Jugoslav${L}{0,2}\\sGašić${L}{0,3}`,role:"Poslanik Studentske liste.",desc:"U ime poslaničke grupe obrazložio je kandidaturu Aleksandra Čupića.",
  g:"sl",party:"nestranački",fn:null,prev:[],s:[_S.r021,_S.danas]},
 {id:"belic",n:"Sanja Belić",m:`Belić${L}{0,3}`,role:"Poslanica Studentske liste.",desc:"Na sednici je izložila predlog Studentske liste za predsednika Skupštine.",
  g:"sl",party:"nestranački",fn:null,prev:[],s:[_S.danas,_S.b92]},
 {id:"scepanovic",n:"Katarina Šćepanović",m:`Šćepanović${L}{0,3}`,role:"Poslanica Studentske liste.",desc:"Profesorka Filološke gimnazije, peta na listi. Pre sednice pominjana kao moguća predsednica Skupštine.",
  g:"sl",party:"nestranački",fn:null,prev:[],u:1,s:[_S.mondo,["Novosti","https://www.novosti.rs/vesti/politika/1671524/jos-zna-novi-celnik-parlamenta-konstitutivna-sednica-narodne-skupstine-zakazana-sutra-poznate-tacke-dnevnog-reda"]]},
 {id:"valentik",n:"Sara Valentik",m:`Valentik${L}{0,3}`,role:"Poslanica Studentske liste.",desc:"Najmlađa poslanica liste; na konstitutivnoj sednici pomaže predsedavajućem. Bakić je najavio da će biti potpredsednica Skupštine.",
  g:"sl",party:"nestranački",fn:"Najavljena za potpredsednicu Skupštine",prev:[],u:1,s:[["SD.rs","https://www.sd.rs/vesti/info/jovo-bakic-otkrio-ko-ce-biti-potpredsednik-skupstine-srbije-2026-11-17"],_S.b92,_S.mondo]},
 {id:"soskic",g:"sl",party:"nestranački",fn:null,prev:[["nbs","Guverner NBS 2010–2012."]],s:[_S.r021,["Wikipedia","https://sr.wikipedia.org/sr-el/Dejan_Šoškić"]]},
 {id:"hubac",n:"Željko Hubač",m:`Hubač${L}{0,3}`,role:"Poslanik Studentske liste.",desc:"Dramaturg, treći na listi. Govorio je u prilog kandidaturi Čupića.",
  g:"sl",party:"nestranački",fn:null,prev:[],s:[_S.danas,_S.kurir]},
 {id:"bodiroga",n:"Dejan Bodiroga",m:`Bodirog${L}{1,2}`,role:"Poslanik Studentske liste.",desc:"Bivši košarkaš, jedno od najpoznatijih imena na listi.",
  g:"sl",party:"nestranački",fn:null,prev:[],s:[_S.r021,_S.kurir]},
 {id:"dimovic",n:"Feđa Dimović",m:`Dimović${L}{0,3}`,role:"Poslanik Studentske liste.",desc:"Pravnik i član hip-hop grupe Beogradski sindikat.",
  g:"sl",party:"nestranački",fn:null,prev:[],s:[_S.r021,_S.kurir]},
 {id:"stanic",n:"Tihomir Stanić",m:`Tihomir${L}{0,2}\\sStanić${L}{0,3}`,role:"Poslanik Studentske liste.",desc:"Glumac, osmi na listi.",
  g:"sl",party:"nestranački",fn:null,prev:[],s:[_S.r021,_S.kurir]},
 /* Lista SNS */
 {id:"vucic",g:"sns",party:"SNS",fn:"Šef poslaničke grupe",prev:[["predsednik","Predsednik Republike 2017–2026."],["vlada","Predsednik Vlade 2014–2017."],["sns","Predsednik SNS 2012–2023."]],s:[_S.r021,_S.n1,_S.b92]},
 {id:"radenovic",g:"sns",party:"SNS",fn:"Predsedava sednicom kao najstariji poslanik; kandidat za predsednika Skupštine",prev:[["skupstina","Narodni poslanik od 2022."]],s:[_S.r021,_S.danas,["Novosti","https://www.novosti.rs/vesti/politika/1669218/stojan-radenovic-skupstina-srbije"]]},
 {id:"vucevic",g:"sns",party:"SNS",fn:null,prev:[["sns","Predsednik SNS od 2023."],["vlada","Predsednik Vlade 2024–2025."],["vojska","Ministar odbrane 2020–2024."],["gradovi","Gradonačelnik Novog Sada 2012–2022."]],s:[_S.danas,["Wikipedia","https://sr.wikipedia.org/sr-el/Miloš_Vučević"]]},
 {id:"brnabic",g:"sns",party:"SNS",fn:"Odlazeća predsednica Skupštine",prev:[["skupstina","Predsednica Narodne skupštine 2024–2026."],["vlada","Predsednica Vlade 2017–2024."],["predsednik","V.d. predsednika Republike od 28. 9. 2026."]],s:[_S.danas,_S.kons]},
 {id:"jovanov",n:"Milenko Jovanov",m:`Jovanov(?!ić)${L}{0,2}`,role:"Poslanik liste SNS.",desc:"Šesti na listi. Bio je pregovarač na konsultacijama i govorio u ime grupe u prilog Radenoviću.",
  g:"sns",party:"SNS",fn:null,prev:[["skupstina","Šef poslaničke grupe SNS u prethodnom sazivu"]],s:[_S.r021,_S.kons]},
 {id:"selakovic",n:"Nikola Selaković",m:`Selaković${L}{0,3}`,role:"Poslanik liste SNS; član Predsedništva SNS.",desc:"Sedmi na listi. Bio je ministar u više vlada. Ustav (čl. 102) ne dozvoljava narodnom poslaniku funkciju u izvršnoj vlasti; sajt Vlade ga i dalje navodi kao ministra.",
  g:"sns",party:"SNS",fn:null,prev:[["minkult","Ministar kulture od 2024; status posle 17. 11. 2026. nerazjašnjen"],["vlada","Ministar spoljnih poslova 2020–2022."],["minpravde","Ministar pravde 2012–2016."],["predsednik","Generalni sekretar predsednika 2017–2020."]],s:[["Narodna skupština, aktuelni saziv","https://www.parlament.gov.rs/narodna-skupstina-/sastav/narodni-poslanici/aktuelni-saziv.890.html"],["CRTA, spisak 250 poslanika","https://crta.plus/updates/new-national-assembly-list-of-250-mps-2026/"],_S.r021,["Wikipedia","https://sr.wikipedia.org/sr-el/Nikola_Selaković"]]},
 {id:"mesarovic",n:"Adrijana Mesarović",m:`Mesarović${L}{0,3}`,role:"Narodna poslanica liste SNS; prema sajtu Vlade potpredsednica Vlade i ministarka privrede.",desc:"Šesnaesta na listi, iz Novog Sada. Ustav (čl. 102) ne dozvoljava narodnom poslaniku funkciju u izvršnoj vlasti; sajt Vlade je i dalje navodi kao ministarku.",
  g:"sns",party:"SNS",fn:null,prev:[["ministarstva","Ministarka privrede od 2024; status posle 17. 11. 2026. nerazjašnjen"],["vlada","Potpredsednica Vlade od 2025."]],s:[["Narodna skupština, aktuelni saziv","https://www.parlament.gov.rs/narodna-skupstina-/sastav/narodni-poslanici/aktuelni-saziv.890.html"],["CRTA, spisak 250 poslanika","https://crta.plus/updates/new-national-assembly-list-of-250-mps-2026/"],_S.mondo]},
 {id:"ragus",n:"Marina Raguš",m:`Raguš`,role:"Poslanica liste SNS.",desc:"Peta na listi. Govorila je u raspravi o izboru predsednika Skupštine.",
  g:"sns",party:"SNS",fn:null,prev:[["skupstina","Potpredsednica Narodne skupštine 2024–2026."]],s:[_S.danas,_S.mondo]},
 {id:"mrdic",g:"sns",party:"SNS",fn:null,prev:[["skupstina","Narodni poslanik od 2020."]],u:1,s:[_S.mondo,["Wikipedia","https://en.wikipedia.org/wiki/Uglješa_Mrdić"]]},
 {id:"lecic",n:"Branislav Lečić",m:`Lečić${L}{0,3}`,role:"Poslanik liste SNS.",desc:"Glumac, petnaesti na listi.",
  g:"sns",party:"nestranački",fn:null,prev:[["vlada","Ministar kulture i informisanja 2001–2004."]],s:[_S.r021,["Wikipedia","https://sr.wikipedia.org/sr-el/Branislav_Lečić"]]},
 {id:"radeta",n:"Vjerica Radeta",m:`Vjeric${L}{1,2}\\sRadet${L}{1,2}`,role:"Poslanica liste SNS (SRS).",desc:"Funkcionerka Srpske radikalne stranke; jedna od četiri poslanika SRS izabrana na listi SNS.",
  g:"sns",party:"SRS",fn:"Predsednica verifikacionog odbora",prev:[["skupstina","Narodna poslanica u više saziva"]],u:1,s:[_S.r021,_S.mondo]},
 {id:"vukicevic",n:"Lidija Vukićević",m:`Vukićević${L}{0,3}`,role:"Poslanica liste SNS.",desc:"Glumica, deveta na listi.",
  g:"sns",party:"SNS",fn:null,prev:[],s:[_S.r021,_S.danas]},
 /* Manjinske liste */
 {id:"pastor",n:"Balint Pastor",m:`Balint${L}{0,2}\\sPastor${L}{0,2}|Pastor${L}{0,2}`,role:"Predsednik SVM; narodni poslanik.",desc:"Najavio je da SVM glasa za Čupića i da ne podržava mesto potpredsednika Skupštine za opoziciju. Predlaže da manjinski poslanici mogu da obrazuju grupu od tri člana.",
  g:"svm",party:"SVM",fn:"Predstavnik SVM",prev:[["skupstina","Narodni poslanik u ranijim sazivima"]],s:[_S.danas,_S.mondo]},
 {id:"bajic",n:"Boris Bajić",m:`Bajić${L}{0,3}`,role:"Poslanik SVM.",desc:"Predstavljao je SVM na konsultacijama pred konstitutivnu sednicu.",
  g:"svm",party:"SVM",fn:null,prev:[],u:1,s:[_S.mondo,_S.kons]},
 {id:"kamberi",n:"Šaip Kamberi",m:`Kamberi${L}{0,2}`,role:"Nosilac Albanske koalicije.",desc:"Lider Partije za demokratsko delovanje.",
  g:"alb",party:"PDD",fn:null,prev:[["skupstina","Narodni poslanik u prethodnom sazivu"]],u:1,s:[_S.mondo,_S.kurir]},
 {id:"mehmeti",n:"Visar Mehmeti",m:`Mehmeti${L}{0,2}`,role:"Poslanik Albanske koalicije.",desc:"Predstavnik Alternative za promene iz Preševa.",
  g:"alb",party:"Alternativa za promene",fn:null,prev:[],u:1,s:[_S.mondo,_S.kurir]},
 {id:"zukorlic",g:"spp",party:"SPP",fn:null,prev:[["ministarstva","Ministar bez portfelja od 2024; status posle 17. 11. 2026. nerazjašnjen"],["skupstina","Narodni poslanik od 2022."]],s:[_S.danas,_S.n1,["CRTA, spisak 250 poslanika","https://crta.plus/updates/new-national-assembly-list-of-250-mps-2026/"],["Sandžakpress (Naslovi)","https://naslovi.net/2026-11-17/sandzakpress/zukorlic-prisustvovao-konstituisanju-novog-saziva-narodne-skupstine-srbije/42616512"]]},
 {id:"skrijelj",n:"Ahmedin Škrijelj",m:`Škrijelj${L}{0,3}`,role:"Nosilac liste SDA Sandžaka.",desc:"Predstavljao je listu na konsultacijama pred konstitutivnu sednicu.",
  g:"sda",party:"SDA Sandžaka",fn:null,prev:[],u:1,s:[_S.mondo,_S.kons]}
];
/* Šefovi poslaničkih grupa (id osobe), po listi */
const MP_HEADS={sl:"bakic",sns:"vucic"};

const MPS={};
MP_LIST.forEach(x=>{
  let p=PEOPLE.find(q=>q.id===x.id);
  if(!p&&x.n){p={id:x.id,n:x.n,m:x.m,room:"skupstina",role:x.role,desc:x.desc};PEOPLE.push(p)}
  if(p)MPS[x.id]=x;
});
