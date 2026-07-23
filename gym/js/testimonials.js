// Testimonials slider: autoplay, manual controls (arrows/dots), swipe support
export function initTestimonials() {
  const root = document.querySelector(".testimonials");
  const track = root?.querySelector(".testimonials__track");
  const slides = root ? Array.from(root.querySelectorAll(".testimonials__slide")) : [];
  const dotsWrap = root?.querySelector(".testimonials__dots");
  const prevBtn = root?.querySelector(".testimonials__arrow--prev");
  const nextBtn = root?.querySelector(".testimonials__arrow--next");
  if (!root || !track || !slides.length) return;

  let current = 0;
  let autoplayId = null;
  const AUTOPLAY_MS = 5500;
  const isRTL = document.documentElement.dir === "rtl";

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.className = "testimonials__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `الانتقال إلى الشهادة رقم ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function render() {
    const offset = current * 100 * (isRTL ? 1 : -1);
    track.style.transform = `translateX(${offset}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
    restartAutoplay();
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  function startAutoplay() {
    autoplayId = window.setInterval(next, AUTOPLAY_MS);
  }

  function restartAutoplay() {
    if (autoplayId) window.clearInterval(autoplayId);
    startAutoplay();
  }

  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);

  root.addEventListener("mouseenter", () => autoplayId && window.clearInterval(autoplayId));
  root.addEventListener("mouseleave", startAutoplay);

  // Swipe support
  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) < 40) return;
      const swipedLeft = delta < 0;
      if (isRTL ? swipedLeft : !swipedLeft) {
        prev();
      } else {
        next();
      }
    },
    { passive: true }
  );

  render();
  startAutoplay();
}
