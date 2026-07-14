/* ============ ROSTICCERIA GILARDI — interazioni ============ */
(function(){
  'use strict';

  var intro=document.getElementById('intro');
  if(intro){
    window.addEventListener('load',function(){setTimeout(function(){intro.classList.add('gone');},1150);});
    setTimeout(function(){intro.classList.add('gone');},2600);
  }

  /* orari (getDay 0=Dom..6=Sab): Lun–Ven 07–17, Sab 08–15, Dom chiuso */
  var HOURS={0:[],1:[[7,17]],2:[[7,17]],3:[[7,17]],4:[[7,17]],5:[[7,17]],6:[[8,15]]};
  var DAYS_IT=['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  var DAYS_EN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  function romeNow(){try{return new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}));}catch(e){return new Date();}}
  function fmt(h){var hh=Math.floor(h),mm=Math.round((h-hh)*60);return hh+(mm?(':'+(mm<10?'0':'')+mm):'');}
  function computeStatus(){
    var now=romeNow(),d=now.getDay(),cur=now.getHours()+now.getMinutes()/60,today=HOURS[d]||[],i,w;
    for(i=0;i<today.length;i++){w=today[i];if(cur>=w[0]&&cur<w[1])return {open:true,until:w[1]};}
    for(i=0;i<today.length;i++){if(cur<today[i][0])return {open:false,next:today[i][0],nextDay:d,sameDay:true};}
    for(var k=1;k<=7;k++){var nd=(d+k)%7,arr=HOURS[nd]||[];if(arr.length)return {open:false,next:arr[0][0],nextDay:nd,sameDay:false};}
    return {open:false};
  }
  function renderStatus(lang){
    var s=computeStatus(),badge=document.getElementById('openBadge');if(!badge)return;
    var t=badge.querySelector('.t'),en=(lang==='en');badge.classList.toggle('op',s.open);
    if(s.open){t.innerHTML='<b>'+(en?'Open now':'Aperto ora')+'</b>'+(en?'until ':'fino alle ')+fmt(s.until);}
    else if(s.next!=null){var day=s.sameDay?(en?'today':'oggi'):(en?DAYS_EN[s.nextDay]:DAYS_IT[s.nextDay]);t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'opens ':'apre ')+day+' '+fmt(s.next);}
    else{t.innerHTML='<b>'+(en?'Closed':'Chiuso')+'</b>'+(en?'see hours':'vedi orari');}
  }
  function renderHours(lang){
    var box=document.getElementById('hoursList');if(!box)return;var en=(lang==='en'),today=romeNow().getDay(),order=[1,2,3,4,5,6,0];
    box.innerHTML=order.map(function(d){
      var arr=HOURS[d]||[],label=en?DAYS_EN[d]:DAYS_IT[d];
      var val=arr.length?arr.map(function(w){return fmt(w[0])+'–'+fmt(w[1]);}).join(' · '):(en?'Closed':'Chiuso');
      return '<div class="hourrow'+(d===today?' today':'')+'"><span class="d">'+label+'</span><span>'+val+'</span></div>';
    }).join('');
  }

  /* i18n */
  var I18N={en:{
    "nav.story":"Since 1968","nav.menu":"Today's menu","nav.banco":"At the counter","nav.visit":"Find us",
    "bar.book":"Call us",
    "hero.kick":"Rosticceria · salumeria · gastronomia · dal 1968",
    "hero.h1":"The Corso Italia deli,<br><em>since 1968</em>",
    "hero.sub":"A family rosticceria and salumeria on Corso Italia. Elena has been cooking here since 1968 — home-made ready dishes, a menu that changes every day, and the Milan of a gentler time.",
    "hero.book":"Call the shop","hero.menu":"Today's menu",
    "hero.f1n":"1968","hero.f1l":"family-run",
    "hero.f2n":"4,7★","hero.f2l":"Google reviews",
    "hero.f3n":"h 6","hero.f3l":"Elena starts cooking",
    "hero.tag":"cosa c'è oggi?","hero.tags":"il menù del giorno",
    "ribbon":"PIATTI PRONTI · ROSTICCERIA · SALUMERIA · IL MENÙ DEL GIORNO · DAL 1968 · LA MILANO DI UNA VOLTA ·",
    "story.kick":"Elena & Alessandro · Corso Italia",
    "story.h2":"Dal 1968, <em>come a casa</em>",
    "story.p1":"Elena ha aperto la bottega nel 1968 e da allora si alza ogni mattina alle sei per cucinare i piatti pronti che riportano i clienti anno dopo anno. Oggi al banco c'è anche il figlio Alessandro, che accoglie tutti con un sorriso.",
    "story.pull":"Come nella Milano di una volta.",
    "story.p2":"Ingredienti di stagione, ricette semplici e saporite, un po' come le faceva la mamma. E come una volta, ci si ferma per due chiacchiere, per staccare dalla corsa della città e ascoltare le storie del quartiere.",
    "c1":"<b>Dal</b> 1968","c2":"<b>Elena</b> in cucina","c3":"<b>Alessandro</b> al banco","c4":"<b>Menù</b> ogni giorno diverso",
    "menu.kick":"La firma della casa",
    "menu.h2":"Il menù <em>del giorno</em>",
    "menu.sub":"Ogni mattina Elena decide cosa cucinare, con quello che offre la stagione. Ecco un esempio di giornata — ma domani la lavagna sarà un'altra.",
    "oggi":"Oggi","oggi.sub":"…un esempio",
    "col1":"Rosticceria",
    "d1a":"Cotoletta di pollo","d1b":"Arrosto di vitello","d1c":"Pollo allo spiedo","d1d":"Polpette al sugo",
    "col2":"Primi & forno",
    "d2a":"Lasagne al forno","d2b":"Risotto giallo","d2c":"Pasta al pomodoro","d2d":"Parmigiana",
    "col3":"Le verdure",
    "d3a":"Peperonata","d3b":"Fagiolini all'agro","d3c":"Verdure grigliate","d3d":"Piselli e carote",
    "col4":"Da portar via",
    "d4a":"Salumi e formaggi","d4b":"Torte e cheesecake","d4c":"Pane fresco","d4d":"Un buon vino",
    "menu.note":"…e domani si ricomincia.",
    "banco.kick":"Al banco",
    "banco.h2":"Cosa trovi da Gilardi",
    "o1.t":"Piatti pronti","o1.p":"La gastronomia del giorno: primi, secondi e contorni caldi, cucinati in casa e pronti da portar via.",
    "o2.t":"Rosticceria","o2.p":"Arrosti, pollo allo spiedo, cotolette e polpette — la rosticceria di sempre, fatta come si deve.",
    "o3.t":"Salumeria","o3.p":"Salumi e formaggi al taglio, scelti con cura. Da soli o per comporre un tagliere.",
    "o4.t":"Dolci & caffè","o4.p":"Torte, cheesecake e un buon caffè Illy, per chiudere in dolcezza o per una pausa al volo.",
    "o5.t":"Pane & vino","o5.p":"Pane fresco tutti i giorni e una scelta di vini, per accompagnare la spesa a casa.",
    "o6.t":"Due chiacchiere","o6.p":"E un posto dove fermarsi, come una volta: due parole con Elena e Alessandro e la corsa può aspettare.",
    "banco.note":"<b>Piatti pronti da asporto</b> e prodotti da bottega. Il menù caldo cambia ogni giorno.",
    "rev.kick":"La voce dei clienti","rev.h2":"Recensioni","rev.sub":"4,7 su Google · 51 recensioni",
    "rc1":"«Buonissima e tutti gentilissimi! Cotoletta di pollo impanata alla perfezione, non secca, con broccoli e pane fresco in abbondanza. Ottimo caffè, belle torte e cheesecake.»",
    "rc1m":"allegra alacevich · Local Guide",
    "rc2":"“I really appreciated the warm welcome from the family. Because it is a family-owned place, the atmosphere felt authentic, relaxed and inviting.”",
    "rc2m":"Jean-Pierre S. · Google",
    "rc3":"«Fantastici e simpaticissimi! Trovate cose buonissime, e anche la possibilità di sedervi e farvi una buona pausa.»",
    "rc3m":"Martina P. · Google",
    "visit.kick":"Dove siamo","visit.h2":"Corso Italia 33, Milano",
    "visit.addr":"Address","visit.hours":"Opening hours","visit.phone":"Phone","visit.book":"Call the shop","visit.dir":"Directions",
    "faq.kick":"Good to know","faq.h2":"Questions & answers",
    "q1":"Where is Rosticceria Gilardi and since when?","a1":"We're at Corso Italia 33, between the Ticinese and the Crocetta, a few steps from Santa Sofia. Elena opened the shop in 1968 and still runs it today with her son Alessandro.",
    "q2":"What's the «menù del giorno»?","a2":"Every morning Elena decides what to cook with the season's best, so the hot menu of ready dishes changes daily — first courses, roasts, cutlets and vegetables to take away.",
    "q3":"What can I buy?","a3":"Ready-cooked dishes (rosticceria and gastronomia), cured meats and cheese at the counter, fresh bread, cakes and cheesecake, coffee and a choice of wines.",
    "q4":"Can I sit down?","a4":"Yes — like in the Milan of old, you can drop by for a bite, a good coffee and two words with Elena and Alessandro.",
    "q5":"When are you open?","a5":"Monday to Friday 7:00–17:00 and Saturday 8:00–15:00. Closed on Sunday.",
    "ft.tag":"Family rosticceria, salumeria and gastronomia on Corso Italia since 1968. Home-made ready dishes and a menu that changes every day.",
    "ft.explore":"Explore","ft.contact":"Contact","ft.rights":"Demo site — not the official shop site.",
    "ft.disc":"Independent demonstration site created to show a possible online presence for Rosticceria Gilardi. Photos, reviews and details come from public sources (Google Maps and press) and belong to their owners. Not affiliated with the shop."
  }};
  var current='it',ITCACHE={};
  function collectIT(){document.querySelectorAll('[data-i18n]').forEach(function(el){ITCACHE[el.getAttribute('data-i18n')]=el.innerHTML;});}
  function apply(lang){
    current=lang;var dict=(lang==='en')?I18N.en:null;
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(lang==='en'){if(dict[k]!=null)el.innerHTML=dict[k];}else{if(ITCACHE[k]!=null)el.innerHTML=ITCACHE[k];}});
    document.documentElement.lang=lang;
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-l')===lang);});
    renderHours(lang);renderStatus(lang);
  }

  function initReveal(){
    var els=document.querySelectorAll('.reveal');
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in');});return;}
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
    els.forEach(function(e){io.observe(e);});
  }

  document.addEventListener('DOMContentLoaded',function(){
    collectIT();
    document.querySelectorAll('.lang button').forEach(function(b){b.addEventListener('click',function(){apply(b.getAttribute('data-l'));});});
    var burger=document.querySelector('.burger'),links=document.querySelector('nav.links');
    if(burger){burger.addEventListener('click',function(){
      if(links.style.display==='flex'){links.style.display='';}
      else{links.style.display='flex';links.style.position='absolute';links.style.top='68px';links.style.right='18px';links.style.flexDirection='column';links.style.background='var(--cream)';links.style.padding='16px 20px';links.style.borderRadius='12px';links.style.border='1px solid var(--line)';links.style.boxShadow='var(--shadow)';}
    });}
    document.querySelectorAll('nav.links a').forEach(function(a){a.addEventListener('click',function(){if(links&&window.innerWidth<=940)links.style.display='';});});
    renderHours('it');renderStatus('it');initReveal();
    setInterval(function(){renderStatus(current);},60000);
  });
})();
