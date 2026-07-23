/* Coordinates: project filtering, FAQ accordion, contact form, back-to-top, ripple */
(function () {
  /* --- Project filtering --- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll("#projects-gallery .project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;
      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* --- FAQ accordion (only one open) --- */
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      accordionItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".accordion-header").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        header.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* --- Toast --- */
  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  /* --- Contact form validation + fake submit --- */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9+\s-]{7,}$/;

    function validateField(field) {
      const group = field.closest(".form-group");
      let valid = field.checkValidity();
      if (valid && field.type === "email") valid = emailPattern.test(field.value);
      if (valid && field.type === "tel") valid = phonePattern.test(field.value);
      group.classList.toggle("invalid", !valid);
      return valid;
    }

    contactForm.querySelectorAll(".form-control").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
    });

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fields = Array.from(contactForm.querySelectorAll(".form-control"));
      const allValid = fields.map(validateField).every(Boolean);
      if (!allValid) {
        showToast("يرجى تصحيح الحقول المطلوبة");
        return;
      }

      const submitBtn = contactForm.querySelector(".btn-submit");
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        contactForm.reset();
        showToast("تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا");
      }, 1400);
    });
  }

  /* --- Newsletter form (fake success) --- */
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast("تم اشتراكك في النشرة البريدية بنجاح");
    });
  }

  /* --- Back to top --- */
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => backToTop.classList.toggle("show", window.scrollY > 600),
      { passive: true }
    );
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --- Ripple buttons --- */
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });
})();
