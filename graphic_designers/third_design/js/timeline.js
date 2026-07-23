(function () {
  "use strict";

  const track = document.querySelector(".timeline__track");
  const fill = document.getElementById("timelineFill");
  const items = document.querySelectorAll(".timeline-item");

  if (!track || !items.length) return;

  function activateUpTo(index) {
    items.forEach(function (item, i) {
      item.classList.toggle("is-active", i <= index);
    });
    if (fill) {
      const percent = ((index + 1) / items.length) * 100;
      fill.style.width = percent + "%";
    }
  }

  if (!("IntersectionObserver" in window)) {
    activateUpTo(items.length - 1);
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          activateUpTo(items.length - 1);
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(track);

  items.forEach(function (item, index) {
    item.addEventListener("mouseenter", function () {
      activateUpTo(index);
    });
  });
})();
