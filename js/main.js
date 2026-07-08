(function(){
  const nav=document.getElementById('siteNav');
  const btn=nav ? nav.querySelector('.hamburger') : null;
  const links=nav ? nav.querySelectorAll('.nav-links a') : [];
  if(!nav || !btn) return;
  function closeMenu(){
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-lock');
    btn.setAttribute('aria-expanded','false');
  }
  btn.addEventListener('click',function(){
    const open=nav.classList.toggle('is-open');
    document.body.classList.toggle('menu-lock', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.forEach(function(a){a.addEventListener('click',closeMenu);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeMenu();});
})();
