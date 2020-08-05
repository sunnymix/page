function Paper(p, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

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
            '        background-color: #ffffff;',
            '    "',
            '>',
            '    <div',
            '        class="paper-box"',
            '        style="',
            '            border: 1px solid #dddddd;',
            '            border-radius: 1px;',
            '            padding: 40px ' + (thiz.readonly ? '60px' : '0px') +';',
            '            min-height: 800px;',
            '            background-color: #ffffff;',
            '        "',
            '    >',
            '        <div class="paper-body">',
            '            <div class="title"></div>',
            '            <div class="writer"></div>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('')
    );
    $(p).replaceWith(thiz.ele);

    thiz.title = new Title(thiz.ele.find('.title'), thiz.readonly);
    thiz.writer = new Writer(thiz.ele.find('.writer'), thiz.readonly);

    thiz.ele.on('click', function (e) {
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

    this.getUid();
    this.loadData();
}

Paper.prototype.type = ELE_TYPE.PAPER;

Paper.prototype.click = function () {
    this.writer.focus();
};

Paper.prototype.throttleSave = function () {
    var thiz = this;

    if (thiz.readonly) {
        return;
    }

    if (isNone(this.throttleSaveFn)) {
        this.throttleSaveFn = throttle(function () {
            thiz.saveData(thiz.getData());
        }, 500);
    }

    thiz.throttleSaveFn();
};

Paper.prototype.save = function () {
    this.throttleSave();
};

Paper.prototype.getData = function () {
    var titleData = this.title.getData();
    var contentData = this.writer.getData();
    return {
        uid: this.getUid(),
        title: titleData,
        content: contentData
    };
};

Paper.prototype.loadData = function () {
    var thiz = this;

    $.get('/api/paper?uid=' + thiz.getUid(), function (res) {
        // load from db
        if (isNotNone(res) && isNotNone(res.data)) {
            thiz.renderData(res.data);
        } else {
            console.error('cannot load from db');
            var paperRaw = localStorage.getItem(thiz.cacheId());
            if (isNotNone(paperRaw)) {
                var paperObj = JSON.parse(paperRaw);
                thiz.renderData(paperObj);
            }
        }
    });
};

Paper.prototype.renderData = function (paperObj) {
    var thiz = this;

    if (isNotNone(paperObj)) {
        thiz.title.setData(paperObj.title);
        thiz.writer.setData(paperObj.content);
    }
}

Paper.prototype.saveData = function (data) {
    if (isNotNone(data)) {
        var dataRaw = JSON.stringify(data);

        $.post('/api/paper', dataRaw, function (res) {
            // save to db
        });

        localStorage.setItem(this.cacheId(), dataRaw);
    }
};

Paper.prototype.cacheId = function () {
    return 'paper#' + this.getUid();
};

Paper.prototype.getUid = function () {
    var uid = window.location.hash.replace(/^#/, '');

    if (uid.length > 0) {
        return uid;
    }

    window.location.hash = '#' + uuid();
};

Paper.prototype.appendToolbar = function (toolbar) {
    this.toolbar = toolbar;
    this.ele.append(this.toolbar.ele);
}
