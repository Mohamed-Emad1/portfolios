function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const links = document.querySelectorAll('.navbar-menu a, .mobile-drawer a');

  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    toggle && toggle.classList.remove('is-active');
    toggle && toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  links.forEach((link) => link.addEventListener('click', closeDrawer));

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar-menu a');

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          const active = document.querySelector(`.navbar-menu a[href="#${entry.target.id}"]`);
          active && active.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => spy.observe(section));
}
