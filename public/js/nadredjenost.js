/* Prikaz „Ko je kome nadređen“ — tri stabla nadređenosti (sudovi, tužilaštva, izvršna vlast)
   sa Ustavnim sudom iznad svih. Linije stabla su uvek vidljive; veze između stabala se crtaju kad se nešto izabere. */

/* Stabla. id = institucija iz INST; sub = jedinice unutar institucije (skupljene dok se ne otvore). */
const HIER={
  top:"ustavni",
  cols:[
    {b:"jud",n:"Sudovi",d:"Viša instanca odlučuje o žalbama na odluke niže.",head:[["vss","bira sudije i predsednike sudova"]],
     tree:{id:"vrhovni",kids:[
       {id:"apelacioni",sub:["Apelacioni sud u Beogradu","Apelacioni sud u Novom Sadu","Apelacioni sud u Kragujevcu","Apelacioni sud u Nišu"],kids:[
         {id:"osnovni",sub:["Viši sudovi (25)","Osnovni sudovi (66)","Posebna odeljenja Višeg suda u Beogradu: organizovani kriminal i ratni zločini","Četvrti osnovni sud u Beogradu (osnovan 2026.)"]}]},
       {id:"upravni"}]}},
    {b:"pro",n:"Tužilaštva",d:"Viši tužilac daje uputstva nižem i može preuzeti predmet.",head:[["vst","bira tužioce; predlaže Vrhovnog javnog tužioca"]],
     tree:{id:"vjt",kids:[
       {id:"tok"},{id:"tuzrz"},
       {id:"tuzilastva",sub:["Apelaciona javna tužilaštva (4)","Viša javna tužilaštva","Osnovna javna tužilaštva"],kids:[{id:"vjtbg"}]}]}},
    {b:"exe",n:"Izvršna vlast",d:"Ministarstva i službe rade u sastavu Vlade ili pod njenim nadzorom.",head:[["predsednik","komanduje Vojskom"]],
     tree:{id:"vlada",kids:[
       {id:"minpravde",sub:["Uprava za izvršenje krivičnih sankcija (zatvori)"]},
       {id:"mup",sub:["Direkcija policije","Uprava kriminalističke policije (UKP)","Specijalna antiteroristička jedinica (SAJ)"]},
       {id:"vojska",sub:["Ministarstvo odbrane","Generalštab Vojske Srbije","Vojnobezbednosna agencija (VBA)","Vojnoobaveštajna agencija (VOA)"]},
       {id:"bia"}]}}
  ]
};
/* Opisi linija stabla: "nadređeni>podređeni" */
const HIER_INFO={
  "vrhovni>apelacioni":"Vrhovni sud odlučuje o vanrednim pravnim lekovima protiv odluka apelacionih sudova i ujednačava sudsku praksu.",
  "apelacioni>osnovni":"Apelacioni sudovi odlučuju o žalbama na presude viših i osnovnih sudova i o optužnicama u težim predmetima.",
  "vrhovni>upravni":"Protiv odluka Upravnog suda može se tražiti preispitivanje pred Vrhovnim sudom.",
  "vjt>tok":"Vrhovni javni tužilac je nadređen svim tužiocima: daje opšta obavezna uputstva, nadzire rad i može preuzeti predmet.",
  "vjt>tuzrz":"Vrhovni javni tužilac je nadređen i Tužilaštvu za ratne zločine.",
  "vjt>tuzilastva":"Hijerarhija ide od Vrhovnog preko apelacionih i viših do osnovnih tužilaštava; viši tužilac može davati uputstva nižem.",
  "tuzilastva>vjtbg":"Više javno tužilaštvo u Beogradu je deo mreže viših tužilaštava; nad njim je Apelaciono javno tužilaštvo u Beogradu, a od oktobra 2026. ga kontroliše komisija Vrhovnog javnog tužilaštva.",
  "vlada>minpravde":"Ministarstvo pravde je organ državne uprave u sastavu Vlade; ministar odgovara Vladi i Skupštini.",
  "vlada>mup":"MUP je ministarstvo u sastavu Vlade; Vlada postavlja direktora policije.",
  "vlada>vojska":"Ministarstvo odbrane je u sastavu Vlade, a Vojska u sastavu Ministarstva odbrane.",
  "vlada>bia":"BIA je samostalna služba čiji rad usmerava Vlada; Vlada postavlja i razrešava direktora."
};
/* Veze između stabala i sa „kadrovskim“ telima: [od, ka, glagol]; crtaju se kad je izabran jedan kraj */
const HIER_CROSS=[
  ["vss","vrhovni","bira sudije"],["vss","apelacioni","bira sudije"],["vss","upravni","bira sudije"],["vss","osnovni","bira sudije"],
  ["vst","vjt","predlaže Skupštini kandidata"],["vst","tok","bira tužioce"],["vst","tuzrz","bira tužioce"],["vst","tuzilastva","bira tužioce"],["vst","vjtbg","bira tužioce"],
  ["predsednik","vojska","komanduje Vojskom"],["minpravde","vst","ministar je član VST"],
  ["tok","mup","rukovodi istragom"],["vjtbg","mup","rukovodi istragom"],["tuzilastva","mup","rukovodi istragom"],
  ["tok","osnovni","podiže optužnice pred posebnim odeljenjima"],["tuzilastva","osnovni","podiže optužnice"],["vjtbg","osnovni","podiže optužnice"],
  ["ustavni","vrhovni","ocenjuje ustavnost; ustavne žalbe protiv sudskih odluka"],["ustavni","vlada","ocenjuje ustavnost propisa Vlade"],["ustavni","vjt","ustavne žalbe protiv akata organa"]
];
const HIER_CROSS_INFO={
  "tok>mup":"U istrazi tužilac rukovodi, a policija izvršava naloge. TOK se 2025–2026. žalio da je policija ignorisala njegove zahteve.",
  "vjtbg>mup":"Po nalogu VJT u Beogradu policija je 1. 11. 2026. uhapsila načelnika UKP-a.",
  "tuzilastva>mup":"Policija u predistražnom postupku i istrazi radi po nalogu nadležnog tužioca.",
  "tok>osnovni":"Optužnice TOK-a se podnose posebnim odeljenjima Višeg suda u Beogradu.",
  "tuzilastva>osnovni":"Tužilaštvo podiže optužnicu pred sudom istog nivoa; sud je potvrđuje ili vraća.",
  "ustavni>vrhovni":"Protiv odluka sudova, uključujući Vrhovni sud, može se podneti ustavna žalba Ustavnom sudu.",
  "ustavni>vlada":"Ustavni sud može ukinuti uredbu ili drugi propis Vlade koji nije u skladu sa Ustavom i zakonom."
};

/* Pomoćne strukture */
const HPARENT={},HNODES=new Set([HIER.top]);
HIER.cols.forEach(c=>{c.head.forEach(([id])=>HNODES.add(id));(function walk(n,p){HNODES.add(n.id);if(p)HPARENT[n.id]=p;(n.kids||[]).forEach(k=>walk(k,n.id))})(c.tree,null)});
const hAnc=id=>{const o=[];let c=HPARENT[id];while(c){o.push(c);c=HPARENT[c]}return o};
const hKids=id=>Object.keys(HPARENT).filter(k=>HPARENT[k]===id);

const Nad={
  el:null,svg:null,open:new Set(),
  render(stage){
    const card=(id,extra)=>{const it=INST[id];return `<button class="card hcard" data-id="${id}" data-b="${it.b}" style="--wc:${bc(it.b)}" aria-label="${esc(it.n)}">
      <span class="c-ico">${icoSvg(id,20)}</span><span class="c-txt"><span class="c-n">${esc(it.p)}</span><span class="c-s">${esc(it.short)}</span></span><span class="c-b" data-badge="${id}"></span><span class="c-step" data-step="${id}"></span>${emBadge(id)}</button>${extra||""}`};
    const node=(n,depth)=>{
      const sub=n.sub?`<button class="hsub-t" data-sub="${n.id}" aria-expanded="${this.open.has(n.id)}">${this.open.has(n.id)?"Sakrij":"Prikaži"} unutrašnje jedinice (${n.sub.length})</button><ul class="hsub" ${this.open.has(n.id)?"":"hidden"}>${n.sub.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>`:"";
      return `<li class="hn" style="--d:${depth}">${card(n.id,sub)}${n.kids?`<ul class="hk">${n.kids.map(k=>node(k,depth+1)).join("")}</ul>`:""}</li>`;
    };
    let h=`<div class="hier" id="hier"><svg class="edges" aria-hidden="true"></svg><div class="hnote" id="hnote" hidden></div>`;
    h+=`<section class="htop"><header class="tier-h"><span class="tier-n">Iznad svih</span><h3>Kontrola ustavnosti</h3><p>Ustavni sud ocenjuje zakone i propise i odlučuje o ustavnim žalbama protiv odluka svih organa.</p></header><div>${card(HIER.top)}</div></section>`;
    h+=`<div class="hcols">`;
    HIER.cols.forEach(c=>{
      h+=`<section class="hcol" style="--wc:${bc(c.b)}"><header class="hcol-h"><span class="grp-l">${esc(BR[c.b].n)}</span><h3>${esc(c.n)}</h3><p>${esc(c.d)}</p></header>
      <div class="hhead">${c.head.map(([id,v])=>`<div class="hhead-i"><span class="lbl">${esc(v)}</span>${card(id)}</div>`).join("")}</div>
      <ul class="htree">${node(c.tree,0)}</ul></section>`;
    });
    h+=`</div></div>`;
    stage.innerHTML=h;
    this.el=stage.querySelector("#hier");this.svg=this.el.querySelector(".edges");
    this.el.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>openRoom(c.dataset.id,true)));
    this.el.querySelectorAll("[data-sub]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.sub;this.open.has(id)?this.open.delete(id):this.open.add(id);
      const ul=b.nextElementSibling;ul.hidden=!this.open.has(id);b.setAttribute("aria-expanded",this.open.has(id));b.textContent=`${this.open.has(id)?"Sakrij":"Prikaži"} unutrašnje jedinice (${ul.children.length})`;applyScript(b);this.drawEdges()}));
    this.svg.addEventListener("mouseover",e=>{const g=e.target.closest(".eg");if(!g)return;g.classList.add("hot");this.el.classList.add("ehover");
      const k=g.dataset.a+">"+g.dataset.b,info=HIER_INFO[k]||HIER_CROSS_INFO[k]||LINK_INFO[k];
      tip.innerHTML=`<span class="lbl">${g.classList.contains("tree")?"Nadređenost":"Odnos"}</span><span class="rel">${esc(INST[g.dataset.a].p)} <i>→ ${esc(g.dataset.v)} →</i> ${esc(INST[g.dataset.b].p)}</span>${info?`<span>${esc(info)}</span>`:""}`;
      tip.hidden=false;applyScript(tip);placeTip(e.clientX+14,e.clientY+14)});
    this.svg.addEventListener("mousemove",e=>{if(e.target.closest(".eg"))placeTip(e.clientX+14,e.clientY+14)});
    this.svg.addEventListener("mouseout",e=>{const g=e.target.closest(".eg");if(!g)return;g.classList.remove("hot");this.el.classList.remove("ehover");hideTip()});
    this.svg.addEventListener("click",e=>{const g=e.target.closest(".eg");if(!g)return;hideTip();const cur=mode&&mode.t==="room"?mode.id:null;openRoom(g.dataset.a===cur?g.dataset.b:g.dataset.a,true)});
    this.el.querySelector("#hnote").addEventListener("click",e=>{if(e.target.closest("[data-goview]"))setView("lanac")});
    if(this.ro)this.ro.disconnect();this.ro=new ResizeObserver(()=>this.drawEdges());this.ro.observe(this.el);
  },
  state(){
    const r={sel:null,up:new Set(),down:new Set(),rel:new Set(),cross:[],steps:{},missing:null};
    if(!mode)return r;
    if(mode.t==="room"||mode.t==="person"){
      const id=mode.t==="room"?mode.id:PBY[mode.id].room;r.sel=id;
      if(!HNODES.has(id))r.missing=id;
      hAnc(id).forEach(a=>r.up.add(a));hKids(id).forEach(k=>r.down.add(k));
      HIER_CROSS.forEach(e=>{if(e[0]===id||e[1]===id){r.cross.push(e);r.rel.add(e[0]===id?e[1]:e[0])}});
      if(mode.t==="person")evForPerson(mode.id).forEach(e=>e.i.forEach(i=>{if(i!==id)r.rel.add(i)}));
    }else if(mode.t==="path"||mode.t==="meh"){
      let prev=null;
      guideSteps(mode).forEach(s=>{r.rel.add(s[0]);(r.steps[s[0]]=r.steps[s[0]]||[]).push(s[2]);if(HNODES.has(s[0])){if(prev)r.cross.push([prev,s[0],s[1],"route"]);prev=s[0]}});
    }else if(mode.t==="case"){
      EV.filter(e=>e.k.includes(mode.id)&&inScope(e)).forEach(e=>e.i.forEach(i=>r.rel.add(i)));
    }
    return r;
  },
  update(){
    if(!this.el)return;const S=this.state();this.S=S;
    this.el.classList.toggle("focus",!!mode&&!S.missing);
    this.el.querySelectorAll(".card").forEach(c=>{const id=c.dataset.id;
      c.classList.toggle("sel",id===S.sel);c.classList.toggle("up",S.up.has(id));c.classList.toggle("down",S.down.has(id));c.classList.toggle("rel",S.rel.has(id));c.setAttribute("aria-pressed",id===S.sel);
      const st=c.querySelector(".c-step");st.textContent=S.steps[id]?S.steps[id].join(" · "):"";st.hidden=!S.steps[id];
      const b=c.querySelector(".c-b");const n=mode&&mode.t==="case"?EV.filter(e=>e.k.includes(mode.id)&&e.i.includes(id)&&inScope(e)).length:evFor(id).length;b.textContent=n||"";b.hidden=!n;b.title=n+" vesti"});
    const note=this.el.querySelector("#hnote");
    if(S.missing){note.innerHTML=`<strong>${esc(INST[S.missing].n)}</strong> nije deo hijerarhije sudova, tužilaštava i izvršne vlasti. <button class="lk" data-goview="lanac">Pogledajte je u prikazu „Ko koga bira“</button>`;note.hidden=false;applyScript(note)}else note.hidden=true;
    this.drawEdges();
  },
  drawEdges(){
    if(!this.el||!this.S)return;
    const box=this.el.getBoundingClientRect();
    this.svg.setAttribute("width",this.el.scrollWidth);this.svg.setAttribute("height",this.el.scrollHeight);
    const rc=id=>{const c=this.el.querySelector(`.card[data-id="${id}"]`);if(!c)return null;const r=c.getBoundingClientRect();return{x:r.left-box.left,y:r.top-box.top,w:r.width,h:r.height}};
    const S=this.S,hot=new Set([S.sel,...S.up]);let h="";
    /* Linije stabla: od levog dna nadređenog do levog središta podređenog */
    Object.entries(HPARENT).forEach(([k,p])=>{const A=rc(p),B=rc(k);if(!A||!B)return;
      const x=A.x+16,y1=A.y+A.h,y2=B.y+Math.min(B.h/2,30),d=`M${x} ${y1} V${y2-6} Q${x} ${y2} ${x+6} ${y2} H${B.x-2}`;
      const on=(hot.has(k)&&hot.has(p))||(p===S.sel&&S.down.has(k));
      h+=`<g class="eg tree${on?" on":""}" data-a="${p}" data-b="${k}" data-v="nadređen"><path class="e" d="${d}"/><path class="ehit" d="${d}"/></g>`});
    /* Veze između stabala */
    S.cross.forEach(([a,b,v,k])=>{const A=rc(a),B=rc(b);if(!A||!B)return;
      const ax=A.x+A.w/2,ay=A.y+A.h/2,bx=B.x+B.w/2,by=B.y+B.h/2;let x1,y1,x2,y2;
      if(Math.abs(ax-bx)>Math.max(A.w,B.w)/2){x1=ax<bx?A.x+A.w:A.x;y1=ay;x2=ax<bx?B.x:B.x+B.w;y2=by}else{x1=ax;y1=ay<by?A.y+A.h:A.y;x2=bx;y2=ay<by?B.y:B.y+B.h}
      const mx=(x1+x2)/2,d=Math.abs(x1-x2)>Math.abs(y1-y2)?`M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`:`M${x1} ${y1} C${x1} ${(y1+y2)/2} ${x2} ${(y1+y2)/2} ${x2} ${y2}`;
      h+=`<g class="eg ${k||"cross"}" data-a="${a}" data-b="${b}" data-v="${esc(v)}"><path class="e" d="${d}" marker-end="url(#ha)"/><path class="ehit" d="${d}"/></g>`});
    this.svg.innerHTML=`<defs><marker id="ha" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L9 5L1 9z" fill="var(--accent)"/></marker></defs>`+h;
  },
  focusCard(id){const c=this.el&&this.el.querySelector(`.card[data-id="${id}"]`);if(c)c.scrollIntoView({block:"nearest",behavior:"smooth"})}
};
