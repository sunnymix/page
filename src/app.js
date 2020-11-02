jQuery(function () {
    resetCss();

    var readonly = isNotNone(getSearchParam('read'));

    var fullscreen = isNotNone(getSearchParam('fullscreen'));

    var page = new Page('.page', readonly, fullscreen);

    var toolbar = new Toolbar(page);

    page.addToolbar(toolbar);

    window.onhashchange = function() {
        page.loadData();
    };

});
