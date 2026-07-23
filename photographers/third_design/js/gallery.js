(function () {
  const grid = document.getElementById("masonryGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const loadingEl = document.getElementById("galleryLoading");
  if (!grid) return;

  const categories = {
    weddings: "حفلات الزفاف",
    engagement: "الخطوبة",
    portraits: "جلسات خاصة",
    films: "الأفلام",
    details: "التفاصيل",
    destinations: "الوجهات العالمية",
  };

  const locations = [
    "الساحل الأمالفيتاني، إيطاليا",
    "مراكش، المغرب",
    "سانتوريني، اليونان",
    "دبي، الإمارات",
    "بالي، إندونيسيا",
    "باريس، فرنسا",
    "الرياض، السعودية",
    "إسطنبول، تركيا",
  ];

  const heights = [280, 340, 400, 460, 320, 380];

  const items = [];
  const catKeys = Object.keys(categories);
  for (let i = 0; i < 24; i++) {
    const cat = catKeys[i % catKeys.length];
    items.push({
      id: i,
      cat,
      catLabel: categories[cat],
      location: locations[i % locations.length],
      height: heights[i % heights.length],
    });
  }

  function renderItems() {
    grid.innerHTML = "";
    items.forEach((item) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      fig.dataset.category = item.cat;
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", `عرض صورة ${item.catLabel} — ${item.location}`);
      fig.innerHTML = `
        <img src="assets/images/placeholder.png" alt="لقطة من ${item.catLabel} في ${item.location}" loading="lazy" style="height:${item.height}px; object-fit:cover;">
        <div class="gallery-item-overlay">
          <p>${item.catLabel}</p>
          <h4>${item.location}</h4>
          <span class="view-btn">عرض المشروع</span>
        </div>
      `;
      grid.appendChild(fig);
    });
    observeItems();
  }

  function observeItems() {
    const galleryItems = grid.querySelectorAll(".gallery-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), idx * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    galleryItems.forEach((el) => observer.observe(el));
  }

  function applyFilter(filter) {
    if (loadingEl) loadingEl.style.display = "block";
    const galleryItems = grid.querySelectorAll(".gallery-item");
    galleryItems.forEach((el) => {
      const match = filter === "all" || el.dataset.category === filter;
      el.classList.toggle("hide", !match);
      if (match) {
        el.classList.remove("visible");
        requestAnimationFrame(() => el.classList.add("visible"));
      }
    });
    setTimeout(() => {
      if (loadingEl) loadingEl.style.display = "none";
    }, 350);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      applyFilter(btn.dataset.filter);
    });
  });

  renderItems();

  window.galleryItemsData = items;
  window.galleryCategories = categories;
})();
