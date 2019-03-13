import {  ACTIVE } from '../constants';

const drop = $('.js-dropdown');
drop.each(function() {
  const this_ = $(this);
  var dropIcon = this_.find('.js-dropdown-icon');
  var dropText = this_.find('.js-dropdown-text');
  var dropTrigger = this_.find('.js-dropdown-trigger');
  dropTrigger.on('click', () => {
    dropText.slideToggle('300');
    dropIcon.toggleClass(ACTIVE);
  });
});
