function Row(data) {
    var thiz = this;

    thiz.ele = $([
        '<tr',
        '    class="grid-row"',
        '    style="',
        '        position: relative;',
        '    "',
        '>',
        '</tr>'
    ].join(''));

    thiz.loadData(data);
}

Row.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Row.prototype.loadData = function (rowData) {
    var thiz = this;

    var cellDataList = rowData.split(',');
    
    for (var cellIndex = 0; cellIndex < cellDataList.length; cellIndex++) {
        var cellData = cellDataList[cellIndex];
        thiz.createCell(cellData);
    }
};

Row.prototype.createCell = function (cellData) {
    var thiz = this;

    var cell = new Cell(cellData);

    cell.appendTo(thiz.ele);
};

window.Row = Row;
