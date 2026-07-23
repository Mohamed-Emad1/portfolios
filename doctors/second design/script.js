'use strict';

/* ==========================================================================
   شريط التنقل: تأثير التمويه عند التمرير + تمييز الرابط النشط
   ========================================================================== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('[data-nav]');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function handleScroll() {
  navbar.classList.toggle('is-scrolled', window.scrollY > 24);

  let currentId = sections[0]?.id;
  const scrollPos = window.scrollY + 140;

  for (const section of sections) {
    if (section.offsetTop <= scrollPos) currentId = section.id;
  }

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
  });
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ==========================================================================
   قائمة الجوال المنسدلة
   ========================================================================== */
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinksEl?.addEventListener('click', (e) => {
  if (e.target.closest('.nav-link')) {
    navLinksEl.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

/* ==========================================================================
   كشف العناصر عند التمرير (Scroll Reveal)
   ========================================================================== */
const revealItems = document.querySelectorAll('.reveal');

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

revealItems.forEach((item) => revealObserver.observe(item));

/* ==========================================================================
   أشرطة المهارات المتحركة عند الظهور
   ========================================================================== */
const skillFills = document.querySelectorAll('.skill-bar__fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.width = `${el.dataset.percent}%`;
        skillObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.4 }
);

skillFills.forEach((fill) => skillObserver.observe(fill));

/* ==========================================================================
   تنشيط الخط الزمني تباعاً عند الظهور
   ========================================================================== */
const timelineItems = document.querySelectorAll('.timeline__item');

timelineItems.forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(16px)';
  item.style.transition = `opacity .5s ease-out ${i * 0.12}s, transform .5s ease-out ${i * 0.12}s`;
});

const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        timelineObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

timelineItems.forEach((item) => timelineObserver.observe(item));

/* ==========================================================================
   فلترة المعرض (أعمالي)
   ========================================================================== */
const filterRow = document.getElementById('filterRow');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterRow?.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filterRow.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'));
  btn.classList.add('is-active');

  const filter = btn.dataset.filter;

  portfolioCards.forEach((card) => {
    const match = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !match);
  });
});

/* ==========================================================================
   دوّار الشهادات (Testimonial Carousel)
   ========================================================================== */
const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialDots = document.getElementById('testimonialDots');

if (testimonialTrack && testimonialDots) {
  const slides = [...testimonialTrack.querySelectorAll('.testimonial__slide')];
  const dots = [...testimonialDots.querySelectorAll('.dot')];
  let activeIndex = 0;
  let autoplayTimer;

  function goToSlide(index) {
    slides[activeIndex]?.classList.remove('is-active');
    dots[activeIndex]?.classList.remove('is-active');
    activeIndex = (index + slides.length) % slides.length;
    slides[activeIndex].classList.add('is-active');
    dots[activeIndex].classList.add('is-active');
  }

  function startAutoplay() {
    autoplayTimer = setInterval(() => goToSlide(activeIndex + 1), 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  testimonialDots.addEventListener('click', (e) => {
    const dot = e.target.closest('.dot');
    if (!dot) return;
    goToSlide(Number(dot.dataset.index));
    resetAutoplay();
  });

  startAutoplay();
}

/* ==========================================================================
   تمرير سلس للروابط الداخلية
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
