function Cell(data, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

    thiz.ele = $([
        '<td',
        '    class=""',
        '    style="',
        '        position: relative;',
        '        border: 1px solid #eeeeee;',
        '        border-width: 1px;',
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

window.Cell = Cell;
