/* Prikaz „Skupština“ — sastav Narodne skupštine posle izbora 25. 10. 2026.
   Polukrug od 250 mesta po poslaničkim listama, pragovi glasanja (koliko glasova treba za šta),
   institucije koje Skupština bira i nadzire, i rokovi posle konstituisanja. */

/* Liste po redosledu sedenja na šemi (levo → desno); room = institucija na mapi, ako postoji */
const SEATS=[
  {k:"sl",n:"Studentska lista",s:140,room:"studenti"},
  {k:"svm",n:"Savez vojvođanskih Mađara",s:2,min:1},
  {k:"alb",n:"Albanska koalicija",s:2,min:1},
  {k:"sdp",n:"SDP–CDP",s:1,min:1},
  {k:"sda",n:"SDA Sandžaka",s:1,min:1},
  {k:"spp",n:"SPP (U. Zukorlić)",s:1,min:1},
  {k:"sns",n:"Lista „A. Vučić – Ujedinjena Srbija“",s:103,room:"sns"}
];
const SK_TOTAL=SEATS.reduce((a,x)=>a+x.s,0);
const SK_SL=SEATS[0].s,SK_MIN=SEATS.filter(x=>x.min).reduce((a,x)=>a+x.s,0);

/* Pragovi: broj glasova od ukupno 250 poslanika i šta se njima odlučuje */
const SK_THRESH=[
  {v:126,n:"Većina svih poslanika",d:"Izbor Vlade, budžet, predsednik Skupštine, sudije Ustavnog suda, guverner NBS, Zaštitnik građana. Isto je i kvorum za rad.",meh:"izbor-vlade"},
  {v:150,n:"Tri petine",d:"Vrhovni javni tužilac i četiri istaknuta pravnika u VSS i VST. Ako izbor ne uspe, Ustav predviđa rezervni postupak.",meh:"tuzioci-izbor"},
  {v:167,n:"Dve trećine",d:"Predlog za promenu Ustava i razrešenje predsednika Republike.",meh:null}
];

/* Rokovi posle izbora: [datum ili oznaka, naslov, opis, institucija, stanje: done | now | next] */
const SK_STEPS=[
  ["5. 11.","Konačni rezultati","RIK potvrđuje raspodelu mandata posle ponovljenog glasanja.","rik","done"],
  ["17. 11.","Konstitutivna sednica","Potvrđeni mandati svih 250 poslanika. Od tog dana teče rok od 90 dana za izbor Vlade.","skupstina","done"],
  ["19. 11.","Izabran predsednik Skupštine","Aleksandar Čupić (Studentska lista) dobio je 140 glasova, Stojan Radenović (SNS) 97. Čupić time vrši i dužnost predsednika Republike.","skupstina","done"],
  ["19. 11.","Potpredsednici i generalni sekretar","Svih šest potpredsednika je sa Studentske liste (136–137 glasova); poslanici SNS napustili su salu. Generalna sekretarka je Mirjana Radaković (138 glasova).","skupstina","done"],
  ["24. 11.","Odbori i delegacije","Nastavak konstitutivne sednice: izbor članova skupštinskih odbora i stalnih delegacija.","skupstina","now"],
  ["do 27. 11.","Raspisivanje predsedničkih izbora","Raspisuje ih predsednik Skupštine, sada Čupić kao v.d. predsednika; glasanje najkasnije 27. 12.","predsednik","next"],
  ["sledi","Predlog mandatara","V.d. predsednika Republike posle konsultacija sa poslaničkim grupama predlaže kandidata za predsednika Vlade.","predsednik","next"],
  ["do 15. 2. 2027.","Izbor Vlade","Skupština glasa o programu i ministrima, većinom svih poslanika. Ako Vlada ne bude izabrana u roku, predsednik raspušta Skupštinu.","vlada","next"]
];

const SK_MECHS=["izbor-vlade","zakon","nadzor-skupstine","izbor-nezavisnih","raspustanje"];

/* Raspored mesta u polukrugu: redovi sa brojem mesta srazmernim poluprečniku, pa sortiranje po uglu sleva nadesno */
function skLayout(){
  const R0=78,R1=186,rows=10,cx=200,cy=200,r=[];
  for(let i=0;i<rows;i++)r.push(R0+i*(R1-R0)/(rows-1));
  const sum=r.reduce((a,b)=>a+b,0);let n=r.map(x=>Math.round(SK_TOTAL*x/sum));
  n[rows-1]+=SK_TOTAL-n.reduce((a,b)=>a+b,0);
  const pts=[];
  r.forEach((ri,i)=>{for(let k=0;k<n[i];k++){const t=Math.PI*(1-k/(n[i]-1));pts.push({x:cx+ri*Math.cos(t),y:cy-ri*Math.sin(t),t,ri})}});
  pts.sort((a,b)=>b.t-a.t||a.ri-b.ri);
  return{pts,cx,cy,R0,R1};
}

/* Ključni poslanici iz poslanici.js, po redosledu lista na šemi; šef grupe prvi */
const skMps=()=>{if(typeof MPS==="undefined")return[];const ord=SEATS.map(g=>g.k);
  return Object.values(MPS).filter(x=>PBY[x.id]).sort((a,b)=>ord.indexOf(a.g)-ord.indexOf(b.g)||(MP_HEADS[b.g]===b.id)-(MP_HEADS[a.g]===a.id)||!!b.fn-!!a.fn)};

const Sk={
  el:null,
  render(stage){
    const L=skLayout();let i=0,seats="";
    /* Imenovani poslanici dobijaju mesta ravnomerno raspoređena unutar svoje liste */
    const mps=skMps();
    SEATS.forEach(g=>{
      const named=mps.filter(x=>x.g===g.k),at={};named.forEach((x,j)=>{at[Math.floor((j+.5)*g.s/named.length)]=x.id});
      let c="";for(let j=0;j<g.s;j++,i++){const p=L.pts[i],who=at[j];
        c+=who?`<circle class="sk-mp" data-person="${who}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.6"><title>${esc(PBY[who].n)}</title></circle>`:`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.6"/>`}
      seats+=`<g class="sk-g" data-k="${g.k}"${g.room?` data-room="${g.room}"`:""}><title>${esc(g.n)}: ${g.s}</title>${c}</g>`;
    });
    /* Oznaka većine: ugao između 125. i 126. mesta */
    const a=L.pts[125].t,b=L.pts[126].t,t=(a+b)/2,mx=L.cx+(L.R1+10)*Math.cos(t),my=L.cy-(L.R1+10)*Math.sin(t),ix=L.cx+(L.R0-12)*Math.cos(t),iy=L.cy-(L.R0-12)*Math.sin(t);
    const hemi=`<svg class="sk-hemi" viewBox="0 -8 400 216" role="img" aria-label="Raspored 250 mesta: Studentska lista 140, manjinske liste 7, lista SNS 103">
      <line class="sk-maj" x1="${ix.toFixed(1)}" y1="${iy.toFixed(1)}" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}"/>${seats}
      <text class="sk-tot" x="200" y="176" text-anchor="middle">250</text><text class="sk-sub" x="200" y="196" text-anchor="middle">poslanika</text></svg>`;
    const legend=`<ul class="sk-leg">${SEATS.map(g=>{const inner=`<i class="sk-sw" data-k="${g.k}"></i><span class="sk-ln">${esc(g.n)}</span><span class="sk-ls">${g.s}</span>`;
      return `<li>${g.room?`<button class="sk-lb" data-room="${g.room}">${inner}</button>`:`<span class="sk-lb">${inner}</span>`}</li>`}).join("")}</ul>
      <p class="sk-note">Manjinske liste ulaze bez cenzusa od 3%. Raspored na šemi prati liste, ne stvarna mesta u sali.</p>`;
    const seg=(v,cls,w)=>`<span class="sk-bs ${cls}" style="width:${(w/SK_TOTAL*100).toFixed(2)}%"></span>`;
    const thresh=SK_THRESH.map(T=>{
      const st=SK_SL>=T.v?["ok","Studentska lista sama"]:SK_SL+SK_MIN>=T.v?["mid","Studentska lista uz manjine"]:["no",`Potrebno još ${T.v-SK_SL-SK_MIN} glasova sa liste SNS`];
      return `<li class="sk-t"><div class="sk-th"><span class="sk-tv">${T.v}</span><span class="sk-tn">${esc(T.n)}</span><span class="sk-st" data-s="${st[0]}">${esc(st[1])}</span></div>
        <div class="sk-bar" aria-hidden="true">${seg(0,"sl",SK_SL)}${seg(0,"mn",SK_MIN)}${seg(0,"sn",SK_TOTAL-SK_SL-SK_MIN)}<span class="sk-bl" style="left:${(T.v/SK_TOTAL*100).toFixed(2)}%"></span></div>
        <p class="sk-td">${linkify(esc(T.d))}${T.meh?` ${mhChip(T.meh)}`:""}</p></li>`}).join("");
    const outs=LINKS.filter(l=>l[0]==="skupstina").map(l=>[l[1],l[2]]);
    const card=([id,v])=>{const it=INST[id];return `<div class="sk-c"><span class="sk-cv">${esc(v)}</span><button class="card" data-id="${id}" data-b="${it.b}" style="--wc:${bc(it.b)}" aria-label="${esc(it.n)}">
      <span class="c-ico">${icoSvg(id,20)}</span><span class="c-txt"><span class="c-n">${esc(it.p)}</span><span class="c-s">${esc(it.short)}</span></span><span class="c-b" data-badge="${id}"></span><span class="c-step" data-step="${id}"></span>${emBadge(id)}</button></div>`};
    const steps=SK_STEPS.map(([d,t,x,id,s])=>`<li class="sk-s" data-s="${s}"><span class="sk-sd">${esc(d)}</span><div><strong>${esc(t)}</strong>${s==="now"?` <span class="sk-now">na redu</span>`:""}<p>${linkify(esc(x))}</p><button class="lk" data-room="${id}">${esc(INST[id].p)}</button></div></li>`).join("");
    stage.innerHTML=`<div class="sk" id="sk">
      <section class="sk-sec sk-comp"><header class="sk-h"><span class="tier-n">Sastav</span><h3>Ko sedi u Skupštini</h3><p>Izbori 25. 10. 2026, konstituisana 17. 11. Klik na listu otvara njen opis.</p></header>
        <div class="sk-cw">${hemi}<div>${legend}</div></div></section>
      <section class="sk-sec sk-wide sk-mps"><header class="sk-h"><span class="tier-n">Poslanici</span><h3>Ko su ključni poslanici</h3><p>Šefovi grupa, kandidati za funkcije i poznata imena; na polukrugu su označeni prstenom. Klik otvara profil, funkcije i veze.</p></header>
        <div class="seg sk-f" role="group" aria-label="Lista">${[["","Svi"],["sl","Studentska lista"],["sns","Lista SNS"],["min","Manjine"]].map(([k,n],j)=>`<button data-f="${k}" aria-pressed="${!j}">${n}</button>`).join("")}</div>
        <ul class="sk-pl">${mps.map(x=>{const P=PBY[x.id],G=SEATS.find(g=>g.k===x.g);
          return `<li data-g="${x.g}"><button class="sk-p" data-person="${x.id}"><i class="sk-sw" data-k="${x.g}"></i>${avatar(x.id,36)}<span class="sk-pn">${esc(P.n)}</span><span class="sk-pr">${esc(x.fn||firstSentence(P.desc))}</span><span class="sk-pm">${esc([G.n,x.party].filter(Boolean).filter((v,k,a)=>a.indexOf(v)===k).join(" · "))}</span></button></li>`}).join("")}</ul></section>
      <section class="sk-sec"><header class="sk-h"><span class="tier-n">Pragovi</span><h3>Koliko glasova treba za šta</h3><p>Pragovi se računaju od svih 250 poslanika, ne od prisutnih. Obični zakoni prolaze većinom prisutnih, uz kvorum od 126.</p></header>
        <ul class="sk-ts">${thresh}</ul>
        <div class="sk-key" aria-hidden="true"><span><i class="sk-sw" data-k="sl"></i>Studentska lista ${SK_SL}</span><span><i class="sk-sw" data-k="min"></i>Manjine ${SK_MIN}</span><span><i class="sk-sw" data-k="sns"></i>Lista SNS ${SK_TOTAL-SK_SL-SK_MIN}</span></div></section>
      <section class="sk-sec"><header class="sk-h"><span class="tier-n">Rokovi</span><h3>Od izbora do Vlade</h3><p>Šta je urađeno i šta sledi posle konstituisanja.</p></header>
        <ol class="sk-steps">${steps}</ol></section>
      <section class="sk-sec sk-wide"><header class="sk-h"><span class="tier-n">Ovlašćenja</span><h3>Koga nova većina bira i nadzire</h3><p>Ove institucije zavise od glasova u Skupštini; zato je njen sastav važan za celu mapu.</p></header>
        <div class="sk-cards">${outs.map(card).join("")}</div>
        <div class="sk-mh"><span class="lbl">Mehanizmi Skupštine</span><div class="mhks">${SK_MECHS.filter(id=>MBY[id]).map(mhChip).join("")}</div></div></section>
    </div>`;
    this.el=stage.querySelector("#sk");
    this.el.querySelectorAll(".card").forEach(c=>c.addEventListener("click",()=>openRoom(c.dataset.id,true)));
    /* Klik na mesto poslanika otvara osobu, ne listu (zato se zaustavlja opšti rukovalac) */
    this.el.querySelector(".sk-hemi").addEventListener("click",e=>{const c=e.target.closest(".sk-mp");if(c){e.stopPropagation();openPerson(c.dataset.person,true)}});
    this.el.querySelectorAll(".sk-f button").forEach(b=>b.addEventListener("click",()=>{const f=b.dataset.f;
      this.el.querySelectorAll(".sk-f button").forEach(x=>x.setAttribute("aria-pressed",x===b));
      this.el.querySelectorAll(".sk-pl li").forEach(li=>{const g=li.dataset.g;li.hidden=!!f&&(f==="min"?g==="sl"||g==="sns":g!==f)})}));
    /* Prelazak preko kartice poslanika ističe njegovo mesto */
    this.el.querySelectorAll(".sk-p").forEach(b=>{const seat=this.el.querySelector(`.sk-mp[data-person="${b.dataset.person}"]`);
      b.addEventListener("mouseenter",()=>{seat&&seat.classList.add("hot");this.el.classList.add("mp-hot")});
      b.addEventListener("mouseleave",()=>{seat&&seat.classList.remove("hot");this.el.classList.remove("mp-hot")})});
  },
  update(){
    if(!this.el)return;
    /* Izabran poslanik: ističu se njegovo mesto, kartica i institucije iz njegovih funkcija */
    const mp=mode&&mode.t==="person"&&typeof MPS!=="undefined"&&MPS[mode.id];
    const sel=mp?null:mode&&(mode.t==="room"?mode.id:mode.t==="person"?PBY[mode.id].room:null);
    const rel=new Set();if(sel)relsOf(sel).forEach(r=>rel.add(r.o));
    if(mp)mp.prev.forEach(([r])=>{if(INST[r])rel.add(r)});
    this.el.querySelectorAll(".sk-mp").forEach(c=>c.classList.toggle("on",!!mp&&c.dataset.person===mp.id));
    this.el.querySelectorAll(".sk-p").forEach(c=>{const on=!!mp&&c.dataset.person===mp.id;c.classList.toggle("sel",on);c.setAttribute("aria-pressed",on)});
    this.el.classList.toggle("mp-on",!!mp);
    if(mode&&(mode.t==="path"||mode.t==="meh"))guideSteps(mode).forEach(s=>rel.add(s[0]));
    /* Ostale kartice se prigušuju samo kad je bar jedna istaknuta */
    this.el.classList.toggle("focus",[...this.el.querySelectorAll(".card")].some(c=>c.dataset.id===sel||rel.has(c.dataset.id)));
    this.el.querySelectorAll(".card").forEach(c=>{const id=c.dataset.id;
      c.classList.toggle("sel",id===sel);c.classList.toggle("rel",rel.has(id));c.setAttribute("aria-pressed",id===sel);
      const st=c.querySelector(".c-step");st.hidden=true;
      const b=c.querySelector(".c-b"),n=evFor(id).length;b.textContent=n||"";b.hidden=!n;b.title=n+" vesti"});
    this.el.querySelectorAll(".sk-g,.sk-lb[data-room]").forEach(g=>g.classList.toggle("on",g.dataset.room===sel));
    this.el.classList.toggle("grp-on",!!sel&&SEATS.some(g=>g.room===sel));
  },
  focusCard(id){if(mode&&mode.t==="person"&&typeof MPS!=="undefined"&&MPS[mode.id]){const p=this.el&&this.el.querySelector(`.sk-p[data-person="${mode.id}"]`);if(p){p.scrollIntoView({block:"nearest",behavior:"smooth"});return}}const c=this.el&&(this.el.querySelector(`.card[data-id="${id}"]`)||this.el.querySelector(`.sk-lb[data-room="${id}"]`));if(c)c.scrollIntoView({block:"nearest",behavior:"smooth"})}
};
