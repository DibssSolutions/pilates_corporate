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
const speed = 800;
let durationSpeed = duration;
heroSlider.each((i, el) => {
  let slider = $(el);
  let sliderParent = slider.parents('.js-hero-slider-wrap');
  slider.on('init', () => {
    sliderParent.addClass(INIT);
    let dots = slider.find('.js-dot svg circle');
    $(dots[0]).css('animation-duration', durationSpeed + 'ms');
    durationSpeed = duration + speed;
  });
  slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    let dots = slider.find('.js-dot svg circle');
    dots.removeAttr('style');
    const dot = dots[nextSlide];
    $(dot).css('animation-duration', durationSpeed + 'ms');
  });
  slider.slick({
    dots: true,
    arrows: false,
    infinite: true,
    speed: speed,
    slidesToShow: 1,
    pauseOnHover: false,
    pauseOnFocus: false,
    autoplay: true,
    autoplaySpeed: duration,
    customPaging: (slider, pageIndex) => {
      let index;
      if (pageIndex < 9) {
        index = '0' + (pageIndex + 1);
      } else {
        index = pageIndex + 1;
      }

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

// small slider

const testimonialSlider = $('.js-small-slider');
const options = {
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  dots: true,
  arrows: false,
  customPaging: (slider, pageIndex) => {
    return $('<button class="small__dot"></button>');
  },
  dotsClass: 'small-dots',
  responsive: [
    // {
    //   breakpoint: 1023,
    //   settings: {
    //     slidesToShow: 2,
    //     slidesToScroll: 1,
    //     infinite: true,
    //     dots: true
    //   }
    // },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
  ]
};

const detectWindowWidth = () => {
  const initSlider = $('.js-small-slider.slick-slider');
  if (mediaWidth(1023)) {
    if (initSlider.length) return;
    testimonialSlider.slick(options);
  } else {
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

// 									MEDIUM SLIDER

const mediumSlider = $('.js-medium-slider');
const optionsM = {
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  dots: true,
  arrows: false,
  customPaging: (slider, pageIndex) => {
    return $('<button class="small__dot"></button>');
  },
  dotsClass: 'small-dots',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
  ]
};

const detectWindowWidthMedium = () => {
  const initSlider = $('.js-medium-slider.slick-slider');
  if (mediaWidth(1023)) {
    if (initSlider.length) {
      return;
    }
    mediumSlider.slick(optionsM);
  } else {
    if (!initSlider.length) return;
    mediumSlider.slick('unslick');
  }
};
detectWindowWidthMedium();

let timeoutM;

WIN.resize(() => {
  clearTimeout(timeoutM);
  timeoutM = setTimeout(detectWindowWidthMedium, 100);
});

// SCHEDULE
const detectScheduleSlider = () => {
  const scheduleSliders = $('.js-schedule-slider');
  scheduleSliders.each((index, el) => {
    const schedulesSlider = $(el);
    const schedules = $(schedulesSlider.find('.schedule')).length;
    const initedSliderClass = schedulesSlider.hasClass('slick-slider');
    if (mediaWidth(767)) {
      if (schedules < 2 || initedSliderClass) return;
      schedulesSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
        customPaging: (slider, pageIndex) => {
          return $('<button class="small__dot"></button>');
        },
        dotsClass: 'small-dots'
      });
    } else if (mediaWidth(1023)) {
      if (schedules > 2 && !initedSliderClass) {
        schedulesSlider.slick(optionsM);
      }
      if (schedules === 2 && initedSliderClass) {
        schedulesSlider.slick('unslick');
      }
    } else {
      if (!initedSliderClass) return;
      schedulesSlider.slick('unslick');
    }
  });
};
let timeoutS;
detectScheduleSlider();
WIN.resize(() => {
  clearTimeout(timeoutS);
  timeoutS = setTimeout(detectScheduleSlider, 100);
});

// 										GALLERY SLIDER
const gallerySlider = $('.js-gallery');
const galleryNav = $('.js-gallery-nav');

const galleryParent = gallerySlider.parents('.js-gallery-slider-wrap');
let prev = $('.js-arrow-prev', galleryParent);
let next = $('.js-arrow-next', galleryParent);

gallerySlider.slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: galleryNav
});
galleryNav.slick({
  slidesToShow: 5,
  slidesToScroll: 1,
  asNavFor: gallerySlider,
  // centerMode: true,
  focusOnSelect: true,
  prevArrow: prev,
  nextArrow: next,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: false
      }
    }
  ]
});

let timeOutGallery;
let arrayHref = [];
const sliderIcons = $('.js-gallery-slider-wrap .icon use');
sliderIcons.each((i, el) => {
  const atr = $(el).attr('xlink:href');
  arrayHref.push(atr);
});

WIN.on('load resize orientationchange', function(e) {
  clearTimeout(timeOutGallery);
  timeOutGallery = setTimeout(() => {
    for (let i = 0; i <= sliderIcons.length - 1; i++) {
      $(sliderIcons[i]).attr('xlink:href', `${arrayHref[i]}`);
    }
  }, 120);
});

// 										INSTRUCTOR slider
const instructorSlider = $('.js-instructor-slider');
const instructorNav = $('.js-instructor-slider-nav');

instructorSlider.slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  asNavFor: instructorNav
});
instructorNav.slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  asNavFor: instructorSlider,
  // centerMode: true,
  focusOnSelect: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 430,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: false
      }
    }
  ]
});
