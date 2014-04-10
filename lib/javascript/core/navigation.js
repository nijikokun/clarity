define([
    "jQuery",
    "core/progress"
], function($, progress) {
    var prev, next;

    // Prevent cache so that using the back button works
    // See: http://stackoverflow.com/a/15805399/983070
    $.ajaxSetup({
        cache: false
    });

    var handlePagination = function (e) {
        e.stopPropagation();
        e.preventDefault();

        var url = $(this).attr('href');

        if (url) {
            $.get(url).done(function (data) {
                $('.book-body').html($(data).find('.book-body').html());
                $('.book-summary').html($(data).find('.book-summary').html());
                history.pushState(null, null, url);
                progress.show();
            }).fail(function () {
                location.href = url;
            });
        }
    };

    var goNext = function() {
        var url = $(".navigation-next").attr("href");

        if (url) {
            $.get(url).done(function (data) {
                $('.book-body').html($(data).find('.book-body').html());
                $('.book-summary').html($(data).find('.book-summary').html());
                history.pushState(null, null, url);
            }).fail(function () {
                location.href = url;
            });
        }
    };

    var goPrev = function() {
        var url = $(".navigation-prev").attr("href");

        if (url) {
            $.get(url).done(function (data) {
                $('.book-body').html($(data).find('.book-body').html());
                $('.book-summary').html($(data).find('.book-summary').html());
                history.pushState(null, null, url);
            }).fail(function () {
                location.href = url;
            });
        }
    };

    $(document).on('click', ".navigation-prev", handlePagination);
    $(document).on('click', ".navigation-next", handlePagination);
    $(document).on('click', ".summary [data-path] a", handlePagination);

    return {
        goNext: goNext,
        goPrev: goPrev
    };
});