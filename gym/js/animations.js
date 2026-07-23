// Scroll-reveal via IntersectionObserver + button ripple micro-interaction
export function initScrollReveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (!items.length) return;

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  items.forEach((el, index) => {
    el.style.setProperty("--delay", `${(index % 4) * 90}ms`);
    observer.observe(el);
  });
}

export function initButtonRipple() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.remove("is-rippling");
      // Force reflow to restart animation
      void btn.offsetWidth;
      btn.classList.add("is-rippling");
    });
  });
}
