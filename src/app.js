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
        if (isNotNone(pageData)) {
            $('body, html').scrollTop(0);
            nav.createTab(pageData.pid, pageData.title);
        }
    });

    page.bind('save', function (pageData) {
        nav.updateTab(pageData.pid, pageData.title);
    });

    function shrinkNav() {
        nav.shrink();
    }

    function expandNav() {
        nav.expand();
    }

    var navShrinkTimer;
    var throttleExpandNav = throttle(function (isAutoShrink) {
        expandNav();

        clearTimeout(navShrinkTimer);

        if (isTrue(isAutoShrink)) {
            navShrinkTimer = setTimeout(function () {
                shrinkNav();
            }, 2000);
        }
    }, 100);

    throttleExpandNav(false);
});
