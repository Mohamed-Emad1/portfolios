// Gallery category filtering + lightbox preview + lazy loading
export function initGalleryFilter() {
  const buttons = document.querySelectorAll(".gallery__filter-btn");
  const items = document.querySelectorAll(".gallery-item");
  if (!buttons.length || !items.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });
}

export function initLightbox() {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = lightbox?.querySelector("img");
  const closeBtn = lightbox?.querySelector(".lightbox__close");
  const triggers = document.querySelectorAll("[data-lightbox-src]");
  if (!lightbox || !lightboxImg) return;

  let lastFocused = null;

  const open = (src, alt) => {
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeBtn?.focus();
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocused?.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      open(trigger.dataset.lightboxSrc, trigger.dataset.lightboxAlt);
    });
  });

  closeBtn?.addEventListener("click", close);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
  });
}

export function initLazyLoad() {
  const lazyImages = document.querySelectorAll("img[loading='lazy']");
  if (!("loading" in HTMLImageElement.prototype)) {
    // Fallback for browsers without native lazy-loading support
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) img.src = img.dataset.src;
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach((img) => observer.observe(img));
  }
}
