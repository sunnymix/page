function Paper(p) {
    var thiz = this;

    var hash = window.location.hash.replace(/^#/, '');
    if (hash.length > 0) {
        this.id = hash;
    } else {
        this.id = uuid();
        window.location.hash = '#' + this.id;
    }

    this.ele = $(
        [
            '<div',
            '    class="paper"',
            '    style="',
            '        max-width: 700px;',
            '        border: 1px solid #f8f8f8;',
            '        border-radius: 2px;',
            '        margin: 0 auto;',
            '        position: relative;',
            '    "',
            '>',
            '    <div',
            '        class="paper-box"',
            '        style="',
            '            border: 1px solid #dddddd;',
            '            border-radius: 1px;',
            '            padding: 50px 0;',
            '            min-height: 800px;',
            '        "',
            '    >',
            '        <div class="title"></div>',
            '        <div class="writer"></div>',
            '    </div>',
            '</div>'
        ].join('')
    );
    $(p).replaceWith(this.ele);

    this.title = new Title(this.ele.find('.title'));
    this.writer = new Writer(this.ele.find('.writer'));

    this.ele.on('click', function (e) {
        thiz.click();
    });

    $(document).on('keydown', 'body', function (e) {
        if (isSaveAction(e)) {
            e.preventDefault();
        }
    });

    $(document).on('keyup', 'body', function (e) {
        thiz.save();
    });

    this.loadData();
}

Paper.prototype.type = ELE_TYPE.PAPER;

Paper.prototype.click = function () {
    this.writer.focus();
};

Paper.prototype.throttleSave = function () {
    var thiz = this;

    if (isNone(this.throttleSaveFn)) {
        this.throttleSaveFn = throttle(function () {
            thiz.saveData(thiz.getData());
        }, 1000);
    }

    thiz.throttleSaveFn();
};

Paper.prototype.save = function () {
    this.throttleSave();
};

Paper.prototype.getData = function () {
    var titleData = this.title.getData();
    var writerData = this.writer.getData();
    return {
        title: titleData,
        writer: writerData
    };
};

Paper.prototype.loadData = function () {
    var paperData = localStorage.getItem(this.cacheId());
    if (isNotNone(paperData)) {
        var paperObj = JSON.parse(paperData);
        this.title.setData(paperObj.title);
        this.writer.setData(paperObj.writer);
    }
};

Paper.prototype.saveData = function (data) {
    if (isNotNone(data)) {
        var dataRaw = JSON.stringify(data);
        localStorage.setItem(this.cacheId(), dataRaw);
    }
};

Paper.prototype.cacheId = function () {
    return 'paper#' + this.getId();
};

Paper.prototype.getId = function () {
    var id = window.location.hash.replace(/^#/, '');

    if (id.length > 0) {
        return id;
    }
    
    window.location.hash = '#' + uuid();
};

Paper.prototype.appendToolbar = function (toolbar) {
    this.toolbar = toolbar;
    this.ele.append(this.toolbar.ele);
}
