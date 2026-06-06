(function(){
  const body=document.body;
  body.classList.add('js-ready');
  const langBtn=document.getElementById('langBtn');
  const menuBtn=document.getElementById('menuBtn');
  const mobileMenu=document.getElementById('mobileMenu');
  function setLang(lang){
    const en=lang==='en';
    body.classList.toggle('en',en);
    body.classList.toggle('cn',!en);
    document.documentElement.lang=en?'en':'zh-CN';
    if(langBtn) langBtn.textContent=en?'中文':'EN';
    try{localStorage.setItem('portfolio_lang',lang);}catch(e){}
  }
  if(langBtn){ langBtn.addEventListener('click',()=>setLang(body.classList.contains('en')?'cn':'en')); }
  let savedLang='cn'; try{savedLang=localStorage.getItem('portfolio_lang')||'cn';}catch(e){} setLang(savedLang);

  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click',()=>mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  }

  const revealEls=[...document.querySelectorAll('.reveal')];
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
    },{threshold:.12});
    revealEls.forEach(el=>obs.observe(el));
    setTimeout(()=>revealEls.slice(0,4).forEach(el=>el.classList.add('in')),250);
  }else{
    revealEls.forEach(el=>el.classList.add('in'));
  }

  const sections=[...document.querySelectorAll('section[id]')];
  const navLinks=[...document.querySelectorAll('[data-nav]')];
  if('IntersectionObserver' in window){
    const navObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id));
        }
      })
    },{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(s=>navObs.observe(s));
  }

  const modal=document.getElementById('modal');
  const modalContent=document.getElementById('modalContent');
  const close=document.getElementById('modalClose');
  function openImage(src,alt){
    modalContent.innerHTML='';
    const img=document.createElement('img'); img.src=src; img.alt=alt||''; modalContent.appendChild(img); modal.classList.add('open');
  }
  function openVideo(src,poster){
    modalContent.innerHTML='';
    const v=document.createElement('video'); v.src=src; v.controls=true; v.autoplay=true; v.playsInline=true; if(poster) v.poster=poster; modalContent.appendChild(v); modal.classList.add('open');
  }
  document.querySelectorAll('[data-full]').forEach(el=>el.addEventListener('click',()=>openImage(el.dataset.full,el.alt)));
  document.querySelectorAll('[data-video]').forEach(el=>el.addEventListener('click',()=>openVideo(el.dataset.video,el.dataset.poster)));
  function closeModal(){ modal.classList.remove('open'); modalContent.querySelectorAll('video').forEach(v=>v.pause()); modalContent.innerHTML=''; }
  if(close) close.addEventListener('click',closeModal);
  if(modal) modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape' && modal.classList.contains('open')) closeModal(); });
})();
