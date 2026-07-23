/* Main coordinator — FAQ accordion, contact form validation, video trigger */
(function () {
  /* FAQ accordion — only one item open at a time */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("is-open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* Contact form validation */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmit");

  if (form) {
    const validators = {
      name: (v) => v.trim().length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      phone: (v) => /^[0-9+\s-]{7,}$/.test(v),
      message: (v) => v.trim().length >= 5,
    };

    function validateField(field) {
      const validator = validators[field.name];
      if (!validator) return true;

      const group = field.closest(".form-group");
      const valid = validator(field.value);
      group.classList.toggle("has-error", !valid);
      return valid;
    }

    Object.keys(validators).forEach((fieldName) => {
      const field = form.elements.namedItem(fieldName);
      field?.addEventListener("blur", () => validateField(field));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const requiredFields = Object.keys(validators).map((name) => form.elements.namedItem(name));
      const allValid = requiredFields.map((field) => validateField(field)).every(Boolean);

      if (!allValid) {
        status.textContent = "برجاء تصحيح الحقول المميزة أعلاه.";
        status.className = "form-status is-error";
        return;
      }

      submitBtn.classList.add("is-loading");
      submitBtn.textContent = "جارٍ الإرسال...";
      status.textContent = "";
      status.className = "form-status";

      window.setTimeout(() => {
        submitBtn.classList.remove("is-loading");
        submitBtn.textContent = "إرسال الطلب";
        status.textContent = "تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.";
        status.className = "form-status is-success";
        form.reset();
      }, 1400);
    });
  }

  /* Video showreel trigger — placeholder alert (no external video source provided) */
  const videoTrigger = document.querySelector("[data-video-trigger]");
  videoTrigger?.addEventListener("click", () => {
    window.alert("سيتم إضافة الفيديو التعريفي قريبًا.");
  });
})();
