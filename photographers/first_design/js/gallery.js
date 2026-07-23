/* ==========================================================================
   Portfolio Gallery — category filter + fullscreen lightbox
   ========================================================================== */
(function () {
  /* Filter ------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      galleryItems.forEach((item) => {
        const matches = filter === "all" || item.getAttribute("data-category") === filter;
        item.classList.toggle("is-hidden", !matches);
      });
    });
  });

  /* Load more ------------------------------------------------------------ */
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn?.addEventListener("click", () => {
    loadMoreBtn.textContent = "تم عرض كافة الأعمال";
    loadMoreBtn.disabled = true;
    loadMoreBtn.style.opacity = "0.5";
    loadMoreBtn.style.cursor = "default";
  });

  /* Lightbox ------------------------------------------------------------ */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (!lightbox) return;

  let currentIndex = 0;
  let visibleTriggers = [];

  function refreshTriggers() {
    visibleTriggers = Array.from(document.querySelectorAll(".gallery-item:not(.is-hidden) [data-lightbox-src]"));
  }

  function openLightbox(index) {
    refreshTriggers();
    if (!visibleTriggers.length) return;
    currentIndex = (index + visibleTriggers.length) % visibleTriggers.length;
    const target = visibleTriggers[currentIndex];
    lightboxImg.src = target.getAttribute("data-lightbox-src");
    lightboxImg.alt = target.getAttribute("alt") || "";
    lightboxCaption.textContent = target.getAttribute("data-lightbox-caption") || "";
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  function showNext(direction) {
    refreshTriggers();
    if (!visibleTriggers.length) return;
    currentIndex = (currentIndex + direction + visibleTriggers.length) % visibleTriggers.length;
    const target = visibleTriggers[currentIndex];
    lightboxImg.src = target.getAttribute("data-lightbox-src");
    lightboxImg.alt = target.getAttribute("alt") || "";
    lightboxCaption.textContent = target.getAttribute("data-lightbox-caption") || "";
  }

  document.querySelectorAll(".gallery-item").forEach((item, idx) => {
    const img = item.querySelector("[data-lightbox-src]");
    const trigger = item.querySelector("[data-lightbox-trigger]");

    const handler = (e) => {
      e.preventDefault();
      refreshTriggers();
      const target = item.querySelector("[data-lightbox-src]");
      const openIndex = visibleTriggers.indexOf(target);
      openLightbox(openIndex >= 0 ? openIndex : 0);
    };

    img?.addEventListener("click", handler);
    trigger?.addEventListener("click", handler);
  });

  lightboxClose?.addEventListener("click", closeLightbox);
  lightboxNext?.addEventListener("click", () => showNext(-1));
  lightboxPrev?.addEventListener("click", () => showNext(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showNext(1);
    if (e.key === "ArrowRight") showNext(-1);
  });

  /* Touch swipe support ------------------------------------------------------ */
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 50) return;
    delta > 0 ? showNext(1) : showNext(-1);
  }, { passive: true });
})();
