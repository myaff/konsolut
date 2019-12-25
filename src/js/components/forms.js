/**
 * Модуль для работы placeholder в элементах формы (.field)
 * @module Input
 */

const Inputmask = require('inputmask');
const ionRangeSlider = require('ion-rangeslider');

/**
 * Установить фокус
 * @private
 * @param {object} input
 */
function focusLabel(input){
    input.closest('.field').addClass("has-focus");
}

/**
 * Убрать фокус
 * @private
 * @param {object} input
 */
function blurLabel(input){
    var wrapper = input.closest('.field');
    wrapper.removeClass("has-focus");
}

/**
 * Проверить инпут на наличие value
 * @private
 * @param {object} input
 */
function checkInput(input){
    var wrapper = input.closest('.field');
    if (input.val().length > 0)
        wrapper.addClass("has-value");
    else
        wrapper.removeClass("has-value");
}

// popup field
function openPf(pf) {
    if (pf) {
        let win = pf.find('.pf-win');
        pf.addClass('open');
        win.fadeIn(100);
        pf.trigger('opened');
    } else {
        console.error('pf is required');
    }
}
function closePf(pf) {
    if (pf) {
        let win = pf.find('.pf-win');
        pf.removeClass('open');
        win.fadeOut(100);
        pf.trigger('closed');
    } else {
        console.error('pf is required');
    }
}

/**
 * инициализация событий для инпута
 * @example
 * Input.init();
 */
function init(){

    // text-inputs
    let inputs = $('.field__input[type="text"], .field__input[type="email"], .field__input[type="password"], .field__input[type="tel"], .field__input[type="search"]');
    let placeholders = $('.field__placeholder');
    
    placeholders.click(function(){
      $(this).closest('.field').find('.field__input').focus();
    });

    inputs.each(function(i, item) {
        checkInput($(item));
    });

    inputs.focus(function(){
        focusLabel($(this));
    });

    inputs.blur(function(){
        blurLabel($(this));
        checkInput($(this));
    });

    // inputmask
    let telMask = new Inputmask("+7(999) 999 9999");
    let telSelector = $('input[type="tel"]');
    telMask.mask(telSelector);
    telSelector.on('mouseenter', function(e) {
        e.preventDefault();
    })

    $('.btn-search').on('click', function(e){
        e.preventDefault();
        $('#search').focus();
    });

    // flow textarea
    let flow = $('.flow-textarea');
    flow.on('keydown', function(){
        $(this).change();
    });

    flow.on('change', function(){
        setTimeout(function(self){
            let flowEx = $(self).siblings('.flow-textarea-example');
            flowEx.html($(self).val().replace(/\r?\n/g,'<br/>'));
            if (flow.outerHeight() !== flowEx.outerHeight()) {
                flow.stop().animate({'height': flowEx.outerHeight()}, 300);
            }
        }, 10, this);
    });

    // checkboxes, radios
    let radios = $('.field__input[type="radio"]');
    let checkboxes = $('.field__input[type="checkbox"]');

    radios.on('change', function() {
        $(this).closest('.field').addClass('is-checked');
        $(`[name="${$(this).attr('name')}"]:not(#${$(this).attr('id')})`).closest('.field').removeClass('is-checked');
    })
    checkboxes.on('change', function() {
        if ($(this).prop('checked')) {
            $(this).closest('.field').addClass('is-checked');
        } else {
            $(this).closest('.field').removeClass('is-checked');
        }
    })

    // input file
    $('input[type="file"]').on('change', function() {
        let sel = $(this).closest('.field').find('.selected');
        if (this.files.length === 1) {
            $(this).closest('.field').addClass('has-value');
            sel.text(this.files[0].name);
        } else {
            sel.text('');
            $(this).closest('.field').removeClass('has-value');
        }
    });

    // input range
    $('.js-rangeslider').ionRangeSlider({
        type: 'double',
        skin: 'emi',
        hide_min_max: true,
        onChange: function (data) {
            let postfix = data.input.data('postfix');
            let pretty_val = `от ${data.from_pretty+postfix} до ${data.to_pretty+postfix}`
            data.input.attr('data-pretty-val', pretty_val);
        },
        onFinish: function (data) {
            let field = $(data.slider).closest('.field--range');
            if (data.from_percent > 0 || data.to_percent < 100) {
                field.addClass('setted');
            } else {
                field.removeClass('setted');
            }
        },
        onUpdate: function (data) {
            let field = $(data.slider).closest('.field--range');
            if (data.from_percent > 0 || data.to_percent < 100) {
                field.addClass('setted');
            } else {
                field.removeClass('setted');
            }
        }
    });

    // input increment
    $('.field--increment .btn-minus').on('click', function() {
        let inp = $(this).closest('.field--increment').find('input[type="num"]')[0];
        let $inp = $(inp);
        let val = $inp.val();
        let min = inp.min.length ? parseInt(inp.min) : false;
        if ((min || min === 0)) {
            $inp.val((--val > min) ? val-- : min);
        } else {
            $inp.val(val);
        }
        $inp.change();
    });
    $('.field--increment .btn-plus').on('click', function() {
        let inp = $(this).closest('.field--increment').find('input[type="num"]')[0];
        let $inp = $(inp);
        let val = $inp.val();
        let max = inp.max.length ? parseInt(inp.max) : false;
        if (max) {
            $inp.val((++val <= max) ? val : max);
        } else {
            $inp.val(++val);
        }
        $inp.change();
    });

    // popup field
    $('.pf-ctrl').on('click', function(e) {
        let pf = $(this).closest('.popup-field');
        if (pf.hasClass('open')) {
            closePf(pf);
        } else {
            openPf(pf);
        }
    });
    $('.popup-field').on('click', function(e) {
        e.stopPropagation();
    });
    $('.popup-field').on('click-outside', function() {
        closePf($(this));
    });
    $('.popup-field').on('closed', function() {
        let val = $(this).find('input').val();
        let res = $(this).find('.pf-res');
        res.text(val);
    })
    $('.layout').on('click', function() {
        $(this).find('.popup-field.open').trigger('click-outside');
    });

}

module.exports = {init};