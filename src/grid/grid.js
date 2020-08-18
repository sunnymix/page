function Grid(place, data, lock, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

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
        '            overflow-x: auto;',
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
        '    <div',
        '        class="grid-actions"',
        '        style="',
        '            position: relative;',
        '        "',
        '    >',
        '    </div>',
        '</div>'
    ].join(''));

    thiz.tableEle = thiz.ele.find('table');
    thiz.actionsEle = thiz.ele.find('> .grid-actions');

    thiz.rows = [];

    thiz.init();
}

Grid.prototype.init = function () {
    var thiz = this;

    if (thiz.readonly) {
        return;
    }

    thiz.createActions();
};

Grid.prototype.createActions = function () {
    var thiz = this;

    // Rows:

    var addRowBtn = new Button('img/plus-circle-solid.png', 'row', 22, 'auto', 16, 16);
    addRowBtn.appendTo(thiz.actionsEle);
    addRowBtn.click(function () {
        thiz.addRow();
    });

    var removeRowBtn = new Button('img/minus-circle-solid.png', 'row', 22, 'auto', 16, 16);
    removeRowBtn.appendTo(thiz.actionsEle);
    removeRowBtn.click(function () {
        thiz.removeRow();
    });

    // Columns:

    var addColumnBtn = new Button('img/plus-circle-solid.png', 'col', 22, 'auto', 16, 16);
    addColumnBtn.appendTo(thiz.actionsEle);
    addColumnBtn.click(function () {
        thiz.addColumn();
    });

    var removeColumnBtn = new Button('img/minus-circle-solid.png', 'col', 22, 'auto', 16, 16);
    removeColumnBtn.appendTo(thiz.actionsEle);
    removeColumnBtn.click(function () {
        thiz.removeColumn();
    });
};

Grid.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Grid.prototype.prependTo = function (place) {
    var thiz = this;
    place.prepend(thiz.ele);
};

Grid.prototype.createRow = function (rowData) {
    var thiz = this;

    var row = new Row(rowData, thiz.readonly);

    return row;
};

Grid.prototype.getData = function () {
    var thiz = this;

    var rowsData = [];

    for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
        var row = thiz.rows[rowIndex];
        var rowData = row.getData();
        rowsData.push(rowData);
    }

    return JSON.stringify(rowsData);
};

Grid.prototype.setData = function (content) {
    var thiz = this;
    var rowsData = thiz.extractJsonString(content);
    thiz.renderData(rowsData);
};

Grid.prototype.extractJsonString = function (jsonString) {
    var rowsData = [];

    jsonString = (isNone(jsonString) || isEmpty(jsonString)) ? '[]' : jsonString;

    try {
        var obj = JSON.parse(jsonString);
        if (isArray(obj)) {
            rowsData = obj;
        }
    } catch (error) {
        console.error(error);
    }

    return rowsData;
};

Grid.prototype.renderData = function (rowsData) {
    var thiz = this;

    thiz.tableEle.empty();

    rowsData = (isNone(rowsData) || isEmpty(rowsData)) ? [[]] : rowsData;

    for (var rowIndex = 0; rowIndex < rowsData.length; rowIndex++) {
        var rowData = rowsData[rowIndex];
        var row = thiz.createRow(rowData);
        row.appendTo(thiz.tableEle);
        thiz.rows.push(row);
    }
};

Grid.prototype.findActiveRowIndex = function () {
    var thiz = this;

    var index = -1;

    var rowEle = thiz.ele.find('tr.active');
    if (isNotNone(rowEle)) {
        index = rowEle.index();
    }

    return index;
};

Grid.prototype.findActiveColumnIndex = function () {
    var thiz = this;
};

Grid.prototype.addRow = function () {
    var thiz = this;
    var activeRowIndex = thiz.findActiveRowIndex();

    var rowCells = [];
    if (thiz.rows.length > 0) {
        var row = thiz.rows[thiz.rows.length - 1];
        for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
            rowCells.push([[]]);
        }
    } else {
        rowCells.push([[]]);
    }

    var row = thiz.createRow(rowCells);
    row.appendTo(thiz.tableEle);

    thiz.rows.push(row);
};

Grid.prototype.removeRow = function () {
    var thiz = this;
    console.log('todo: removeRow');
};

Grid.prototype.addColumn = function () {
    var thiz = this;

    for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
        var row = thiz.rows[rowIndex];
        row.addCell();
    }

};

Grid.prototype.removeColumn = function () {
    var thiz = this;
    console.log('todo: removeColumn');
};

window.Grid = Grid;
