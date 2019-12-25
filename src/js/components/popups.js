/**
 * Переключение классов по различным событиям
 * @module Popups
 */

/* Popups */
function openPopup(popupID) {
  if (popupID) {
    let popup = $(popupID);
    let win = popup.find('.popup__window');
    popup.fadeIn(500);
    if (Main.DeviceDetection.isPortrait()) {
      $('html, body').css('overflow', 'hidden');
    }
    $('html').addClass('popup-opened');
    win.fadeIn(500);
    popup.trigger('popupopened');
    $(window).trigger('popupopened');
  } else {
    console.error('Which popup?');
  }
}

function closePopup(popupID) {
  if (popupID) {
    let popup = $(popupID);
    let win = popup.find('.popup__window');
    win.fadeOut(500);
    popup.fadeOut(500);
    $('html').removeClass('popup-opened');
    if (Main.DeviceDetection.isPortrait()) {
      $('html, body').css('overflow', 'visible');
    }
    popup.trigger('popupclosed')
    $(window).trigger('popupclosed');
  } else {
    console.error('Which popup?');
  }
  Main.Helpers.removeHash();
}


function init () {
  
  $('.btn-close-popup').on('click', function(){
    let popup = !!$(this).data('target') ? $($(this).data('target')) : $(this).closest('.popup').attr('id');
    closePopup(`#${popup}`);
  });

  $('.popup').on('click', function() {
    if (!$(this).hasClass('unclosed')) {
      closePopup(`#${$(this).attr('id')}`);
    }
  });

  $('.popup__window, .popup .mCSB_scrollTools').on('click', function(e) {
    e.stopPropagation();
  });

  $('.btn-popup').on('click', function(e) {
    let target = $(this).data('target') === 'self' ? $(this).parent() : $($(this).data('target'));
    e.preventDefault();
    openPopup(target);
  });

}

module.exports = {
  init,
  openPopup,
  closePopup
};