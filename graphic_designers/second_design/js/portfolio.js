(function () {
  const grid = document.getElementById("portfolioGrid");
  if (!grid) return;

  const projects = [
    { id: 1, category: "identity", title: "هوية بصرية لمقهى NOIR", client: "مقهى NOIR", year: 2025, tags: ["هوية بصرية", "شعار"], tall: true },
    { id: 2, category: "logo", title: "شعار شركة نوفا للتقنية", client: "نوفا", year: 2025, tags: ["شعار"] },
    { id: 3, category: "ui", title: "تطبيق إدارة المشاريع", client: "بروميديا", year: 2024, tags: ["واجهات مستخدم", "تطبيق"] },
    { id: 4, category: "ads", title: "حملة إعلانية لعلامة أزياء", client: "لومير", year: 2024, tags: ["إعلانات"] },
    { id: 5, category: "print", title: "كتالوج منتجات فندقي", client: "فندق الواحة", year: 2024, tags: ["مطبوعات"], tall: true },
    { id: 6, category: "social", title: "محتوى سوشيال ميديا", client: "متجر أورا", year: 2023, tags: ["سوشيال ميديا"] },
    { id: 7, category: "illustration", title: "رسوم توضيحية لكتاب أطفال", client: "دار النشر الحديثة", year: 2023, tags: ["رسوم توضيحية"] },
    { id: 8, category: "identity", title: "هوية بصرية لصالة رياضية", client: "فيت زون", year: 2023, tags: ["هوية بصرية"] },
    { id: 9, category: "ui", title: "موقع تعريفي لوكالة عقارية", client: "داروين العقارية", year: 2022, tags: ["واجهات مستخدم", "موقع"] },
    { id: 10, category: "logo", title: "شعار مطعم شرقي", client: "مطعم الشام", year: 2022, tags: ["شعار"] },
    { id: 11, category: "print", title: "بطاقات أعمال فاخرة", client: "مكتب قانوني", year: 2022, tags: ["مطبوعات"] },
    { id: 12, category: "social", title: "قوالب إنستغرام لعلامة تجميل", client: "بيلا", year: 2021, tags: ["سوشيال ميديا"] },
  ];

  grid.innerHTML = projects
    .map(
      (p) => `
    <div class="portfolio-item${p.tall ? " tall" : ""} reveal fade-up" data-category="${p.category}" data-id="${p.id}" tabindex="0" role="button" aria-label="عرض مشروع ${p.title}">
      <img src="assets/placeholder.png" alt="${p.title}" loading="lazy" width="400" height="300">
      <div class="portfolio-overlay">
        <h3 style="font-size:1.05rem">${p.title}</h3>
        <span style="font-size:.85rem;color:var(--color-text-secondary)">${p.client} · ${p.year}</span>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </div>`
    )
    .join("");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("in-view"), (i % 6) * 60);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    grid.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      grid.querySelectorAll(".portfolio-item").forEach((item) => {
        const match = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("hidden", !match);
      });
    });
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  let currentIndex = 0;

  function getVisibleItems() {
    return [...grid.querySelectorAll(".portfolio-item:not(.hidden)")];
  }

  function openLightbox(index) {
    const items = getVisibleItems();
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const project = projects.find((p) => p.id === Number(item.dataset.id));
    lightboxImg.src = item.querySelector("img").src;
    lightboxImg.alt = project.title;
    lightboxCaption.textContent = `${project.title} — ${project.client} · ${project.year}`;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".portfolio-item");
    if (!item) return;
    const items = getVisibleItems();
    openLightbox(items.indexOf(item));
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const item = e.target.closest(".portfolio-item");
    if (!item) return;
    e.preventDefault();
    const items = getVisibleItems();
    openLightbox(items.indexOf(item));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxPrev.addEventListener("click", () => openLightbox(currentIndex - 1));
  lightboxNext.addEventListener("click", () => openLightbox(currentIndex + 1));

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") openLightbox(currentIndex + 1);
    if (e.key === "ArrowRight") openLightbox(currentIndex - 1);
  });
})();
