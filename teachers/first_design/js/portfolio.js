/* =====================================================
   portfolio.js — gallery lightbox, certificate preview,
   testimonial slider (auto-sliding)
   ===================================================== */
(() => {
  'use strict';

  /* ---------- Shared lightbox (gallery + certificates) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let activeGroup = [];
  let activeIndex = 0;
  let lastFocused = null;

  function openLightbox(group, index) {
    activeGroup = group;
    activeIndex = index;
    renderLightbox();
    lastFocused = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxClose.focus();
    document.body.classList.add('nav-locked');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('nav-locked');
    lastFocused?.focus();
  }

  function renderLightbox() {
    const item = activeGroup[activeIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc || '';
    const multi = activeGroup.length > 1;
    lightboxPrev.hidden = !multi;
    lightboxNext.hidden = !multi;
  }

  function stepLightbox(delta) {
    activeIndex = (activeIndex + delta + activeGroup.length) % activeGroup.length;
    renderLightbox();
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxPrev?.addEventListener('click', () => stepLightbox(-1));
  lightboxNext?.addEventListener('click', () => stepLightbox(1));
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') stepLightbox(1);
    if (e.key === 'ArrowLeft') stepLightbox(-1);
  });

  /* ---------- Gallery ---------- */
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const galleryGroup = galleryItems.map((item) => ({
    src: item.dataset.full || item.querySelector('img').src,
    alt: item.querySelector('img').alt,
    title: item.dataset.title || item.querySelector('img').alt,
    desc: item.dataset.desc || '',
  }));
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(galleryGroup, index));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(galleryGroup, index);
      }
    });
  });

  /* ---------- Certificates ---------- */
  const certItems = Array.from(document.querySelectorAll('.cert-card'));
  const certGroup = certItems.map((item) => ({
    src: item.dataset.full || item.querySelector('img').src,
    alt: item.querySelector('img').alt,
    title: item.querySelector('.cert-card__title')?.textContent.trim() || '',
    desc: item.querySelector('.cert-card__org')?.textContent.trim() || '',
  }));
  certItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(certGroup, index));
  });

  /* ---------- Testimonial slider (auto-sliding) ---------- */
  const track = document.getElementById('testimonialsTrack');
  const dotsWrap = document.getElementById('testimonialsDots');
  const prevBtn = document.getElementById('testimonialsPrev');
  const nextBtn = document.getElementById('testimonialsNext');

  if (track) {
    const slides = Array.from(track.children);
    let current = 0;
    let autoTimer = null;
    const AUTO_MS = 5500;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `عرض تقييم رقم ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function update() {
      track.style.transform = `translateX(${current * -100}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
    }

    function goTo(index, userTriggered) {
      current = (index + slides.length) % slides.length;
      update();
      if (userTriggered) restartAuto();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      autoTimer = setInterval(next, AUTO_MS);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }
    function restartAuto() {
      stopAuto();
      startAuto();
    }

    nextBtn?.addEventListener('click', () => goTo(current + 1, true));
    prevBtn?.addEventListener('click', () => goTo(current - 1, true));

    const slider = track.closest('.testimonials');
    slider?.addEventListener('mouseenter', stopAuto);
    slider?.addEventListener('mouseleave', startAuto);
    slider?.addEventListener('focusin', stopAuto);
    slider?.addEventListener('focusout', startAuto);

    /* touch swipe */
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(current - 1, true) : goTo(current + 1, true);
      }
    }, { passive: true });

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      startAuto();
    }
    update();
  }
})();
