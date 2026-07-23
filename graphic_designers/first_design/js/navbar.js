(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.navbar__link');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  const sections = document.querySelectorAll('main > section[id]');

  let lastScrollY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;

    navbar.classList.toggle('scrolled', y > 40);

    if (y > lastScrollY && y > 200) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
    lastScrollY = y;

    let currentId = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  function closeMenu() {
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function openMenu() {
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('active');
    document.body.classList.add('menu-open');
  }

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.contains('active');
    isActive ? closeMenu() : openMenu();
  });

  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  onScroll();
})();
