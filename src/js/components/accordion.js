/**
 * инициализация событий для кастомного селекта
 * @example
 * Accordion.init();
 */

function init(){

  $('.accordion').each(function() {
    if ($(this).hasClass('active')) {
      $(this).find('.accordion__content').slideDown(500);
    }
  })

  $('.accordion__panel').on('click', function(){
    $(this).closest('.accordion').siblings('.accordion').removeClass('active');
    $(this).closest('.accordion').siblings('.accordion').find('.accordion__content').slideUp(500);
    $(this).closest('.accordion').toggleClass('active');
    $(this).siblings('.accordion__content').slideToggle(500);
  });

  if (Main.DeviceDetection.isMobile()) {
    $('.accordion-nav').each(function() {
      let unit = $(this).find('.current').outerHeight();
      $(this).css({'height': `${unit}px`});
    });
    $('.accordion-nav .current a').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
    $('.accordion-nav .current').on('click', function(e) {
      e.preventDefault();
      let unit = $(this).outerHeight();
      let accordion = $(this).closest('.accordion-nav');
      let h = unit * accordion.find('.nav__item').length;
      if (accordion.hasClass('open')) {
        accordion.removeClass('open').animate({'height': `${unit}px`}, 500);
      } else {
        accordion.addClass('open').animate({'height': `${h}px`}, 500);
      }
    })
  }
}

module.exports = {init};