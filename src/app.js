jQuery(function () {
    resetCss();

    var readonly = isNotNone(getSearchParam('read'));

    var paper = new Paper('.paper', readonly);

    var toolbar = new Toolbar(paper);

    paper.appendToolbar(toolbar);

    window.onhashchange = function() {
        paper.loadData();
    };

});
