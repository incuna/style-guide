(function ($) {
    'use strict';

    $(document).ready(function () {
        $(document).on('click', '.toggleItem', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });
    });
}(window.jQuery));
