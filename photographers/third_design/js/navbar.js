(function () {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const menuClose = document.getElementById("menuClose");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const sections = document.querySelectorAll("main section[id]");

  let lastScrollY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    if (y > 60) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    if (y > lastScrollY && y > 200) navbar.classList.add("nav-hidden");
    else navbar.classList.remove("nav-hidden");

    lastScrollY = y;

    let currentId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });

    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  function openMenu() {
    mobileMenu.classList.add("open");
    document.body.classList.add("no-scroll");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) closeMenu();
  });
})();
