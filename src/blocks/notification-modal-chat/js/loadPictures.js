let pictures = [];
const modalNode = document.querySelector('.notification-modal-chat');
const modalTopNode = document.querySelector('.notification-modal-chat__top');
const inputFileNode = document.querySelector('.notification-modal-chat__form-picture-input');

const templateImage = (file) => {
  const src = URL.createObjectURL(file);

  return (
  `
    <li class="notification-modal-chat__picture">
      <button
        class="notification-modal-chat__picture-btn"
        type="button"
        title="${file.name}"
      >
        <img
          class="notification-modal-chat__picture-img"
          src="${src}"
          alt=""
          width="64"
          height="64"
        >
      </button>
    </li>
  `
  );
};

const showPictures = () => {
  let list;

  if (modalNode.querySelector('.notification-modal-chat__pictures')) {
    list = modalNode.querySelector('.notification-modal-chat__pictures');
  } else {
    list = document.createElement('ul');

    list.classList.add('notification-modal-chat__pictures');
    modalTopNode.appendChild(list);
  }

  const html = pictures.map(templateImage).join('');

  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', html);
  
  const btnsRemove = modalNode.querySelectorAll('.notification-modal-chat__picture-btn');

  btnsRemove.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('title');

      pictures = pictures.filter(file => file.name !== name);

      if (pictures.length) {
        showPictures();
      } else {
        list.remove();
      }
    });
  });
};

const clearPictures = () => {
  const list = modalNode.querySelector('.notification-modal-chat__pictures');

  if (!list) return;

  pictures = [];
  list.remove();
};

const handlePicture = (event) => {
  const files = [...event.target.files];
  
  const newPictures = [];

  files.forEach(file => {
    if (pictures.some(picture => picture.name === file.name)) return;
    newPictures.push(file);
  });

  pictures = [...pictures, ...newPictures];

  pictures = pictures.slice(0, 10);

  event.target.value = '';

  showPictures();
};

if (modalNode && modalTopNode && inputFileNode) {
  inputFileNode.addEventListener('change', handlePicture);
}

export {
  pictures,
  clearPictures
};
