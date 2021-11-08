const inputFile = document.querySelector('.account-personal__avatar-input');
const img = document.querySelector('.account-personal__avatar-img');

function handleChangeFile(event) {
  const file = event.target.files[0];
  img.src = URL.createObjectURL(file);
}

if (inputFile && img) {
  inputFile.addEventListener('change', handleChangeFile);
}
