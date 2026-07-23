/* Sticky navbar: blur on scroll, hide/show on direction, active section, mobile menu */
const Navbar = (() => {
  let navbar, toggle, mobileMenu, links, sections;
  let lastY = 0;

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('is-scrolled', y > 40);
    navbar.classList.toggle('is-hidden', y > lastY && y > 200 && !mobileMenu.classList.contains('is-open'));
    lastY = y;
    updateActiveSection();
  }

  function updateActiveSection() {
    const offset = window.scrollY + window.innerHeight * .35;
    let current = sections[0];
    sections.forEach((sec) => { if (sec.offsetTop <= offset) current = sec; });
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
    });
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  function toggleMobileMenu(force) {
    const open = force !== undefined ? force : !mobileMenu.classList.contains('is-open');
    mobileMenu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  function init() {
    navbar = document.getElementById('navbar');
    toggle = document.getElementById('navToggle');
    mobileMenu = document.getElementById('mobileMenu');
    links = document.querySelectorAll('[data-nav]');
    sections = Array.from(document.querySelectorAll('main > section, main'));
    if (!navbar) return;

    window.addEventListener('scroll', debounce(onScroll, 10), { passive: true });
    toggle.addEventListener('click', () => toggleMobileMenu());
    links.forEach((link) => link.addEventListener('click', () => toggleMobileMenu(false)));
    onScroll();
  }

  return { init };
})();
