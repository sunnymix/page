(function () {
    function Paper(p, readonly, fullscreen) {
        var thiz = this;
        thiz.readonly = isTrue(readonly);
        thiz.fullscreen = isTrue(fullscreen);
        thiz.paddingHorizontal = Style.Paper.paddingX;
        thiz.paddingVertical = Style.Paper.paddingY;
        thiz.maxWidth = thiz.fullscreen ? '100%' : '820px';

        thiz.ele = new Ele('div', {
            id: '.paper',
            position: 'relative',
            zIndex: 1,
            padding: '20px',
        });

        thiz.underEle = new Ele('div', {
            id: '.paper-under',
            position: 'absolute',
        });
        thiz.ele.append(thiz.underEle);

        thiz.layEle = new Ele('div', {
            id: '.paper-lay',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
        });
        thiz.ele.append(thiz.layEle);

        thiz.borderEle = new Ele('div', {
            id: '.paper-border',
            position: 'relative',
            maxWidth: thiz.maxWidth,
            border: '1px solid #f9f9f9',
            margin: '0 auto',
            backgroundColor: '#ffffff',
        });
        thiz.ele.append(thiz.borderEle);

        thiz.boxEle = new Ele('div', {
            id: '.paper-box',
            border: '1px solid #d0d0d0',
            padding: thiz.paddingVertical + ' ' + thiz.paddingHorizontal,
            backgroundColor: '#ffffff',
        });
        thiz.borderEle.append(thiz.boxEle);

        thiz.titleEle = new Ele('div', {
            id: '.paper-title',
            position: 'absolute',
            left: '60px',
            top: '10px',
            zIndex: 1,
        });
        thiz.boxEle.append(thiz.titleEle);

        thiz.bodyEle = new Ele('div', {
            id: '.paper-body',
            minHeight: '800px'
        });
        thiz.boxEle.append(thiz.bodyEle);

        thiz.writerEle = new Ele('div', {
            id: '.paper-writer',
        });
        thiz.bodyEle.append(thiz.writerEle);

        $(p).replaceWith(thiz.ele);

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
        thiz.initSelectAction();
        thiz.initAlert();
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
        thiz.writer = new Writer(thiz.writerEle, thiz.readonly);
        thiz.writer.bind('blockop', function (block, writer) {
            thiz.showBlockop(block);
        });
        thiz.writer.bind('select.start', function (startBlock, writer) {
            thiz.showSelectAction();
        });
    };

    Paper.prototype.initBlockop = function () {
        var thiz = this;
        thiz.blockop = new Blockop();
    };

    Paper.prototype.initAlert = function () {
        var thiz = this;
        thiz.alert = new Alert();
    };

    Paper.prototype.initSelectAction = function () {
        var thiz = this;
        thiz.selectAction = new Action();

        var copyBtn = new Button('img/clone.png', null, 36, 36, 18, 18);
        copyBtn.border('0 1px 0 0').float('left');
        copyBtn.click(function (e, btn) {
            thiz.copy();
        });
        thiz.selectAction.append(copyBtn.ele);

        var closeSelectBtn = new Button('img/times-solid.png', null, 36, 36, 18, 18);
        closeSelectBtn.border('0 0px 0 0').float('left');
        closeSelectBtn.click(function (e, btn) {
            thiz.closeSelect();
        });
        thiz.selectAction.append(closeSelectBtn.ele);

        new Clearfix(closeSelectBtn.ele);
    };

    Paper.prototype.showSelectAction = function () {
        var thiz = this;
        thiz.selectAction.show();
    };

    Paper.prototype.closeSelect = function () {
        var thiz = this;
        thiz.selectAction.hide();
        setTimeout(function () {
            thiz.writer.selectStop();
        }, 50);
    };

    Paper.prototype.copy = function () {
        var thiz = this;

        var selectBlockArray = thiz.writer.getSelectBlocks();
        var exportRes = new MarkdownExport().parseBlocks(selectBlockArray).join('');
        console.log(exportRes);
        thiz.selectAction.copy(exportRes);

        thiz.closeSelect();
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

        thiz.bodyEle.on('mousedown', function (e) {
            e.preventDefault();
            thiz.focusWriter();
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
        var thiz = this;
        if (isNotNone(data)) {
            restPost('/api/paper', data, function (res) {
                if (res.code === 0) {
                    // success icon font: ☑
                    // fail icon font: ☒
                    document.title = data.title;
                    thiz.alertMsg('Saved "' + data.title + '".');
                    if (isFunction(cb)) {
                        cb();
                    }
                } else {
                    thiz.alertMsg('Cannot save "' + data.title + '".(' + res.msg || 'server error' + ')');
                }
            });

            localStorage.setItem(this.cacheId(), data);
        }
    };

    Paper.prototype.alertMsg = function (msg) {
        var thiz = this;
        if (isNotBlank(msg)) {
            thiz.alert.show(msg);
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
        thiz.boxEle.append(thiz.toolbar.ele);
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

    window.Paper = Paper;
})();
