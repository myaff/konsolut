const DeviceDetection = require("./components/device-detection");
const Helpers = require("./components/helpers");
const Carousel = require("./components/carousel");
//const Forms = require("./components/forms");
//const Popups = require("./components/popups");
//const Tabs = require('./components/tabs');
//const MainMenu = require('./components/main-menu');
//const Selects = require('./components/selects');
//const Scrollbar = require('./components/scrollbar');
//const Accordion = require('./components/accordion');
//const Modals = require('./components/modals');

$(document).ready(function(){

  //let a = new CProduct.CProduct('asd');
  DeviceDetection.init();
  Helpers.init();
  Carousel.init();
  //Share.init();
  //Tabs.init();
  //Accordion.init();
  //MainMenu.init();
  //Aside.init();
  //Forms.init();
  //Selects.init();
  //Modals.init();
  //Popups.init();=
  
});

/**
 * Список экспортируемых модулей, чтобы иметь к ним доступ извне
 * @example
 * Main.Form.isFormValid();
 */
module.exports = {
    DeviceDetection,
    Helpers,
    Carousel,
    //Forms,
    //Selects,
    //Popups,
    //Tabs,
    //Accordion,
    //MainMenu,
    //Aside,
    //Modals,
};