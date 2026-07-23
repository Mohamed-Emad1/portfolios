(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const toast = document.getElementById('toast');
  const submitBtn = form.querySelector('.form-submit');

  const validators = {
    name: (v) => v.trim().length >= 2,
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone: (v) => /^[0-9+\s-]{7,15}$/.test(v),
    caseType: (v) => v.trim().length > 0,
    message: (v) => v.trim().length >= 5,
  };

  function validateField(field) {
    const group = field.closest('.form-group');
    const validator = validators[field.name];
    const isValid = validator ? validator(field.value) : true;
    group.classList.toggle('has-error', !isValid);
    return isValid;
  }

  Object.keys(validators).forEach((name) => {
    const field = form.elements[name];
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  function showToast() {
    if (!toast) return;
    toast.classList.add('is-visible');
    setTimeout(() => toast.classList.remove('is-visible'), 4000);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let allValid = true;
    Object.keys(validators).forEach((name) => {
      const field = form.elements[name];
      if (field && !validateField(field)) allValid = false;
    });

    if (!allValid) return;

    submitBtn.classList.add('is-loading');

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      form.reset();
      showToast();
    }, 1400);
  });
})();
