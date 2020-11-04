jQuery(function () {
    resetCss();

    var readonly = isNotNone(getSearchParam('read'));

    var fullscreen = isNotNone(getSearchParam('fullscreen'));

    var nav = new Nav($('.nav'), readonly, fullscreen);

    var page = new Page('.page', readonly, fullscreen);

    var toolbar = new Toolbar(page);

    page.addToolbar(toolbar);

    window.onhashchange = function () {
        page.loadData();
    };

    page.bind('load', function (pageData) {
        nav.createTab(pageData.pid, pageData.title);
    });

    page.bind('save', function (pageData) {
        nav.updateTab(pageData.pid, pageData.title);
    });

    function shrinkNav() {
        nav.shrink();
        page.shrinkNav();
    }

    function expandNav() {
        nav.expand();
        page.expandNav();
    }

    var navShrinkTimer;
    var throttleExpandNav = throttle(function (isAutoShrink) {
        return false;

        expandNav();

        clearTimeout(navShrinkTimer);

        if (isTrue(isAutoShrink)) {
            navShrinkTimer = setTimeout(function () {
                shrinkNav();
            }, 2000);
        }
    }, 100);

    $(window).on('scroll', function () {
        throttleExpandNav(true);
    });

    nav.bind('mouseenter', function () {
        throttleExpandNav(false);
    });

    nav.bind('mouseleave', function () {
        throttleExpandNav(true);
    });

    throttleExpandNav(true);

});
