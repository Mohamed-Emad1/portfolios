/* ==========================================================================
   Testimonials Slider — autoplay, dots, arrows, swipe, keyboard
   ========================================================================== */
(function () {
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 6000;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("aria-label", `الانتقال إلى الرأي ${i + 1}`);
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.children);

  function update() {
    /* RTL-aware: translateX percentage moves opposite direction visually,
       but since track children are laid out in source (logical) order and
       dir=rtl flips the flex axis automatically, a positive shift moves
       forward through the slides correctly. */
    track.style.transform = `translateX(${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  }

  function goTo(index, userInitiated) {
    current = (index + slides.length) % slides.length;
    update();
    if (userInitiated) restartAutoplay();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  nextBtn?.addEventListener("click", () => { next(); restartAutoplay(); });
  prevBtn?.addEventListener("click", () => { prev(); restartAutoplay(); });

  function startAutoplay() {
    if (prefersReducedMotion) return;
    autoplayTimer = setInterval(next, AUTOPLAY_DELAY);
  }

  function restartAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  const sliderEl = track.closest(".testimonial-slider");
  sliderEl?.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
  sliderEl?.addEventListener("mouseleave", startAutoplay);

  /* Keyboard navigation ------------------------------------------------------ */
  sliderEl?.setAttribute("tabindex", "0");
  sliderEl?.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { next(); restartAutoplay(); }
    if (e.key === "ArrowRight") { prev(); restartAutoplay(); }
  });

  /* Swipe support ------------------------------------------------------ */
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
    clearInterval(autoplayTimer);
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? prev() : next();
    }
    startAutoplay();
  }, { passive: true });

  update();
  startAutoplay();
})();
