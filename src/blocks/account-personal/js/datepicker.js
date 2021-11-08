import Pikaday from 'pikaday';

new Pikaday({
  field: document.getElementById('birthday'),
  format: 'DD.MM.YYYY',
  firstDay: 1,
  toString(date, format) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${('0' + day).slice(-2)}.${('0' + month).slice(-2)}.${year}`;
  },
  parse(dateString, format) {
    const parts = dateString.split('.');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  },
  i18n: {
    previousMonth : 'Прошлый месяц',
    nextMonth     : 'Следующий месяц',
    months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    weekdays      : ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
    weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
  },
});
