import { noticeOn, noticeOff } from '../event-card/event-card';

const PARENT_CLASS_NAME = 'events-calendar';
const MONTH_CLASS_NAME = 'events-calendar__month';
const LIST_CLASS_NAME = 'events-calendar__current-list';
const BTN_CLASS_NAME = 'events-calendar__month-day-btn';
const BTN_ACTIVE_CLASS_NAME = 'events-calendar__month-day-btn_active';
const TITLE_CLASS_NAME = 'events-calendar__current-title';

const months = document.querySelectorAll(`.${MONTH_CLASS_NAME}`);
const data = window.pageData?.calendar_page || {};
let currentDate = data.current;

function templateCard({
  type = {},
  status = '',
  title = '',
  time = {},
  desc = '',
  id = '',
  value = false,
}) {
  const noticeBtn = `
    <button
      class="event-card__notice${value ? ' event-card__notice_active' : ''}"
      type="button" aria-label="${value ? noticeOn : noticeOff}"
      data-id=${id}
    >
      <svg class="event-card__notice-icon icon" width="20" height="20">
        <use xlink:href="img/svg/symbol/sprite.svg#bell"></use>
      </svg>
    </button>
  `;
  const typeColor = type.color ? ` event-card__type_color_${type.color}` : '';
  const timeEnd = time.end
    ? (`
      <span class="event-card__time-divider">-</span>
      <span class="event-card__time-end">${time.end}</span>
      `)
    : '';

  return (
    `
      <article class="event-card">
        ${status ? '' : noticeBtn}
        <header class="event-card__header">
          <p class="event-card__type${typeColor}">
            ${type.text || ''}
          </p>
          ${status ? `<p class="event-card__status">${status}</p>` : ''}
        </header>
        <h4 class="event-card__title">${title}</h4>
        <p class="event-card__time">
          <span class="event-card__time-start">${time.start || ''}</span>
          ${timeEnd}
          <span class="event-card__time-zone">по МСК</span>
        </p>
        ${desc ? `<p class="event-card__desc">${desc}</p>` : ''}
      </article>
    `
  );
}

function getDate(str) {
  const date = new Date(str);
  const week = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  return `${date.getDate()} ${months[date.getMonth()]}, ${week[date.getDay()]}`;
}

function showTitle() {
  const title = document.querySelector(`.${PARENT_CLASS_NAME} .${TITLE_CLASS_NAME}`);

  if (!title || !currentDate) return;

  title.textContent = getDate(currentDate);
}

function showEvents() {
  const list = document.querySelector(`.${PARENT_CLASS_NAME} .${LIST_CLASS_NAME}`);

  if (!list || !data[currentDate]) return;

  list.innerHTML = '';

  data[currentDate].forEach(itemData => {
    list.insertAdjacentHTML('beforeend', templateCard(itemData))
  });
}

function handleBtn(event) {
  const target = event.target;

  if (target.closest(`.${BTN_CLASS_NAME}`)) {
    if (event.target.classList.contains(BTN_ACTIVE_CLASS_NAME)) return;
    const btns = document.querySelectorAll(`.${PARENT_CLASS_NAME} .${BTN_CLASS_NAME}`);

    btns.forEach(btn => btn.classList.remove(BTN_ACTIVE_CLASS_NAME));
    event.target.classList.add(BTN_ACTIVE_CLASS_NAME);

    const date = event.target.getAttribute('data-date');
    currentDate = date;

    showTitle();
    showEvents();
  }
}

showTitle();
showEvents();

months.forEach(month => {
  month.addEventListener('click', handleBtn);
});
