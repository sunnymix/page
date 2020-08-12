function Paper(p, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

    thiz.paddingHorizontal = Style.Paper.paddingX;

    this.ele = $(
        [
            '<div',
            '    class="paper"',
            '    style="',
            '        max-width: 700px;',
            '        border: 0px solid #bfbfbf;',
            '        border-radius: 0px;',
            '        margin: 0 auto;',
            '        position: relative;',
            '        background-color: #ffffff;',
            '        box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.1);',
            '    "',
            '>',
            '    <div',
            '        class="paper-box"',
            '        style="',
            '            border: 1px solid #bfbfbf;',
            '            border-radius: 0px;',
            '            padding: 40px ' + thiz.paddingHorizontal +';',
            '            min-height: 800px;',
            '            background-color: #ffffff;',
            '        "',
            '    >',
            '        <div class="paper-body">',
            '            <div class="paper-title"></div>',
            '            <div class="paper-writer"></div>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('')
    );
    $(p).replaceWith(thiz.ele);
    thiz.bodyEle = thiz.ele.find('.paper-body');

    thiz.title = new Title(thiz.ele.find('.paper-title'), thiz.readonly);
    thiz.writer = new Writer(thiz.ele.find('.paper-writer'), thiz.readonly);

    thiz.ele.on('click', function (e) {
        thiz.click();
    });

    $(document).on('keydown', 'body', function (e) {
        if (isSaveAction(e)) {
            e.preventDefault();
            thiz.save();
        }

        if (isShowMenuAction(e)) {
            e.preventDefault();
            thiz.toolbar.showMenu();
        }
    });

    $(document).on('keyup', 'body', function (e) {
        // thiz.save(); disable auto save
    });

    this.getPid();
    this.loadData();

    (new Grid()).appendTo(thiz.bodyEle);
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

    if (isNone(thiz.throttleSaveFn)) {
        thiz.throttleSaveFn = throttle(function () {
            thiz.saveData(thiz.getData());
        }, 100);
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
        pid: this.getPid(),
        title: titleData,
        content: contentData
    };
};

Paper.prototype.loadData = function () {
    var thiz = this;

    $.get('/api/paper?pid=' + thiz.getPid(), function (res) {
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
    return 'paper#' + this.getPid();
};

Paper.prototype.getPid = function () {
    var pid = window.location.hash.replace(/^#/, '');

    if (pid.length > 0) {
        return pid;
    }

    window.location.hash = '#' + uuid();
};

Paper.prototype.appendToolbar = function (toolbar) {
    var thiz = this;

    thiz.toolbar = toolbar;
    thiz.ele.append(thiz.toolbar.ele);
}
