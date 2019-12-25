/**
 * Модальные окна
 * @module Modals
 */

let state = {
  current: null,
  last: null
};

function open(modalID) {
  if (modalID) {
    state.current = modalID;
    let modal = $(modalID);
    let win = modal.find('.modal__window');
    modal.fadeIn(500);
    $('html, body').css('overflow', 'hidden');
    $('html').addClass('modal-opened');
    win.fadeIn(500);
    modal.trigger('modalopened');
    $(window).trigger('modalopened');
  } else {
    console.error('Which modal?');
  }
}

function close(modalID) {
  if (modalID) {
    let modal = $(modalID);
    let win = modal.find('.modal__window');
    win.fadeOut(500);
    modal.fadeOut(500);
    $('html').removeClass('modal-opened');
    $('html, body').css('overflow', '');
    modal.trigger('modalclosed')
    $(window).trigger('modalclosed');
  } else {
    console.error('Which modal?');
  }
  Main.Helpers.removeHash();
  state.last = modalID;
}


function init () {

  if (window.location.hash && $(window.location.hash).hasClass('modal')) {
    open(window.location.hash);
  }
  
  $('.btn-close-modal').on('click', function(){
    let modal = !!$(this).data('target') ? $($(this).data('target')) : $(this).closest('.modal').attr('id');
    close(`#${modal}`);
  });

  $('.modal').on('click', function() {
    if (!$(this).hasClass('unclosed')) {
      close(`#${$(this).attr('id')}`);
    }
  });

  $('.modal__window, .modal .mCSB_scrollTools').on('click', function(e) {
    e.stopPropagation();
  });

  $('.btn-modal').on('click', function(e) {
    e.preventDefault();
    let target = $(this).data('target');
    open(target);
  });
  $('.btn-modal-alt').on('click', function(e) {
    e.preventDefault();
    let target = $(this).data('target');
    let modal = $(this).closest('.modal').attr('id');
    window.location.hash = target;
    open(target);
    close(`#${modal}`);
  });

  $('.btn-modal-back').on('click', function(e) {
    e.preventDefault();
   if (state.last) {
     open(state.last);
   }
   close($(this).closest('.modal'));
   state.last = null;
  });

}

module.exports = {
  init,
  open,
  close
};