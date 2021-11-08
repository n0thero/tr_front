const wrapperNode = document.querySelector('.header-main-wrapper');
const headerNodes = document.querySelectorAll('.header-main');

if (wrapperNode && headerNodes.length) {
  let cookieLoggedValue = document.cookie
    .split('; ')
    .find(function(row) {return row.startsWith('wordpress_logged_in_')});
  cookieLoggedValue = cookieLoggedValue ? cookieLoggedValue.split('=')[1] : undefined;

  if (cookieLoggedValue === undefined) {
    headerNodes[0].style.display = 'block';
  } else {
    headerNodes[1].style.display = 'block';
  }

  function showContent(content, type) {
    const dataType = content.getAttribute('data-content-type');
    if (dataType === type) {
      content.removeAttribute('data-content-type');
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const contentNodes = document.querySelectorAll('[data-content-type]');

    if (cookieLoggedValue === undefined) {
      contentNodes.forEach(function(content) {showContent(content, 'main')});
    } else {
      contentNodes.forEach(function(content) {showContent(content, 'admin')});
    }
  });
}
