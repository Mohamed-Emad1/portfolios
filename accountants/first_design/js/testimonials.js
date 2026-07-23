(function () {
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (!track) return;

  const slides = Array.from(track.children);
  let current = 0;
  let autoTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.setAttribute("role", "button");
    dot.setAttribute("aria-label", `الشهادة رقم ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function render() {
    track.style.transform = `translateX(${-current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  }

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    render();
    resetAuto();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(next, 6000);
  }

  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);

  // Swipe support
  let touchStartX = 0;
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) < 40) return;
    delta > 0 ? prev() : next();
  }, { passive: true });

  render();
  resetAuto();
})();
