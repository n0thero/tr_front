const parents = document.querySelectorAll('.progress-circle');

parents.forEach(parent => {
  const progress = parent.getAttribute('data-progress') || 0;
  const bar = parent.querySelector('.progress-circle__bar');

  if (!bar) return;

  const r = bar.getAttribute('r');
  const circumference = r * 2 * Math.PI;
  const currentPrgress = circumference - (progress * circumference / 100);

  bar.setAttribute('stroke-dasharray', circumference);
  bar.setAttribute('stroke-dashoffset', currentPrgress);
});
