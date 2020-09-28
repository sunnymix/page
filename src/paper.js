function Paper(p, readonly, fullscreen) {
    var thiz = this;
    thiz.readonly = isTrue(readonly);
    thiz.fullscreen = isTrue(fullscreen);
    thiz.paddingHorizontal = Style.Paper.paddingX;
    thiz.paddingVertical = Style.Paper.paddingY;
    thiz.maxWidth = thiz.fullscreen ? '100%' : '820px';

    thiz.ele = $(
        [
            '<div',
            '    class="paper"',
            '    style="',
            '        max-width: ' + thiz.maxWidth + ';',
            '        border: 1px solid #f9f9f9;',
            '        border-radius: 0px;',
            '        margin: 0 auto;',
            '        position: relative;',
            '        background-color: #ffffff;',
            '    "',
            '>',
            '    <div',
            '        class="paper-box"',
            '        style="',
            '            border: 1px solid #d0d0d0;',
            '            border-radius: 0px;',
            '            padding: ' + thiz.paddingVertical + ' ' + thiz.paddingHorizontal + ';',
            '            min-height: 800px;',
            '            background-color: #ffffff;',
            '        "',
            '    >',
            '        <div',
            '            class="paper-title"',
            '            style="',
            '                z-index: 1;',
            '                position: absolute;',
            '                left: 10px;',
            '                top: 10px;',
            '                ;',
            '            "',
            '        ></div>',
            '        <div ',
            '            class="paper-body"',
            '            style="',
            // '                padding: 0 20px',
            '            "',
            '        >',
            '            <div',
            '                class="paper-writer"',
            '                style="',
            // '                    padding: 0 15px',
            '                "',
            '            ></div>',
            '        </div>',
            '    </div>',
            '</div>'
        ].join('')
    );
    $(p).replaceWith(thiz.ele);
    thiz.bodyEle = thiz.ele.find('.paper-body');

    thiz.getPid();
    thiz.init();
    thiz.loadData();
}

Paper.prototype.type = ELE_TYPE.PAPER;

Paper.prototype.init = function () {
    var thiz = this;
    thiz.initTitle();
    thiz.initWriter();
    thiz.initBlockop();
    thiz.initBind();
};

Paper.prototype.initTitle = function () {
    var thiz = this;
    thiz.titleEle = thiz.ele.find('.paper-title');
    thiz.title = new Title(thiz.titleEle, thiz.readonly);
    thiz.title.bind('enter', function (title) {
        thiz.focusWriter();
    });
};

Paper.prototype.initWriter = function () {
    var thiz = this;
    thiz.writerEle = thiz.ele.find('.paper-writer');
    thiz.writer = new Writer(thiz.writerEle, thiz.readonly);
    thiz.writer.bind('blockop', function (block, writer) {
        thiz.showBlockop(block);
    });
};

Paper.prototype.initBlockop = function () {
    var thiz = this;
    thiz.blockop = new Blockop();
};

Paper.prototype.initBind = function () {
    var thiz = this;
    $(document).on('keydown', 'body', function (e) {
        if (isSaveAction(e)) {
            e.preventDefault();
            thiz.save();
        }
    }).on('keyup', 'body', function (e) {
        // thiz.save(); disable auto save
    });
};

Paper.prototype.showBlockop = function (block) {
    var thiz = this;
    thiz.blockop.show(block);
};

Paper.prototype.focusWriter = function () {
    var thiz = this;
    thiz.writer.focus();
};

Paper.prototype.focusTitle = function () {
    var thiz = this;
    thiz.title.focus();
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
    var thiz = this;
    return {
        pid: this.getPid(),
        title: thiz.getTitleData(),
        content: thiz.getContentData()
    };
};

Paper.prototype.getTitleData = function () {
    var thiz = this;
    var title = thiz.title.getData();
    return isEmpty(title) ? 'Title' : title;
};

Paper.prototype.getContentData = function () {
    var thiz = this;
    return thiz.writer.getData();
};

Paper.prototype.loadData = function () {
    var thiz = this;

    var query = 'pid=' + thiz.getPid();

    restGet('/api/paper?' + query, function (res) {
        if (res.code === 0) {
            thiz.renderData(res.data);
        } else {
            alert(res.msg || 'server error');
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
        document.title = paperObj.title;
        thiz.title.setData(paperObj.title);
        thiz.writer.setData(paperObj.content);
    }
    thiz.focusTitle();
}

Paper.prototype.saveData = function (data, cb) {
    if (isNotNone(data)) {
        restPost('/api/paper', data, function (res) {
            if (res.code === 0) {
                // todo: success flush
                // success icon font: ☑
                // fail icon font: ☒
                document.title = '☑ ' + data.title;
                setTimeout(function () {
                    document.title = data.title;
                }, 1000);
                if (isFunction(cb)) {
                    cb();
                }
            } else {
                alert(res.msg || 'server error');
            }
        });

        localStorage.setItem(this.cacheId(), data);
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

Paper.prototype.addToolbar = function (toolbar) {
    var thiz = this;
    thiz.toolbar = toolbar;
    thiz.ele.append(thiz.toolbar.ele);
};

Paper.prototype.getHtmlData = function () {
    var thiz = this;
    return thiz.writerEle[0].outerHTML;
};

Paper.prototype.clone = function () {
    var thiz = this;
    var newPid = uuid();
    var data = thiz.getData();
    data.pid = newPid;
    data.title += '-Copy';
    thiz.saveData(data, function () {
        window.location.hash = '#' + data.pid;
    });
};
