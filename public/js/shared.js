/* Zajednički delovi: grane, piktogrami, vodiči, skraćenice, prepoznavanje imena, ćirilica, opisi odnosa. */
/* ---------- Grane i šrafure ---------- */
const BR={
 leg:{n:"Zakonodavna vlast i izbori",pat:"p-leg",c:"--c-leg"},exe:{n:"Izvršna vlast, bezbednost i odbrana",pat:"p-exe",c:"--c-exe"},
 jud:{n:"Sudska vlast",pat:"p-jud",c:"--c-jud"},pro:{n:"Javno tužilaštvo",pat:"p-pro",c:"--c-pro"},
 ind:{n:"Nezavisna tela",pat:"p-ind",c:"--c-ind"},lok:{n:"Pokrajina i lokalna vlast",pat:"p-lok",c:"--c-lok"},
 act:{n:"Akteri van institucija",pat:null,c:"--c-act"}
};

/* ---------- Piktogrami (24×24, crtani za ovu šemu) ---------- */
const dot=(x,y,r)=>`M${x-r} ${y}a${r} ${r} 0 1 0 ${2*r} 0a${r} ${r} 0 1 0 ${-2*r} 0`;
const ring=(n,r,s)=>Array.from({length:n},(_,k)=>{const a=k/n*2*Math.PI-Math.PI/2;return dot(12+r*Math.cos(a),12+r*Math.sin(a),s)}).join("");
const ICO={
 skupstina:"M3 18a9 9 0 0 1 18 0M6.5 18a5.5 5.5 0 0 1 11 0M2 18h20M10 15h4",
 predsednik:"M5 21V3M5 4h12l-2.5 3.5L17 11H5M3 21h4",
 vlada:"M5 10h14v5H5z"+dot(8,7,1.2)+dot(12,7,1.2)+dot(16,7,1.2)+dot(8,18,1.2)+dot(12,18,1.2)+dot(16,18,1.2),
 minpravde:"M5 4h14v16H5zM9 4v16M12 4v16M15 4v16",
 mup:"M12 3l7 3v5c0 5-3 8-7 10c-4-2-7-5-7-10V6zM12 8.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z",
 bia:"M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18M12 7.5a2.2 2.2 0 1 1 0 4.4a2.2 2.2 0 1 1 0-4.4M11 11.5l-1 5h4l-1-5",
 vojska:"M5 9l7-4 7 4M5 14l7-4 7 4M5 19l7-4 7 4",
 lokalna:"M3 20v-9l5-4 5 4v9M13 20v-6l4-3 4 3v6M2 20h20M7 20v-4h2v4",
 ustavni:"M3 5c3-1 6-1 9 1c3-2 6-2 9-1v14c-3-1-6-1-9 1c-3-2-6-2-9-1zM12 6v14",
 vss:dot(12,12,4)+ring(6,8,.9),
 vst:"M9 9h6v6H9z"+ring(6,8,.9),
 vrhovni:"M4 20h16M6 17h12M7 17V9M10 17V9M14 17V9M17 17V9M5 9h14L12 4z",
 apelacioni:"M8 20V8M5 11l3-3 3 3M16 20V5M13 8l3-3 3 3",
 upravni:"M9 4h6v5l3 3v3H6v-3l3-3zM5 19h14",
 osnovni:"M13 3l7 7M9 7l7 7M11 5l-4 4M15 9l-4 4M10 11l-6 6v3h3l6-6M13 21h8",
 vjt:"M10 3h4v3h-4zM12 6v4M5 10h14M5 10v4M12 10v4M19 10v4M3 14h4v3H3zM10 14h4v3h-4zM17 14h4v3h-4z",
 tok:"M9.5 14.5l5-5M8 11l-2 2a3.5 3.5 0 0 0 5 5l2-2M16 13l2-2a3.5 3.5 0 0 0-5-5l-2 2",
 tuzrz:"M4 5h16v4H4zM5 9h14v10H5zM10 13h4",
 vjtbg:"M10.5 4.5a6 6 0 1 1 0 12a6 6 0 1 1 0-12M15 15l5 5",
 tuzilastva:"M3 7h6l2 2h10v10H3z",
 rik:"M4 11h16v9H4zM9 14h6M8 11V4h8v7",
 rem:"M12 10v11M8 21h8M12 10l-3.5 11M12 10l3.5 11M8.5 6.5a5 5 0 0 1 7 0M6 4a8.5 8.5 0 0 1 12 0"+dot(12,9,.8),
 acas:"M6 7a6 2.5 0 1 0 12 0a6 2.5 0 1 0-12 0M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5",
 ombudsman:"M3 11a9 9 0 0 1 18 0zM12 11v7a2 2 0 0 1-4 0M12 2v2",
 poverenik:"M6 3h9l3 3v15H6zM10 13h4v4h-4zM10.5 13v-1.5a1.5 1.5 0 0 1 3 0",
 ravnopravnost:"M12 3a9 9 0 1 1 0 18a9 9 0 1 1 0-18M8 10h8M8 14h8",
 dri:"M5 3h14v18H5zM8 8h8M8 12h8M8 16h3M13.5 16l1.5 1.5L18 14.5",
 nbs:"M3 7h18v10H3zM6 10v4M18 10v4"+dot(12,12,2.5),
 gradjani:dot(12,7,2.5)+"M7 20a5 5 0 0 1 10 0"+dot(5,9.5,2)+dot(19,9.5,2)+"M1.5 18a3.5 3.5 0 0 1 5-3M22.5 18a3.5 3.5 0 0 0-5-3",
 studenti:"M9 9h12v4h-7.1A5 5 0 1 1 9 9zM11 9V7h3v2"+dot(9,14,1.3),
 sns:"M6 3h12v18H6zM9 8h6M9 12h6M9 16h3",
 posmatraci:dot(7,17,3.5)+dot(17,17,3.5)+"M10.5 16h3M4.5 14.5L6 6h3l1 8M19.5 14.5L18 6h-3l-1 8",
 eu:ring(12,8,1),
 javniservis:"M3 7h18v12H3zM8 3l4 4 4-4M7 22h10"
};
const icoSvg=(id,size)=>`<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${ICO[id]||""}"/></svg>`;

/* ---------- Putanje: kako funkcioniše ---------- */
const PATHS=[
 {id:"vlada-nastaje",view:"lanac",n:"Kako nastaje Vlada",steps:[
  ["gradjani","Građani glasaju","Biraju 250 poslanika po listama, uz cenzus od 3%.","25. 10. 2026."],
  ["rik","RIK utvrđuje rezultate","Rešava prigovore, ponavlja glasanje gde treba i dodeljuje mandate.","5–6. 11. 2026."],
  ["skupstina","Skupština se konstituiše","Potvrđuje se dve trećine mandata; od tog dana teče rok od 90 dana.","17. 11. 2026."],
  ["predsednik","Predsednik predlaže mandatara","Posle konsultacija sa poslaničkim grupama. Sada to radi v.d. predsednika.","sledi"],
  ["skupstina","Skupština bira Vladu","Većinom svih poslanika (126) glasa o programu i ministrima.","do sredine februara 2027."],
  ["vlada","Vlada preuzima dužnost","Tehnička vlada Đura Macuta tada predaje dužnost.","sledi"]]},
 {id:"zakon",view:"lanac",n:"Kako zakon postaje zakon",steps:[
  ["vlada","Predlog","Zakon najčešće predlaže Vlada, ali mogu i poslanici, kao kod „Mrdićevih zakona“.",""],
  ["skupstina","Usvajanje","Rasprava u odborima i na plenumu; po hitnom postupku sve može proći za nekoliko dana.",""],
  ["predsednik","Proglašenje","Predsednik proglašava zakon ukazom ili ga jednom vraća Skupštini.",""],
  ["ustavni","Ocena ustavnosti","Ustavni sud može da ukine zakon koji nije u skladu sa Ustavom.",""]]},
 {id:"krivicni",view:"nadredjenost",n:"Od prijave do presude",steps:[
  ["gradjani","Krivična prijava","Prijavu može podneti svako: građanin, advokat, institucija.",""],
  ["tuzilastva","Tužilaštvo vodi postupak","Nadležno tužilaštvo (osnovno, više ili TOK za organizovani kriminal) rukovodi istragom.",""],
  ["mup","Policija radi po nalogu","Hapšenja, pretresi i saslušanja izvršavaju se po nalogu tužioca.",""],
  ["osnovni","Optužnica i suđenje","Sud potvrđuje optužnicu i sudi u prvom stepenu.",""],
  ["apelacioni","Žalba","Apelacioni sud odlučuje o žalbama i optužnicama.",""],
  ["vrhovni","Zaštita zakonitosti","Vrhovni sud odlučuje o vanrednim pravnim lekovima, kao sada u slučaju nadstrešnice.",""]]},
 {id:"sudija",view:"lanac",n:"Kako se bira sudija i tužilac",steps:[
  ["skupstina","Skupština bira pravnike u savete","Po četiri istaknuta pravnika u VSS i VST.",""],
  ["vss","VSS bira sudije","Sudije i predsednike sudova bira Visoki savet sudstva, ne više Skupština.",""],
  ["vst","VST bira tužioce","Tužioce i glavne tužioce bira Visoki savet tužilaštva.",""],
  ["vjt","Izuzetak: Vrhovni javni tužilac","Njega bira Skupština, na predlog VST.",""]]},
 {id:"predsednik-izbor",view:"lanac",n:"Kako se bira predsednik",steps:[
  ["skupstina","Raspisivanje","Predsednik Skupštine raspisuje izbore 30 do 60 dana pre glasanja.","do 27. 11. 2026."],
  ["rik","RIK sprovodi izbore","Proglašava kandidate i utvrđuje rezultate.",""],
  ["gradjani","Glasanje","Pobeđuje kandidat sa više od polovine glasova izašlih; inače drugi krug.","do 27. 12. 2026."],
  ["predsednik","Zakletva pred Skupštinom","Mandat traje pet godina.",""]]},
 {id:"nadzor",view:"lanac",n:"Ko nadzire policiju i službe",steps:[
  ["tuzilastva","Tužilaštvo","U istragama policija radi po nalogu tužioca.",""],
  ["skupstina","Skupštinski odbori","Odbor za kontrolu službi bezbednosti nadzire BIA i VBA.",""],
  ["ombudsman","Zaštitnik građana","Kontroliše zakonitost rada policije i zatvora.",""],
  ["vlada","Vlada","Postavlja direktora policije i BIA.",""]]}
];

/* ---------- Slučajevi ---------- */
const CASES=[
 {id:"izbori",n:"Izbori 2026.",m:["vanredni izbori","raspuštena","rik proglašava","izbori; vučić","preliminarni","ponovno glasanje","ponovljeno glasanje","konačni rezultati","konstitutivn","raspisivanje predsedničkih","najkasniji dan","prijava birača","otvara predmete","obavezno uputstvo","ne uvodi informer","v.d. predsednika","podnosi ostavku"]},
 {id:"nadstresnica",n:"Nadstrešnica",m:["pad nadstrešnice","ostavka premijera","13 osumnjičenih","potvrđuje optužnicu","četvoro tužilaca","vraća tužioce","druga godišnjica","pred vrhovnim sudom","sukob tok-a"]},
 {id:"zakoni",n:"Pravosudni zakoni",m:["mrdić","venecijanska","revidirane","četvoro tužilaca","vraća tužioce","ustavnog suda","čogurić","tomić","ističe mandat"]},
 {id:"pomilovanja",n:"Pomilovanja",m:["podnosi ostavku","pomilovanih","spise o pomilovanjima"]},
 {id:"policija",n:"Protesti, policija, tužilaštvo",m:["zvučni top","komandant saj","načelnik ukp","paratužilački","formira komisiju","glavnog tužioca","sky poruka","traži smene","smene u vrhu bia"]},
 {id:"mediji",n:"Mediji i REM",m:["rem","javnim servisima","informer"]},
 {id:"lokalno",n:"Pokrajina i gradovi",m:["šapić","gradonačelnik","novom sadu","niša","dašić","pokrajinsk","skupština vojvodine","spremačice","lokalni izbori"]},
 {id:"novac",n:"Korupcija i novac",m:["alta","macur","basta","milenijum","generalštab","13 osumnjičenih","konjuh"]}
];
EV.forEach(e=>{const t=e.t.toLowerCase();e.k=CASES.filter(c=>c.m.some(m=>t.includes(m))).map(c=>c.id)});

/* ---------- Skraćenice ---------- */
const GLOSS=[["BIA","Bezbednosno-informativna agencija"],["VBA","Vojnobezbednosna agencija"],["VSS","Visoki savet sudstva"],["VST","Visoki savet tužilaštva"],["VJT","Vrhovno javno tužilaštvo; u vestima i Više javno tužilaštvo"],["TOK","Tužilaštvo za organizovani kriminal"],["VTK","Visokotehnološki kriminal"],["RIK","Republička izborna komisija"],["REM","Regulatorno telo za elektronske medije"],["UKP","Uprava kriminalističke policije"],["SAJ","Specijalna antiteroristička jedinica"],["DRI","Državna revizorska institucija"],["NBS","Narodna banka Srbije"],["APV","Autonomna pokrajina Vojvodina"],["ODIHR","Kancelarija OEBS-a za demokratske institucije i ljudska prava"],["CRTA, CeSID","Domaće posmatračke organizacije"]];

/* ---------- Imena i institucije u tekstu ---------- */
const PBY=Object.fromEntries(PEOPLE.map(p=>[p.id,p]));
const B0="(?<![\\p{L}\\p{N}])",B1="(?![\\p{L}\\p{N}])";
const ENT=[...PEOPLE.map(p=>({k:"p:"+p.id,re:new RegExp(B0+"(?:"+p.m+")"+B1,"gu")})),...ALIASES.map(([id,m])=>({k:"i:"+id,re:new RegExp(B0+"(?:"+m+")"+B1,"gu")}))];
function linkify(s,skip){
  const hits=[];
  ENT.forEach(en=>{en.re.lastIndex=0;let m;while((m=en.re.exec(s))){if(!m[0].length){en.re.lastIndex++;continue}hits.push({a:m.index,b:m.index+m[0].length,k:en.k})}});
  hits.sort((x,y)=>x.a-y.a||(y.b-y.a)-(x.b-x.a));
  let out="",pos=0;
  hits.forEach(h=>{if(h.a<pos)return;out+=s.slice(pos,h.a);const txt=s.slice(h.a,h.b);
    out+=h.k===skip?txt:`<button class="ent ${h.k[0]==="p"?"ent-p":"ent-i"}" data-ent="${h.k}">${txt}</button>`;pos=h.b});
  return out+s.slice(pos);
}
const personRe=id=>{const e=ENT.find(x=>x.k==="p:"+id);return new RegExp(e.re.source,"u")};
const evForPerson=id=>{const re=personRe(id);return EV.filter(e=>inScope(e)&&(re.test(e.x)||re.test(e.t))).sort((a,b)=>b.d.localeCompare(a.d))};
const firstSentence=s=>{const m=s.match(/^.*?[.!?](\s|$)/);return m?m[0].trim():s};
/* ---------- Ćirilica ---------- */
let script="lat";
const L2C={a:"а",b:"б",v:"в",g:"г",d:"д",đ:"ђ",e:"е",ž:"ж",z:"з",i:"и",j:"ј",k:"к",l:"л",m:"м",n:"н",o:"о",p:"п",r:"р",s:"с",t:"т",ć:"ћ",u:"у",f:"ф",h:"х",c:"ц",č:"ч",š:"ш"};
function trWord(w){
  if(/[qwxyQWXY]/.test(w))return w;
  return w.replace(/dž|Dž|DŽ|lj|Lj|LJ|nj|Nj|NJ|[a-zđžćčšA-ZĐŽĆČŠ]/g,ch=>{
    const m={dž:"џ",Dž:"Џ",DŽ:"Џ",lj:"љ",Lj:"Љ",LJ:"Љ",nj:"њ",Nj:"Њ",NJ:"Њ"};
    if(m[ch])return m[ch];
    const lo=ch.toLowerCase(),c=L2C[lo];if(!c)return ch;return ch===lo?c:c.toUpperCase();
  });
}
const tr=s=>s.replace(/[A-Za-zĐđŽžĆćČčŠš]+/g,trWord);
const ORIG=new WeakMap();
function applyScript(root){
  const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT,{acceptNode:n=>{const p=n.parentElement;if(!p||p.closest("script,style,.nt"))return NodeFilter.FILTER_REJECT;return n.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  let n;while((n=w.nextNode())){if(!ORIG.has(n))ORIG.set(n,n.nodeValue);n.nodeValue=script==="cyr"?tr(ORIG.get(n)):ORIG.get(n)}
}
const MON=["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec"];
const fmt=d=>{const[y,m,dd]=d.split("-");return `${+dd}. ${MON[+m-1]} ${y}.`};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const $=s=>document.querySelector(s);
const LINK_INFO={
 "gradjani>rik":"Građani glasaju na biračkim mestima koja vode birački odbori; RIK sabira rezultate i dodeljuje mandate.",
 "rik>skupstina":"Na osnovu rezultata RIK dodeljuje mandate listama, a Skupština ih potvrđuje na konstitutivnoj sednici.",
 "gradjani>predsednik":"Predsednik se bira neposredno; pobeđuje kandidat sa više od polovine glasova izašlih birača, inače se ide u drugi krug.",
 "rik>upravni":"Protiv odluka RIK-a podnosi se žalba Upravnom sudu, koji odlučuje u kratkom roku.",
 "skupstina>vlada":"Skupština bira Vladu većinom svih poslanika, može joj izglasati nepoverenje i postavlja poslanička pitanja.",
 "predsednik>vlada":"Posle konsultacija sa poslaničkim grupama predsednik Republike predlaže kandidata za premijera.",
 "predsednik>skupstina":"Predsednik proglašava zakone ukazom ili ih jednom vraća na ponovno odlučivanje; na obrazložen predlog Vlade može raspustiti Skupštinu.",
 "skupstina>ustavni":"Skupština bira 5 od 15 sudija Ustavnog suda, sa liste koju predlaže predsednik Republike.",
 "predsednik>ustavni":"Predsednik imenuje 5 sudija Ustavnog suda sa liste koju predlaže Skupština.",
 "vrhovni>ustavni":"Opšta sednica Vrhovnog suda imenuje 5 sudija Ustavnog suda.",
 "ustavni>skupstina":"Ustavni sud može da utvrdi da zakon koji je Skupština donela nije u skladu sa Ustavom; tada zakon prestaje da važi.",
 "skupstina>vss":"Skupština bira 4 istaknuta pravnika u Visoki savet sudstva, kvalifikovanom većinom.",
 "skupstina>vst":"Skupština bira 4 istaknuta pravnika u Visoki savet tužilaštva, kvalifikovanom većinom.",
 "skupstina>vjt":"Skupština bira Vrhovnog javnog tužioca na šest godina, na predlog Visokog saveta tužilaštva.",
 "vst>vjt":"VST sprovodi konkurs i predlaže Skupštini kandidata za Vrhovnog javnog tužioca.",
 "vss>vrhovni":"VSS predlaže Skupštini kandidata za predsednika Vrhovnog suda.",
 "skupstina>vrhovni":"Skupština bira predsednika Vrhovnog suda, na predlog VSS.",
 "vss>apelacioni":"Sudije i predsednike sudova bira Visoki savet sudstva; od 2022. to više ne radi Skupština.",
 "vss>upravni":"Sudije i predsednike sudova bira Visoki savet sudstva.",
 "vss>osnovni":"Sudije i predsednike sudova bira Visoki savet sudstva; on odlučuje i o napredovanju i disciplini sudija.",
 "vst>tok":"VST bira glavnog tužioca za organizovani kriminal i odlučuje o upućivanju tužilaca u TOK, kao što je bilo u martu i junu 2026.",
 "vst>vjtbg":"VST bira glavnog tužioca Višeg javnog tužilaštva i odlučuje o disciplinskoj odgovornosti tužilaca.",
 "vst>tuzilastva":"VST bira javne tužioce i glavne javne tužioce.",
 "vjt>tok":"Vrhovno javno tužilaštvo je hijerarhijski nadređeno i može davati opšta obavezna uputstva.",
 "vjt>vjtbg":"Vrhovno javno tužilaštvo nadzire rad nižih tužilaštava; njegova komisija je od oktobra 2026. kontrolisala VJT u Beogradu.",
 "vjt>tuzilastva":"Vrhovno javno tužilaštvo daje opšta obavezna uputstva, kao ono o izbornim krivičnim delima od 20. 10. 2026.",
 "minpravde>vst":"Ministar pravde je po položaju član Visokog saveta tužilaštva, bez prava glasa u disciplinskim postupcima.",
 "vlada>minpravde":"Ministarstvo pravde je deo Vlade; vodi pravosudnu upravu, budžet sudova i zatvore.",
 "vlada>mup":"MUP je deo Vlade; Vlada postavlja direktora policije.",
 "vlada>bia":"Vlada postavlja i razrešava direktora BIA i usmerava rad službe.",
 "skupstina>bia":"Skupštinski odbor za kontrolu službi bezbednosti nadzire zakonitost rada BIA.",
 "tok>mup":"U istragama tužilac rukovodi, a policija izvršava naloge; TOK se žalio da je policija ignorisala njegove zahteve.",
 "vjtbg>mup":"Tužilaštvo rukovodi istragom, a policija izvršava naloge, uključujući hapšenja, kao 1. 11. 2026. u UKP-u.",
 "skupstina>rem":"Skupština bira članove Saveta REM-a na predlog ovlašćenih predlagača.",
 "rem>javniservis":"REM bira upravne odbore RTS-a i RTV-a, koji biraju generalne direktore.",
 "predsednik>minpravde":"Predsednik donosi pomilovanja, a Ministarstvo pravde priprema i sprovodi postupak.",
 "skupstina>nbs":"Skupština bira guvernera Narodne banke na predlog predsednika Republike.",
 "vlada>vojska":"Ministarstvo odbrane je deo Vlade; Vojska je u njegovom sastavu.",
 "predsednik>vojska":"Predsednik Republike komanduje Vojskom i postavlja, unapređuje i razrešava generale.",
 "skupstina>vojska":"Skupštinski odbor za kontrolu službi bezbednosti nadzire i VBA.",
 "gradjani>lokalna":"Građani biraju pokrajinsku skupštinu i skupštine gradova i opština.",
 "vlada>lokalna":"Vlada nadzire zakonitost rada lokalnih organa i može raspustiti skupštinu opštine u zakonom određenim slučajevima.",
 "studenti>skupstina":"Studentska lista ima 140 od 250 mandata, dakle većinu potrebnu za izbor predsednika Skupštine i Vlade.",
 "sns>skupstina":"Lista „Aleksandar Vučić – Ujedinjena Srbija“ ima 103 mandata i biće najveća opozicija.",
 "posmatraci>rik":"Posmatrači prijavljuju nepravilnosti; RIK po prigovorima može poništiti glasanje, kao na 22 mesta 2026.",
 "eu>vss":"Evropska komisija i Venecijanska komisija ocenjuju nezavisnost pravosuđa u procesu pristupanja EU.",
 "eu>vst":"Evropska komisija i Venecijanska komisija ocenjuju samostalnost tužilaštva."
};

const srcHtml=e=>e.s.map(([n,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join("");
function itemHtml(e,skip){
  const others=e.i.filter(x=>x!==skip&&"i:"+x!==skip);
  return `<article class="item" data-ev="${EV.indexOf(e)}">
   <time datetime="${e.d}">${fmt(e.d)}${e.p==="fu"?" · predstoji":e.p==="bg"?" · pozadina":""}</time>
   <span class="t">${esc(e.t)}</span><p class="x">${linkify(esc(e.x),skip&&(skip.includes(":")?skip:"i:"+skip))}</p>
   <div class="meta">${e.u?`<span class="unc">nepotvrđeno</span>`:""}<span class="src">Izvori: ${srcHtml(e)}</span></div>
   ${others.length?`<div class="meta"><span class="muted">Institucije:</span>${others.map(o=>`<button class="lk" data-room="${o}">${esc(INST[o].p)}</button>`).join("")}</div>`:""}
  </article>`;
}
