/**
 * Tabs
 * @module Tabs
 */

function set(active) {
  if (active) {
    let tabs = active.closest('.tabs');
    let tab = active.data('tab');
    tabs.find('.active').removeClass('active');
    tabs.find(`.tab-ctrl[data-tab="${tab}"], .tab__section[data-tab="${tab}"]`).addClass('active');
  } else {
    console.error('Which tab?')
  }
}

function init() {

  $('.tabs').each(function() {
    let active = $(this).find('.tab-ctrl.active').length ? $(this).find('.tab-ctrl.active') : $(this).find('.tab-ctrl').eq(0);
    set(active);
  });

  $('.tabs .tab-ctrl').click(function(){
    if(!$(this).hasClass('active')){
      set($(this));
    }
  });
}

module.exports = {
  init,
  set
}