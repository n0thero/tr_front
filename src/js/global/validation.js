const forms = document.querySelectorAll('.needs-validation');

forms.forEach(function (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          const message = form.querySelector('.form-message');

          if (!message) {
            alert('Спасибо за вашу заявку, с вами скоро свяжется наш оператор');
            return;
          }

          message.style.minHeight = message.offsetHeight + 'px';
          message.innerHTML = '<p class="form-message__text">Спасибо за вашу заявку, с вами скоро свяжется наш оператор</p>';
        } else {
          alert('Что-то пошло не так, попробуйте отправить позднее');
        }
      })
      .catch(() => {
        alert('Что-то пошло не так, попробуйте отправить позднее');
      });
    } else {
      form.classList.add('was-validated');
    }
  }, false)
});
