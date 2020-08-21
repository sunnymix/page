function Paper(p, readonly, fullscreen) {
    var thiz = this;
    thiz.readonly = isTrue(readonly);
    thiz.fullscreen = isTrue(fullscreen);
    thiz.paddingHorizontal = Style.Paper.paddingX;
    thiz.paddingVertical = Style.Paper.paddingY;
    thiz.maxWidth = thiz.fullscreen ? '100%' : '820px';

    this.ele = $(
        [
            '<div',
            '    class="paper"',
            '    style="',
            '        max-width: ' + thiz.maxWidth +';',
            '        border: 0px solid #f9f9f9;',
            '        border-radius: 0px;',
            '        margin: 0 auto;',
            '        position: relative;',
            '        background-color: #ffffff;',
            //'        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.99);',
            '    "',
            '>',
            '    <div',
            '        class="paper-box"',
            '        style="',
            '            border: 0px solid #d0d0d0;',
            '            border-radius: 0px;',
            '            padding: ' + thiz.paddingVertical + ' ' + thiz.paddingHorizontal +';',
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
        thiz.onClick();
    });

    $(document).on('keydown', 'body', function (e) {
        if (isSaveAction(e)) {
            e.preventDefault();
            thiz.save();
        }
    });

    $(document).on('keyup', 'body', function (e) {
        // thiz.save(); disable auto save
    });

    this.getPid();
    this.loadData();

    // (new Grid()).appendTo(thiz.bodyEle);
}

Paper.prototype.type = ELE_TYPE.PAPER;

Paper.prototype.onClick = function () {
    
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
        thiz.title.setData(paperObj.title);
        thiz.writer.setData(paperObj.content);
    }
}

Paper.prototype.saveData = function (data) {
    if (isNotNone(data)) {
        restPost('/api/paper', data, function (res) {
            if (res.code === 0) {
                // todo: success flush
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

Paper.prototype.appendToolbar = function (toolbar) {
    var thiz = this;
    thiz.toolbar = toolbar;
    thiz.ele.append(thiz.toolbar.ele);
};
