// Gallery filtering + lightbox
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('galleryGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!grid) return;

    let items = Array.from(grid.querySelectorAll('.gallery-item'));

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        items.forEach((item) => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.classList.toggle('hidden', !match);
        });
      });
    });

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (!lightbox || !lightboxImg) return;

    let currentIndex = 0;
    let lastFocused = null;

    function visibleItems() {
      return items.filter((item) => !item.classList.contains('hidden'));
    }

    function openLightbox(index) {
      const visible = visibleItems();
      if (!visible.length) return;
      currentIndex = index;
      const img = visible[currentIndex].querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      lastFocused = document.activeElement;
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }

    function showRelative(delta) {
      const visible = visibleItems();
      if (!visible.length) return;
      currentIndex = (currentIndex + delta + visible.length) % visible.length;
      const img = visible[currentIndex].querySelector('img');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    }

    items.forEach((item, index) => {
      item.addEventListener('click', () => {
        const visible = visibleItems();
        const visIndex = visible.indexOf(item);
        openLightbox(visIndex >= 0 ? visIndex : 0);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', () => showRelative(1));
    prevBtn.addEventListener('click', () => showRelative(-1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showRelative(1);
      if (e.key === 'ArrowRight') showRelative(-1);
    });
  });
})();
