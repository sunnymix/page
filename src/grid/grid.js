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

    thiz.rows = [];

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
        ','
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
            var row = thiz.createRow(rowData);
            thiz.rows.push(row);
        }
    }
};

Grid.prototype.createRow = function (rowData) {
    var thiz = this;

    var row = new Row(rowData);
    row.appendTo(thiz.tableEle);

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
    console.log(rowsData);
};

Grid.prototype.extractJsonString = function (jsonString) {
    var rowsData = [];

    if (isNotEmpty(jsonString)) {
        try {
            var obj = JSON.parse(jsonString);
            if (isArray(obj)) {
                rowsData = obj;
            }
        } catch (error) {
            console.error(error);
        }
    }

    return rowsData;
};

Grid.prototype.renderData = function (rows) {
    var thiz = this;
};

window.Grid = Grid;
