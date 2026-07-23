/* ===================================================================
   script.js — coordinates FAQ accordion & testimonial slider.
   navbar.js, animations.js, counters.js, skills.js, timeline.js,
   portfolio.js, cursor.js and contact.js self-initialize on load.
   =================================================================== */
(function () {
  'use strict';

  /* ============ FAQ Accordion ============ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach((other) => {
        other.classList.remove('active');
        other.querySelector('.faq-item__question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-item__answer').style.maxHeight = '';
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* ============ Testimonial Slider ============ */
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');

  if (track && dotsContainer) {
    const slides = track.querySelectorAll('.testimonial-slide');
    let current = 0;
    let autoTimer;

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `الشهادة ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('button');

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(current + 1), 5500);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }

    /* RTL: track uses translateX; slides stack left-to-right in DOM,
       moving "forward" visually should shift the opposite direction. */
    nextBtn?.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    prevBtn?.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAuto();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
      startAuto();
    }, { passive: true });

    goTo(0);
    startAuto();
  }
})();
