/**
 * Entry point — all feature modules (navbar, animations, counters, timeline,
 * practiceAreas, testimonials, cases, faq, cursor, contact) self-initialize
 * on load via their own IIFEs. This file wires up any cross-module behavior.
 */
(function () {
  document.documentElement.classList.add('js-ready');

  /* Smooth-scroll offset compensation for the fixed navbar */
  const navbar = document.getElementById('navbar');

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight + 12 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
