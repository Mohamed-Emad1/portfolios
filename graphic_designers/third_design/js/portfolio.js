(function () {
  "use strict";

  const grid = document.getElementById("portfolioGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".portfolio-item");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCat = document.getElementById("lightboxCat");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  const catLabels = {
    logo: "الشعارات",
    branding: "الهوية البصرية",
    social: "السوشيال ميديا",
    ads: "الإعلانات",
    ui: "واجهات المستخدم",
    print: "المطبوعات",
    illustration: "الرسوم التوضيحية"
  };

  // ---------- Filtering ----------
  if (filterBtns.length && items.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = btn.getAttribute("data-filter");

        filterBtns.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");

        items.forEach(function (item) {
          const match = filter === "all" || item.getAttribute("data-category") === filter;
          item.classList.toggle("is-hidden", !match);
        });
      });
    });
  }

  // ---------- Lightbox ----------
  let visibleItems = [];
  let currentIndex = 0;

  function getVisibleItems() {
    return Array.from(items).filter(function (item) {
      return !item.classList.contains("is-hidden");
    });
  }

  function openLightbox(item) {
    visibleItems = getVisibleItems();
    currentIndex = visibleItems.indexOf(item);
    renderLightbox();
    lightbox.classList.add("is-open");
    document.body.classList.add("no-scroll");
  }

  function renderLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector("img");
    const title = item.querySelector(".portfolio-item__title");
    const cat = item.getAttribute("data-category");

    lightboxImg.style.transform = "scale(1)";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title ? title.textContent : "";
    lightboxCat.textContent = catLabels[cat] || "مشروع";
    lightboxDesc.textContent = "نبذة تعريفية عن هذا المشروع وأبرز التفاصيل الإبداعية والتقنية المستخدمة في تنفيذه.";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
  }

  function showNext() {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    renderLightbox();
  }

  function showPrev() {
    if (!visibleItems.length) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    renderLightbox();
  }

  items.forEach(function (item) {
    item.addEventListener("click", function () { openLightbox(item); });
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);

  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  window.addEventListener("keydown", function (e) {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    // RTL: visually "next" arrow key is Left, "prev" is Right
    if (e.key === "ArrowLeft") showNext();
    if (e.key === "ArrowRight") showPrev();
  });

  // ---------- Zoom on click ----------
  if (lightboxImg) {
    let zoomed = false;
    lightboxImg.addEventListener("click", function (e) {
      e.stopPropagation();
      zoomed = !zoomed;
      lightboxImg.style.transform = zoomed ? "scale(1.6)" : "scale(1)";
      lightboxImg.style.cursor = zoomed ? "zoom-out" : "zoom-in";
    });
  }

  // ---------- Swipe gestures ----------
  let touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (e) {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) < 50) return;
      if (diff > 0) showPrev();
      else showNext();
    }, { passive: true });
  }
})();
