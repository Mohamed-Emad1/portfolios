export function init() {
  initFilters();
  initLightbox();
}

function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach((item) => {
        const match = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const imgEl = document.getElementById('lightboxImg');
  const nameEl = document.getElementById('lightboxName');
  const metaEl = document.getElementById('lightboxMeta');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let currentList = [];
  let currentIndex = 0;

  function open(list, index) {
    currentList = list;
    currentIndex = index;
    render();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function render() {
    const data = currentList[currentIndex];
    if (!data) return;
    imgEl.src = data.img;
    imgEl.alt = data.name;
    nameEl.textContent = data.name;
    metaEl.textContent = data.meta;
  }

  function step(delta) {
    if (!currentList.length) return;
    currentIndex = (currentIndex + delta + currentList.length) % currentList.length;
    render();
  }

  // Gallery items open the lightbox scoped to currently visible items
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', () => {
      const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hidden)'));
      const list = visibleItems.map((el) => ({
        img: el.querySelector('img').src,
        name: el.dataset.name,
        meta: `${el.dataset.tech} · ${el.dataset.year}`,
      }));
      const index = visibleItems.indexOf(item);
      open(list, index === -1 ? 0 : index);
    });
  });

  // Featured project "view" buttons open the lightbox scoped to the project list
  const projectButtons = Array.from(document.querySelectorAll('.project-view'));
  if (projectButtons.length) {
    const projectList = projectButtons.map((btn) => {
      const article = btn.closest('.project-item');
      return {
        img: article.querySelector('img').src,
        name: article.querySelector('h3').textContent,
        meta: article.querySelector('.project-meta').textContent.replace(/\s+/g, ' ').trim(),
      };
    });
    projectButtons.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open(projectList, i);
      });
    });
  }

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
}
