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
        //'                max-width: 100%;',
        '                ;',
        '            "',
        '        >',
        '        </table>',
        '    </div>',
        '    <div',
        '        class="grid-actions"',
        '        style="',
        '            display: none;',
        '            position: absolute;',
        '            top: 100%;',
        '            z-index: 1;',
        '            border: 1px solid #eeeeee;',
        '            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);',
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
    initEvent(thiz, Grid.prototype);
    thiz.createActions();
    thiz.initBind();
};

Grid.prototype.createActions = function () {
    var thiz = this;

    // Rows:

    var addRowBtn = new Button('img/plus-solid.png', 'row', 30, 'auto', 16, 16);
    addRowBtn.border('0 1px 0 0');
    addRowBtn.appendTo(thiz.actionsEle);
    addRowBtn.click(function () {
        thiz.addRow();
    });

    var removeRowBtn = new Button('img/times-solid.png', 'row', 30, 'auto', 16, 16);
    removeRowBtn.border('0 1px 0 0');
    removeRowBtn.appendTo(thiz.actionsEle);
    removeRowBtn.click(function () {
        thiz.removeRow();
    });

    // Row Moves:

    var moveUpBtn = new Button('img/angle-up-solid.png', 'up', 30, 'auto', 16, 16);
    moveUpBtn.border('0 1px 0 0');
    moveUpBtn.appendTo(thiz.actionsEle);
    moveUpBtn.click(function () {
        thiz.moveUp();
    });

    var moveDownBtn = new Button('img/angle-down-solid.png', 'down', 30, 'auto', 16, 16);
    moveDownBtn.border('0 1px 0 0');
    moveDownBtn.appendTo(thiz.actionsEle);
    moveDownBtn.click(function () {
        thiz.moveDown();
    });

    // Columns:

    var addColumnBtn = new Button('img/plus-solid.png', 'col', 30, 'auto', 16, 16);
    addColumnBtn.border('0 1px 0 0');
    addColumnBtn.appendTo(thiz.actionsEle);
    addColumnBtn.click(function () {
        thiz.addColumn();
    });

    var removeColumnBtn = new Button('img/times-solid.png', 'col', 30, 'auto', 16, 16);
    removeColumnBtn.border('0 1px 0 0');
    removeColumnBtn.appendTo(thiz.actionsEle);
    removeColumnBtn.click(function () {
        thiz.removeColumn();
    });

    // Column Moves:

    var moveLeftBtn = new Button('img/angle-left-solid.png', 'left', 30, 'auto', 16, 16);
    moveLeftBtn.border('0 1px 0 0');
    moveLeftBtn.appendTo(thiz.actionsEle);
    moveLeftBtn.click(function () {
        thiz.moveLeft();
    });

    var moveRightBtn = new Button('img/angle-right-solid.png', 'right', 30, 'auto', 16, 16);
    moveRightBtn.appendTo(thiz.actionsEle);
    moveRightBtn.click(function () {
        thiz.moveRight();
    });
};

Grid.prototype.initBind = function () {
    var thiz = this;
    thiz.ele.on('mouseenter', function () {
        thiz.actionsEle.show();
    }).on('mouseleave', function () {
        thiz.actionsEle.hide();
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
    row.bind('blockop', function (block, writer, cell, row) {
        thiz.trigger('blockop', block, writer, cell, row, thiz);
    });
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
    return findEleIndex('tr.active');
};

Grid.prototype.findActiveColumnIndex = function () {
    return findEleIndex('td.active');
};

Grid.prototype.addRow = function () {
    var thiz = this;

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

    thiz.reactiveCell();
};

Grid.prototype.removeRow = function () {
    var thiz = this;
    if (thiz.rows.length > 0) {
        var row = thiz.rows[thiz.rows.length - 1];
        row.remove();
        thiz.rows = thiz.rows.slice(0, thiz.rows.length - 1);
    }

    thiz.reactiveCell();
};

Grid.prototype.addColumn = function () {
    var thiz = this;

    for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
        var row = thiz.rows[rowIndex];
        row.addCell();
    }

    thiz.reactiveCell();
};

Grid.prototype.removeColumn = function () {
    var thiz = this;
    for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
        var row = thiz.rows[rowIndex];
        row.removeCell();
    }

    thiz.reactiveCell();
};

Grid.prototype.moveUp = function () {
    var thiz = this;
    var activeIndex = thiz.findActiveRowIndex();
    var previousIndex = activeIndex - 1;

    if (previousIndex >= 0) {
        var row = thiz.rows[activeIndex];
        var previousRow = thiz.rows[previousIndex];

        if (isNotNone(row) && isNotNone(previousRow)) {
            this.rows[activeIndex] = previousRow;
            this.rows[previousIndex] = row;

            row.ele.after(previousRow.ele);
        }
    }

    thiz.reactiveCell();
};

Grid.prototype.moveDown = function () {
    var thiz = this;
    var activeIndex = thiz.findActiveRowIndex();
    var downIndex = activeIndex + 1;

    if (downIndex < thiz.rows.length) {
        var row = thiz.rows[activeIndex];
        var downRow = thiz.rows[downIndex];

        if (isNotNone(row) && isNotNone(downRow)) {
            this.rows[activeIndex] = downRow;
            this.rows[downIndex] = row;

            downRow.ele.after(row.ele);
        }
    }

    thiz.reactiveCell();
};

Grid.prototype.moveLeft = function () {
    var thiz = this;
    var activeIndex = thiz.findActiveColumnIndex();

    for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
        var row = thiz.rows[rowIndex];
        row.moveSiblingCells(activeIndex - 1, activeIndex);
    }

    thiz.reactiveCell();
};

Grid.prototype.moveRight = function () {
    var thiz = this;
    var activeIndex = thiz.findActiveColumnIndex();

    for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
        var row = thiz.rows[rowIndex];
        row.moveSiblingCells(activeIndex, activeIndex + 1);
    }

    thiz.reactiveCell();
};

Grid.prototype.reactiveCell = function () {
    var thiz = this;
    var activeRowIndex = thiz.findActiveRowIndex();
    var activeColumnIndex = thiz.findActiveColumnIndex();
    if (activeRowIndex >= 0 && activeRowIndex < thiz.rows.length) {
        var row = thiz.rows[activeRowIndex];
        if (activeColumnIndex >= 0 && activeColumnIndex < row.cells.length) {
            var cell = row.cells[activeColumnIndex];
            cell.focus();
        }
    }
};

window.Grid = Grid;
