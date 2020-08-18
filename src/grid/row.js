function Row(data, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

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

    thiz.cells = [];

    var cellsData = isEmpty(rowData) ? [[]] : rowData;

    for (var cellIndex = 0; cellIndex < cellsData.length; cellIndex++) {
        var cellData = cellsData[cellIndex];
        var cell = thiz.createCell(cellData);
        cell.appendTo(thiz.ele);
        thiz.cells.push(cell);
    }
};

Row.prototype.createCell = function (cellData) {
    var thiz = this;

    var cell = new Cell(cellData, thiz.readonly);

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

Row.prototype.addCell = function () {
    var thiz = this;
    var cell = thiz.createCell([[]]);
    cell.appendTo(thiz.ele);
    thiz.cells.push(cell);
};

window.Row = Row;
