const fieldFiles = document.querySelectorAll('.field-file');
let files = [];

function templateItem({name}) {
  return (
    `
      <li class="field-file__item" title="${name}">
        <svg class="field-file__item-icon icon" width="32" height="32">
          <use xlink:href="img/svg/symbol/sprite.svg#file-text"></use>
        </svg>
        <button class="field-file__remove" type="button" aria-label="Удалить">
          <svg class="field-file__remove-icon icon" width="22" height="22">
            <use xlink:href="img/svg/symbol/sprite.svg#plus-circle"></use>
          </svg>
        </button>
      </li>
    `
  );
}

function showFiles(parent) {
  let list;

  if (parent.querySelector('.field-file__list')) {
    list = parent.querySelector('.field-file__list');
  } else {
    list = document.createElement('ul');

    list.classList.add('field-file__list');
    parent.appendChild(list);
  }

  const html = files.map(templateItem).join('');

  list.innerHTML = '';
  list.insertAdjacentHTML('beforeend', html);
  
  const btnsRemove = parent.querySelectorAll('.field-file__remove');

  btnsRemove.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.parentElement.getAttribute('title');

      files = files.filter(file => file.name !== name);

      if (files.length) {
        showFiles(parent);
      } else {
        list.remove();
      }
    });
  });
}

function handleFile(event) {
  const inputFiles = [...event.target.files];
  
  const newFiles = [];

  inputFiles.forEach(inputFile => {
    if (files.some(file => file.name === inputFile.name)) return;
    newFiles.push(inputFile);
  });

  files = [...files, ...newFiles];

  files = files.slice(0, 10);

  event.target.value = '';
  const parent = event.target.parentElement;

  showFiles(parent);

  const form = event.target.form;
  if (!form) return;

  const formData = new FormData(form);
  formData.set('files', files);

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    fetch(form.action, {
      method: 'POST',
      body: formData,
    })
    .finally(() => {
      document.location.reload();
    });
  });
}

fieldFiles.forEach(function(parent) {
  const input = parent.querySelector('.field-file__control');

  if (!input) return;

  input.addEventListener('change', handleFile);
});
