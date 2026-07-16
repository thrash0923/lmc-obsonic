(function(){
  const config=window.LMC_SITE_CONFIG;

  if(config){
    document.querySelectorAll('[data-site-text]').forEach(function(element){
      const key=element.getAttribute('data-site-text');
      if(Object.prototype.hasOwnProperty.call(config,key)){
        element.textContent=config[key];
      }
    });

    document.querySelectorAll('[data-site-aria-label]').forEach(function(element){
      const key=element.getAttribute('data-site-aria-label');
      if(Object.prototype.hasOwnProperty.call(config,key)){
        element.setAttribute('aria-label',config[key]);
      }
    });
  }

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
    document.body.classList.toggle('menu-lock',open);
    btn.setAttribute('aria-expanded',open ? 'true' : 'false');
  });

  links.forEach(function(a){a.addEventListener('click',closeMenu);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeMenu();});
})();
