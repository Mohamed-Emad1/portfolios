(function () {
  // ---------- Portfolio filtering ----------
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      portfolioItems.forEach((item) => {
        const match = filter === "all" || item.getAttribute("data-category") === filter;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  // ---------- Lazy image reveal (native lazy already used; add fade-in) ----------
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach((img) => {
    if (img.complete) return;
    img.style.opacity = "0";
    img.style.transition = "opacity 400ms ease";
    img.addEventListener("load", () => (img.style.opacity = "1"));
  });

  // ---------- Report preview modal ----------
  const reportCards = document.querySelectorAll(".report-card");
  const modal = document.getElementById("reportModal");
  const modalImage = document.getElementById("reportModalImage");
  const modalTitle = document.getElementById("reportModalTitle");
  const modalClose = document.getElementById("reportModalClose");

  function openModal(card) {
    const img = card.querySelector("img");
    const title = card.getAttribute("data-report-title") || "";
    if (modalImage && img) modalImage.src = img.src;
    if (modalImage) modalImage.alt = title;
    if (modalTitle) modalTitle.textContent = title;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  reportCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
