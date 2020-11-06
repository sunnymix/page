(function () {
    var ELE_TYPE = {
        PAGE: 'Page',
        TITLE: 'Title',
        WRITER: 'Writer',
        BLOCK: 'Block',
        GRID: 'Grid'
    };

    window.ELE_TYPE = ELE_TYPE;

    window.isPage = function (e) {
        return e && e.type && e.type === ELE_TYPE.PAGE;
    };

    window.isTitle = function (e) {
        return e && e.type && e.type === ELE_TYPE.TITLE;
    };

    window.isWriter = function (e) {
        return e && e.type && e.type === ELE_TYPE.WRITER;
    };

    window.isBlock = function (e) {
        return e && e.type && e.type === ELE_TYPE.BLOCK;
    };

    window.isGrid = function (e) {
        return e && e.type && e.type === ELE_TYPE.GRID;
    };
})();
