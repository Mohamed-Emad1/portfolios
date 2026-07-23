(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  const messages = {
    valueMissing: "هذا الحقل مطلوب",
    typeMismatch: "يرجى إدخال بريد إلكتروني صحيح"
  };

  function fieldError(input) {
    const wrapper = input.closest(".form-group");
    const errorEl = wrapper ? wrapper.querySelector(".form-error") : null;
    return { wrapper: wrapper, errorEl: errorEl };
  }

  function validateField(input) {
    const { wrapper, errorEl } = fieldError(input);
    if (!wrapper) return true;

    input.checkValidity();
    const valid = input.validity.valid;

    wrapper.classList.toggle("has-error", !valid);
    if (errorEl) {
      if (input.validity.valueMissing) errorEl.textContent = messages.valueMissing;
      else if (input.validity.typeMismatch) errorEl.textContent = messages.typeMismatch;
      else errorEl.textContent = "";
    }
    return valid;
  }

  form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
    input.addEventListener("blur", function () { validateField(input); });
    input.addEventListener("input", function () {
      if (input.closest(".form-group").classList.contains("has-error")) {
        validateField(input);
      }
    });
  });

  function showStatus(type, message) {
    statusEl.textContent = message;
    statusEl.className = "form-status is-" + type;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let allValid = true;
    form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
      if (!validateField(input)) allValid = false;
    });

    statusEl.className = "form-status";
    statusEl.textContent = "";

    if (!allValid) {
      showStatus("error", "يرجى تعبئة الحقول المطلوبة بشكل صحيح.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add("is-loading");

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.classList.remove("is-loading");
      showStatus("success", "تم إرسال رسالتك بنجاح! سأتواصل معك في أقرب وقت.");
      form.reset();
    }, 1400);
  });
})();
