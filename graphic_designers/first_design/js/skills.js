(function () {
  'use strict';

  const CIRCUMFERENCE = 2 * Math.PI * 50; // r=50

  const skillCards = document.querySelectorAll('.skill-card[data-skill]');
  const skillBars = document.querySelectorAll('.skill-bar[data-skill]');

  if (!('IntersectionObserver' in window)) {
    skillCards.forEach(animateCircle);
    skillBars.forEach(animateBar);
    return;
  }

  function animateCircle(card) {
    const percent = parseInt(card.getAttribute('data-skill'), 10);
    const circle = card.querySelector('.progress-circle .fg');
    const label = card.querySelector('.progress-circle__value');
    if (!circle) return;

    circle.style.strokeDasharray = `${CIRCUMFERENCE}`;
    const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;

    requestAnimationFrame(() => {
      circle.style.strokeDashoffset = `${offset}`;
    });

    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      if (label) label.textContent = `${Math.floor(progress * percent)}%`;
      if (progress < 1) requestAnimationFrame(tick);
      else if (label) label.textContent = `${percent}%`;
    }
    requestAnimationFrame(tick);
  }

  function animateBar(bar) {
    const percent = parseInt(bar.getAttribute('data-skill'), 10);
    const fill = bar.querySelector('.skill-bar__fill');
    if (fill) fill.style.width = `${percent}%`;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains('skill-card')) {
          animateCircle(entry.target);
        } else {
          animateBar(entry.target);
        }
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  skillCards.forEach((card) => observer.observe(card));
  skillBars.forEach((bar) => observer.observe(bar));
})();
