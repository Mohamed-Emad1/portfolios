/* Fullscreen lightbox — prev/next, keyboard, touch swipe, captions */
(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  let currentIndex = 0;
  let lastFocusedEl = null;

  function buildSlide(item) {
    const img = item.querySelector("img");
    const title = item.querySelector(".gallery-item__title")?.textContent || "";
    const location = item.querySelector(".gallery-item__location")?.textContent || "";
    return {
      src: img?.getAttribute("src") || "",
      alt: img?.getAttribute("alt") || "",
      caption: [title, location].filter(Boolean).join(" — "),
    };
  }

  function openLightbox(index) {
    currentIndex = index;
    const slide = buildSlide(galleryItems[currentIndex]);

    lightboxImage.src = slide.src;
    lightboxImage.alt = slide.alt;
    lightboxCaption.textContent = slide.caption;

    lastFocusedEl = document.activeElement;
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    const slide = buildSlide(galleryItems[currentIndex]);
    lightboxImage.src = slide.src;
    lightboxImage.alt = slide.alt;
    lightboxCaption.textContent = slide.caption;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const slide = buildSlide(galleryItems[currentIndex]);
    lightboxImage.src = slide.src;
    lightboxImage.alt = slide.alt;
    lightboxCaption.textContent = slide.caption;
  }

  galleryItems.forEach((item, index) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "عرض الصورة في وضع ملء الشاشة");

    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (e.key === "Escape") closeLightbox();
    /* RTL layout: visual "next" arrow points left, "prev" arrow points right */
    if (e.key === "ArrowLeft") showNext();
    if (e.key === "ArrowRight") showPrev();
  });

  /* Touch swipe support */
  let touchStartX = 0;

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) < 50) return;
    if (delta > 0) showPrev();
    else showNext();
  });
})();
