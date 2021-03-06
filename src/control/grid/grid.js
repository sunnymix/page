(function () {
    function Grid(place, data, lock, readonly) {
        var thiz = this;
        thiz.readonly = isTrue(readonly);
        thiz.rows = [];
        thiz.init();
    }

    Grid.prototype.init = function () {
        var thiz = this;
        thiz.initEle();

        if (thiz.readonly) {
            return;
        }
        thiz.createActions();
        thiz.initBind();
        initEvent(thiz, Grid.prototype);
    };

    Grid.prototype.initEle = function () {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.grid',
            position: 'relative',
        });

        thiz.boxEle = new Ele('div', {
            id: '.grid-box',
            position: 'relative',
            padding: '0 0 1px 0',
            overflowX: 'auto',
        });
        thiz.ele.append(thiz.boxEle);

        thiz.tableEle = new Ele('table', {
            id: '.grid-table',
            border: '0px none',
            borderSpacing: 0,
            borderCollapse: 'collapse',
            width: 'auto',
        });
        thiz.boxEle.append(thiz.tableEle);

        thiz.actionsEle = new Ele('div', {
            id: '.grid-actions',
            display: 'none',
            position: 'absolute',
            top: '100%',
            zIndex: 1,
            backgroundColor: '#ffffff',
            border: '1px solid #eeeeee',
            boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.15)',
        });
        thiz.ele.append(thiz.actionsEle);
    };

    Grid.prototype.createActions = function () {
        var thiz = this;

        // Columns:

        var addColumnBtn = new Button('img/table-column-plus-after.png', null, 36, 36, 18, 18);
        addColumnBtn.border('0 1px 0 0').float('left');
        addColumnBtn.appendTo(thiz.actionsEle);
        addColumnBtn.click(function () {
            thiz.addColumn();
        });

        var removeColumnBtn = new Button('img/table-column-remove.png', null, 36, 36, 18, 18);
        removeColumnBtn.border('0 1px 0 0').float('left');
        removeColumnBtn.appendTo(thiz.actionsEle);
        removeColumnBtn.click(function () {
            thiz.removeColumn();
        });

        // Column Moves:

        var moveLeftBtn = new Button('img/chevron-double-left.png', null, 36, 36, 18, 18);
        moveLeftBtn.border('0 1px 0 0').float('left');
        moveLeftBtn.appendTo(thiz.actionsEle);
        moveLeftBtn.click(function () {
            thiz.moveLeft();
        });

        var moveRightBtn = new Button('img/chevron-double-right.png', null, 36, 36, 18, 18);
        moveRightBtn.border('0 1px 0 0').float('left');
        moveRightBtn.appendTo(thiz.actionsEle);
        moveRightBtn.click(function () {
            thiz.moveRight();
        });

        // Rows:

        var addRowBtn = new Button('img/table-row-plus-after.png', null, 36, 36, 18, 18);
        addRowBtn.border('0 1px 0 0').float('left');
        addRowBtn.appendTo(thiz.actionsEle);
        addRowBtn.click(function () {
            thiz.addRow();
        });

        var removeRowBtn = new Button('img/table-row-remove.png', null, 36, 36, 18, 18);
        removeRowBtn.border('0 1px 0 0').float('left');
        removeRowBtn.appendTo(thiz.actionsEle);
        removeRowBtn.click(function () {
            thiz.removeRow();
        });

        // Row Moves:

        var moveUpBtn = new Button('img/chevron-double-up.png', null, 36, 36, 18, 18);
        moveUpBtn.border('0 1px 0 0').float('left');
        moveUpBtn.appendTo(thiz.actionsEle);
        moveUpBtn.click(function () {
            thiz.moveUp();
        });

        var moveDownBtn = new Button('img/chevron-double-down.png', null, 36, 36, 18, 18);
        moveDownBtn.border('0 0 0 0').float('left');
        moveDownBtn.appendTo(thiz.actionsEle);
        moveDownBtn.click(function () {
            thiz.moveDown();
        });

        new Clearfix(thiz.actionsEle);
    };

    Grid.prototype.initBind = function () {
        var thiz = this;
        thiz.ele.on('mouseenter', function () {
            thiz.actionsEle.show();
        }).on('mouseleave', function () {
            thiz.actionsEle.hide();
        });
        // thiz.actionsEle.show();
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
        row.bind('enter', function (block, writer, cell, row) {
            thiz.trigger('enter', block, writer, cell, row, thiz);
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

    Grid.prototype.selectStart = function () {
        var thiz = this;

        for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
            var row = thiz.rows[rowIndex];
            row.selectStart();
        }
    };

    Grid.prototype.selectStop = function () {
        var thiz = this;

        for (var rowIndex = 0; rowIndex < thiz.rows.length; rowIndex++) {
            var row = thiz.rows[rowIndex];
            row.selectStop();
        }
    };

    window.Grid = Grid;
})();
