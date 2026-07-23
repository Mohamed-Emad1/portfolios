/* Testimonials carousel + before/after compare slider */
(function () {
  /* --- Testimonials carousel --- */
  const slider = document.getElementById("testimonial-slider");
  if (slider) {
    const cards = Array.from(slider.querySelectorAll(".testimonial-card"));
    const dotsWrap = document.getElementById("testimonial-dots");
    const prevBtn = document.getElementById("testimonial-prev");
    const nextBtn = document.getElementById("testimonial-next");
    let current = 0;
    let autoTimer;

    cards.forEach((card, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `عرض رأي العميل رقم ${i + 1}`);
      dot.addEventListener("click", () => goTo(i, true));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      cards.forEach((card, i) => {
        card.classList.toggle("active", i === current);
        card.setAttribute("aria-hidden", String(i !== current));
      });
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    }

    function goTo(index, userTriggered) {
      current = (index + cards.length) % cards.length;
      render();
      if (userTriggered) restartAuto();
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAuto() {
      autoTimer = setInterval(next, 6000);
    }

    function restartAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    nextBtn.addEventListener("click", () => goTo(current + 1, true));
    prevBtn.addEventListener("click", () => goTo(current - 1, true));

    /* touch support */
    let touchStartX = 0;
    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true }
    );
    slider.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) goTo(current + 1, true);
        else goTo(current - 1, true);
      },
      { passive: true }
    );

    render();
    startAuto();
  }

  /* --- Before / after compare slider --- */
  const compare = document.getElementById("compare-slider");
  if (compare) {
    const handle = document.getElementById("compare-handle");
    const afterImg = compare.querySelector(".compare-after");
    let dragging = false;

    function setPosition(clientX) {
      const rect = compare.getBoundingClientRect();
      let ratio = (clientX - rect.left) / rect.width;
      ratio = Math.min(Math.max(ratio, 0), 1);
      const fromLeft = ratio * 100;
      /* page is fixed RTL: "inset-inline-start" maps to physical `right`,
         so the handle's logical offset is measured from the right edge */
      const fromRight = 100 - fromLeft;
      afterImg.style.clipPath = `inset(0 ${fromRight}% 0 0)`;
      handle.style.insetInlineStart = `${fromRight}%`;
      handle.setAttribute("aria-valuenow", String(Math.round(fromLeft)));
    }

    function onMove(e) {
      if (!dragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(clientX);
    }

    function stopDrag() {
      dragging = false;
    }

    handle.addEventListener("mousedown", () => (dragging = true));
    handle.addEventListener("touchstart", () => (dragging = true), { passive: true });
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    handle.addEventListener("keydown", (e) => {
      const rect = compare.getBoundingClientRect();
      const current = parseFloat(handle.getAttribute("aria-valuenow")) || 50;
      let next = current;
      if (e.key === "ArrowLeft") next = current - 5;
      if (e.key === "ArrowRight") next = current + 5;
      if (next !== current) {
        e.preventDefault();
        setPosition(rect.left + (Math.min(Math.max(next, 0), 100) / 100) * rect.width);
      }
    });
  }
})();
