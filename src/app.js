jQuery(function () {
    resetCss();

    var readonly = isNotNone(getSearchParam('read'));

    var fullscreen = isNotNone(getSearchParam('fullscreen'));

    var paper = new Paper('.paper', readonly, fullscreen);

    var toolbar = new Toolbar(paper);

    paper.addToolbar(toolbar);

    window.onhashchange = function() {
        paper.loadData();
    };

});
