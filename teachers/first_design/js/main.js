/* =====================================================
   main.js — navigation, theme, scroll progress, FAQ,
   contact form validation, scroll-to-top
   ===================================================== */
(() => {
  'use strict';

  /* ---------- Header blur + scroll progress ---------- */
  const header = document.getElementById('siteHeader');
  const progressBar = document.getElementById('scrollProgress');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    header.classList.toggle('is-scrolled', scrollTop > 40);
    if (progressBar) progressBar.style.width = `${progress}%`;
    if (scrollTopBtn) scrollTopBtn.classList.toggle('is-visible', scrollTop > 480);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-locked');
  }
  navToggle?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-locked', isOpen);
  });
  mainNav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Smooth scroll for in-page links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', id);
    });
  });

  /* ---------- Active nav link while scrolling ---------- */
  const navLinks = Array.from(document.querySelectorAll('.main-nav a[href^="#"]'));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = navLinks.find((a) => a.getAttribute('href') === `#${entry.target.id}`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((a) => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- Theme toggle (light by default) ---------- */
  const THEME_KEY = 'teacher-portfolio-theme';
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    themeToggle?.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

  themeToggle?.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-item__q');
    const answer = item.querySelector('.faq-item__a');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.parentElement.querySelectorAll('.faq-item').forEach((other) => {
        other.classList.remove('is-open');
        other.querySelector('.faq-item__q')?.setAttribute('aria-expanded', 'false');
        const otherAnswer = other.querySelector('.faq-item__a');
        if (otherAnswer) otherAnswer.style.maxHeight = '';
      });
      if (!isOpen) {
        item.classList.add('is-open');
        question.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'btn__ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  /* ---------- Contact form validation ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const fields = {
      name: form.querySelector('#cf-name'),
      phone: form.querySelector('#cf-phone'),
      email: form.querySelector('#cf-email'),
      message: form.querySelector('#cf-message'),
    };
    const status = document.getElementById('formStatus');

    const validators = {
      name: (v) => v.trim().length >= 3,
      phone: (v) => /^01[0125][0-9]{8}$/.test(v.trim()),
      email: (v) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(v.trim()),
      message: (v) => v.trim().length >= 10,
    };

    function validateField(key) {
      const el = fields[key];
      if (!el) return true;
      const isValid = validators[key](el.value);
      el.classList.toggle('is-invalid', !isValid);
      const errorEl = document.getElementById(`${el.id}-error`);
      errorEl?.classList.toggle('is-visible', !isValid);
      return isValid;
    }

    Object.keys(fields).forEach((key) => {
      const el = fields[key];
      el?.addEventListener('blur', () => validateField(key));
      el?.addEventListener('input', () => {
        if (el.classList.contains('is-invalid')) validateField(key);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const results = Object.keys(fields).map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        status.textContent = 'برجاء مراجعة الحقول المظللة قبل الإرسال.';
        status.className = 'form-status is-visible';
        return;
      }

      const subject = `طلب حجز حصة من ${fields.name.value.trim()}`;
      const body = [
        `الاسم: ${fields.name.value.trim()}`,
        `رقم الهاتف: ${fields.phone.value.trim()}`,
        `البريد الإلكتروني: ${fields.email.value.trim()}`,
        '',
        fields.message.value.trim(),
      ].join('\n');
      const mailto = `mailto:teacher@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      status.textContent = 'شكرًا لك! سيتم فتح تطبيق البريد الإلكتروني لإتمام الإرسال.';
      status.className = 'form-status form-status--success is-visible';
      window.location.href = mailto;
      form.reset();
    });
  }

  /* ---------- Lazy loading fallback for images without native support ---------- */
  if (!('loading' in HTMLImageElement.prototype)) {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
