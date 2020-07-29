jQuery(function () {
    resetCss();

    var paper = new Paper('.paper');

    var toolbar = new Toolbar(paper);

    paper.appendToolbar(toolbar);

    window.onhashchange = function() {
        paper.loadData();
    };

});
