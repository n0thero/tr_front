import lightGallery from 'lightgallery';
import lgZoom from 'lightgallery/plugins/zoom';

lightGallery(document.querySelector('.text-content'), {
  plugins: [lgZoom],
  speed: 300,
  selector: 'img',
  mobileSettings: {
    download: false,
  },
});

const textContentNodes = document.querySelectorAll('.text-content');

const addScrollTable = (parent) => {
  const tableNodes = parent.querySelectorAll('table');

  tableNodes.forEach((table) => {
    const wrapper = document.createElement('div')

    wrapper.classList.add('text-content__table');
    table.insertAdjacentElement('beforebegin', wrapper);
    wrapper.insertAdjacentElement('beforeend', table);
  });
};

textContentNodes.forEach((parent) => {
  addScrollTable(parent);
});
