(function ($, _) {
    'use strict';

    var topButton = $('.back-to-top');
    var windowPosition;
    var footerPosition;
    var footerIsVisible;
    var buttonPosition;
    var debounceInterval = 100;
    var scrollableAreaTop;
    var windowTop;
    var showTopButtonTrigger;
    var rightPos;

    function throttle(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last,
          deferTimer;
      return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold + last - now);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }

    var positionTopButton = function () {
        windowTop = $(window).scrollTop();
        windowPosition = $(window).scrollTop() + $(window).height();
        footerPosition = $(document).height() - $('.page-footer').height();
        buttonPosition = 'absolute';
        rightPos = 0;
        
        if (windowPosition < footerPosition) {
            buttonPosition = 'fixed';
            rightPos = ($(window).width() - $('.components').width()) / 2;
        }

        if (windowTop < showTopButtonTrigger)
        {
            $('.back-to-top').hide();
        } else {
            $('.back-to-top').show();
        }

        $('.back-to-top').css('position', buttonPosition).css('right', rightPos);
    };

    var performScroll = function (target) {
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 'medium');
        positionTopButton();
    };

    $(document).ready(function () {
        scrollableAreaTop = $('#jump-top').offset().top;
        showTopButtonTrigger = scrollableAreaTop + $(topButton).height();

        $(window).on('scroll', throttle(positionTopButton, debounceInterval));

        $(document).on('click', '.scrollable-nav a, .back-to-top', function (e) {
            e.preventDefault();
            performScroll($(this).attr('href'));
        });

        $(document).on('click', '.toggle-open', function (e) {
            e.preventDefault();
            $(this).toggleClass('open');
        });

        $(window).on('resize', throttle(function () {
            positionTopButton();
        }, debounceInterval));
    });
}(window.jQuery, window._));
