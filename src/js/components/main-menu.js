/**
 * Основная навигация
 * @module MainMenu
 */

function open(target) {
  if ($('.deeper').hasClass('active')) {
    $('.deeper__nav.active').removeClass('active');
    $(target).addClass('active');
  } else {
    $('.deeper').addClass('active');
    $(target).addClass('active');
  }
  $('.layout').addClass('menu-opened');
}

function closeDeeper() {
  $('.deeper').removeClass('active');
  $('.deeper__nav.active').removeClass('active');
}

function close() {
  closeDeeper();
  $('.main-nav').removeClass('active');
  $('.layout').removeClass('menu-opened');
  if (Main.DeviceDetection.isMobile()) {
    $('html, body').css({'overflow-y': ''});
  }
}

/**
 * Инициализация
 */
function init(){
  $('.main-nav .multilevel').on('click', function(e) {
    e.preventDefault();
    let target = $(this).attr('href');
    open(target);
  });
  $('.main-nav').on('click', function(e) {
    e.stopPropagation();
  });
  $(document).on('click', '.layout.menu-opened', function() {
    close();
  });
  $('.js-menu--burger').on('click', function(e) {
    e.stopPropagation();
    $('.main-nav').addClass('active');
    $('.layout').addClass('menu-opened');
    if (Main.DeviceDetection.isMobile()) {
      $('html, body').css({'overflow-y': 'hidden'});
    }
  });
  $('.js-menu--back').on('click', function(e) {
    e.preventDefault();
    closeDeeper();
  })
}

module.exports = {
  init,
  close,
  closeDeeper
}