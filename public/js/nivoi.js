/* Prikaz „Nivoi vlasti“ — vertikalna podela vlasti.
   Svaki nivo je pojas sa predstavničkim telom levo i izvršnim organom desno; linije pokazuju ko koga bira i ko koga nadzire. */

/* Piktogrami za pokrajinske i lokalne organe */
Object.assign(ICO,{
  skupstinaapv:"M4 18a8 8 0 0 1 16 0M7 18a5 5 0 0 1 10 0M3 18h18M5 21h14",
  vladaapv:"M5 11h14v4H5zM8 8.5h.01M12 8.5h.01M16 8.5h.01M8 17.5h.01M12 17.5h.01M16 17.5h.01M3 21h18",
  skupstinabg:"M3 20h18M5 20V10l7-5 7 5v10M9 20v-5h6v5M9 11h6",
  gradonacelnik:"M12 3v4M8 7h8l1 4H7zM6 11h12v9H6zM10 20v-4h4v4",
  gradovi:"M3 20h18M4 20V9h5v11M9 20V5h6v15M15 20v-8h5v8M11 8h2M11 11h2M11 14h2",
  opstine:"M3 20v-8l5-4 5 4v8M13 20v-5l4-3 4 3v5M2 20h20M7 20v-4h2v4"
});

const LEVELS=[
  {k:"rep",n:"Republika",d:"Zakoni, budžet, spoljna politika, odbrana, policija i pravosuđe.",leg:["skupstina"],exe:["vlada","predsednik"]},
  {k:"apv",n:"Autonomna pokrajina Vojvodina",d:"Poslovi koje joj zakon i Statut poveravaju: privreda, poljoprivreda, kultura, obrazovanje, zdravstvo, u granicama republičkih zakona.",leg:["skupstinaapv"],exe:["vladaapv"],
   note:"Ustav predviđa i AP Kosovo i Metohiju; šema ne prikazuje institucije na Kosovu."},
  {k:"bg",n:"Grad Beograd",d:"Glavni grad ima poseban zakon; gradske opštine imaju svoje skupštine i predsednike.",leg:["skupstinabg"],exe:["gradonacelnik"]},
  {k:"gr",n:"Gradovi",d:"Komunalne usluge, urbanizam, lokalni budžet, javna preduzeća, predškolsko obrazovanje.",span:"gradovi"},
  {k:"op",n:"Opštine",d:"Isti izvorni poslovi kao gradovi, u manjem obimu.",span:"opstine"}
];
/* Veze između nivoa i unutar nivoa: [od, ka, glagol, vrsta] — "in" = unutar nivoa (uvek vidljivo), "x" = između nivoa (kad je izabrano) */
const LEVEL_LINKS=[
  ["skupstina","vlada","bira Vladu","in"],["skupstinaapv","vladaapv","bira Pokrajinsku vladu","in"],["skupstinabg","gradonacelnik","bira gradonačelnika i Gradsko veće","in"],
  ["gradjani","skupstina","biraju poslanike","x"],["gradjani","skupstinaapv","biraju poslanike","x"],["gradjani","skupstinabg","biraju odbornike","x"],["gradjani","gradovi","biraju odbornike","x"],["gradjani","opstine","biraju odbornike","x"],
  ["skupstina","skupstinaapv","daje saglasnost na Statut; zakonom prenosi poslove","x"],
  ["vlada","vladaapv","nadzire zakonitost rada","x"],["vlada","skupstinabg","može raspustiti skupštinu u zakonom određenim slučajevima","x"],["vlada","gradovi","nadzire zakonitost; može raspustiti skupštinu","x"],["vlada","opstine","nadzire zakonitost; može raspustiti skupštinu","x"]
];
const LEVEL_INFO={
  "vlada>vladaapv":"Vlada prati zakonitost akata pokrajinskih organa i može pred Ustavnim sudom pokrenuti ocenu njihove ustavnosti i zakonitosti.",
  "vlada>skupstinabg":"Vlada može raspustiti skupštinu grada ako duže od tri meseca ne zaseda, ne izabere izvršne organe ili ne donese budžet; tada imenuje privremeni organ i raspisuju se izbori.",
  "vlada>gradovi":"Vlada može raspustiti skupštinu grada u zakonom određenim slučajevima (ne zaseda, ne bira organe, ne donosi budžet); ministarstvo nadzire zakonitost akata.",
  "vlada>opstine":"Vlada može raspustiti skupštinu opštine u zakonom određenim slučajevima; ministarstvo nadzire zakonitost akata.",
  "skupstina>skupstinaapv":"Statut Vojvodine donosi Skupština AP Vojvodine uz prethodnu saglasnost Narodne skupštine; nadležnosti pokrajine utvrđuju se zakonom."
};
const LEVEL_NODES=new Set(["gradjani",...LEVELS.flatMap(l=>[...(l.leg||[]),...(l.exe||[]),...(l.span?[l.span]:[])])]);

const Niv={
  el:null,svg:null,
  render(stage){
    const card=id=>{const it=INST[id];if(!it)return"";return `<button class="card lcard" data-id="${id}" data-b="${it.b}" style="--wc:${bc(it.b)}" aria-label="${esc(it.n)}">
      <span class="c-ico">${icoSvg(id,20)}</span><span class="c-txt"><span class="c-n">${esc(it.p)}</span><span class="c-s">${esc(it.short)}</span></span><span class="c-b" data-badge="${id}"></span><span class="c-step" data-step="${id}"></span>${emBadge(id)}</button>`};
    let h=`<div class="niv" id="niv"><svg class="edges" aria-hidden="true"></svg><div class="hnote" id="nnote" hidden></div>`;
    h+=`<div class="nrow nhead"><span></span><span class="lbl">Predstavničko telo</span><span class="lbl">Izvršni organ</span></div>`;
    h+=`<section class="nrow nvoters"><header class="tier-h"><span class="tier-n">Polazište</span><h3>Građani</h3><p>Biraju predstavnička tela na svakom nivou; izvršne organe biraju ta tela.</p></header><div class="ncell">${card("gradjani")}</div><div class="ncell"></div></section>`;
    LEVELS.forEach((L,i)=>{
      h+=`<section class="nrow" data-lv="${L.k}"><header class="tier-h"><span class="tier-n">Nivo ${i+1}</span><h3>${esc(L.n)}</h3><p>${esc(L.d)}</p>${L.note?`<p class="nnote">${esc(L.note)}</p>`:""}</header>`;
      if(L.span)h+=`<div class="ncell nspan">${card(L.span)}</div>`;
      else h+=`<div class="ncell">${L.leg.map(card).join("")}</div><div class="ncell">${L.exe.map(card).join("")}</div>`;
      h+=`</section>`;
    });
    h+=`</div>`;
    stage.innerHTML=h;
    this.el=stage.querySelector("#niv");this.svg=this.el.querySelector(".edges");
    this.el.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>openRoom(c.dataset.id,true)));
    this.svg.addEventListener("mouseover",e=>{const g=e.target.closest(".eg");if(!g)return;g.classList.add("hot");this.el.classList.add("ehover");
      const k=g.dataset.a+">"+g.dataset.b,info=LEVEL_INFO[k]||LEGIT_INFO[k]||LINK_INFO[k];
      tip.innerHTML=`<span class="lbl">Odnos</span><span class="rel">${esc(INST[g.dataset.a].p)} <i>→ ${esc(g.dataset.v)} →</i> ${esc(INST[g.dataset.b].p)}</span>${info?`<span>${esc(info)}</span>`:""}`;
      tip.hidden=false;applyScript(tip);placeTip(e.clientX+14,e.clientY+14)});
    this.svg.addEventListener("mousemove",e=>{if(e.target.closest(".eg"))placeTip(e.clientX+14,e.clientY+14)});
    this.svg.addEventListener("mouseout",e=>{const g=e.target.closest(".eg");if(!g)return;g.classList.remove("hot");this.el.classList.remove("ehover");hideTip()});
    this.svg.addEventListener("click",e=>{const g=e.target.closest(".eg");if(!g)return;hideTip();const cur=mode&&mode.t==="room"?mode.id:null;openRoom(g.dataset.a===cur?g.dataset.b:g.dataset.a,true)});
    this.el.querySelector("#nnote").addEventListener("click",e=>{const b=e.target.closest("[data-goview]");if(b)setView(b.dataset.goview)});
    if(this.ro)this.ro.disconnect();this.ro=new ResizeObserver(()=>this.drawEdges());this.ro.observe(this.el);
  },
  state(){
    const r={sel:null,rel:new Set(),cross:[],steps:{},missing:null};
    if(!mode)return r;
    if(mode.t==="room"||mode.t==="person"){
      const id=mode.t==="room"?mode.id:PBY[mode.id].room;r.sel=id;
      if(!LEVEL_NODES.has(id))r.missing=id;
      LEVEL_LINKS.forEach(e=>{if(e[3]==="x"&&(e[0]===id||e[1]===id)){r.cross.push(e);r.rel.add(e[0]===id?e[1]:e[0])}else if(e[3]==="in"&&(e[0]===id||e[1]===id))r.rel.add(e[0]===id?e[1]:e[0])});
      if(mode.t==="person")evForPerson(mode.id).forEach(e=>e.i.forEach(i=>{if(i!==id)r.rel.add(i)}));
    }else if(mode.t==="case"){EV.filter(e=>e.k.includes(mode.id)&&inScope(e)).forEach(e=>e.i.forEach(i=>r.rel.add(i)))}
    else if(mode.t==="path"||mode.t==="meh"){guideSteps(mode).forEach(s=>{r.rel.add(s[0]);(r.steps[s[0]]=r.steps[s[0]]||[]).push(s[2])})}
    return r;
  },
  update(){
    if(!this.el)return;const S=this.state();this.S=S;
    this.el.classList.toggle("focus",!!mode&&!S.missing);
    this.el.querySelectorAll(".card").forEach(c=>{const id=c.dataset.id;
      c.classList.toggle("sel",id===S.sel);c.classList.toggle("rel",S.rel.has(id));c.setAttribute("aria-pressed",id===S.sel);
      const st=c.querySelector(".c-step");st.textContent=S.steps[id]?S.steps[id].join(" · "):"";st.hidden=!S.steps[id];
      const b=c.querySelector(".c-b");const n=mode&&mode.t==="case"?EV.filter(e=>e.k.includes(mode.id)&&e.i.includes(id)&&inScope(e)).length:evFor(id).length;b.textContent=n||"";b.hidden=!n;b.title=n+" vesti"});
    this.el.querySelectorAll(".nrow[data-lv]").forEach(r=>{r.classList.toggle("on",!!S.sel&&!!r.querySelector(`.card[data-id="${S.sel}"]`))});
    const note=this.el.querySelector("#nnote");
    if(S.missing){const inHier=typeof HNODES!=="undefined"&&HNODES.has(S.missing);note.innerHTML=`<strong>${esc(INST[S.missing].n)}</strong> deluje na nivou Republike, ali nije predstavničko telo ni izvršni organ. <button class="lk" data-goview="${inHier?"nadredjenost":"lanac"}">Pogledajte je u prikazu „${inHier?"Ko je kome nadređen":"Ko koga bira"}“</button>`;note.hidden=false;applyScript(note)}else note.hidden=true;
    this.drawEdges();
  },
  drawEdges(){
    if(!this.el||!this.S)return;
    const box=this.el.getBoundingClientRect();
    this.svg.setAttribute("width",this.el.scrollWidth);this.svg.setAttribute("height",this.el.scrollHeight);
    const rc=id=>{const c=this.el.querySelector(`.card[data-id="${id}"]`);if(!c)return null;const r=c.getBoundingClientRect();return{x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height}};
    const S=this.S;let h="";
    const draw=([a,b,v,k],on)=>{const A=rc(a),B=rc(b);if(!A||!B)return"";let d;
      if(k==="in"&&B.y>=A.y+A.h-2&&B.x<A.x+A.w/2){const x=A.x+28;d=`M${x} ${A.y+A.h} V${B.y-3}`}
      else if(k==="in"){const x1=A.x+A.w,y1=A.y+A.h/2,x2=B.x-3,y2=B.y+B.h/2,mx=(x1+x2)/2;d=`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`}
      else{const x1=A.x+Math.min(A.w-14,40+(B.x>A.x+A.w/2?A.w-60:0)),y1=A.y+A.h,x2=B.x+Math.min(40,B.w/2),y2=B.y-3,dy=Math.max(20,(y2-y1)/2);d=`M${x1} ${y1} C${x1} ${y1+dy} ${x2} ${y2-dy} ${x2} ${y2}`}
      return `<g class="eg ${k==="in"?"tree":"cross"}${on?" on":""}" data-a="${a}" data-b="${b}" data-v="${esc(v)}"><path class="e" d="${d}" marker-end="url(#na)"/><path class="ehit" d="${d}"/></g>`};
    LEVEL_LINKS.filter(e=>e[3]==="in").forEach(e=>{h+=draw(e,S.sel===e[0]||S.sel===e[1])});
    S.cross.forEach(e=>{h+=draw(e,true)});
    this.svg.innerHTML=`<defs><marker id="na" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9z" fill="var(--accent)"/></marker></defs>`+h;
  },
  focusCard(id){const c=this.el&&this.el.querySelector(`.card[data-id="${id}"]`);if(c)c.scrollIntoView({block:"nearest",behavior:"smooth"})}
};
