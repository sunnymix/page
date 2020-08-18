function Cell(data, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

    thiz.ele = $([
        '<td',
        '    class="grid-cell"',
        '    style="',
        '        position: relative;',
        '        border: 1px solid #000000;',
        '        border-width: 1px;',
        '        padding: 0px 25px;',
        //'        min-width: 100px;',
        '        ;',
        '    "',
        '>',
        '    <div class="cell-writer"></div>',
        '</td>'
    ].join(''));

    thiz.writer = new Writer(thiz.ele.find('.cell-writer'), thiz.readonly);

    thiz.loadData(data);

    thiz.init();
}

Cell.prototype.init = function () {
    var thiz = this;
    thiz.initBind();
};

Cell.prototype.focus = function () {
    var thiz = this;
    thiz.writer.focus();
};

Cell.prototype.initBind = function () {
    var thiz = this;

    thiz.ele.on('click', function () {
        thiz.setActive();
    });
};

Cell.prototype.setActive = function () {
    var thiz = this;

    var gridEle = thiz.ele.closest('.grid');

    gridEle.find('tr.active').removeClass('active');
    gridEle.find('td.active').removeClass('active');

    thiz.ele.closest('tr').addClass('active');
    thiz.ele.closest('td').addClass('active');
};

Cell.prototype.appendTo = function (place) {
    var thiz = this;
    place.append(thiz.ele);
};

Cell.prototype.loadData = function (data) {
    var thiz = this;

    data = isNone(data) ? [] : data;

    data = isArray(data) ? data : [data];

    if (isEmpty(data)) {
        data.push({});
    }

    thiz.renderData(data);
};

Cell.prototype.renderData = function (content) {
    var thiz = this;
    thiz.writer.setData(content);
};

Cell.prototype.getData = function () {
    var thiz = this;
    return thiz.writer.getData();
};

Cell.prototype.remove = function () {
    var thiz = this;
    thiz.ele.remove();
};

window.Cell = Cell;
