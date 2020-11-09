(function () {
    function Page(place, readonly, fullscreen) {
        var thiz = this;
        thiz.readonly = isTrue(readonly);
        thiz.fullscreen = isTrue(fullscreen);
        thiz.paddingHorizontal = Style.Page.paddingX;
        thiz.paddingVertical = Style.Page.paddingY;
        thiz.maxWidth = thiz.fullscreen ? '100%' : '820px';

        thiz.ele = new Ele('div', {
            id: '.page',
            position: 'relative',
            zIndex: 1,
            padding: '0px',
        });

        thiz.underEle = new Ele('div', {
            id: '.page-under',
            position: 'absolute',
        });
        thiz.ele.append(thiz.underEle);

        thiz.layEle = new Ele('div', {
            id: '.page-lay',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
        });
        thiz.ele.append(thiz.layEle);

        thiz.borderEle = new Ele('div', {
            id: '.page-border',
            position: 'relative',
            maxWidth: thiz.maxWidth,
            border: '0px solid #f9f9f9',
            margin: '0 auto',
            backgroundColor: '#ffffff',
        });
        thiz.ele.append(thiz.borderEle);

        thiz.boxEle = new Ele('div', {
            id: '.page-box',
            border: '0px solid #d0d0d0',
            padding: thiz.paddingVertical + ' ' + thiz.paddingHorizontal,
            backgroundColor: '#ffffff',
        });
        thiz.borderEle.append(thiz.boxEle);

        thiz.titleEle = new Ele('div', {
            id: '.page-title',
            position: 'absolute',
            left: '60px',
            right: '60px',
            top: '20px',
            zIndex: 1,
        });
        thiz.boxEle.append(thiz.titleEle);

        thiz.bodyEle = new Ele('div', {
            id: '.page-body',
            minHeight: '800px'
        });
        thiz.boxEle.append(thiz.bodyEle);

        thiz.writerEle = new Ele('div', {
            id: '.page-writer',
        });
        thiz.bodyEle.append(thiz.writerEle);

        $(place).replaceWith(thiz.ele);

        thiz.getPid();
        thiz.init();
        thiz.loadData();
    }

    Page.prototype.type = ELE_TYPE.PAPER;

    Page.prototype.init = function () {
        var thiz = this;
        thiz.initTitle();
        thiz.initWriter();
        thiz.initBlockop();
        thiz.initSelectAction();
        thiz.initAlert();
        thiz.initBind();
        initEvent(thiz, Page.prototype);
    };

    Page.prototype.initTitle = function () {
        var thiz = this;
        thiz.titleEle = thiz.ele.find('.page-title');
        thiz.title = new Title(thiz.titleEle, thiz.readonly);
        thiz.title.bind('enter', function (title) {
            thiz.focusWriter();
        });
    };

    Page.prototype.initWriter = function () {
        var thiz = this;
        thiz.writer = new Writer(thiz.writerEle, thiz.readonly);
        thiz.writer.bind('blockop', function (block, writer) {
            thiz.showBlockop(block);
        });
        thiz.writer.bind('select.start', function (startBlock, writer) {
            thiz.showSelectAction();
        });
    };

    Page.prototype.initBlockop = function () {
        var thiz = this;
        thiz.blockop = new Blockop();
    };

    Page.prototype.initAlert = function () {
        var thiz = this;
        thiz.alert = new Alert();
    };

    Page.prototype.initSelectAction = function () {
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

    Page.prototype.showSelectAction = function () {
        var thiz = this;
        thiz.selectAction.show();
    };

    Page.prototype.closeSelect = function () {
        var thiz = this;
        thiz.selectAction.hide();
        setTimeout(function () {
            thiz.writer.selectStop();
        }, 1);
    };

    Page.prototype.copy = function () {
        var thiz = this;

        var selectBlockArray = thiz.writer.getSelectBlocks();
        var exportRes = new MarkdownExport().parseBlocks(selectBlockArray).join('');
        console.log(exportRes);
        thiz.selectAction.copy(exportRes);

        thiz.closeSelect();
    };

    Page.prototype.initBind = function () {
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

    Page.prototype.showBlockop = function (block) {
        var thiz = this;
        thiz.blockop.show(block);
    };

    Page.prototype.focusWriter = function () {
        var thiz = this;
        thiz.writer.focus();
    };

    Page.prototype.focusTitle = function () {
        var thiz = this;
        thiz.title.focus();
    };

    Page.prototype.throttleSave = function (cb) {
        var thiz = this;

        if (thiz.readonly) {
            return;
        }

        if (isNone(thiz.throttleSaveFn)) {
            thiz.throttleSaveFn = throttle(function (cb) {
                thiz.saveData(thiz.getData(), cb);
            }, 100);
        }

        thiz.throttleSaveFn(cb);
    };

    Page.prototype.save = function (cb) {
        this.throttleSave(cb);
    };

    Page.prototype.getData = function () {
        var thiz = this;
        return {
            pid: this.getPid(),
            title: thiz.getTitleData(),
            content: thiz.getContentData()
        };
    };

    Page.prototype.getTitleData = function () {
        var thiz = this;
        var title = thiz.title.getData();
        return isEmpty(title) ? '' : title;
    };

    Page.prototype.getContentData = function () {
        var thiz = this;
        return thiz.writer.getData();
    };

    Page.prototype.loadData = function () {
        var thiz = this;

        var query = 'pid=' + thiz.getPid();

        restGet('http://page.me/api/page?' + query, function (res) {
            if (res.code === 0) {
                thiz.renderData(res.data);
                thiz.trigger('load', res.data);
            } else {
                alert(res.msg || 'server error');
                var pageRaw = localStorage.getItem(thiz.cacheId());
                if (isNotNone(pageRaw)) {
                    var pageObj = JSON.parse(pageRaw);
                    thiz.renderData(pageObj);
                }
            }
        });
    };

    Page.prototype.renderData = function (pageObj) {
        var thiz = this;
        if (isNotNone(pageObj)) {
            document.title = pageObj.title;
            thiz.title.setData(pageObj.title);
            thiz.writer.setData(pageObj.content);
        }
        thiz.focusTitle();
    }

    Page.prototype.saveData = function (data, cb) {
        var thiz = this;
        if (isNotNone(data) && isNotBlank(data.title)) {
            restPost('http://page.me/api/page', data, function (res) {
                if (res.code === 0) {
                    document.title = data.title;
                    thiz.alertMsg('Saved!');
                    if (isFunction(cb)) {
                        cb();
                    }
                    thiz.trigger('save', data);
                } else {
                    thiz.alertMsg('Cannot save "' + data.title + '".(' + res.msg || 'server error' + ')');
                }
            });

            localStorage.setItem(this.cacheId(), data);
        }
    };

    Page.prototype.alertMsg = function (msg) {
        var thiz = this;
        if (isNotBlank(msg)) {
            thiz.alert.show(msg);
        }
    };

    Page.prototype.cacheId = function () {
        return 'page#' + this.getPid();
    };

    Page.prototype.getPid = function () {
        var pid = window.location.hash.replace(/^#/, '');

        if (pid.length > 0) {
            return pid;
        }

        window.location.hash = '#' + uuid();
    };

    Page.prototype.addToolbar = function (toolbar) {
        var thiz = this;
        thiz.toolbar = toolbar;
    };

    Page.prototype.getHtmlData = function () {
        var thiz = this;
        return thiz.writerEle[0].outerHTML;
    };

    Page.prototype.clone = function () {
        var thiz = this;
        var newPid = uuid();
        var data = thiz.getData();
        data.pid = newPid;
        data.title += '-Copy';
        thiz.saveData(data, function () {
            window.location.hash = '#' + data.pid;
        });
    };

    window.Page = Page;
})();
