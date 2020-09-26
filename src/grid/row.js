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

    thiz.init(data);
}

Row.prototype.init = function (rowData) {
    var thiz = this;
    thiz.initEvents();
    thiz.initData(rowData);
};

Row.prototype.initEvents = function () {
    this.listener = {};
};

Row.prototype.trigger = newTrigger();

Row.prototype.bind = function (event, cb) {
    this.listener[event] = cb;
};

Row.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Row.prototype.initData = function (rowData) {
    var thiz = this;
    thiz.loadData(rowData);
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
    cell.bind('blockop', function (block, writer, cell) {
        thiz.trigger('blockop', block, writer, cell, thiz);
    });
    cell.bind('enter', function (block, writer, cell) {
        thiz.trigger('enter', block, writer, cell, thiz);
    });
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

Row.prototype.removeCell = function () {
    var thiz = this;
    if (thiz.cells.length > 0) {
        var cell = thiz.cells[thiz.cells.length - 1];
        cell.remove();
        thiz.cells = thiz.cells.slice(0, thiz.cells.length - 1);
    }
};

Row.prototype.moveSiblingCells = function (fromIndex, toIndex) {
    var thiz = this;
    if (isNotEmpty(thiz.cells)) {
        if (isContainsRange(thiz.cells.length, fromIndex, toIndex)) {
            if (Math.abs(fromIndex - toIndex) === 1) {
                var fromCell = thiz.cells[fromIndex];
                var toCell = thiz.cells[toIndex];

                thiz.cells[fromIndex] = toCell;
                thiz.cells[toIndex] = fromCell;

                toCell.ele.after(fromCell.ele);
            }
        }
    }
};

Row.prototype.remove = function () {
    var thiz = this;
    thiz.ele.remove();
};

window.Row = Row;
