(function ($) {
    'use strict';

    $(document).ready(function () {

        // Sticky navigation
        var distanceY;
        var stickOn = 260;
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
            if (!$(this).hasClass('open')) {
                $('.js-toggle-header, .js-toggle-body').removeClass('open');
            }
            $(this).toggleClass('open').next('.js-toggle-body').toggleClass('open');
        });
    });

}(window.jQuery));
