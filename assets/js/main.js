(function(){
  const body = document.body;
  const langBtn = document.getElementById('langBtn');

  function setLang(lang){
    const isEn = lang === 'en';
    body.classList.toggle('en', isEn);
    body.classList.toggle('cn', !isEn);
    document.documentElement.lang = isEn ? 'en' : 'zh-CN';
    if(langBtn) langBtn.textContent = isEn ? '中' : 'EN';
    localStorage.setItem('portfolio-lang', lang);
  }

  setLang(localStorage.getItem('portfolio-lang') || 'cn');
  if(langBtn){
    langBtn.addEventListener('click', ()=> setLang(body.classList.contains('en') ? 'cn' : 'en'));
  }

  body.classList.add('js-ready');
  const revealNodes = document.querySelectorAll('.reveal');
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealIO.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealNodes.forEach(node => revealIO.observe(node));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('[data-nav]')];
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, {rootMargin:'-40% 0px -50% 0px', threshold: 0});
  sections.forEach(section => navIO.observe(section));

  const collage = document.querySelector('.hero-collage');
  if(collage){
    const items = collage.querySelectorAll('.collage-item');
    collage.addEventListener('mousemove', e => {
      const rect = collage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      items.forEach(item => {
        const depth = Number(item.dataset.depth || 10);
        item.style.translate = `${x * depth}px ${y * depth}px`;
      });
    });
    collage.addEventListener('mouseleave', () => {
      items.forEach(item => item.style.translate = '0 0');
    });
  }

  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modalInner');
  const modalClose = document.getElementById('modalClose');
  function openModal(node){
    modalInner.innerHTML = '';
    modalInner.appendChild(node);
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  }
  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    modalInner.innerHTML = '';
  }
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', e => { if(e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });

  document.querySelectorAll('[data-full]').forEach(btn => {
    btn.addEventListener('click', () => {
      const img = new Image();
      img.src = btn.dataset.full;
      img.alt = 'preview';
      openModal(img);
    });
  });

  document.querySelectorAll('.video-card[data-video]').forEach(card => {
    card.addEventListener('click', () => {
      const video = document.createElement('video');
      video.src = card.dataset.video;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.style.background = '#111';
      openModal(video);
    });
  });
})();
