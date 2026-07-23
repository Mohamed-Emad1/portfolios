/* ==========================================================================
   ديسينيو | Interior Design Portfolio — Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initStickyNavbar();
  initMobileMenu();
  initSmoothScroll();
  initActiveNav();
  initScrollReveal();
  initCounters();
  initTestimonialSlider();
  initBeforeAfterSlider();
  initGalleryLightbox();
  initBackToTop();
  initContactForm();
  initRipple();
});

/* -------------------------------- Loader --------------------------------- */
function initLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  const hideLoader = () => setTimeout(() => loader.classList.add('loaded'), 400);

  if (document.readyState === 'complete') hideLoader();
  else window.addEventListener('load', hideLoader);
}

/* ------------------------------ Sticky Navbar ------------------------------ */
function initStickyNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggle = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* -------------------------------- Mobile Menu ------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  if (!toggleBtn || !menu) return;

  const closeMenu = () => {
    toggleBtn.classList.remove('active');
    menu.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    const isActive = toggleBtn.classList.toggle('active');
    menu.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ------------------------------ Smooth Scrolling ----------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* -------------------------------- Active Nav --------------------------------- */
function initActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link[data-nav]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-90px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* -------------------------------- Scroll Reveal ------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), (index % 6) * 90);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ------------------------------ Counter Animation ----------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/* ----------------------------- Testimonial Slider ------------------------------ */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!track || !dotsContainer) return;

  const slides = Array.from(track.children);
  let current = 0;
  let autoplay;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `الشريحة ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  }

  function nextSlide() {
    goTo(current + 1);
  }

  function startAutoplay() {
    autoplay = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  track.parentElement.addEventListener('mouseenter', stopAutoplay);
  track.parentElement.addEventListener('mouseleave', startAutoplay);

  goTo(0);
  startAutoplay();
}

/* ----------------------------- Before/After Slider ------------------------------ */
function initBeforeAfterSlider() {
  const slider = document.getElementById('baSlider');
  const before = document.getElementById('baBefore');
  const handle = document.getElementById('baHandle');
  if (!slider || !before || !handle) return;

  let dragging = false;

  function setPosition(clientX) {
    const rect = slider.getBoundingClientRect();
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    before.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  }

  function onMove(e) {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  }

  function startDrag(e) {
    dragging = true;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPosition(clientX);
  }

  function stopDrag() {
    dragging = false;
  }

  handle.addEventListener('mousedown', startDrag);
  slider.addEventListener('mousedown', startDrag);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', stopDrag);

  handle.addEventListener('touchstart', startDrag, { passive: true });
  slider.addEventListener('touchstart', startDrag, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', stopDrag);

  setPosition(slider.getBoundingClientRect().left + slider.getBoundingClientRect().width / 2);
}

/* -------------------------------- Gallery Lightbox ------------------------------- */
function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!items.length || !lightbox || !lightboxImg || !closeBtn) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  items.forEach(item => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const img = item.querySelector('img');
      openLightbox(full || img.src, img ? img.alt : '');
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* --------------------------------- Back To Top ----------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --------------------------------- Contact Form ----------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  });
}

/* ----------------------------------- Ripple ---------------------------------------- */
function initRipple() {
  const buttons = document.querySelectorAll('.ripple');

  buttons.forEach(button => {
    button.addEventListener('click', function (e) {
      const rect = button.getBoundingClientRect();
      const circle = document.createElement('span');
      const diameter = Math.max(rect.width, rect.height);

      circle.classList.add('ripple-circle');
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
      circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;

      button.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
}
