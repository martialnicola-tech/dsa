(function(){
var IMG={};
['gorilla','cafe','blue','salon','armchair','posters','toys','raw','shelf','jukebox','lorenzo1','lorenzo2'].forEach(function(k){IMG[k]='images/'+k+'.jpg'});
var CATS={art:'Art & street art',sculptures:'Sculptures design',cinema:'Affiches & cinéma',mobilier:'Mobilier vintage',jouets:'Enseignes & jouets'};
var ITEMS=[];
var SOLD=[];
var UNI=[];
function $(s){return document.querySelector(s)}
function chf(p){return 'CHF '+p+'.-'}
function card(o,sold){
  var b=document.createElement(sold?'div':'button');b.className='card'+(sold?' sold':'');
  if(!sold){b.type='button';b.addEventListener('click',function(){openFiche(o)})}
  var ph=document.createElement('div');ph.className='ph';ph.style.backgroundImage='url('+IMG[o.i]+')';
  var t=document.createElement('div');t.className='t';t.textContent=o.t;
  var m=document.createElement('div');m.className='m';
  var l=document.createElement('span');l.textContent='N° '+o.n+' · '+o.e;
  var pr=document.createElement('b');pr.textContent=chf(o.p);m.appendChild(l);m.appendChild(pr);
  b.appendChild(ph);b.appendChild(t);b.appendChild(m);
  if(sold){var s=document.createElement('span');s.className='stamp';s.textContent='Vendu';b.appendChild(s)}
  return b;
}
function fill(sel,arr,sold){var g=$(sel);g.textContent='';arr.forEach(function(o){g.appendChild(card(o,sold))})}
var cur='all';
function chips(){
  var c=$('#chips');c.textContent='';
  [['all','Tout']].concat(Object.keys(CATS).map(function(k){return [k,CATS[k]]})).forEach(function(a){
    var b=document.createElement('button');b.type='button';b.textContent=a[1];b.setAttribute('aria-pressed',String(cur===a[0]));
    b.addEventListener('click',function(){cur=a[0];chips();list()});c.appendChild(b);
  });
}
function list(){fill('#all',ITEMS.filter(function(o){return cur==='all'||o.c===cur}))}
function uni(){
  var u=$('#uni');u.textContent='';
  UNI.forEach(function(x0){var x=[x0.univers,x0.photo,x0.sous_titre];
    var a=document.createElement('a');a.href='#chiner';a.style.backgroundImage='url('+IMG[x[1]]+')';
    var s=document.createElement('span');s.textContent=CATS[x[0]];var sm=document.createElement('small');sm.textContent=x[2];
    a.appendChild(s);a.appendChild(sm);
    a.addEventListener('click',function(e){e.preventDefault();cur=x[0];chips();list();go('chiner')});u.appendChild(a);
  });
}
/* fiche */
var dlg=$('#dlg');
function openFiche(o){
  $('#fPic').style.backgroundImage='url('+IMG[o.i]+')';
  $('#fCat').textContent=CATS[o.c];$('#fTitle').textContent=o.t;
  var tg=$('#fTag');tg.textContent='';var b=document.createElement('b');b.textContent=o.t;tg.appendChild(b);tg.appendChild(document.createTextNode('N° '+o.n+' · '+o.e+' · '+o.s));
  $('#fPrice').textContent=chf(o.p);$('#fDesc').textContent=o.x;
  var dl=$('#fDl');dl.textContent='';
  [['Époque',o.e],['État',o.s],['Dimensions',o.d]].forEach(function(r){var dt=document.createElement('dt');dt.textContent=r[0];var dd=document.createElement('dd');dd.textContent=r[1];dl.appendChild(dt);dl.appendChild(dd)});
  $('#fHold').textContent='Pour la mettre de côté 48 h, appelez Lorenzo au 078 616 48 43 en citant le N° '+o.n+'.';
  if(dlg.showModal){dlg.showModal()}else{dlg.setAttribute('open','')}
}
$('#dClose').addEventListener('click',function(){dlg.close()});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
$('#fGo').addEventListener('click',function(){dlg.close()});
/* routeur */
var views=['accueil','chiner','lorenzo','coffre','tresor','venir'];
function go(v){
  if(views.indexOf(v)<0)v='accueil';
  views.forEach(function(k){$('#v-'+k).classList.toggle('on',k===v)});
  document.querySelectorAll('nav a[data-go]').forEach(function(a){a.classList.toggle('on',a.dataset.go===v)});
  window.scrollTo(0,0);
}
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[data-go]');
  if(a){e.preventDefault();go(a.dataset.go)}
});
window.addEventListener('hashchange',function(){go(location.hash.slice(1))});
/* flux */
var POSTS=[['Lorenzo présente la pièce du jour','lorenzo2'],['Tirage street art signé, 111/150','gorilla'],['Sculpture bleue arrivée ce matin','blue'],['Le coin salon, version 70s','salon'],['Affiches de cinéma, lot du jour','posters'],['Voiture à pédales ancienne','toys']];
var feed=$('#feed'),syncTxt=$('#syncTxt'),base=syncTxt.textContent,ni=0;
function post(txt,img,when,fresh){
  var a=document.createElement('a');a.className='post'+(fresh?' fresh':'');a.href='#chiner';a.dataset.go='chiner';a.style.backgroundImage='url('+IMG[img]+')';
  if(fresh){var nw=document.createElement('span');nw.className='nw';nw.textContent='Nouveau';a.appendChild(nw)}
  var rl=document.createElement('span');rl.className='rl';a.appendChild(rl);
  var b=document.createElement('b');b.textContent=txt;var s=document.createElement('small');s.textContent=when;a.appendChild(b);a.appendChild(s);return a;
}
function initFeed(){
  feed.textContent='';
  [['Lorenzo vous fait visiter le hangar','lorenzo1','il y a 12 min'],['Visite du coin street art','gorilla','hier'],['Arrivage : mobilier des années 70','armchair','hier'],['Sculptures de collection','shelf','il y a 3 jours'],['Café de Paris, grand format','cafe','il y a 5 jours']].forEach(function(p){feed.appendChild(post(p[0],p[1],p[2],false))});
}
$('#pub').addEventListener('click',function(){
  var p=POSTS[ni%POSTS.length];ni++;
  feed.insertBefore(post(p[0],p[1],"à l'instant",true),feed.firstChild);
  while(feed.children.length>5)feed.removeChild(feed.lastChild);
  syncTxt.textContent="Synchronisé avec @mon_precieux_deco · à l'instant";
});
$('#rst').addEventListener('click',function(){ni=0;initFeed();syncTxt.textContent=base});
/* formulaire et copie */
$('#treasure').addEventListener('submit',function(e){e.preventDefault();$('#tOk').hidden=false});
$('#copyTel').addEventListener('click',function(){
  var m=$('#copyMsg');
  function fb(){var r=document.createRange();r.selectNodeContents($('#telTxt'));var s=getSelection();s.removeAllRanges();s.addRange(r);m.textContent='Numéro sélectionné, copiez-le.'}
  try{navigator.clipboard.writeText('078 616 48 43').then(function(){m.textContent='Numéro copié.'},fb)}catch(x){fb()}
});
document.querySelectorAll('[data-img]').forEach(function(e){e.style.backgroundImage='url('+IMG[e.dataset.img]+')'});
function start(){
  document.querySelectorAll('[data-img]').forEach(function(e){e.style.backgroundImage='url('+IMG[e.dataset.img]+')'});
  fill('#home-new',ITEMS.slice(0,4));fill('#sold',SOLD,true);chips();list();uni();initFeed();
  go(location.hash.slice(1)||'accueil');
}
function conv(o){return {n:o.numero,c:o.univers,t:o.titre,p:o.prix,i:o.photo,e:o.epoque,s:o.etat,d:o.dimensions,x:o.description}}
fetch('data/pieces.json').then(function(r){return r.json()}).then(function(d){
  ITEMS=d.disponibles.map(conv);SOLD=d.vendues.map(conv);UNI=d.univers_accueil;start();
}).catch(function(){start()});
})();
