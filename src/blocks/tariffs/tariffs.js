const links = document.querySelectorAll('.tariffs .tariff__signup');

function handleLink() {
  const id = this.getAttribute('data-tariff');
  const recordingTariff = document.querySelector(`.recording-course #${id}`);

  if (!recordingTariff) return;

  recordingTariff.click();
}

links.forEach(link => link.addEventListener('click', handleLink));
