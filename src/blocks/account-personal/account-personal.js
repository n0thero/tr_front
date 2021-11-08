import './js/datepicker';
import '../warning-modal/warning-modal';
import './js/avatar';

const formsNode = document.querySelectorAll('.account-personal__form');

// success || danger
function showStatus(form, type, text) {
  let timeoutId;
  const timeoutDelay = 3000;

  const status = form.querySelectorAll('.account-personal__form-status');
  const currentStatus = form.querySelector(`.account-personal__form-status_${type}`);

  if (!currentStatus) return;

  const descriptionNode = currentStatus.querySelector('.account-personal__form-status-desc');
  if (descriptionNode && text) {
    descriptionNode.textContent = text;
  }

  status.forEach(s => s.classList.remove('account-personal__form-status_active'));
  currentStatus.classList.add('account-personal__form-status_active');

  clearInterval(timeoutId);
  timeoutId = setTimeout(() => {
    currentStatus.classList.remove('account-personal__form-status_active');
  }, timeoutDelay);
}

function handleSubmitForm(event) {
  event.preventDefault();
  event.stopPropagation();

  const form = event.currentTarget;
  const submitNode = form.querySelector('[type="submit"]');

  if (form['password'] && form['password_new']) {
    if (form['password'].value !== form['password_new'].value) {
      form['password'].classList.add('field__control_type_error');
      form['password_new'].classList.add('field__control_type_error');

      showStatus(form, 'danger', 'Пароли не соответствуют');
      return;
    } else {
      form['password'].classList.remove('field__control_type_error');
      form['password_new'].classList.remove('field__control_type_error');
    }
  }

  if (form.checkValidity()) {
    const formData = new FormData(form);

    submitNode.disabled = true;

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        showStatus(form, 'success');

        for (let i = 0; i < form.elements.length; i++) {
          form.elements[i].classList.remove('field__control_type_error');
        }
      } else if (data.status === 'failed') {
        showStatus(form, 'danger', data?.error?.message);

        if (data?.error?.field_names) {
          data.error.field_names.forEach((name) => {
            if (form[name]) form[name].classList.add('field__control_type_error');
          });
        }
      } else {
        alert('Что-то пошло не так, попробуйте отправить позднее');
      }
    })
    .catch(() => {
      alert('Что-то пошло не так, попробуйте отправить позднее');
    })
    .finally(() => {
      submitNode.disabled = false;
      form.classList.remove('was-validated');
    });
  } else {
    form.classList.add('was-validated');
  }
}

formsNode.forEach((form) => {
  form.addEventListener('submit', handleSubmitForm);
});
