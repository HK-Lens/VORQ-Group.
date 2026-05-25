
(function(){
  const root=document.documentElement;
  const allowed=['de','sv','en'];
  function getInitial(){try{const saved=localStorage.getItem('vorqLang');if(allowed.includes(saved))return saved;}catch(e){} const nav=(navigator.language||'en').slice(0,2).toLowerCase(); return allowed.includes(nav)?nav:'de';}
  function setLang(lang){ if(!allowed.includes(lang)) lang='de'; root.setAttribute('data-lang',lang); root.lang=lang; try{localStorage.setItem('vorqLang',lang)}catch(e){} document.querySelectorAll('.lang-btn').forEach(b=>{b.classList.toggle('active',b.dataset.lang===lang); b.setAttribute('aria-pressed',b.dataset.lang===lang?'true':'false');}); }
  setLang(root.getAttribute('data-lang') || getInitial());
  document.querySelectorAll('.lang-btn').forEach(btn=>btn.addEventListener('click',()=>setLang(btn.dataset.lang)));
  const menu=document.querySelector('.menu-btn'), nav=document.querySelector('.nav');
  if(menu&&nav){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});}
})();
