// JS to add animated page scrolling to links and 'back to top' button behaviour
// ------------------------------------------------------------------------------------------------------------
// To set up the scrollable area in your HTML file:
// - choose the element to scoll back up to by giving it a class of 'jump-top'
// - choose the element containing your (scrollable) navigation links by giving it a class of 'scrollable-links'
// - add a button with a class of 'back-to-top' just below the scrollable area. It will float at the 
//   bottom of the screen or scrollable page area as needed (and hide if the user scrolls above 'jump-top')

(function ($) {
    'use strict';
    // using '.class-name' instead of $('.class-name') so the variables can be used in the .on() event handlers
    var topButton = '.back-to-top';
    var scrollableAreaTop = '.jump-top';
    var scrollableLinks = '.scrollable-links a';
    var windowPosition;
    var footerPosition;
    var buttonPosition;
    var scrollableAreaTopOffset;
    var windowTop;
    var showTopButtonDistance;
    var throttleInterval = 100;

    // Throttle function from https://remysharp.com/2010/07/21/throttling-function-calls
    var throttle = function (fn, threshold, scope) {
        if (!threshold) {
            threshold = 250
        }

        var last;
        var deferTimer;
        return function () {
            var context = scope || this;
            var now = Number(new Date());
            var args = arguments;
            if (last && now < last + threshold) {
                // hold on to it
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshold + last - now);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    };

    var setUpTopButton = function () {
        windowTop = $(window).scrollTop();
        windowPosition = $(window).scrollTop() + $(window).height();
        footerPosition = $(document).height() - $('.sg-footer').height();
        buttonPosition = 'absolute';

        if (windowTop < showTopButtonDistance) {
            $(topButton).hide();
        } else {
            if (windowPosition < footerPosition) {
            buttonPosition = 'fixed'; }
            $(topButton).css('position', buttonPosition).fadeIn('medium');
        }
    };

    var performScroll = function (target) {
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 'medium');
        setUpTopButton();
    };

    $(document).ready(function () {

        if (!$('body').hasClass('style-guide-page')) {
            return;
        }

        scrollableAreaTopOffset = $(scrollableAreaTop).offset().top;
        showTopButtonDistance = scrollableAreaTopOffset + $(topButton).height();

        setUpTopButton();

        $(window).on('scroll', throttle(setUpTopButton, throttleInterval));

        $(document).on('click', scrollableLinks, function (e) {
            e.preventDefault();
            performScroll($(this).attr('href'));
        });

        $(document).on('click', topButton, function () {
            performScroll(scrollableAreaTop);
        });

        $(window).on('resize', throttle(function () {
            setUpTopButton();
        }, throttleInterval));
    });
}(window.jQuery));
