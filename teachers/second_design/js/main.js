// Core site behavior: nav, header, scroll progress, FAQ, forms, ripple
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    initActiveNav();
    initScrollProgress();
    initScrollTopButton();
    initFaqAccordion();
    initContactForm();
    initRipple();
  });

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const btn = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('navList');
    if (!btn || !nav) return;

    let savedScrollY = 0;

    // overflow:hidden alone doesn't stop touch/rubber-band scroll on iOS Safari,
    // which lets the page behind bleed through the fixed menu overlay while scrolling.
    // Locking the body itself with position:fixed prevents that.
    function openMenu() {
      savedScrollY = window.scrollY;
      nav.classList.add('mobile-open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'إغلاق القائمة');
      document.body.style.position = 'fixed';
      document.body.style.top = -savedScrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
    }

    function closeMenu() {
      if (!nav.classList.contains('mobile-open')) return;
      nav.classList.remove('mobile-open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'فتح القائمة');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScrollY);
    }

    btn.addEventListener('click', () => {
      if (nav.classList.contains('mobile-open')) closeMenu();
      else openMenu();
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) closeMenu();
    });
  }

  /* ---------- Sticky header ---------- */
  function initStickyHeader() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    function update() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ---------- Active nav link on scroll ---------- */
  function initActiveNav() {
    const links = Array.from(document.querySelectorAll('.nav-list a'));
    if (!links.length) return;

    const sections = links
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (!('IntersectionObserver' in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            links.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === id);
            });
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- Scroll progress indicator ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function update() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = 'scaleX(' + progress + ')';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- Scroll to top button ---------- */
  function initScrollTopButton() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;

    function update() {
      btn.classList.toggle('visible', window.scrollY > 500);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach((item) => {
      const question = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!question || !answer) return;

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        items.forEach((other) => {
          other.classList.remove('open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          other.querySelector('.faq-answer').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          question.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ---------- Contact form validation ---------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('nameInput');
    const phoneInput = document.getElementById('phoneInput');
    const messageInput = document.getElementById('messageInput');
    const successMsg = document.getElementById('formSuccess');

    const phonePattern = /^01[0-2,5]{1}[0-9]{8}$/;

    function setError(input, group, errorEl, message) {
      const groupEl = document.getElementById(group);
      const err = document.getElementById(errorEl);
      if (message) {
        groupEl.classList.add('invalid');
        err.textContent = message;
        return false;
      }
      groupEl.classList.remove('invalid');
      err.textContent = '';
      return true;
    }

    function validateName() {
      const value = nameInput.value.trim();
      if (!value) return setError(nameInput, 'nameGroup', 'nameError', 'برجاء إدخال الاسم');
      if (value.length < 3) return setError(nameInput, 'nameGroup', 'nameError', 'الاسم يجب أن يكون 3 أحرف على الأقل');
      return setError(nameInput, 'nameGroup', 'nameError', '');
    }

    function validatePhone() {
      const value = phoneInput.value.trim();
      if (!value) return setError(phoneInput, 'phoneGroup', 'phoneError', 'برجاء إدخال رقم الهاتف');
      if (!phonePattern.test(value)) return setError(phoneInput, 'phoneGroup', 'phoneError', 'رقم هاتف غير صحيح');
      return setError(phoneInput, 'phoneGroup', 'phoneError', '');
    }

    function validateMessage() {
      const value = messageInput.value.trim();
      if (!value) return setError(messageInput, 'messageGroup', 'messageError', 'برجاء كتابة رسالتك');
      if (value.length < 10) return setError(messageInput, 'messageGroup', 'messageError', 'الرسالة قصيرة جدًا');
      return setError(messageInput, 'messageGroup', 'messageError', '');
    }

    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    messageInput.addEventListener('blur', validateMessage);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const validName = validateName();
      const validPhone = validatePhone();
      const validMessage = validateMessage();

      if (validName && validPhone && validMessage) {
        successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
      } else {
        successMsg.classList.remove('visible');
      }
    });
  }

  /* ---------- Button ripple ---------- */
  function initRipple() {
    document.querySelectorAll('[data-ripple]').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }
})();
