(function () {
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  if (!track || !dotsWrap) return;

  const slides = [...track.children];
  let current = 0;
  let autoTimer = null;
  const AUTO_DELAY = 6000;
  const isRTL = document.dir === "rtl";

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `عرض رأي العميل رقم ${i + 1}`);
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goTo(i, true));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  function goTo(index, manual) {
    current = (index + slides.length) % slides.length;
    const offset = isRTL ? current * 100 : -current * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
    if (manual) restartAuto();
  }

  function next() {
    goTo(current + 1);
  }

  function startAuto() {
    autoTimer = setInterval(next, AUTO_DELAY);
  }

  function restartAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoTimer);
  });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goTo(current - 1);
      else goTo(current + 1);
    }
    restartAuto();
  });

  track.addEventListener("mouseenter", () => clearInterval(autoTimer));
  track.addEventListener("mouseleave", restartAuto);

  goTo(0);
  startAuto();
})();
