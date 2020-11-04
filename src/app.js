jQuery(function () {
    resetCss();

    var readonly = isNotNone(getSearchParam('read'));

    var fullscreen = isNotNone(getSearchParam('fullscreen'));

    var nav = new Nav($('.nav'), readonly, fullscreen);

    var page = new Page('.page', readonly, fullscreen);

    var toolbar = new Toolbar(page);

    page.addToolbar(toolbar);

    window.onhashchange = function() {
        page.loadData();
    };

    page.bind('load', function (pageData) {
        nav.createTab(pageData.pid, pageData.title);
    });

    page.bind('save', function (pageData) {
        nav.updateTab(pageData.pid, pageData.title);
    });

});
