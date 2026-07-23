/* Main coordinator: FAQ accordion + contact form
   (navbar.js, animations.js, counters.js, gallery.js, lightbox.js,
   slider.js, video.js, cursor.js load independently before this file) */
(function () {
  /* ---------- FAQ Accordion ---------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      faqItems.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* ---------- Contact Form ---------- */
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const submitText = document.getElementById("submitText");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function validateField(field) {
    const wrapper = field.closest(".form-field");
    let valid = field.checkValidity();

    if (field.type === "email" && field.value) {
      valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    }
    if (field.type === "tel" && field.value) {
      valid = /^[0-9+\s-]{7,}$/.test(field.value);
    }

    wrapper.classList.toggle("has-error", !valid);
    return valid;
  }

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = [...form.querySelectorAll("input[required], select[required], textarea[required]")];
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      showToast("الرجاء تصحيح الحقول المميزة قبل الإرسال");
      return;
    }

    const submitBtn = form.querySelector(".form-submit");
    submitBtn.disabled = true;
    submitText.textContent = "جاري الإرسال...";

    setTimeout(() => {
      submitText.textContent = "تم الإرسال بنجاح";
      showToast("شكراً لتواصلكم معنا، سنرد عليكم قريباً");
      form.reset();
      setTimeout(() => {
        submitText.textContent = "إرسال الطلب";
        submitBtn.disabled = false;
      }, 2000);
    }, 1200);
  });

  form?.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => {
      if (field.hasAttribute("required")) validateField(field);
    });
  });
})();
