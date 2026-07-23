// Main entry point — imports and initializes all feature modules
import { initNavbar } from "./navbar.js";
import { initSmoothScroll, initScrollTopButton } from "./scroll.js";
import { initScrollReveal, initButtonRipple } from "./animations.js";
import { initCounters } from "./counters.js";
import { initGalleryFilter, initLightbox, initLazyLoad } from "./gallery.js";
import { initPricingCards } from "./pricing.js";
import { initTestimonials } from "./testimonials.js";
import { initFaqAccordion } from "./faq.js";
import { initContactForm } from "./contact.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initSmoothScroll();
  initScrollTopButton();
  initScrollReveal();
  initButtonRipple();
  initCounters();
  initGalleryFilter();
  initLightbox();
  initLazyLoad();
  initPricingCards();
  initTestimonials();
  initFaqAccordion();
  initContactForm();
});
