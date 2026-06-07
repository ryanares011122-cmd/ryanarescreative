(function(){
  const body=document.body;
  const langBtn=document.getElementById('langBtn');
  function setLang(lang){
    body.classList.toggle('en', lang==='en');
    body.classList.toggle('cn', lang!=='en');
    document.documentElement.lang = lang==='en' ? 'en' : 'zh-CN';
    if(langBtn) langBtn.textContent = lang==='en' ? '中' : 'EN';
    localStorage.setItem('portfolio-lang', lang);
  }
  setLang(localStorage.getItem('portfolio-lang') || 'cn');
  langBtn && langBtn.addEventListener('click',()=>setLang(body.classList.contains('en')?'cn':'en'));

  body.classList.add('js-ready');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const sections=[...document.querySelectorAll('main section[id]')];
  const navs=[...document.querySelectorAll('[data-nav]')];
  const navIo=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navs.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+entry.target.id));
      }
    });
  },{rootMargin:'-45% 0px -50% 0px',threshold:0});
  sections.forEach(s=>navIo.observe(s));

  const collage=document.querySelector('.work-collage');
  if(collage){
    collage.addEventListener('mousemove', e=>{
      const r=collage.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      collage.querySelectorAll('.tile').forEach(tile=>{
        const d=Number(tile.dataset.depth||10);
        tile.style.translate = `${x*d}px ${y*d}px`;
      });
    });
    collage.addEventListener('mouseleave',()=>collage.querySelectorAll('.tile').forEach(t=>t.style.translate='0 0'));
  }

  const modal=document.getElementById('modal');
  const inner=document.getElementById('modalInner');
  const close=document.getElementById('modalClose');
  function openModal(node){ inner.innerHTML=''; inner.appendChild(node); modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); inner.innerHTML=''; }
  close && close.addEventListener('click',closeModal);
  modal && modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });
  document.querySelectorAll('.poster-frame').forEach(btn=>btn.addEventListener('click',()=>{
    const img=new Image(); img.src=btn.dataset.full; img.alt='poster preview'; openModal(img);
  }));
  document.querySelectorAll('.video-card[data-video]').forEach(card=>card.addEventListener('click',()=>{
    const video=document.createElement('video'); video.src=card.dataset.video; video.controls=true; video.autoplay=true; video.playsInline=true; video.style.background='#111'; openModal(video);
  }));
})();
