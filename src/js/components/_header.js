import { OPEN, ACTIVE, OVERFLOW_HIDDEN } from '../constants';

const burger = $('.js-toggle');
burger.on('click', () => {
  const header = $('.js-header');
  if (header.hasClass(OPEN)) {
    header.removeClass(OPEN);
  } else {
    header.addClass(OPEN);
  }
});
