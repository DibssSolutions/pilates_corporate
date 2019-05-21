import { BODY, ACTIVE, OPEN } from '../constants';

const drop = $('.js-dropdown');
drop.each(function() {
  const this_ = $(this);
  var dropIcon = this_.find('.js-dropdown-icon');
  var dropText = this_.find('.js-dropdown-text');
  var dropTrigger = this_.find('.js-dropdown-trigger');
  dropTrigger.on('click', (e) => {
  	e.preventDefault();
  	if (!dropTrigger.hasClass(OPEN)) {
  		dropText.slideDown('300');
  		dropIcon.addClass(ACTIVE);
  		dropTrigger.addClass(OPEN);
  	}
  	else {
  		dropText.slideUp('300');
  		dropIcon.removeClass(ACTIVE);
  		dropTrigger.removeClass(OPEN);
  	}
  });
});

BODY.on('click', e => {
  if (
    $(e.target).closest('.js-dropdown-icon').length ||
    $(e.target).closest('.js-dropdown-text').length ||
    $(e.target).closest('.js-dropdown-trigger').length
  )
    return;
  $('.js-dropdown-text').slideUp('300');
  $('.js-dropdown-icon').removeClass(ACTIVE);
  $('.js-dropdown-trigger').removeClass(OPEN);
});

