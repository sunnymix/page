function Cell(data, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

    thiz.ele = $([
        '<td',
        '    class=""',
        '    style="',
        '        position: relative;',
        '        border: 1px solid #000000;',
        '        border-width: 1px;',
        '        padding: 0px 24px;',
        //'        min-width: 100px;',
        '        ;',
        '    "',
        '>',
        '    <div class="cell-writer"></div>',
        '</td>'
    ].join(''));

    thiz.writer = new Writer(thiz.ele.find('.cell-writer'), thiz.readonly);

    thiz.loadData(data);
}

Cell.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Cell.prototype.loadData = function (data) {
    var thiz = this;

    if (isNone(data)) {
        return;
    }

    // fixme extract data

    thiz.renderData([data]);
};

Cell.prototype.renderData = function (content) {
    var thiz = this;

    thiz.writer.setData(content);
};

Cell.prototype.getData = function () {
    var thiz = this;

    return thiz.writer.getData();
};

window.Cell = Cell;
