(function(){
  function setLang(lang){
    document.documentElement.setAttribute('data-lang', lang);
    try{ localStorage.setItem('vorqLang', lang); }catch(e){}
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }
  document.addEventListener('DOMContentLoaded', function(){
    var current = document.documentElement.getAttribute('data-lang') || 'en';
    setLang(current);
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      btn.addEventListener('click', function(){ setLang(btn.dataset.lang); });
    });
  });
})();
