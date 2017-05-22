(function ($) {
    'use strict';

    $(document).ready(function () {

        // Sticky navigation
        var distanceY;
        var stickOn = 431;
        var stickyNav = $('.sticky-nav');

        $(window).on('scroll', function () {
            distanceY = window.pageYOffset || $(window).scrollTop();
            if (distanceY > stickOn) {
                stickyNav.addClass('stick-please');
            } else {
                stickyNav.removeClass('stick-please');
            }
        });

        // Add a class 'toggle-item' to elements to have them toggle a class of 'open' when clicked (to demonstrate show/hide effects etc)
        $(document).on('click', '.js-toggle-item', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });

        $('.js-toggle-header').click(function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open').next('.js-toggle-body').removeClass('open');
            } else {
                $('.js-toggle-header').removeClass('open');
                $('.js-toggle-body').removeClass('open');
                $(this).addClass('open').next('.js-toggle-body').addClass('open');
            }
        });
    });

}(window.jQuery));
