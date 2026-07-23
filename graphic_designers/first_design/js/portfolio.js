(function () {
  'use strict';

  /* ============ Filtering ============ */
  const filterButtons = document.querySelectorAll('.portfolio-filters .tag');
  const items = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      items.forEach((item) => {
        const match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (match) {
          item.classList.remove('hide');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.94)';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.94)';
          setTimeout(() => item.classList.add('hide'), 300);
        }
      });
    });
  });

  /* ============ Lightbox ============ */
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxImageWrap = document.getElementById('lightboxImageWrap');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCat = document.getElementById('lightboxCat');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  const galleryItems = Array.from(items);
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[currentIndex];
    const img = item.querySelector('img');
    const title = item.querySelector('.portfolio-item__title');
    const cat = item.querySelector('.portfolio-item__cat');

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxTitle.textContent = title ? title.textContent : '';
    lightboxCat.textContent = cat ? cat.textContent : '';
    lightboxImageWrap.classList.remove('zoomed');

    lightbox.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
  }

  galleryItems.forEach((item, index) => {
    const link = item.querySelector('.portfolio-item__link');
    const trigger = (e) => {
      e.preventDefault();
      openLightbox(index);
    };
    item.addEventListener('click', trigger);
    if (link) link.addEventListener('click', trigger);
  });

  closeBtn?.addEventListener('click', closeLightbox);
  nextBtn?.addEventListener('click', showNext);
  prevBtn?.addEventListener('click', showPrev);

  lightboxImageWrap?.addEventListener('click', (e) => {
    if (e.target === lightboxImage) {
      lightboxImageWrap.classList.toggle('zoomed');
    }
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showPrev();
    if (e.key === 'ArrowLeft') showNext();
  });

  /* touch swipe */
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) < 50) return;
    diff > 0 ? showPrev() : showNext();
  }, { passive: true });
})();
