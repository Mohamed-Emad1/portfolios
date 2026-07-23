(function () {
  "use strict";

  const navbar = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".navbar__links a, .mobile-menu a");

  if (!navbar) return;

  let lastScrollY = window.scrollY;

  function onScroll() {
    const y = window.scrollY;

    navbar.classList.toggle("is-scrolled", y > 40);

    if (y > lastScrollY && y > 200) {
      navbar.classList.add("is-hidden");
    } else {
      navbar.classList.remove("is-hidden");
    }

    lastScrollY = y;
  }

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        onScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    toggle.classList.remove("is-active");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  if (toggle && mobileMenu) {
    toggle.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("is-open");
      toggle.classList.toggle("is-active", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("no-scroll", isOpen);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const linkMap = new Map();
  document.querySelectorAll(".navbar__links a").forEach(function (a) {
    linkMap.set(a.getAttribute("href").replace("#", ""), a);
  });

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          const link = linkMap.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            linkMap.forEach(function (l) { l.classList.remove("is-active"); });
            link.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 600);
    });
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
