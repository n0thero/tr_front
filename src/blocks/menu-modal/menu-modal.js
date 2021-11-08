const buttonNodes = document.querySelectorAll('.menu-modal__menu-link[type="button"]');

const handleButton = (event) => {
  const button = event.currentTarget;
  const siblingNode = button.nextElementSibling;

  if (!siblingNode) return;
  if (!siblingNode.classList.contains('menu-modal__chapters')) return;

  siblingNode.classList.add('menu-modal__chapters_active');

  const backNode = siblingNode.querySelector('.menu-modal__back');
  
  if (!backNode) return;

  backNode.addEventListener('click', () => {
    siblingNode.classList.remove('menu-modal__chapters_active');
  })
};

buttonNodes.forEach((button) => button.addEventListener('click', handleButton));
