import tippy from 'tippy.js';

const tippyNodes = document.querySelectorAll('.header-main__menu-tippy');
const options = {
  content(reference) {
    const template = reference.nextElementSibling;
    if (!template) return null;
    return template.innerHTML;
  },
  placement: 'left-end',
  interactive: true,
  interactiveDebounce: 50,
  offset: [0, 8],
  appendTo: 'parent',
  popperOptions: { positionFixed: true },
  arrow: false,
  allowHTML: true,
};

tippyNodes.forEach((menu) => {
  const parent = menu.parentElement;
  const linkNode = parent.querySelector('.header-main__menu-link');

  if (!linkNode) return;

  tippy(linkNode, options);
});
