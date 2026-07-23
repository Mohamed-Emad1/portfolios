/* Navbar: sticky blur, hide-on-scroll-down/show-on-scroll-up, active link, mobile menu */
(function () {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-menu__link");
  const mobileLinks = document.querySelectorAll(".mobile-menu__link");
  const sections = document.querySelectorAll("main section[id]");

  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    navbar.classList.toggle("is-scrolled", y > 40);

    if (y > lastScrollY && y > 160 && !mobileMenu.classList.contains("is-open")) {
      navbar.classList.add("is-hidden");
    } else {
      navbar.classList.remove("is-hidden");
    }
    lastScrollY = y;

    let currentId = "home";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  function toggleMobileMenu(forceClose) {
    const shouldOpen = forceClose === false ? false : !mobileMenu.classList.contains("is-open");
    mobileMenu.classList.toggle("is-open", shouldOpen);
    hamburger.classList.toggle("is-active", shouldOpen);
    hamburger.setAttribute("aria-expanded", String(shouldOpen));
    mobileMenu.setAttribute("aria-hidden", String(!shouldOpen));
    document.body.classList.toggle("no-scroll", shouldOpen);
  }

  hamburger.addEventListener("click", () => toggleMobileMenu());

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => toggleMobileMenu(false));
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      toggleMobileMenu(false);
    }
  });

  onScroll();
})();
