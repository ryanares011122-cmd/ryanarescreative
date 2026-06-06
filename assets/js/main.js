(function(){
  const body=document.body; body.classList.add('js-ready');
  const langBtn=document.getElementById('langBtn');
  const menuBtn=document.getElementById('menuBtn');
  const mobileMenu=document.getElementById('mobileMenu');
  function setLang(lang){
    const en=lang==='en'; body.classList.toggle('en',en); body.classList.toggle('cn',!en); document.documentElement.lang=en?'en':'zh-CN';
    if(langBtn) langBtn.textContent=en?'中文':'EN';
    try{localStorage.setItem('portfolio_lang',lang)}catch(e){}
  }
  if(langBtn) langBtn.addEventListener('click',()=>setLang(body.classList.contains('en')?'cn':'en'));
  let saved='cn'; try{saved=localStorage.getItem('portfolio_lang')||'cn'}catch(e){} setLang(saved);
  if(menuBtn&&mobileMenu){menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open')); mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')))}
  const reveal=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.08});
    reveal.forEach(el=>obs.observe(el)); setTimeout(()=>reveal.slice(0,3).forEach(el=>el.classList.add('in')),180);
  }else reveal.forEach(el=>el.classList.add('in'));
  const sections=[...document.querySelectorAll('section[id]')]; const nav=[...document.querySelectorAll('[data-nav]')];
  if('IntersectionObserver' in window){const navObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){nav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-35% 0px -55% 0px'}); sections.forEach(s=>navObs.observe(s));}
  const modal=document.getElementById('modal'), box=document.getElementById('modalContent'), close=document.getElementById('modalClose');
  function openImage(src,alt){box.innerHTML=''; const img=document.createElement('img'); img.src=src; img.alt=alt||''; box.appendChild(img); modal.classList.add('open')}
  function openVideo(src,poster){box.innerHTML=''; const v=document.createElement('video'); v.src=src; v.controls=true; v.autoplay=true; v.playsInline=true; if(poster)v.poster=poster; box.appendChild(v); modal.classList.add('open')}
  document.querySelectorAll('[data-full]').forEach(el=>el.addEventListener('click',()=>openImage(el.dataset.full,el.querySelector('img')?.alt||'')));
  document.querySelectorAll('[data-video]').forEach(el=>el.addEventListener('click',()=>openVideo(el.dataset.video,el.dataset.poster)));
  function closeModal(){modal.classList.remove('open'); box.querySelectorAll('video').forEach(v=>v.pause()); box.innerHTML=''}
  if(close) close.addEventListener('click',closeModal); if(modal) modal.addEventListener('click',e=>{if(e.target===modal)closeModal()}); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
})();
