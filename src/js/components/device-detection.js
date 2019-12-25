const breakpoints = {
  sm: 767,
  md: 1024,
  lg: 1280,
  xl: 1600
};

function isPortrait() {
  return ($(window).width() < $(window).height());
};
function isLandscape() {
  return ($(window).width() > $(window).height());
};
function isMobile(){
  return ($(window).width() <= breakpoints.sm);
};
function isTablet(){
  return ($(window).width() > breakpoints.sm && $(window).width() <= breakpoints.md)
};
function isDesktopExt(){
  return ($(window).width() >= breakpoints.md)
};
function isDesktop(){
  return ($(window).width() > breakpoints.md)
};
function isTouch(){
  return 'ontouchstart' in window || navigator.maxTouchPoints;
};
function isMobileVersion(){
  return !!~window.location.href.indexOf("/mobile/");
};
function isIE11() {
  return !!window.MSInputMethodContext && !!document.documentMode;
};
let isWebp = false;

function init(){

  if(isTouch()){
    $('html').removeClass('no-touch').addClass('touch');
  } else {
    $('html').removeClass('touch').addClass('no-touch');
  }

  if (isIE11()) {
    $('html').addClass('ie11');
  } else {
    $('html').addClass('no-ie11');
  }
};

module.exports = {
  init,
  isTouch,
  isMobile,
  isTablet,
  isDesktop,
  isDesktopExt,
  isMobileVersion,
  isPortrait,
  isLandscape,
  isIE11
};