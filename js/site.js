(() => {
  'use strict';
  const config = window.SiteConfig || {};
  document.documentElement.classList.add('js');

  // Contato: WhatsApp somente quando houver número confirmado; caso contrário, Instagram.
  const phone = String(config.whatsappNumber || '').replace(/\D/g, '');
  const whatsappReady = /^\d{11,15}$/.test(phone);
  const instagram = config.instagramUrl || 'https://www.instagram.com/larissallima.nutri/';
  const destination = whatsappReady
    ? `https://wa.me/${phone}?text=${encodeURIComponent(config.whatsappMessage || '')}`
    : instagram;

  for (const anchor of document.querySelectorAll('[data-contact-link]')) {
    anchor.href = destination;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    anchor.setAttribute('aria-label', whatsappReady ? 'Agendar pelo WhatsApp da Larissa (abre em nova aba)' : 'Conversar no Instagram da Larissa (abre em nova aba)');
    const kind = anchor.dataset.contactLabel;
    if (kind === 'header') {
      anchor.innerHTML = (whatsappReady ? 'Agendar consulta' : 'Falar com Larissa') + ' <span aria-hidden="true">↗</span>';
    }
    if (kind === 'contact') {
      const label = anchor.querySelector('span:first-child');
      if (label) label.textContent = whatsappReady ? 'Agendar pelo WhatsApp' : 'Conversar no Instagram';
    }
  }

  // Foto real: nenhum rosto fictício ou de terceiros é apresentado como a profissional.
  if (typeof config.profilePhoto === 'string' && config.profilePhoto.trim()) {
    const source = config.profilePhoto.trim();
    const portrait = document.querySelector('[data-profile-image]');
    if (portrait) {
      portrait.src = source;
      portrait.hidden = false;
      const stage = portrait.closest('[data-profile-stage]');
      if (stage) stage.classList.add('has-profile-photo');
    }
  }

  const crn = String(config.crn || '').trim();
  if (crn) {
    const item = document.getElementById('crn-display');
    if (item) {
      item.textContent = `CRN ${crn}`;
      item.hidden = false;
    }
  }
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (config.siteUrl) {
    const url = config.siteUrl.replace(/\/$/, '');
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = url;
    document.head.append(canonical);
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = `${url}/images/cafe-da-manha.webp`;
  }

  // Menu mobile acessível: fecha por link, Escape e ao ampliar a janela.
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeMenu = () => {
    if (!menu || !menuToggle) return;
    menu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
    menu.inert = true;
    document.body.classList.remove('menu-open');
  };
  if (menu && menuToggle) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menu.classList.toggle('is-open', open);
      menuToggle.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      menu.inert = !open;
      document.body.classList.toggle('menu-open', open);
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
    window.matchMedia('(min-width: 1051px)').addEventListener('change', e => { if (e.matches) closeMenu(); });
  }

  const floating = document.querySelector('.floating-contact');
  const updateHeader = () => {
    const scrolled = window.scrollY > 35;
    header?.classList.toggle('is-scrolled', scrolled);
    floating?.classList.toggle('is-visible', window.scrollY > 340);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // O conteúdo continua visível quando IntersectionObserver não é suportado.
  const toReveal = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: '0px 0px -38px 0px' });
    toReveal.forEach(element => observer.observe(element));
  } else {
    toReveal.forEach(element => element.classList.add('is-visible'));
  }

  // Parallax discreto e sem dependências; desativado em reduced-motion.
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const images = [...document.querySelectorAll('.image-parallax img')];
  let framePending = false;
  const moveImages = () => {
    framePending = false;
    if (motionQuery.matches || window.innerWidth < 761) {
      images.forEach(img => img.style.setProperty('--parallax-shift', '0px'));
      return;
    }
    const screenCenter = window.innerHeight / 2;
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;
      const position = (rect.top + rect.height / 2 - screenCenter) / (window.innerHeight / 2);
      const shift = Math.max(-13, Math.min(13, position * -11));
      img.style.setProperty('--parallax-shift', `${shift.toFixed(1)}px`);
    });
  };
  const requestMove = () => {
    if (framePending) return;
    framePending = true;
    requestAnimationFrame(moveImages);
  };
  window.addEventListener('scroll', requestMove, { passive: true });
  window.addEventListener('resize', requestMove, { passive: true });
  motionQuery.addEventListener('change', requestMove);
  requestMove();
})();
