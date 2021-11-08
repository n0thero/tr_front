import Toastify from 'toastify-js'
import { isUpdate } from '../notification-modal/notification-modal';
import { add as addEvent, eventTypes } from '../notification-modal/js/observer';

const breakpoint = window.matchMedia('(min-width: 1024px)');

const showNotification = (prevState, state) => {
  if (!breakpoint.matches || !state || isUpdate(prevState, state)) return;

  state.forEach(({text}) => {
    Toastify({
      avatar: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
      text,
      backgroundColor: 'white',
      className: 'toast-notification',
      close: true,
      position: 'right',
      gravity: 'bottom',
    }).showToast();
  });
};

addEvent(eventTypes.notifications, showNotification);

// const Toastify = window.Toastify;

// Toastify({
//   avatar: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
//   text: `Пример оповещения с изображением и текстом`,
//   backgroundColor: 'white',
//   className: 'toast-notification',
//   close: true,
//   position: 'right',
//   gravity: 'bottom',
// }).showToast();

// Toastify({
//   avatar: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
//   text: `Пример оповещения с изображением и
//   текстом, Пример оповещения с учётом 
//   изображения и текста, Пример
//   оповещения с изображением и текстом, Пример оповещения с учётом `,
//   backgroundColor: 'white',
//   className: 'toast-notification',
//   close: true,
//   position: 'right',
//   gravity: 'bottom',
// }).showToast();

// Toastify({
//   text: `Пример текста оповещения, пример, пример текста оповещения, пример, пример текста оповещения`,
//   backgroundColor: 'white',
//   className: 'toast-notification',
//   close: true,
//   position: 'right',
//   gravity: 'bottom',
// }).showToast();

// const wrapper = document.createElement('div');
// const html = `2 новых оповещения. <button class="toast-notification__show" data-bs-toggle="modal" data-bs-target="#notification-modal">Смотреть</button>`;

// wrapper.classList.add('toast-notification__inner');
// wrapper.insertAdjacentHTML('beforeend', html)

// Toastify({
//   node: wrapper,
//   backgroundColor: 'white',
//   className: 'toast-notification',
//   close: true,
//   position: 'right',
//   gravity: 'bottom',
// }).showToast();
