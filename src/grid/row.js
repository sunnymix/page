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

    thiz.cells = [];

    thiz.loadData(data);
}

Row.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Row.prototype.loadData = function (rowData) {
    var thiz = this;

    var cellDataList = rowData.split(',');

    thiz.cells = [];

    for (var cellIndex = 0; cellIndex < cellDataList.length; cellIndex++) {
        var cellData = cellDataList[cellIndex];
        var cell = thiz.createCell(cellData);

        thiz.cells.push(cell);
    }
};

Row.prototype.createCell = function (cellData) {
    var thiz = this;

    var cell = new Cell(cellData);

    cell.appendTo(thiz.ele);

    return cell;
};

Row.prototype.getData = function () {
    var thiz = this;

    var cellsData = [];

    for (var cellIndex = 0; cellIndex < thiz.cells.length; cellIndex++) {
        var cell = thiz.cells[cellIndex];
        var cellData = cell.getData();
        cellsData.push(cellData);
    }

    return cellsData;
};

window.Row = Row;
