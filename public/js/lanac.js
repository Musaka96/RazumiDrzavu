/* Prikaz „Ko koga bira“ — lanac legitimiteta.
   Institucije su složene u nivoe prema broju koraka od birača. Nivoi se računaju iz LEGIT veza. */

/* Veze izbora i imenovanja: [ko bira, koga, kratko] */
const LEGIT=[
 ["gradjani","skupstina","biraju 250 poslanika"],["gradjani","predsednik","biraju neposredno"],["gradjani","skupstinaapv","biraju 120 poslanika"],["gradjani","skupstinabg","biraju 110 odbornika"],["gradjani","gradovi","biraju skupštine gradova"],["gradjani","opstine","biraju skupštine opština"],
 ["skupstinaapv","vladaapv","bira Pokrajinsku vladu"],["skupstinabg","gradonacelnik","bira gradonačelnika i Gradsko veće"],
 ["studenti","skupstina","osvojila 140 mandata"],["sns","skupstina","osvojila 103 mandata"],
 ["skupstina","vlada","bira Vladu"],["skupstina","ustavni","bira 5 sudija"],["predsednik","ustavni","imenuje 5 sudija"],
 ["skupstina","vjt","bira Vrhovnog javnog tužioca"],["skupstina","vss","bira 4 člana"],["skupstina","vst","bira 4 člana"],
["skupstina","rik","bira stalni sastav"],["skupstina","nbs","bira guvernera"],
 ["skupstina","rem","bira Savet"],["skupstina","acas","bira Odbor agencije"],["skupstina","ombudsman","bira"],["skupstina","poverenik","bira"],
 ["skupstina","ravnopravnost","bira"],["skupstina","dri","bira Savet"],
 ["vlada","minpravde","ministar je član Vlade"],["vlada","msp","ministar je član Vlade"],["vlada","minfin","ministar je član Vlade"],["vlada","mduls","ministar je član Vlade"],["vlada","mei","ministar je član Vlade"],["vlada","mit","ministar je član Vlade"],["vlada","prosveta","ministar je član Vlade"],["vlada","mgsi","ministar je član Vlade"],["vlada","minkult","ministar je član Vlade"],["vlada","ministarstva","ministri su članovi Vlade"],["vlada","mup","ministar je član Vlade; postavlja direktora policije"],["vlada","bia","postavlja direktora"],
 ["vlada","vojska","ministar odbrane je član Vlade"],["predsednik","vojska","komanduje Vojskom; postavlja generale"],
 ["vss","vrhovni","bira sudije"],["vss","apelacioni","bira sudije"],["vss","upravni","bira sudije"],["vss","osnovni","bira sudije"],
 ["vst","tok","bira tužioce"],["vst","vjtbg","bira tužioce"],["vst","tuzilastva","bira tužioce"],["vst","tuzrz","bira tužioce"],
 ["rem","javniservis","bira upravne odbore"]
];
const LEGIT_INFO={
 "gradjani>skupstina":"Građani na parlamentarnim izborima biraju 250 poslanika po proporcionalnom sistemu, uz cenzus od 3%.",
 "gradjani>gradovi":"Građani biraju skupštinu grada; ona zatim bira gradonačelnika i gradsko veće.",
 "gradjani>opstine":"Građani biraju skupštinu opštine; ona zatim bira predsednika opštine i opštinsko veće.",
 "skupstinaapv>vladaapv":"Skupština AP Vojvodine bira Pokrajinsku vladu većinom svih poslanika, na predlog predsednika Skupštine.",
 "skupstinabg>gradonacelnik":"Skupština grada bira gradonačelnika tajnim glasanjem, većinom svih 110 odbornika; razrešenje može predložiti trećina odbornika.",
 "studenti>skupstina":"Studentska lista je na izborima 25. 10. 2026. osvojila 140 mandata, što je većina u Skupštini.",
 "sns>skupstina":"Lista „Aleksandar Vučić – Ujedinjena Srbija“ osvojila je 103 mandata.",
 "skupstina>rik":"Skupština bira predsednika i stalni sastav RIK-a; liste koje učestvuju na izborima imenuju članove proširenog sastava.",
 "skupstina>acas":"Skupština bira Odbor Agencije, a Odbor bira direktora.",
 "skupstina>ombudsman":"Skupština bira Zaštitnika građana na osam godina.",
 "skupstina>poverenik":"Skupština bira Poverenika za informacije na sedam godina; od jula 2026. funkciju vrši zamenica.",
 "skupstina>ravnopravnost":"Skupština bira Poverenika za zaštitu ravnopravnosti na pet godina.",
 "skupstina>dri":"Skupština bira Savet Državne revizorske institucije.",
 "vss>vrhovni":"Visoki savet sudstva bira sudije Vrhovnog suda i, od 2022, njegovog predsednika.",
 "vst>tuzrz":"VST bira tužioce za ratne zločine i postavlja vršioca funkcije glavnog tužioca dok se ne izabere novi."
};
const TIER_INFO=[
 {n:"Birači i izborne liste",d:"Izvor vlasti. Liste se takmiče za mandate u Skupštini."},
 {n:"Biraju ih građani",d:"Narodna skupština, predsednik Republike, Skupština AP Vojvodine i skupštine gradova i opština."},
 {n:"Biraju ih skupštine ili imenuje predsednik",d:"Vlada, Pokrajinska vlada, gradonačelnik Beograda, sudije Ustavnog suda, Vrhovni javni tužilac, saveti pravosuđa i nezavisna tela."},
 {n:"Postavljaju ih Vlada, saveti i regulatori",d:"Ministarstva i službe, sudije i tužioci, javni servisi."}
];
const BR_ORDER=["leg","exe","jud","pro","ind","lok","act"];

/* Nivoi: najkraći put od birača */
const TIER={gradjani:0,studenti:0,sns:0};
(()=>{let changed=true;while(changed){changed=false;LEGIT.forEach(([a,b])=>{if(TIER[a]!=null&&(TIER[b]==null||TIER[b]>TIER[a]+1)){TIER[b]=TIER[a]+1;changed=true}})}})();
const legitUp=id=>LEGIT.filter(e=>e[1]===id);
const legitDown=id=>LEGIT.filter(e=>e[0]===id);
function ancestors(id){const s=new Set(),q=[id];while(q.length){const x=q.shift();legitUp(x).forEach(([a])=>{if(!s.has(a)){s.add(a);q.push(a)}})}return s}
/* Jedan najkraći lanac do birača, za prikaz u panelu */
function chainToVoters(id){
  const prev={},q=[id],seen=new Set([id]);
  while(q.length){const x=q.shift();if(x==="gradjani")break;legitUp(x).forEach(([a])=>{if(!seen.has(a)){seen.add(a);prev[a]=x;q.push(a)}})}
  if(!seen.has("gradjani"))return null;
  const out=["gradjani"];let c="gradjani";while(c!==id){c=prev[c];out.push(c)}return out;
}

const Lanac={
  el:null,svg:null,
  render(stage){
    const tiers=[];Object.keys(INST).forEach(id=>{const t=TIER[id];if(t==null)return;(tiers[t]=tiers[t]||[]).push(id)});
    const outside=Object.keys(INST).filter(id=>TIER[id]==null);
    const card=id=>{const it=INST[id];return `<button class="card" data-id="${id}" data-b="${it.b}" style="--wc:${bc(it.b)}" aria-label="${esc(it.n)}">
      <span class="c-ico">${icoSvg(id,20)}</span><span class="c-txt"><span class="c-n">${esc(it.p)}</span><span class="c-s">${esc(it.short)}</span></span><span class="c-b" data-badge="${id}"></span><span class="c-step" data-step="${id}"></span>${emBadge(id)}</button>`};
    const groups=ids=>BR_ORDER.filter(b=>ids.some(id=>INST[id].b===b)).map(b=>`<div class="grp" style="--wc:${bc(b)}"><span class="grp-l">${esc(BR[b].n)}</span><div class="cards">${ids.filter(id=>INST[id].b===b).map(card).join("")}</div></div>`).join("");
    let h=`<div class="lanac" id="lanac"><svg class="edges" aria-hidden="true"></svg>`;
    tiers.forEach((ids,t)=>{h+=`<section class="tier" data-tier="${t}"><header class="tier-h"><span class="tier-n">${t===0?"Polazište":"Nivo "+t}</span><h3>${esc(TIER_INFO[t].n)}</h3><p>${esc(TIER_INFO[t].d)}</p></header><div class="tier-b">${groups(ids)}</div></section>`});
    if(outside.length)h+=`<section class="tier tier-out"><header class="tier-h"><span class="tier-n">Van lanca</span><h3>Utiču, ali ih niko ne bira</h3><p>Posmatrači i međunarodne institucije ocenjuju rad vlasti.</p></header><div class="tier-b">${groups(outside)}</div></section>`;
    h+=`</div>`;
    stage.innerHTML=h;
    this.el=stage.querySelector("#lanac");this.svg=this.el.querySelector(".edges");
    this.el.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>openRoom(c.dataset.id,true)));
    this.svg.addEventListener("mouseover",e=>{const g=e.target.closest(".eg");if(!g)return;g.classList.add("hot");this.el.classList.add("ehover");showRelTip(g.dataset.a,g.dataset.b,g.dataset.v,e.clientX,e.clientY)});
    this.svg.addEventListener("mousemove",e=>{if(e.target.closest(".eg"))placeTip(e.clientX+14,e.clientY+14)});
    this.svg.addEventListener("mouseout",e=>{const g=e.target.closest(".eg");if(!g)return;g.classList.remove("hot");this.el.classList.remove("ehover");hideTip()});
    this.svg.addEventListener("click",e=>{const g=e.target.closest(".eg");if(!g)return;hideTip();const cur=mode&&mode.t==="room"?mode.id:null;openRoom(g.dataset.a===cur?g.dataset.b:g.dataset.a,true)});
    if(this.ro)this.ro.disconnect();
    this.ro=new ResizeObserver(()=>this.drawEdges());this.ro.observe(this.el);
  },
  /* Ko je istaknut i koje linije se crtaju, u zavisnosti od izbora */
  state(){
    const r={sel:null,up:new Set(),down:new Set(),rel:new Set(),edges:[],steps:{}};
    if(!mode)return r;
    if(mode.t==="room"||mode.t==="person"){
      const id=mode.t==="room"?mode.id:PBY[mode.id].room;r.sel=id;
      r.up=ancestors(id);
      legitDown(id).forEach(([,b])=>r.down.add(b));
      LEGIT.forEach(e=>{const[a,b]=e;if((r.up.has(a)||a===id)&&(r.up.has(b)||b===id))r.edges.push({e,k:"up"});else if(a===id)r.edges.push({e,k:"down"})});
      if(mode.t==="person")evForPerson(mode.id).forEach(e=>e.i.forEach(i=>{if(i!==id)r.rel.add(i)}));
    }else if(mode.t==="path"||mode.t==="meh"){
      const G=guideSteps(mode);
      G.forEach((s,i)=>{r.rel.add(s[0]);(r.steps[s[0]]=r.steps[s[0]]||[]).push(s[2]);if(i)r.edges.push({e:[G[i-1][0],s[0],s[1]],k:"route"})});
    }else if(mode.t==="case"){
      EV.filter(e=>e.k.includes(mode.id)&&inScope(e)).forEach(e=>e.i.forEach(i=>r.rel.add(i)));
    }
    return r;
  },
  update(){
    if(!this.el)return;const S=this.state();this.S=S;
    this.el.classList.toggle("focus",!!mode);
    this.el.querySelectorAll(".card").forEach(c=>{const id=c.dataset.id;
      c.classList.toggle("sel",id===S.sel);c.classList.toggle("up",S.up.has(id));c.classList.toggle("down",S.down.has(id));c.classList.toggle("rel",S.rel.has(id));
      c.setAttribute("aria-pressed",id===S.sel);
      const st=c.querySelector(".c-step");st.textContent=S.steps[id]?S.steps[id].join(" · "):"";st.hidden=!S.steps[id];
      const b=c.querySelector(".c-b");const n=mode&&mode.t==="case"?EV.filter(e=>e.k.includes(mode.id)&&e.i.includes(id)&&inScope(e)).length:evFor(id).length;b.textContent=n||"";b.hidden=!n;b.title=n+" vesti";
    });
    this.drawEdges();
  },
  drawEdges(){
    if(!this.el||!this.S)return;
    const box=this.el.getBoundingClientRect();
    this.svg.setAttribute("width",this.el.scrollWidth);this.svg.setAttribute("height",this.el.scrollHeight);
    const rc=id=>{const c=this.el.querySelector(`.card[data-id="${id}"]`);if(!c)return null;const r=c.getBoundingClientRect();return{x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height}};
    let h="";
    this.S.edges.forEach(({e:[a,b,v],k})=>{
      const A=rc(a),B=rc(b);if(!A||!B)return;let d;
      if(k==="route"){const x1=A.x+A.w/2,y1=A.y+A.h/2,x2=B.x+B.w/2,y2=B.y+B.h/2,mx=(x1+x2)/2,my=(y1+y2)/2-Math.min(60,Math.abs(x2-x1)/4);d=`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`}
      else if(Math.abs(A.y-B.y)<4){const x1=A.x+A.w/2,x2=B.x+B.w/2,y=A.y+A.h;d=`M${x1} ${y} C${x1} ${y+34} ${x2} ${y+34} ${x2} ${y+4}`}
      else{const x1=A.x+A.w/2,y1=A.y+A.h,x2=B.x+B.w/2,y2=B.y-3,dy=Math.max(24,(y2-y1)/2);d=`M${x1} ${y1} C${x1} ${y1+dy} ${x2} ${y2-dy} ${x2} ${y2}`}
      h+=`<g class="eg ${k}" data-a="${a}" data-b="${b}" data-v="${esc(v)}"><path class="e" d="${d}" marker-end="url(#ea)"/><path class="ehit" d="${d}"/></g>`;
    });
    this.svg.innerHTML=`<defs><marker id="ea" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9z" fill="var(--accent)"/></marker></defs>`+h;
  },
  focusCard(id){const c=this.el&&this.el.querySelector(`.card[data-id="${id}"]`);if(c)c.scrollIntoView({block:"nearest",behavior:"smooth"})}
};
