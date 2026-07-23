(function () {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("navMobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");

  let lastScroll = 0;

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function onScroll() {
    const current = window.scrollY;

    navbar.classList.toggle("scrolled", current > 40);

    if (current > lastScroll && current > 200) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
    lastScroll = current;
  }

  window.addEventListener("scroll", debounce(onScroll, 10));

  function closeMobileMenu() {
    mobileMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  navToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", debounce(() => {
    if (window.innerWidth > 992) closeMobileMenu();
  }, 150));

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
  }
})();
