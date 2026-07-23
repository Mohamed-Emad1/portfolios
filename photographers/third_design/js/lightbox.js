(function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");
  const grid = document.getElementById("masonryGrid");
  if (!lightbox || !grid) return;

  let visibleItems = [];
  let currentIndex = 0;
  let zoomed = false;
  let touchStartX = 0;

  function getVisibleItems() {
    return [...grid.querySelectorAll(".gallery-item:not(.hide)")];
  }

  function openLightbox(index) {
    visibleItems = getVisibleItems();
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    document.body.classList.add("no-scroll");
  }

  function updateLightbox() {
    const item = visibleItems[currentIndex];
    if (!item) return;
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-item-overlay h4")?.textContent || "";
    const label = item.querySelector(".gallery-item-overlay p")?.textContent || "";
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = `${label} — ${caption}`;
    zoomed = false;
    lightboxImg.style.transform = "scale(1)";
    lightboxImg.style.cursor = "zoom-in";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % visibleItems.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    updateLightbox();
  }

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    const items = getVisibleItems();
    openLightbox(items.indexOf(item));
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    e.preventDefault();
    const items = getVisibleItems();
    openLightbox(items.indexOf(item));
  });

  closeBtn?.addEventListener("click", closeLightbox);
  nextBtn?.addEventListener("click", showNext);
  prevBtn?.addEventListener("click", showPrev);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxImg?.addEventListener("click", () => {
    zoomed = !zoomed;
    lightboxImg.style.transform = zoomed ? "scale(1.8)" : "scale(1)";
    lightboxImg.style.cursor = zoomed ? "zoom-out" : "zoom-in";
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  lightbox.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });

  lightbox.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) showPrev();
    else showNext();
  });
})();
