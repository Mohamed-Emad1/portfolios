// Testimonials slider: manual arrows, dots, autoplay, touch swipe
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonialSlides');
    const dotsWrap = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

    const slides = Array.from(track.children);
    let current = 0;
    let autoplayId = null;
    const AUTOPLAY_MS = 6000;
    const isRTL = document.documentElement.dir === 'rtl';

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'slider-dot';
      dot.setAttribute('aria-label', 'الانتقال إلى الشريحة ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      const offset = current * 100 * (isRTL ? 1 : -1);
      track.style.transform = 'translateX(' + offset + '%)';
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      render();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    // Visually, "next" arrow points left in RTL and moves forward
    nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
    prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

    function startAutoplay() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      autoplayId = setInterval(next, AUTOPLAY_MS);
    }
    function stopAutoplay() {
      if (autoplayId) clearInterval(autoplayId);
    }
    function restartAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    const wrap = track.closest('.testimonials-wrap');
    if (wrap) {
      wrap.addEventListener('mouseenter', stopAutoplay);
      wrap.addEventListener('mouseleave', startAutoplay);
    }

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) < 40) return;
      if ((diff < 0) === isRTL) next(); else prev();
      restartAutoplay();
    }, { passive: true });

    render();
    startAutoplay();
  });
})();
