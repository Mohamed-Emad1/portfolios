/* Testimonials slider — autoplay, manual controls, swipe support */
(function () {
  const slider = document.querySelector(".testimonial-slider");
  if (!slider) return;

  const track = document.getElementById("testimonialSlides");
  const slides = Array.from(track.children);
  const dotsContainer = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  let currentIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_MS = 5500;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.classList.add("slider-dot");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `الشهادة رقم ${index + 1}`);
    if (index === 0) dot.classList.add("is-active");
    dot.addEventListener("click", () => goTo(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function update() {
    /* RTL: translateX uses positive offset to move slides visually rightward */
    track.style.transform = `translateX(${currentIndex * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === currentIndex));
  }

  function goTo(index) {
    currentIndex = (index + slides.length) % slides.length;
    update();
    restartAutoplay();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function startAutoplay() {
    autoplayTimer = window.setInterval(next, AUTOPLAY_MS);
  }

  function restartAutoplay() {
    window.clearInterval(autoplayTimer);
    startAutoplay();
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  slider.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
  slider.addEventListener("mouseleave", startAutoplay);

  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) next();
    else prev();
  });

  update();
  startAutoplay();
})();
