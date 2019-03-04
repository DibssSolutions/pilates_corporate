import { OPEN, ACTIVE, OVERFLOW_HIDDEN } from '../constants';

const burger = $('.js-toggle');
const header = $('.js-header');
burger.on('click', () => {
  if (header.hasClass(OPEN)) {
    header.removeClass(OPEN);
  } else {
    header.addClass(OPEN);
  }
});

$(window).scroll(function() {
  const scroll = $(window).scrollTop();
  
  if (scroll > 0) header.addClass(ACTIVE);
  else header.removeClass(ACTIVE);
});
