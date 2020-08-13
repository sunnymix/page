function Grid() {
    var thiz = this;

    thiz.ele = $([
        '<div',
        '    class="grid"',
        '    style="',
        '        position: relative;',
        '    "',
        '    >',
        '    <div',
        '        class="grid-box"',
        '        style="',
        '            position: relative;',
        '        "',
        '    >',
        '        <table',
        '            class=""',
        '            style="',
        '                border: 0px solid #bfbfbf;',
        '                border-spacing: 0;',
        '                border-collapse: collapse;',
        '                width: auto;',
        '                max-width: 100%;',
        '                ;',
        '            "',
        '        >',
        '        </table>',
        '    </div>',
        '</div>'
    ].join(''));

    thiz.tableEle = thiz.ele.find('table');

    thiz.loadPlainData();
}

Grid.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Grid.prototype.prependTo = function (place) {
    var thiz = this;
    place.prepend(thiz.ele);
};

Grid.prototype.loadPlainData = function () {
    var thiz = this;

    var data = [
        '更新,202008'
    ].join('\n');

    thiz.extractData(data);
};

Grid.prototype.extractData = function (plainData) {
    var thiz = this;

    var rowDataList = plainData.split('\n');
    rowDataList = rowDataList.filter(isNotBlank);
    if (rowDataList.length > 0) {
        for (var rowIndex = 0; rowIndex < rowDataList.length; rowIndex++) {
            var rowData = rowDataList[rowIndex];
            thiz.createRow(rowData);
        }
    }
};

Grid.prototype.createRow = function (rowData) {
    var thiz = this;

    var row = new Row(rowData);
    row.appendTo(thiz.tableEle);
};

window.Grid = Grid;
