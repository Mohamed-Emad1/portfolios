(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.navbar-menu a, .mobile-menu a');
  const sections = document.querySelectorAll('main > section[id]');

  if (!navbar) return;

  let lastScroll = 0;

  function onScroll() {
    const current = window.scrollY;

    navbar.classList.toggle('is-scrolled', current > 40);

    if (current > lastScroll && current > 200) {
      navbar.classList.add('is-hidden');
    } else {
      navbar.classList.remove('is-hidden');
    }

    lastScroll = current;
    updateActiveLink();
  }

  function updateActiveLink() {
    let activeId = sections[0] ? sections[0].id : '';
    const offset = 140;

    sections.forEach((section) => {
      if (window.scrollY + offset >= section.offsetTop) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  window.addEventListener('scroll', debounce(onScroll, 10), { passive: true });

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  onScroll();
})();
