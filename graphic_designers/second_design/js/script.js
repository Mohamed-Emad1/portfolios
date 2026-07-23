(function () {
  const mouseGlow = document.getElementById("mouseGlow");
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  if (mouseGlow && !isTouch) {
    let ticking = false;
    window.addEventListener("mousemove", (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        mouseGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        ticking = false;
      });
    });
  }

  const track = document.getElementById("testimonialTrack");
  const controlsWrap = document.getElementById("testimonialControls");
  if (track && controlsWrap) {
    const slides = track.children.length;
    let current = 0;
    let autoTimer;

    for (let i = 0; i < slides; i++) {
      const dot = document.createElement("button");
      dot.className = "testimonial-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", `الشهادة رقم ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      controlsWrap.appendChild(dot);
    }

    function goTo(index) {
      current = (index + slides) % slides;
      track.style.transform = `translateX(${current * 100}%)`;
      [...controlsWrap.children].forEach((dot, i) => dot.classList.toggle("active", i === current));
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 6000);
    }
    function stopAuto() {
      clearInterval(autoTimer);
    }

    startAuto();
    track.parentElement.addEventListener("mouseenter", stopAuto);
    track.parentElement.addEventListener("mouseleave", startAuto);

    let touchStartX = 0;
    track.parentElement.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.parentElement.addEventListener("touchend", (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 50) goTo(diff > 0 ? current - 1 : current + 1);
    }, { passive: true });
  }
})();
