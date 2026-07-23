function initPortfolio() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;

      items.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  const modal = document.querySelector('.modal-overlay');
  if (!modal) return;

  const modalTitle = modal.querySelector('[data-modal-title]');
  const modalCategory = modal.querySelector('[data-modal-category]');
  const modalSummary = modal.querySelector('[data-modal-summary]');
  const modalImage = modal.querySelector('[data-modal-image]');
  const modalClose = modal.querySelector('.modal-close');

  const openModal = (card) => {
    modalTitle.textContent = card.dataset.title || '';
    modalCategory.textContent = card.dataset.categoryLabel || '';
    modalSummary.textContent = card.dataset.summary || '';
    if (modalImage) modalImage.src = card.dataset.image || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.case-card[data-title]').forEach((card) => {
    card.addEventListener('click', () => openModal(card));
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  modalClose && modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  const lazyImages = document.querySelectorAll('img[loading="lazy"][data-src]');
  if ('IntersectionObserver' in window && lazyImages.length) {
    const lazyObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          obs.unobserve(img);
        }
      });
    });
    lazyImages.forEach((img) => lazyObserver.observe(img));
  }
}
