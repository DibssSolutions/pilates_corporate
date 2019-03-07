import fancybox from '@fancyapps/fancybox';

let fancy = $('.js-fancybox');

fancy.fancybox({
  protect 		  : true,
  keyboard        : true,
  animationEffect : 'zoom',
  arrows          : true,
  clickContent    : false,
  buttons: [
    // "zoom",
    //"share",
    // "slideShow",
    //"fullScreen",
    //"download",
    // "thumbs",
    'close'
  ],
});
