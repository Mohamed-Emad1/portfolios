import { init as initNavbar } from './navbar.js';
import { init as initGears } from './gears.js';
import { init as initBlueprint } from './blueprint.js';
import { init as initAnimations } from './animations.js';
import { init as initCounters } from './counters.js';
import { init as initSkills } from './skills.js';
import { init as initTimeline } from './timeline.js';
import { init as initProjects } from './projects.js';
import { init as initCharts } from './charts.js';
import { init as initCursor } from './cursor.js';
import { init as initContact } from './contact.js';

function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  let index = 0;
  let autoplayTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `عرض الرأي ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = `translateX(${-index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    render();
  }

  function next() { goTo(index + 1); }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, 5000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  const wrapper = document.getElementById('testimonialSlider');
  wrapper.addEventListener('mouseenter', stopAutoplay);
  wrapper.addEventListener('mouseleave', startAutoplay);

  let touchStartX = 0;
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  }, { passive: true });
  wrapper.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goTo(index - 1); else goTo(index + 1);
    }
    startAutoplay();
  }, { passive: true });

  render();
  startAutoplay();
}

function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
      const isOpen = question.getAttribute('aria-expanded') === 'true';

      items.forEach((other) => {
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        question.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

function safeInit(name, fn) {
  try {
    fn();
  } catch (err) {
    console.error(`[script.js] Failed to init module "${name}":`, err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  safeInit('navbar', initNavbar);
  safeInit('gears', initGears);
  safeInit('blueprint', initBlueprint);
  safeInit('animations', initAnimations);
  safeInit('counters', initCounters);
  safeInit('skills', initSkills);
  safeInit('timeline', initTimeline);
  safeInit('projects', initProjects);
  safeInit('charts', initCharts);
  safeInit('cursor', initCursor);
  safeInit('contact', initContact);
  safeInit('testimonials', initTestimonialSlider);
  safeInit('faq', initFaqAccordion);
});
