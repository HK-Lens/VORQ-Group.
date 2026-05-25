
(function(){
  document.documentElement.classList.remove('js-off');
  const allowed = ['de','sv','en'];
  function fromUrl(){return new URLSearchParams(window.location.search).get('lang')}
  function getLang(){return allowed.includes(fromUrl()) ? fromUrl() : (allowed.includes(localStorage.getItem('vorq_lang')) ? localStorage.getItem('vorq_lang') : 'de')}
  function applyLang(lang){
    if(!allowed.includes(lang)) lang='de';
    localStorage.setItem('vorq_lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(el=> el.classList.toggle('active', el.dataset.lang===lang));
    document.querySelectorAll('.lang-btn').forEach(btn=> btn.setAttribute('aria-pressed', btn.dataset.setLang===lang ? 'true' : 'false'));
    document.querySelectorAll('a[data-keep-lang]').forEach(a=>{
      try{ const u=new URL(a.getAttribute('href'), window.location.href); u.searchParams.set('lang', lang); a.setAttribute('href', u.pathname.replace(/^\//,'') + u.search + u.hash); }catch(e){}
    });
  }
  window.VORQLang = applyLang;
  document.addEventListener('click', function(e){
    const btn=e.target.closest('[data-set-lang]');
    if(btn){ e.preventDefault(); applyLang(btn.dataset.setLang); }
  });
  applyLang(getLang());
})();
