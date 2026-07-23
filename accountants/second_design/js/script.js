/* Entry point — initializes every module in dependency order, plus the FAQ accordion */
(function () {
  function initAnchorScroll() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const headerOffset = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
        window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  function initAccordion() {
    document.querySelectorAll('.accordion-item').forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      const panel = item.querySelector('.accordion-panel');

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        item.parentElement.querySelectorAll('.accordion-item.is-open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
            openItem.querySelector('.accordion-panel').style.maxHeight = null;
          }
        });

        item.classList.toggle('is-open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
        panel.style.maxHeight = isOpen ? null : `${panel.scrollHeight}px`;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    Navbar.init();
    Counters.init();
    Charts.init();
    Dashboard.init();
    Timeline.init();
    Portfolio.init();
    Testimonials.init();
    Animations.init();
    Cursor.init();
    Contact.init();
    initAccordion();
    initAnchorScroll();
  });
})();
