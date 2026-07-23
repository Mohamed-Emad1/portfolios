(function () {
  'use strict';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const toastContainer = document.getElementById('toastContainer');

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    if (type === 'error') {
      toast.style.borderInlineStartColor = '#e05c5c';
    }
    toast.innerHTML = `
      <svg width="20" height="20"><use href="#icon-${type === 'success' ? 'check' : 'close'}"></use></svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;

    let valid = true;
    if (field.hasAttribute('required') && !field.value.trim()) {
      valid = false;
    }
    if (field.type === 'email' && field.value.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(field.value.trim())) valid = false;
    }

    group.classList.toggle('error', !valid);
    return valid;
  }

  form.querySelectorAll('input, textarea').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group')?.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input[required], textarea[required], input[type="email"]');
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      showToast('يرجى تعبئة الحقول المطلوبة بشكل صحيح', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const label = submitBtn.querySelector('.btn-label');
    const originalText = label.textContent;

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    label.textContent = 'جارٍ الإرسال...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      label.textContent = originalText;
      form.reset();
      showToast('تم إرسال رسالتك بنجاح، سأتواصل معك قريبًا.');
    }, 1400);
  });
})();
