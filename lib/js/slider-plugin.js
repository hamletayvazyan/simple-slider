(function ($) {
    var rightIcon = '<li class="right"><img src="lib/svg/angle-right.svg" alt=""></li>',
        leftIcon = '<li class="left"><img src="lib/svg/angle-left.svg" alt=""></li>',
        dots = '<li class="dots"></li>',
        circle = '<img src="lib/svg/circle.svg" alt="">', myIndex = 0, interval, canPlay;
    function paintSlide(index, element) {
        let e = $(element);
        e.addClass('slide');
        e.attr('data-num', index);
        if (e.attr('data-type') == 'image') {
            e.append('<img class="slider_items" src="' + e.attr('data-url') + '" alt="" >')
        }
        if (e.attr('data-type') == 'video') {
            e.append('<video class="slider_items video" controls >' +
                '<source src="' + e.attr('data-url') + '" type="video/mp4">' +
                'Your browser does not support the video tag. </video>')
        }
        if (index == 0) {
            e.addClass('active');
            e.parent('ul').height(e.children().height());
        }
    }
    function slideShow(settings) {
        interval = settings != undefined ? settings.interval : interval;
        canPlay = settings != undefined ? settings.slideShow : canPlay;
        if (canPlay){
            let sliderItems = $('.slider .slide'), dots = $('.dots img');
            let i;
            for (i = 0; i < sliderItems.length; i++) {
                $(sliderItems).eq(i).children('.slider_items').css('transition', interval+'ms');
                $(sliderItems).eq(i).removeClass('active');
                $(dots).eq(i).removeClass('active');
            }
            myIndex++;
            if (myIndex > sliderItems.length) {
                myIndex = 1
            }
            sliderItems.eq(myIndex - 1).addClass('active');
            if (sliderItems.eq(myIndex - 1).attr('data-num') == dots.eq(myIndex - 1).attr('data-num')) {
                dots.eq(myIndex - 1).addClass('active');
            }
            setTimeout(slideShow, interval);
        }
    }
    function changeSlide(target) {
        let sliderItems = $('.slider .slide'), dots = $('.dots img'),i,length = sliderItems.length;
        if (target == 'left') {
                for (i = 0; i < length; i++) {
                    if ($(sliderItems).eq(i).hasClass('active')){
                        if (myIndex == 0){
                            myIndex = length;
                        }
                        myIndex--;
                        if(sliderItems.first().hasClass('active')){
                            sliderItems.first().removeClass('active');
                            dots.first().removeClass('active');
                            sliderItems.last().addClass('active');
                            dots.last().addClass('active');
                            break;
                        } else {
                            $(sliderItems).eq(i).removeClass('active');
                            $(dots).eq(i).removeClass('active');
                            $(sliderItems).eq(i-1).addClass('active');
                            $(dots).eq(i-1).addClass('active');
                            break;
                        }

                    }
                }
        } else {
            for (i = 0; i < length; i++) {
                if ($(sliderItems).eq(i).hasClass('active')){
                    if (myIndex > length){
                        myIndex = 0;
                    }
                    myIndex++;
                    if(sliderItems.last().hasClass('active')){
                        sliderItems.last().removeClass('active');
                        dots.last().removeClass('active');
                        sliderItems.first().addClass('active');
                        dots.first().addClass('active');
                        break;
                    } else {
                        $(sliderItems).eq(i).removeClass('active');
                        $(dots).eq(i).removeClass('active');
                        $(sliderItems).eq(i+1).addClass('active');
                        $(dots).eq(i+1).addClass('active');
                        break;
                    }
                }
            }
        }
        setTimeout(callSlider, 3000);
    }
    function callSlider() {
            canPlay = true;
            slideShow();
    }
    function toSelectedSlide(selected) {
        let activeLi,activeDot, selectedDot,selectedLi;
        activeLi = $('.slider').find('li.active');
        activeDot = $('.dots').find('.active');
        selectedLi = $('.slider').find('[data-num="'+selected+'"]');
        selectedDot = $('.dots').find('[data-num="'+selected+'"]');
        if ($(activeLi).children().attr('data-num') != selected){
            activeLi.removeClass('active');
            activeDot.removeClass('active');
            selectedLi.addClass('active');
            selectedDot.addClass('active');
        }
        myIndex = selected + 1;
        setTimeout(callSlider, 5000);
    }
    $.fn.slider = function (options) {
        let settings = $.extend({
            slideShow: true,
            interval: 3000,
            animation: 'slide',
        }, options);
        let ul = $(this), slideMaxNums = ul.children().length;
        if(!settings.slideShow){
            ul.empty().removeClass('slider').text('to show slider please set value of "slideShow" true in settings');
        }
        this.children("li").each(function (index, element) {
            paintSlide(index, element);
            if (index == 0) {
                ul.append(leftIcon, rightIcon, dots);
                for (let j = 0; j < slideMaxNums; j++) {
                    $(circle).attr('data-num', j).appendTo($('.dots'));
                }
            }
        });
        $('.video').on('click',function (e) {
            if ( this.paused){
                canPlay = false
            }else {
                setTimeout(callSlider, 3000);
            }
        });
        slideShow(settings);
        $('.right').on('click',function (e) {
            canPlay = false;
            changeSlide('right');
        });
        $('.left').on('click',function (e) {
            canPlay = false;
            changeSlide('left');
        });
        $('.dots img').click(function () {
            canPlay = false;
            toSelectedSlide($(this).attr('data-num'));
        });
        return this;
    };
}(jQuery));