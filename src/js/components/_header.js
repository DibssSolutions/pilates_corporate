import { OPEN, ACTIVE, OVERFLOW_HIDDEN, BODY } from '../constants';

const burger = $('.js-toggle');
const header = $('.js-header');
burger.on('click', () => {
  if (header.hasClass(OPEN)) {
    header.removeClass(OPEN);
    BODY.removeClass(OVERFLOW_HIDDEN);
  } else {
    header.addClass(OPEN);
    BODY.addClass(OVERFLOW_HIDDEN);
  }
});

$(window).scroll(function() {
  const scroll = $(window).scrollTop();
  
  if (scroll > 0) header.addClass(ACTIVE);
  else header.removeClass(ACTIVE);
});
