if (!window.pageData) window.pageData = {};
if (!window.pageData?.user_code) window.pageData.user_code = 8888_8888;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('webinar-player')) {
    window.webinarPlayer = new WebinarPlayer().init();
  }

  if (window.videojs) {
    initPlayer();
  }
});

function initPlayer() {
  const options = {
    controls: true,
    playbackRates: [0.5, 1, 1.5, 2],
  };

  const player = window.videojs('webinar-player', options, function() {
    const player = this;
    player.controlBar.addChild('QualitySelector');
  });

  document.addEventListener('click', handleSpecialId);
  document.addEventListener('keydown', handleKey);

  function togglePlay() {
    if (player.paused()) {
      player.play();
    } else {
      player.pause();
    }
  }

  function handleSpecialId(event) {
    if (event.target.closest('.webinar-video__player-video-special-id')) {
      togglePlay();
    }
  }

  function handleKey(event) {
    if (event.key === ' ') {
      event.preventDefault();
      togglePlay();
    }

    if (event.key === 'ArrowRight') {
      player.currentTime(player.currentTime() + 10);
    }

    if (event.key === 'ArrowLeft') {
      player.currentTime(player.currentTime() - 10);
    }
  }
}

function WebinarPlayer() {
  this.init = function () {
    this.initState();
    this.bindPageVariables();
    this.bindListeners();

    return this;
  }

  this.initState = function () {
    this.state = {
      play: false
    }
  }

  this.bindPageVariables = function () {
    this.page = {
      wrap: document.getElementById('webinar-player-wrap'),
      player: document.getElementById('webinar-player'),
    }
  }

  this.bindListeners = function () {

    this.videoInitCheck_interval = setInterval(_ => {
      if (document.querySelector('.vjs-poster')) {
        clearInterval(this.videoInitCheck_interval);
        this.appendWaterMark();
      }
    }, 100);

    setInterval(_ => this.moveWaterMarks(), 6000)
  }

  this.moveWaterMarks = function () {

    let wrap = document.querySelector('.webinar-video__player-video-special-id');

    if (!wrap) {
      return null;
    }

    let position = +(wrap.dataset.position),
      parts = [
        document.querySelector('.webinar-video__player-video-special-id .x-part-1'),
        document.querySelector('.webinar-video__player-video-special-id .x-part-2'),
        document.querySelector('.webinar-video__player-video-special-id .x-part-3')
      ];

    switch (position) {

      case 1:
        parts[0].style.top = '20%';
        parts[0].style.right = '40%';

        parts[1].style.top = '60%';
        parts[1].style.left = '10%';

        parts[2].style.bottom = '30%';
        parts[2].style.right = '20%';
        break;

      case 2:
        parts[0].style.top = '10%';
        parts[0].style.right = '60%';

        parts[1].style.top = '70%';
        parts[1].style.left = '40%';

        parts[2].style.bottom = '70%';
        parts[2].style.right = '65%';
        break;

      case 3:
      default:
        parts[0].style.top = '10%';
        parts[0].style.right = '20%';

        parts[1].style.top = '40%';
        parts[1].style.left = '20%';

        parts[2].style.bottom = '19%';
        parts[2].style.right = '30%';
    }

    let new_position = position === 3
        ? 1
        : position + 1;

    wrap.dataset.position = new_position;
  }

  this.appendWaterMark = function () {

    let watermark_element =
      '<div class="webinar-video__player-video-special-id" data-position="1">' +
      '<div class="x-part-1">' + window.pageData.user_code + '</div>' +
      '<div class="x-part-2">' + window.pageData.user_code + '</div>' +
      '<div class="x-part-3">' + window.pageData.user_code + '</div>' +
      '</div>';

    document.querySelector('.vjs-poster').insertAdjacentHTML('afterend', watermark_element);
  }
}
