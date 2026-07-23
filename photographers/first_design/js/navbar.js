/* ==========================================================================
   Navbar — sticky blur, hide-on-scroll-down, active section highlight,
   mobile fullscreen menu
   ========================================================================== */
(function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("main section[id]");

  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function debounce(fn, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function onScroll() {
    const currentY = window.scrollY;

    navbar.classList.toggle("navbar--scrolled", currentY > 60);

    if (currentY > lastScrollY && currentY > 200) {
      navbar.classList.add("navbar--hidden");
    } else {
      navbar.classList.remove("navbar--hidden");
    }
    lastScrollY = currentY;

    let activeId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom >= 140) {
        activeId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isMatch && link.classList.contains("navbar__link"));
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  window.addEventListener("resize", debounce(onScroll, 150));

  onScroll();

  function openMobileMenu() {
    mobileMenu.classList.add("is-open");
    navToggle.classList.add("is-active");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }

  navToggle?.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("is-open");
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("is-open")) closeMobileMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();
    }
  });
})();
