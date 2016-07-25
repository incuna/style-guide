(function ($) {
    'use strict';

    $(document).ready(function () {
        // Add a class 'toggleItem' to elements to have them toggle a class of 'open' when clicked (to demonstrate show/hide effects etc)
        $(document).on('click', '.toggleItem', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });
    });
}(window.jQuery));
