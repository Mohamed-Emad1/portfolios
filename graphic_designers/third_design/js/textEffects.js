(function () {
  "use strict";

  // Arabic script requires adjacent characters to determine letterform
  // (initial/medial/final/isolated joining), so words are split as whole
  // units rather than individual characters to avoid breaking shaping.
  function splitToWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach(function (word, i) {
      if (i > 0) el.appendChild(document.createTextNode(" "));
      const span = document.createElement("span");
      span.className = "word";
      span.style.transitionDelay = (i * 0.08) + "s";
      span.textContent = word;
      el.appendChild(span);
    });
  }

  const heroName = document.getElementById("heroName");
  if (heroName) {
    splitToWords(heroName);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        heroName.classList.add("is-visible");
      });
    });
  }

  document.querySelectorAll(".split-text[data-split-scroll]").forEach(function (el) {
    splitToWords(el);
  });

  if ("IntersectionObserver" in window) {
    const splitObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            splitObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll(".split-text[data-split-scroll]").forEach(function (el) {
      splitObserver.observe(el);
    });
  }
})();
