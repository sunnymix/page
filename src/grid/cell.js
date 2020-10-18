(function () {
    function Cell(data, readonly) {
        var thiz = this;
        thiz.readonly = isTrue(readonly);
        thiz.init(data);
    }

    Cell.prototype.init = function (data) {
        var thiz = this;
        thiz.initEle();
        initEvent(thiz, Cell.prototype);
        thiz.initWriter();
        thiz.initBind();
        thiz.initData(data);
    };

    Cell.prototype.initEle = function () {
        var thiz = this;
        thiz.ele = new Ele('td', {
            id: '.grid-cell',
            position: 'relative',
            border: '1px solid #e1e4e8',
            padding: '0 20px',
            verticalAlign: 'middle',
        });

        thiz.writerEle = new Ele('div', {
            id: '.cell-writer',
        });
        thiz.ele.append(thiz.writerEle);
    };

    Cell.prototype.initBind = function () {
        var thiz = this;
        thiz.ele.on('click', function () {
            thiz.setActive();
        });
    };

    Cell.prototype.initWriter = function () {
        var thiz = this;
        thiz.writer = new Writer(thiz.writerEle, thiz.readonly, SCHEMA.GRID);
        thiz.writer.bind('blockop', function (block, writer) {
            thiz.trigger('blockop', block, writer, thiz);
        });
        thiz.writer.bind('enter', function (block, writer) {
            thiz.trigger('enter', block, writer, thiz);
        });
    };

    Cell.prototype.initData = function (data) {
        var thiz = this;
        thiz.loadData(data);
    };

    Cell.prototype.focus = function () {
        var thiz = this;
        thiz.writer.focus();
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

    Cell.prototype.selectStart = function () {
        var thiz = this;
        thiz.writer.selectStart();
    };

    Cell.prototype.selectStop = function () {
        var thiz = this;
        thiz.writer.selectStop();
    };

    window.Cell = Cell;
})();
