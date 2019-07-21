(function ($) {
    var r = $('<div/>', {
        class: 'right'
    });
    function right() {

    }
    function left() {

    }
    var rightIcon = '<li class="right"><img src="lib/svg/angle-right.svg" alt=""></li>',
        leftIcon = '<li class="left"><img src="lib/svg/angle-left.svg" alt=""></li>',
        dots = '<li class="dots"></li>',
        circle = '<img src="lib/svg/circle.svg" alt="">';
    $.fn.slider = function (options) {
        let settings = $.extend({
            slideShow: true,
            interval: 500,
            animation: 'slide',
        }, options);
        let i = 0, ul = $(this), slideMaxNums = ul.children().length;
        ul.append(leftIcon, rightIcon, dots);
        for (let j = 0; j < slideMaxNums; j++) {
            $(circle).attr('id', j).appendTo($('.dots'));
        }
        this.children("li").each(function () {
            var li = $(this);
            if (li.attr('data-type') == 'image') {
                $(this).append('<img class="slider_items" src="' + li.attr('data-url') + '" alt="" data-num="' + i + '">')
            }
            if (li.attr('data-type') == 'video') {
                $(this).append('<video class="slider_items" width="320" controls data-num="' + i + '"><source src="' + li.attr('data-url') + '" type="video/mp4">' +
                    'Your browser does not support the video tag. </video>')
            }
            if (li.children('img').attr('data-num') == 0) {
                $(this).parent('ul').height(li.children('img').height());
                $(this).children('img').addClass('active');
            }
            i++;
        });
        $('.right').click(function () {
            console.log('clicked right');
        });
        $('.left').click(function () {
            console.log('clicked left');
        });
        $('.dots img').click(function () {
            console.log('clicked ', $(this).attr('id'), 'dot element');
        });
        return this;
    };
}(jQuery));