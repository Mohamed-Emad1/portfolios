/* =====================================================
   animations.js — reveal on scroll, counters,
   typing effect, animated skill bars
   ===================================================== */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (prefersReducedMotion) {
    animatedEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    animatedEls.forEach((el, i) => {
      el.style.setProperty('--d', `${Math.min(i % 4, 4) * 0.08}s`);
      revealObserver.observe(el);
    });
  }

  /* ---------- Counter animation ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const decimals = el.dataset.counter.includes('.') ? el.dataset.counter.split('.')[1].length : 0;
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals);
      }
    }
    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals);
    } else {
      requestAnimationFrame(tick);
    }
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------- Animated skill bars ---------- */
  const skillBars = document.querySelectorAll('.skill-bar__fill');
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = `${bar.dataset.skill}%`;
          skillObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach((bar) => skillObserver.observe(bar));

  /* ---------- Typing effect for hero heading ---------- */
  const typingEl = document.getElementById('heroTyping');
  if (typingEl) {
    const text = typingEl.dataset.text || typingEl.textContent;
    if (prefersReducedMotion) {
      typingEl.textContent = text;
    } else {
      typingEl.textContent = '';
      typingEl.classList.add('typing-caret');
      let i = 0;
      function typeChar() {
        if (i <= text.length) {
          typingEl.textContent = text.slice(0, i);
          i += 1;
          setTimeout(typeChar, 55);
        } else {
          typingEl.classList.remove('typing-caret');
        }
      }
      setTimeout(typeChar, 400);
    }
  }

  /* ---------- Timeline reveal (uses same [data-animate] observer above) ---------- */
})();
