(function () {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("contactSubmit");
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message, type) {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function setFieldError(field, hasError) {
    field.closest(".form-group").classList.toggle("error", hasError);
  }

  function validate() {
    let valid = true;
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameValid = name.value.trim().length > 1;
    setFieldError(name, !nameValid);
    if (!nameValid) valid = false;

    const emailValid = emailPattern.test(email.value.trim());
    setFieldError(email, !emailValid);
    if (!emailValid) valid = false;

    const messageValid = message.value.trim().length > 5;
    setFieldError(message, !messageValid);
    if (!messageValid) valid = false;

    return valid;
  }

  ["name", "email", "message"].forEach((id) => {
    const field = form.querySelector(`#${id}`);
    field.addEventListener("input", () => setFieldError(field, false));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("الرجاء تصحيح الحقول المطلوبة", "error");
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> جاري الإرسال...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showToast("تم إرسال رسالتك بنجاح، سأتواصل معك قريباً", "success");
      form.reset();
    }, 1400);
  });
})();
