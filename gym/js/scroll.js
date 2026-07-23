// Smooth scroll for in-page anchor links + debounced scroll-to-top button
export function initSmoothScroll() {
  const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navbarHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight + 1;
      window.scrollTo({ top, behavior: "smooth" });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });
}

export function initScrollTopButton() {
  const btn = document.querySelector(".scroll-top-btn");
  if (!btn) return;

  let ticking = false;
  const update = () => {
    btn.classList.toggle("is-visible", window.scrollY > 600);
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
