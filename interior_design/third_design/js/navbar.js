/* Navbar: sticky/blur/shrink on scroll, active-section highlight, mobile menu */
(function () {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  const sections = document.querySelectorAll("main section[id]");

  function onScroll() {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function toggleMenu(open) {
    const isOpen = open ?? !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  hamburger.addEventListener("click", () => toggleMenu());
  mobileLinks.forEach((link) => link.addEventListener("click", () => toggleMenu(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) toggleMenu(false);
  });

  if ("IntersectionObserver" in window && sections.length) {
    const byId = (id) =>
      document.querySelector(`.nav-links a[href="#${id}"]`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = byId(entry.target.id);
          if (!link) return;
          navLinks.forEach((a) => a.classList.remove("active"));
          link.classList.add("active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
