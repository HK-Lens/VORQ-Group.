
(function(){
  var allowed={de:1,sv:1,en:1};
  var lang='de';
  try{ lang=localStorage.getItem('vorqLang') || document.documentElement.getAttribute('data-lang') || 'de'; }catch(e){}
  if(!allowed[lang]) lang='de';
  function apply(){
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      var active=btn.getAttribute('data-lang')===lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true':'false');
    });
  }
  document.addEventListener('click', function(e){
    var b=e.target.closest('.lang-btn'); if(!b) return;
    lang=b.getAttribute('data-lang') || 'de';
    if(!allowed[lang]) lang='de';
    try{ localStorage.setItem('vorqLang', lang); }catch(err){}
    apply();
  });
  if(location.hostname.endsWith('github.io') && !document.querySelector('base')){
    var p=location.pathname.split('/').filter(Boolean); var b=p.length?('/'+p[0]+'/'):'/';
    var base=document.createElement('base'); base.href=b; document.head.prepend(base);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
