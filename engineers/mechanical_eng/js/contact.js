function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 3500);
}

function validateField(field) {
  const group = field.closest('.form-group');
  const errorEl = group ? group.querySelector('.form-error') : null;
  let message = '';

  if (field.required && !field.value.trim()) {
    message = 'هذا الحقل مطلوب';
  } else if (field.type === 'email' && field.value.trim()) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(field.value.trim())) message = 'يرجى إدخال بريد إلكتروني صحيح';
  }

  if (group) group.classList.toggle('invalid', Boolean(message));
  if (errorEl) errorEl.textContent = message;
  return !message;
}

export function init() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const requiredFields = form.querySelectorAll('[required]');
  requiredFields.forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    requiredFields.forEach((field) => {
      if (!validateField(field)) valid = false;
    });
    if (!valid) return;

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.classList.add('is-loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      submitBtn.disabled = false;
      showToast('تم إرسال طلبك بنجاح، سيتم التواصل معك قريبًا.');
      form.reset();
    }, 1200);
  });
}
