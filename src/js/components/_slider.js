import slick from 'slick-carousel';
import { mediaWidth } from '../utils';

import {
  BODY,
  DOC,
  WIN,
  INIT,
  widthMD,
  widthSM,
  WIN_WIDTH
} from '../constants';

const heroSlider = $('.js-hero-slider');
const duration = heroSlider.data('duration');
// console.log(dots);
// dots.css('animation-duration',duration);

heroSlider.each((i, el) => {
  let slider = $(el);
  let sliderParent = slider.parents('.js-hero-slider-wrap');
  slider.on('init', () => {
    sliderParent.addClass(INIT);
    let dots = slider.find('.js-dot svg circle');
    $(dots[0]).css('animation-duration', (duration + 'ms'));
    // console.log(dots);
    // dots.each((i, el) => {
    //   $(el).css('animation-duration', duration);
    //   console.log($(el).css('animation-duration'));
    //   });
    //   console.log(duration);
  });
  //   });
  slider.on('beforeChange', (event,slick, currentSlide, nextSlide) => {
    let dots = slider.find('.js-dot svg circle');
    dots.each((i, el) => {
      $(el).css('animation-duration', '.8s');
    });
    const dot = dots[nextSlide];
    $(dot).css('animation-duration', (duration + 'ms'));
  });
  slider.slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: duration,
    customPaging: (slider, pageIndex) => {
      let index;
      if (pageIndex < 9) {
        index = '0' + (pageIndex + 1);
      }
      else 
      { 
        index = pageIndex + 1;
      }
          
      // console.log(index);
      return $(`<button class="hero-slider__dot js-dot">${index}
        <svg width="34px" height="34px" viewBox="0 0 34 34" version="1.1" xmlns="http://www.w3.org/2000/svg"> 
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <circle stroke-width="2" cx="17" cy="17" r="16"></circle>
            </g>
        </svg>
        </button>`);
    }
  });
});

// 									testimonial slider

const testimonialSlider = $('.js-small-slider');
const options = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  dots: true,
  arrows: false,
  customPaging: (slider, pageIndex) => {
    return $('<button class="small__dot"></button>');
  },
  dotsClass: 'small-dots'
};

const detectWindowWidth = () => {
  const initSlider = $('.js-small-slider.slick-slider');
  if (mediaWidth(767)) {
    if (initSlider.length) return;
	   testimonialSlider.slick(options);
  }
  else {
    if (!initSlider.length) return;
    testimonialSlider.slick('unslick');
  }
}; 
detectWindowWidth();

let timeout;

WIN.resize(() => {
  clearTimeout(timeout);
  timeout = setTimeout(detectWindowWidth, 100);
});
