(function ($) {
    'use strict';

    $(document).ready(function () {
        // Add a class 'toggle-item' to elements to have them toggle a class of 'open' when clicked (to demonstrate show/hide effects etc)
        $(document).on('click', '.js-toggle-item', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });

        $('.js-toggle-header').click(function () {
            $(this).toggleClass('open').next('.js-toggle-body').toggleClass('open');
        });
    });

}(window.jQuery));
