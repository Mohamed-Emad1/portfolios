/* Portfolio filter — dynamic filtering without page reload */
(function () {
  const filterBar = document.querySelector(".filter-bar");
  const gallery = document.getElementById("galleryGrid");
  if (!filterBar || !gallery) return;

  const filterBtns = filterBar.querySelectorAll(".filter-btn");
  const items = gallery.querySelectorAll(".gallery-item");

  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    const filter = btn.getAttribute("data-filter");

    filterBtns.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });

    items.forEach((item) => {
      const matches = filter === "all" || item.getAttribute("data-category") === filter;
      item.classList.toggle("is-hidden", !matches);
      if (matches) {
        item.classList.remove("is-filtering-in");
        void item.offsetWidth;
        item.classList.add("is-filtering-in");
      }
    });
  });
})();
