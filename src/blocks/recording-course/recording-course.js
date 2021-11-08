const parent = document.querySelector('.recording-course');

if (parent) {
  const inputs = parent.querySelectorAll('.recording-course__toggle-input');
  const prices = parent.querySelectorAll('.recording-course__price');
  const buttonPrev = parent.querySelector('.recording-course__controls-prev');
  const buttonNext = parent.querySelector('.recording-course__controls-next');
  const tariff = parent.querySelector('form [name="tariff"]');

  let index = 0;
  
  function handleButton() {
    index++;
  
    const currentIndex = index % 2;
  
    inputs.forEach(function(input) {
      input.checked = false;
    });
  
    inputs[currentIndex].checked = true;
  
    prices.forEach(function(price) {
      price.classList.remove('recording-course__price_active');
    });
  
    prices[currentIndex].classList.add('recording-course__price_active');

    tariff.value = inputs[currentIndex].value;
  }
  
  if (inputs && prices && buttonPrev && buttonNext) {
    inputs.forEach(function(input, i) {
      input.addEventListener('change', function() {
        index = 1 - i;
        handleButton();
      });
    });
  
    buttonPrev.addEventListener('click', handleButton);
    buttonNext.addEventListener('click', handleButton);
  }
}
