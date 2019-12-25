/**
 * Карусель
 * @module Carousel
 * https://idangero.us/swiper/api/
 */

const Swiper = require('swiper');

/**
 * Инициализация карусели
 */
function init(){
  $('.swiper-default').each(function() {
    let container = $(this).find('.swiper-container');
    // navigation
    let prev = $(this).find('.swiper-button-prev');
    let next = $(this).find('.swiper-button-next');
    let hasNavigation = next.length && prev.length;
    // pagination
    let pagination = $(this).find('.swiper-pagination');

    var defaultSwiper = new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      pagination: pagination.length ? {
        el: pagination,
        clickable: true
      } : false,
      navigation: hasNavigation ? {
        prevEl: prev,
        nextEl: next
      } : false
    });
  });
};

module.exports = {init};