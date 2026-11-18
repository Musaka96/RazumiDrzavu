/* Okvir aplikacije: stanje, prikazi, panel sa karticama, pretraga, vodiči, istorija, mobilni donji list. */

/* ---------- Stanje ---------- */
const bc=b=>`var(${BR[b].c})`;
let period="izbori",mode=null,view="lanac",filt="",history_=[];
try{const s=localStorage.getItem("mv-period");if(s==="sve"||s==="izbori")period=s;if(localStorage.getItem("mv-script")==="cyr")script="cyr"}catch(e){}
const inScope=e=>period==="sve"||e.p!=="bg";
const evFor=id=>EV.filter(e=>e.i.includes(id)&&inScope(e)).sort((a,b)=>b.d.localeCompare(a.d));
const relsOf=id=>{const o=[];LINKS.forEach(([a,b,v])=>{if(a===id)o.push({o:b,v,out:1});if(b===id)o.push({o:a,v,out:0})});return o};
const peopleIn=id=>PEOPLE.filter(p=>p.room===id);
const VIEWS={
  lanac:{n:"Ko koga bira",impl:Lanac,intro:["Institucije su poređane po tome koliko su koraka udaljene od birača. Građani neposredno biraju samo Skupštinu, predsednika i lokalne skupštine; gotovo sve ostalo bira ili predlaže Skupština.","Kad izaberete instituciju, istaknut je njen lanac do birača i sve što ona bira. Pređite mišem preko linije da vidite šta taj odnos znači."]},
  nadredjenost:{n:"Ko je kome nadređen",impl:Nad,intro:["Tri stabla pokazuju nadređenost unutar sudova, tužilaštava i izvršne vlasti: ko odlučuje o žalbama, ko daje uputstva, ko je u čijem sastavu. Ustavni sud je iznad svih.","Iznad svakog stabla je telo koje bira kadrove (VSS, VST) ili komanduje (predsednik). Kad izaberete instituciju, isprekidane linije pokazuju veze sa drugim stablima, na primer da policija u istrazi radi po nalogu tužioca."]},
  nivoi:{n:"Nivoi vlasti",impl:Niv,intro:["Vlast nije podeljena samo na grane nego i po nivoima: Republika, pokrajina, Beograd, gradovi i opštine. Na svakom nivou građani biraju predstavničko telo, a ono bira izvršni organ.","Kad izaberete instituciju, linije pokazuju koga bira i ko je nadzire sa višeg nivoa; na primer, Vlada može raspustiti skupštinu grada koja ne bira organe ili ne donese budžet."]},
  skupstina:{n:"Skupština",impl:Sk,intro:["Narodna skupština je konstituisana 17. 11. 2026. Polukrug pokazuje 250 mesta po listama, a pragovi koliko glasova treba za izbor Vlade, Vrhovnog javnog tužioca ili promenu Ustava.","Studentska lista ima većinu od 140 mesta, dovoljnu za Vladu i budžet, ali ne i za odluke koje traže tri petine ili dve trećine. Kad izaberete instituciju, istaknute su njene veze sa Skupštinom."]}
};

/* Trenutno stanje: četiri ključne tačke za svaki prikaz; klik otvara instituciju */
const STATE={
  lanac:[["predsednik","Predsednik Republike","Ana Brnabić, v.d.","Izbori: raspisivanje do 27. 11, glasanje do 27. 12."],["skupstina","Narodna skupština","140 · 103 · 7","Konstituisana 17. 11; predsednik Skupštine još nije izabran"],["vlada","Vlada","Đuro Macut","Tehnički mandat; nova vlada do 15. 2. 2027."],["vjt","Vrhovno javno tužilaštvo","Zagorka Dolovac","Komisija kontroliše VJT u Beogradu"]],
  nadredjenost:[["ustavni","Ustavni sud · iznad svih","Vladan Petrov","Ocenjuje zakone i odluke svih organa"],["vrhovni","Vrhovni sud · vrh sudova","Miroljub Tomić","Predsednik od 1. 7. 2026."],["vjt","Vrhovno javno tužilaštvo · vrh tužilaštava","Zagorka Dolovac","VST i dalje bez izabranog predsednika"],["vlada","Vlada · vrh izvršne vlasti","Đuro Macut","Tehnički mandat; ministarstva, MUP i BIA"]],
  nivoi:[["skupstina","Republika","140 · 103 · 7","Narodna skupština konstituisana 17. 11."],["vladaapv","AP Vojvodina","Maja Gojković","Pokrajinska vlada; Skupština: B. Juhas"],["gradonacelnik","Grad Beograd","Aleksandar Šapić","Gradonačelnik; Skupština grada: N. Nikodijević"],["opstine","Gradovi i opštine","Više od sto opština","Lokalni izbori u deset jedinica 29. 3. 2026."]],
  skupstina:[["skupstina","Sastav","140 · 103 · 7","Studentska lista · lista SNS · manjine"],["skupstina","Predsednik Skupštine","Glasanje 19. 11.","A. Čupić ili S. Radenović; potrebno 126"],["studenti","Većina","140 od 250","Iznad 126; ispod tri petine (150)"],["vlada","Rok za Vladu","15. 2. 2027.","90 dana od konstituisanja"]]
};
function renderState(anim){
  const el=$("#state");
  el.innerHTML=STATE[view].map(([id,l,v,s])=>`<button class="st" data-room="${id}"><span class="lbl">${esc(l)}</span><span class="v">${esc(v)}</span><span class="s">${esc(s)}</span></button>`).join("");
  if(anim){el.classList.remove("swap");void el.offsetWidth;el.classList.add("swap")}
  applyScript(el);
}

/* ---------- Pregled na hover ---------- */
const tip=document.createElement("div");tip.className="tip";tip.setAttribute("role","tooltip");tip.hidden=true;document.body.appendChild(tip);
function placeTip(x,y){const tw=tip.offsetWidth,th=tip.offsetHeight;tip.style.left=Math.max(8,Math.min(x,window.innerWidth-tw-8))+"px";tip.style.top=Math.max(8,y+th>window.innerHeight-8?y-th-28:y)+"px"}
const hideTip=()=>{tip.hidden=true};
function showEntTip(el){
  const k=el.dataset.ent,t=k[0],id=k.slice(2);let h="";
  if(t==="p"){const p=PBY[id],n=evForPerson(id).length;
    h=`<span class="lbl">Osoba · ${esc(INST[p.room].p)}</span><strong>${esc(p.n)}</strong><span>${esc(p.role)}</span><span class="muted">${esc(p.desc)}</span><span class="tipf">${n} vesti · klik za otvaranje</span>`}
  else{const it=INST[id],n=evFor(id).length;
    h=`<span class="lbl">${esc(BR[it.b].n)}</span><span class="tiph" style="--wc:${bc(it.b)}">${icoSvg(id,20)}<strong>${esc(it.n)}</strong></span><span>${esc(it.head)}</span><span class="muted">${esc(firstSentence(it.role))}</span><span class="tipf">${n} vesti · klik za otvaranje</span>`}
  tip.innerHTML=h;tip.hidden=false;applyScript(tip);
  const r=el.getBoundingClientRect();placeTip(r.left,r.bottom+8);
}
function showRelTip(a,b,v,x,y){
  const info=LEGIT_INFO[a+">"+b]||LINK_INFO[a+">"+b];
  tip.innerHTML=`<span class="lbl">Odnos</span><span class="rel">${esc(INST[a].p)} <i>→ ${esc(v)} →</i> ${esc(INST[b].p)}</span>${info?`<span>${esc(info)}</span>`:""}`;
  tip.hidden=false;applyScript(tip);placeTip(x+14,y+14);
}
function showMhTip(el){
  const m=MBY[el.dataset.meh],n=mechEv(m.id).filter(inScope).length;
  tip.innerHTML=`<span class="lbl">Mehanizam · ${esc(BR[m.b].n)}</span><strong>${esc(m.n)}</strong><span class="muted">${esc(m.sum)}</span><span class="tipf">${n} vesti · klik za dijagram</span>`;
  tip.hidden=false;applyScript(tip);
  const r=el.getBoundingClientRect();placeTip(r.left,r.bottom+8);
}
const tipOf=el=>{const t=el.closest(".ent,.mhk");if(t)t.classList.contains("mhk")?showMhTip(t):showEntTip(t)};
document.addEventListener("mouseover",e=>tipOf(e.target));
document.addEventListener("mouseout",e=>{if(e.target.closest(".ent,.mhk"))hideTip()});
document.addEventListener("focusin",e=>tipOf(e.target));
window.addEventListener("scroll",hideTip,{passive:true});

/* Klikovi na mehanizme, imena i institucije bilo gde na stranici */
document.addEventListener("click",e=>{
  const mh=e.target.closest("[data-meh]");if(mh){hideTip();openMech(mh.dataset.meh,true);return}
  const ent=e.target.closest(".ent");
  if(ent){hideTip();const k=ent.dataset.ent;k[0]==="p"?openPerson(k.slice(2),true):openRoom(k.slice(2),true);return}
  const rm=e.target.closest("[data-room]");if(rm){openRoom(rm.dataset.room,true);return}
  const ps=e.target.closest("[data-person]");if(ps){openPerson(ps.dataset.person,true);return}
});

/* ---------- Navigacija ---------- */
function setMode(m,push){
  if(m&&m.t==="room"&&!INST[m.id])m=null;if(m&&m.t==="person"&&!PBY[m.id])m=null;if(m&&m.t==="meh"&&!MBY[m.id])m=null;
  if(push&&mode&&!(m&&m.t===mode.t&&m.id===mode.id))history_.push(mode);
  if(!m)history_=[];
  if(!(m&&mode&&m.t===mode.t&&m.id===mode.id))$("#panel").scrollTop=0;
  mode=m;
  syncMenus();
  VIEWS[view].impl&&VIEWS[view].impl.update();
  renderPanel();
  const h=mode?"#"+(mode.t==="room"?"":mode.t==="person"?"osoba-":mode.t+"-")+mode.id:"";
  if(location.hash!==h){try{history.replaceState(null,"",h||location.pathname+location.search)}catch(e){}}
}
const openRoom=(id,push,tab)=>{setMode({t:"room",id,tab:tab||"pregled"},push);revealSelection()};
const openPerson=(id,push)=>{setMode({t:"person",id,tab:"pregled"},push);revealSelection()};
const openMech=(id,push)=>{setMode({t:"meh",id},push);$("#panel").scrollTop=0};
function goBack(){const m=history_.pop();setMode(m||null,false);revealSelection()}
function revealSelection(){
  const id=mode&&(mode.t==="room"?mode.id:mode.t==="person"?PBY[mode.id].room:null);
  if(id&&VIEWS[view].impl&&VIEWS[view].impl.focusCard)VIEWS[view].impl.focusCard(id);
}
function setView(v){
  if(!VIEWS[v])v="lanac";const changed=v!==view;view=v;try{localStorage.setItem("mv-view",v)}catch(e){}
  document.querySelectorAll("[data-view]").forEach(b=>b.setAttribute("aria-selected",b.dataset.view===v));
  const st=$("#stage"),V=VIEWS[v];
  if(changed){st.classList.remove("swap");void st.offsetWidth;st.classList.add("swap")}
  renderState(changed);
  if(V.impl){V.impl.render(st);V.impl.update()}
  else st.innerHTML=`<div class="soon"><span class="lbl">Sledeća faza</span><h2>${esc(V.n)}</h2><p>${esc(V.soon)}</p><p class="muted">Izabrana institucija ostaje izabrana kada promenite prikaz.</p><button class="btn" data-goview="lanac">Nazad na „Ko koga bira“</button></div>`;
  st.querySelectorAll(".soon [data-goview]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.goview)));
  if(!mode)renderPanel();
  applyScript(st);revealSelection();
}

/* ---------- Panel ---------- */
const tabsHtml=(tabs,cur)=>`<div class="tabs" role="tablist">${tabs.map(([k,n,c])=>`<button role="tab" data-tab="${k}" aria-selected="${k===cur}">${n}${c!=null?` <span class="tc">${c}</span>`:""}</button>`).join("")}</div>`;
const periodSeg=()=>`<div class="seg" role="group" aria-label="Period vesti"><button data-period="izbori" aria-pressed="${period==="izbori"}">Od izbora</button><button data-period="sve" aria-pressed="${period==="sve"}">Od nov. 2024.</button></div>`;
const newsList=(evs,skip,empty)=>evs.length?evs.map(e=>itemHtml(e,skip)).join(""):`<p class="muted">${empty||"Nema vesti u ovom periodu."}${period==="izbori"?" Probajte period „Od nov. 2024.“":""}</p>`;
function relRow(r,id){
  const a=r.out?id:r.o,b=r.out?r.o:id,k=a+">"+b,info=LINK_INFO[k]||LEGIT_INFO[k]||LEVEL_INFO[k]||HIER_INFO[k]||HIER_CROSS_INFO[k];
  return `<li><div class="rr">${r.out?`<span class="rv">${esc(r.v)}</span> → <button class="lk" data-room="${r.o}">${esc(INST[r.o].p)}</button>`:`<button class="lk" data-room="${r.o}">${esc(INST[r.o].p)}</button> → <span class="rv">${esc(r.v)}</span>`}</div>${info?`<div class="ri">${linkify(esc(info))}</div>`:""}</li>`;
}
/* Mehanizmi institucije: prvo nedavno korišćeni (po datumu poslednje vesti), pa ostali po azbučnom redu */
const mechOf=id=>mechFor(id).map(m=>{const ev=mechUsed(m.id);return{m,ev,last:ev.length?ev[0].d:null}})
  .sort((a,b)=>a.last&&b.last?b.last.localeCompare(a.last):a.last?-1:b.last?1:a.m.n.localeCompare(b.m.n,"sr"));
/* Dijagram toka: koraci odozgo nadole, rokovi na spojnicama, na kraju račvanje u moguće ishode */
function flowHtml(M){
  const pill=r=>`<span class="fr">${esc(r)}</span>`;
  const step=(s,i)=>{const b=s.a?INST[s.a].b:"act",who=s.w||(s.a?INST[s.a].p:"");
    return `<li style="--wc:${bc(b)}">${i?`<div class="fc">${s.r?pill(s.r):""}</div>`:""}<div class="fbox"><span class="fn" aria-hidden="true">${i+1}</span>
      <div class="fa">${s.a?`<button class="fwho" data-room="${s.a}">${icoSvg(s.a,16)}<span>${esc(who)}</span></button>`:`<span class="fwho">${esc(who)}</span>`}<i class="fsw" data-b="${b}" title="${esc(BR[b].n)}"></i></div>
      <div class="ft">${linkify(esc(s.t))}</div><div class="fd">${linkify(esc(s.d))}</div>${!i&&s.r?pill(s.r):""}</div></li>`};
  return `<div class="flow"><ol class="fsteps">${M.steps.map(step).join("")}</ol>
    ${M.ends.length?`<div class="fc fk"><span class="lbl">Mogući ishodi</span></div>
    <ul class="fends${M.ends.length>1?" n2":""}">${M.ends.map(([t,d])=>`<li class="fend"><strong>${linkify(esc(t))}</strong><span>${linkify(esc(d))}</span></li>`).join("")}</ul>`:""}</div>`;
}
function renderPanel(){
  const p=$("#panel");let h="",wc="var(--accent)";
  const top=`<div class="p-top">${history_.length?`<button class="pbtn" data-back="1"><span aria-hidden="true">←</span> Nazad</button>`:"<span></span>"}${mode?`<button class="pbtn" data-close="1" aria-label="Zatvori panel">Zatvori</button>`:""}</div>`;
  if(!mode){
    h=`<span class="lbl">Kako čitati prikaz</span><h2>${esc(VIEWS[view].n)}</h2>
    ${(VIEWS[view].intro||[VIEWS[view].soon]).map(t=>`<p>${linkify(esc(t))}</p>`).join("")}
    <div class="sec"><span class="lbl">Boja i šrafura označavaju granu vlasti</span>${legendHtml()}</div>
    <div class="sec"><span class="lbl">Za početak</span><div class="starts">
      <button class="start" data-room="skupstina"><strong>Narodna skupština</strong><span>Šta zavisi od nove većine</span></button>
      <button class="start" data-room="tok"><strong>Tužilaštvo za organizovani kriminal</strong><span>Najviše vesti posle izbora</span></button>
      <button class="start" data-guide="path:vlada-nastaje"><strong>Kako nastaje Vlada</strong><span>Vodič korak po korak</span></button>
      <button class="start" data-guide="meh:zadrzavanje"><strong>Šta se dešava kad je neko uhapšen</strong><span>Mehanizam sa dijagramom</span></button></div></div>`;
  }else if(mode.t==="room"){
    const id=mode.id,it=INST[id],rels=relsOf(id),evs=evFor(id),ppl=peopleIn(id),tab=mode.tab||"pregled";wc=bc(it.b);
    const chain=chainToVoters(id),mechs=mechOf(id);
    const em=imgI(id);
    h=`<div class="ph${em?" ph-em":""}"><div class="ico">${icoSvg(id,26)}</div><div><span class="lbl">${esc(BR[it.b].n)}</span><h2>${esc(it.n)}</h2></div>${em?`<img class="em" src="${esc(em.f)}" onerror="this.remove()" alt="${esc("Grb ili znak: "+it.n)}">${credit(em,"Grb")}`:""}</div>`;
    h+=tabsHtml([["pregled","Pregled"],["veze","Veze",rels.length],["mehanizmi","Mehanizmi",mechs.length],["vesti","Vesti",evs.length],["ljudi","Ljudi",ppl.length]],tab);
    if(tab==="pregled"){
      const recent=mechs.map(x=>({m:x.m,d:(x.ev.find(inScope)||{}).d})).filter(x=>x.d).sort((a,b)=>b.d.localeCompare(a.d));
      h+=`<p>${linkify(esc(it.role),"i:"+id)}</p>
      <dl><dt>Sada</dt><dd>${linkify(esc(it.head),"i:"+id)}</dd><dt>Bira ga</dt><dd>${esc(it.chosen)}</dd><dt>Mandat</dt><dd>${esc(it.term)}</dd>${it.web?`<dt>Sajt</dt><dd><a href="${esc(it.web)}" target="_blank" rel="noopener">zvanični sajt ↗</a></dd>`:""}</dl>
      ${chain&&chain.length>1?`<div class="sec"><span class="lbl">Put do birača</span><ol class="chain">${chain.map(c=>`<li>${c===id?`<strong>${esc(INST[c].p)}</strong>`:`<button class="lk" data-room="${c}">${esc(INST[c].p)}</button>`}</li>`).join("")}</ol></div>`:""}
      ${recent.length?`<div class="sec"><span class="lbl">Nedavno korišćeni mehanizmi</span><div class="mhks">${recent.slice(0,4).map(x=>mhChip(x.m.id)).join("")}</div><button class="lk" data-tab="mehanizmi">Svi mehanizmi (${mechs.length})</button></div>`:""}
      ${evs.length?`<div class="sec"><span class="lbl">Najnovije</span>${evs.slice(0,2).map(e=>itemHtml(e,id)).join("")}${evs.length>2?`<button class="lk" data-tab="vesti">Sve vesti (${evs.length})</button>`:""}</div>`:""}`;
    }else if(tab==="veze"){
      const out=rels.filter(r=>r.out),inn=rels.filter(r=>!r.out);
      h+=`${out.length?`<div class="sec0"><span class="lbl">Šta ova institucija radi drugima</span><ul class="rl">${out.map(r=>relRow(r,id)).join("")}</ul></div>`:""}
      ${inn.length?`<div class="sec"><span class="lbl">Šta drugi rade njoj</span><ul class="rl">${inn.map(r=>relRow(r,id)).join("")}</ul></div>`:""}`;
    }else if(tab==="mehanizmi"){
      h+=mechs.length?`<p class="muted">Ovlašćenja i postupci u kojima ova institucija učestvuje; nedavno korišćeni su na vrhu.</p><ul class="ml">${mechs.map(({m,ev,last})=>`<li><div class="mlt"><button class="lk" data-meh="${m.id}">${esc(m.n)}</button><span class="muted">${esc(m.sum)}</span></div>
        <div class="mlu">${last?`<span class="mlb">korišćen ${fmt(last)}</span><span class="muted">${ev.length} vesti</span>`:`<span class="muted">nije korišćen</span>`}</div></li>`).join("")}</ul>`:`<p class="muted">Za ovu instituciju nema opisanih mehanizama.</p>`;
    }else if(tab==="vesti"){
      h+=`<div class="vbar">${periodSeg()}</div>${newsList(evs,id)}`;
    }else if(tab==="ljudi"){
      h+=ppl.length?`<ul class="pl">${ppl.map(x=>`<li>${avatar(x.id,28)}<button class="lk" data-person="${x.id}">${esc(x.n)}</button><span>${esc(x.role)}</span><span class="muted">${evForPerson(x.id).length} vesti</span></li>`).join("")}</ul>`:`<p class="muted">Nema zabeleženih osoba za ovu instituciju.</p>`;
    }
  }else if(mode.t==="person"){
    const P=PBY[mode.id],evs=evForPerson(mode.id),tab=mode.tab||"pregled";wc=bc(INST[P.room].b);
    const ph=imgP(P.id);
    h=`<div class="ph${ph?" ph-p":""}">${ph?`<img class="pic" src="${esc(ph.f)}" onerror="this.style.visibility='hidden'" alt="${esc(P.n)}" width="56" height="56">`:`<div class="ico">${icoSvg(P.room,26)}</div>`}<div><span class="lbl">Osoba</span><h2>${esc(P.n)}</h2></div>${ph?credit(ph,"Foto"):""}</div>`;
    const MP=typeof MPS!=="undefined"&&MPS[P.id],co=coOf(P.id),G=MP&&SEATS.find(g=>g.k===MP.g);
    const nLinks=(MP?MP.prev.length:0)+co.p.length+co.i.length;
    h+=tabsHtml([["pregled","Pregled"],["veze","Veze",nLinks],["vesti","Vesti",evs.length]],tab);
    const grpHtml=G?`${G.room?`<button class="lk" data-room="${G.room}">${esc(G.n)}</button>`:esc(G.n)}`:"";
    if(tab==="pregled")h+=`<p><strong>${esc(P.role)}</strong></p><p>${linkify(esc(P.desc),"p:"+P.id)}</p>
      ${MP?`<dl><dt>Poslanik</dt><dd>${grpHtml}${MP.party?` · ${esc(MP.party)}`:""}${MP.u?` <span class="unc">nepotvrđeno</span>`:""}</dd>${MP.fn?`<dt>U Skupštini</dt><dd>${esc(MP.fn)}</dd>`:""}${MP_HEADS[MP.g]&&MP_HEADS[MP.g]!==P.id&&PBY[MP_HEADS[MP.g]]?`<dt>Šef grupe</dt><dd><button class="lk" data-person="${MP_HEADS[MP.g]}">${esc(PBY[MP_HEADS[MP.g]].n)}</button></dd>`:""}</dl>`
        :`<dl><dt>Institucija</dt><dd><button class="lk" data-room="${P.room}">${esc(INST[P.room].n)}</button></dd></dl>`}
      ${nLinks?`<button class="lk" data-tab="veze">Veze (${nLinks})</button>`:""}
      ${evs.length?`<div class="sec"><span class="lbl">Najnovije</span>${itemHtml(evs[0],"p:"+P.id)}${evs.length>1?`<button class="lk" data-tab="vesti">Sve vesti (${evs.length})</button>`:""}</div>`:""}
      ${MP&&MP.s.length?`<p class="credit">Izvori: ${MP.s.map(([n,u])=>`<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)}</a>`).join(", ")}</p>`:""}`;
    else if(tab==="veze"){
      const mates=MP?Object.values(MPS).filter(x=>x.g===MP.g&&x.id!==P.id&&PBY[x.id]):[];
      h+=`${MP&&MP.prev.length?`<div class="sec0"><span class="lbl">Funkcije</span><ul class="rl">${MP.prev.map(([r,t])=>`<li><div class="rr">${INST[r]?`<button class="lk" data-room="${r}">${esc(INST[r].p)}</button> · `:""}<span class="rv">${esc(t)}</span></div></li>`).join("")}</ul></div>`:""}
      ${MP?`<div class="sec"><span class="lbl">Lista i poslanička grupa</span><p>${grpHtml}${MP.party?` · stranka: ${esc(MP.party)}`:""}</p>${mates.length?`<div class="cochips">${mates.map(x=>coChip(x.id,null)).join("")}</div>`:""}</div>`:`<dl><dt>Institucija</dt><dd><button class="lk" data-room="${P.room}">${esc(INST[P.room].n)}</button></dd></dl>`}
      ${co.p.length||co.i.length?`<div class="sec"><span class="lbl">Zajedno u vestima</span><p class="muted">Ko se pojavljuje u istim vestima; broj je broj zajedničkih vesti. To nije dokaz saradnje ni sukoba.</p>
        ${co.p.length?`<div class="cochips">${co.p.map(([id,n])=>coChip(id,n)).join("")}</div>`:""}
        ${co.i.length?`<div class="cochips">${co.i.map(([id,n])=>`<button class="coc" data-room="${id}" style="--wc:${bc(INST[id].b)}">${icoSvg(id,14)}<span>${esc(INST[id].p)}</span><span class="tc">${n}</span></button>`).join("")}</div>`:""}</div>`
        :`<p class="muted">U vestima iz ovog perioda nema drugih osoba ni institucija uz ovo ime.</p>`}`;
    }
    else h+=`<div class="vbar">${periodSeg()}</div>${newsList(evs,"p:"+P.id)}`;
  }else if(mode.t==="path"){
    const P=PATHS.find(x=>x.id===mode.id);
    h=`<span class="lbl">Vodič</span><h2>${esc(P.n)}</h2><ol class="steps">${P.steps.map(s=>`<li><div><div class="st">${esc(s[1])} · <button class="lk" data-room="${s[0]}">${esc(INST[s[0]].p)}</button></div><div class="sd">${linkify(esc(s[2]))}</div>${s[3]?`<div class="now">${esc(s[3])}</div>`:""}</div></li>`).join("")}</ol>`;
  }else if(mode.t==="meh"){
    const M=MBY[mode.id],all=mechEv(M.id),evs=all.filter(inScope),P=M.path&&PATHS.find(x=>x.id===M.path);wc=bc(M.b);
    h=`<span class="lbl">Mehanizam</span><h2>${esc(M.n)}</h2><p class="mlead">${linkify(esc(M.sum))}</p><p class="mbasis"><span>Pravni osnov:</span> ${linkify(esc(M.basis))}</p>
    ${flowHtml(M)}
    <div class="sec"><span class="lbl">Ko kontroliše</span><ul class="mchk">${M.checks.map(c=>`<li>${linkify(esc(c))}</li>`).join("")}</ul>${P?`<button class="lk" data-guide="path:${P.id}">Širi vodič: ${esc(P.n)}</button>`:""}</div>
    <div class="sec"><span class="lbl">Korišćen u vestima</span>${all.length?`<div class="vbar">${periodSeg()}</div>${newsList(evs,"m:"+M.id)}`:`<p class="muted">Nije korišćen od novembra 2024.</p>`}</div>
    <p class="muted mnote">Pojednostavljen prikaz; merodavan je tekst zakona.</p>`;
  }else if(mode.t==="case"){
    const C=CASES.find(x=>x.id===mode.id),evs=EV.filter(e=>e.k.includes(C.id)&&inScope(e)).sort((a,b)=>b.d.localeCompare(a.d));
    h=`<span class="lbl">Slučaj</span><h2>${esc(C.n)}</h2><p class="muted">Na prikazu su istaknute institucije kroz koje je slučaj prošao.</p><div class="vbar">${periodSeg()}</div>${newsList(evs,null)}`;
  }
  p.style.setProperty("--wc",wc);
  p.innerHTML=top+`<div class="p-body">${h}</div>`;
  p.classList.toggle("open",!!mode);
  p.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{mode={...mode,tab:b.dataset.tab};renderPanel();p.scrollTop=0}));
  p.querySelectorAll("[data-period]").forEach(b=>b.addEventListener("click",()=>setPeriod(b.dataset.period)));
  p.querySelectorAll("[data-back]").forEach(b=>b.addEventListener("click",goBack));
  p.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>setMode(null)));
  p.querySelectorAll("[data-guide]").forEach(b=>b.addEventListener("click",()=>openGuide(b.dataset.guide)));
  applyScript(p);
}
/* Ko se pojavljuje u istim vestima kao osoba: druge osobe i institucije, po broju zajedničkih vesti */
function coOf(id){
  const evs=evForPerson(id),P=PBY[id],pc={},ic={};
  evs.forEach(e=>{
    PEOPLE.forEach(q=>{if(q.id!==id&&personRe(q.id).test(e.t+" "+e.x))pc[q.id]=(pc[q.id]||0)+1});
    e.i.forEach(i=>{if(i!==P.room&&INST[i])ic[i]=(ic[i]||0)+1});
  });
  const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).slice(0,10);
  return{p:top(pc),i:top(ic)};
}
const coChip=(id,n)=>{const q=PBY[id];return `<button class="coc" data-person="${id}" style="--wc:${bc(INST[q.room].b)}">${avatar(id,18)}<span>${esc(q.n)}</span>${n!=null?`<span class="tc">${n}</span>`:""}</button>`};
function legendHtml(){
  return `<div class="legend">${BR_ORDER.map(b=>`<span><i class="sw" style="--wc:${bc(b)}" data-b="${b}"></i>${esc(BR[b].n)}</span>`).join("")}</div>`;
}
function setPeriod(v){period=v;try{localStorage.setItem("mv-period",v)}catch(e){}VIEWS[view].impl&&VIEWS[view].impl.update();renderPanel();renderAll()}

/* ---------- Vodiči i podešavanja ---------- */
function openGuide(k){
  const[t,id]=k.split(":");document.querySelectorAll("details.menu").forEach(d=>d.open=false);
  const P=t==="path"&&PATHS.find(p=>p.id===id);if(P&&P.view&&P.view!==view)setView(P.view);
  setMode({t,id},true);window.scrollTo({top:0,behavior:"smooth"});
}
function syncMenus(){
  document.querySelectorAll("[data-guide]").forEach(b=>b.setAttribute("aria-pressed",!!mode&&b.dataset.guide===mode.t+":"+mode.id));
  document.querySelectorAll("[data-script]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.script===script));
  document.documentElement.lang=script==="cyr"?"sr-Cyrl":"sr-Latn";
}

/* ---------- Pretraga ---------- */
const norm=s=>s.toLowerCase().replace(/đ/g,"dj").normalize("NFD").replace(/[̀-ͯ]/g,"");
const SIDX=[
  ...Object.keys(INST).map(id=>({k:"i",id,l:INST[id].n,s:BR[INST[id].b].n,h:norm(INST[id].n+" "+INST[id].p+" "+INST[id].head)})),
  ...PEOPLE.map(p=>({k:"p",id:p.id,l:p.n,s:p.role,h:norm(p.n),b:INST[p.room].b})),
  ...MECH.map(m=>({k:"m",id:m.id,l:m.n,s:"Mehanizam · "+BR[m.b].n,h:norm(m.n+" "+m.sum)})),
  ...EV.map((e,i)=>({k:"e",id:i,l:e.t,s:fmt(e.d),h:norm(e.t+" "+e.x),d:e.d}))
];
let qSel=0,qHits=[];
function runSearch(q){
  const box=$("#qres"),n=norm(q.trim());
  if(n.length<2){box.hidden=true;qHits=[];return}
  const words=n.split(/\s+/),match=x=>words.every(w=>x.h.includes(w));
  const I=SIDX.filter(x=>x.k==="i"&&match(x)).slice(0,5),P=SIDX.filter(x=>x.k==="p"&&match(x)).slice(0,5),M=SIDX.filter(x=>x.k==="m"&&match(x)).slice(0,4),E=SIDX.filter(x=>x.k==="e"&&match(x)).sort((a,b)=>b.d.localeCompare(a.d)).slice(0,6);
  qHits=[...I,...P,...M,...E];qSel=0;
  const grp=(n,a)=>a.length?`<div class="qg">${n}</div>`+a.map(x=>`<button class="qi${x.k==="p"?" qp":""}" role="option" data-qi="${qHits.indexOf(x)}"${x.k==="p"?` style="--wc:${bc(x.b)}"`:""}>${x.k==="p"?avatar(x.id,24):""}<span class="ql">${esc(x.l)}</span><span class="qs">${esc(x.s)}</span></button>`).join(""):"";
  box.innerHTML=qHits.length?grp("Institucije",I)+grp("Ljudi",P)+grp("Mehanizmi",M)+grp("Vesti",E):`<div class="qe">Nema rezultata za „${esc(q)}“.</div>`;
  box.hidden=false;markQ();applyScript(box);
  box.querySelectorAll("[data-qi]").forEach(b=>b.addEventListener("mousedown",ev=>{ev.preventDefault();pickQ(+b.dataset.qi)}));
}
function markQ(){document.querySelectorAll("#qres .qi").forEach(b=>b.classList.toggle("on",+b.dataset.qi===qSel))}
function pickQ(i){
  const x=qHits[i];if(!x)return;$("#q").value="";$("#qres").hidden=true;$("#q").blur();
  if(x.k==="i")openRoom(x.id,true);else if(x.k==="p")openPerson(x.id,true);else if(x.k==="m")openMech(x.id,true);
  else{const e=EV[x.id];if(e.p==="bg"&&period!=="sve")setPeriod("sve");openRoom(e.i[0],true,"vesti");
    requestAnimationFrame(()=>{const el=document.querySelector(`#panel [data-ev="${x.id}"]`);if(el){el.classList.add("flash");el.scrollIntoView({block:"center"})}})}
}

/* ---------- Sve vesti ---------- */
function renderAll(){
  const list=EV.filter(e=>inScope(e)&&(!filt||e.i.includes(filt))).sort((a,b)=>b.d.localeCompare(a.d));
  $("#count").textContent=`${list.length} vesti`;
  $("#allperiod").innerHTML=periodSeg();$("#allperiod").querySelectorAll("[data-period]").forEach(b=>b.addEventListener("click",()=>setPeriod(b.dataset.period)));
  $("#alllist").innerHTML=list.map(e=>itemHtml(e,null)).join("")||`<p class="muted">Nema vesti za ovaj izbor.</p>`;
  applyScript($("#alllist").parentElement);
}

/* ---------- Pokretanje ---------- */
function parseHash(){
  const h=decodeURIComponent(location.hash.slice(1));let m=null;
  if(INST[h])m={t:"room",id:h};else if(h.startsWith("path-"))m={t:"path",id:h.slice(5)};else if(h.startsWith("case-"))m={t:"case",id:h.slice(5)};else if(h.startsWith("osoba-"))m={t:"person",id:h.slice(6)};else if(h.startsWith("meh-"))m={t:"meh",id:h.slice(4)};
  if(m&&m.t==="path"&&!PATHS.some(p=>p.id===m.id))m=null;if(m&&m.t==="meh"&&!MBY[m.id])m=null;if(m&&m.t==="case"&&!CASES.some(c=>c.id===m.id))m=null;
  return m;
}
function init(){
  $("#guides-paths").innerHTML=PATHS.map(p=>`<button class="mi" data-guide="path:${p.id}">${esc(p.n)}</button>`).join("");
  $("#guides-cases").innerHTML=CASES.map(c=>`<button class="mi" data-guide="case:${c.id}">${esc(c.n)}</button>`).join("");
  /* Mehanizmi: prvo korišćeni (najnovija vest), zatim ostali po azbučnom redu */
  const ml=m=>(mechUsed(m.id)[0]||{}).d;
  $("#guides-mechs").innerHTML=[...MECH].sort((a,b)=>{const x=ml(a),y=ml(b);return x&&y?y.localeCompare(x):x?-1:y?1:a.n.localeCompare(b.n,"sr")}).map(m=>`<button class="mi" data-guide="meh:${m.id}">${esc(m.n)}</button>`).join("");
  document.querySelectorAll(".menu [data-guide]").forEach(b=>b.addEventListener("click",()=>openGuide(b.dataset.guide)));
  document.querySelector("[data-home]").addEventListener("click",e=>{e.preventDefault();setMode(null);window.scrollTo({top:0})});
  document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
  /* Mali prekidač u zaglavlju se pojavljuje tek kad velike kartice prikaza odu ispod zaglavlja */
  const modesEl=$("#modes"),topEl=document.querySelector(".top");
  const syncModes=()=>document.body.classList.toggle("modes-in",modesEl.getBoundingClientRect().bottom>topEl.getBoundingClientRect().bottom);
  window.addEventListener("scroll",syncModes,{passive:true});window.addEventListener("resize",syncModes);syncModes();
  document.querySelectorAll("[data-script]").forEach(b=>b.addEventListener("click",()=>{script=b.dataset.script;try{localStorage.setItem("mv-script",script)}catch(e){}syncMenus();applyScript(document.body)}));
  document.addEventListener("click",e=>{document.querySelectorAll("details.menu[open]").forEach(d=>{if(!d.contains(e.target))d.open=false})});
  $("#gloss").innerHTML=GLOSS.map(([a,b])=>`<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join("");
  $("#f-inst").innerHTML=`<option value="">Sve institucije</option>`+BR_ORDER.map(b=>`<optgroup label="${BR[b].n}">${Object.keys(INST).filter(id=>INST[id].b===b).map(id=>`<option value="${id}">${esc(INST[id].p)}</option>`).join("")}</optgroup>`).join("");
  $("#f-inst").addEventListener("change",e=>{filt=e.target.value;renderAll()});
  const q=$("#q");
  q.addEventListener("input",()=>runSearch(q.value));
  q.addEventListener("focus",()=>{if(q.value)runSearch(q.value)});
  q.addEventListener("blur",()=>setTimeout(()=>{$("#qres").hidden=true},120));
  q.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"){e.preventDefault();qSel=Math.min(qSel+1,qHits.length-1);markQ()}
    else if(e.key==="ArrowUp"){e.preventDefault();qSel=Math.max(qSel-1,0);markQ()}
    else if(e.key==="Enter"){e.preventDefault();pickQ(qSel)}
    else if(e.key==="Escape"){q.value="";$("#qres").hidden=true;q.blur()}
  });
  document.addEventListener("keydown",e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"||(e.key==="/"&&!/input|textarea|select/i.test(document.activeElement.tagName))){e.preventDefault();q.focus();q.select()}
    else if(e.key==="Escape"&&mode&&document.activeElement!==q){setMode(null)}
  });
  let v="lanac";try{v=localStorage.getItem("mv-view")||"lanac"}catch(e){}
  setView(v);setMode(parseHash(),false);renderAll();syncMenus();applyScript(document.body);
  window.addEventListener("hashchange",()=>{const m=parseHash();if(m&&!(mode&&m.t===mode.t&&m.id===mode.id))setMode(m,true)});
}
init();
