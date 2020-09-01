function Block(p, data, isLock, readonly, context) {
    var thiz = this;

    thiz.id = uuid();

    var dataObj = thiz.extractData(data);

    thiz.schema = dataObj.schema;
    thiz.style = getStyle(thiz.schema);
    thiz.isLock = isTrue(isLock);

    thiz.readonly = isTrue(readonly);
    thiz.context = isNotNone(context) ? context : SCHEMA.PAPER;

    thiz.ele = $(
        [
            '<div',
            '    class="block"',
            '    style="',
            '        position: relative;',
            '    "',
            '>',
            '    <div',
            '        class="block-actions"',
            '        style="',
            '            position: absolute;',
            '            top: 0px;',
            '            bottom: 0px;',
            '            left: -25px;',
            '            right: -25px;',
            '            ;',
            '        "></div>',
            '    <div',
            '        class="block-box"',
            '        style="',
            '            position: relative;',
            '        "',
            '        >',
            '        <div',
            '            class="block-border"',
            '            style="',
            '                position: relative;',
            '                ;',
            '            "',
            '        >',
            '            <div',
            '                class="block-task"',
            '                style="',
            '                    position: absolute;',
            '                    display: none;',
            '                    left: 0;',
            '                    top: 50%;',
            '                    margin-top: -6px;',
            '                    width: 10px;',
            '                    height: 10px;',
            '                    border: 1px solid #000000;',
            '                    border-radius: 50%;',
            '                    cursor: pointer;',
            '                "',
            '            >',
            '                <div',
            '                    class="block-task-ok"',
            '                    style="',
            '                        position: absolute;',
            '                        display: none;',
            '                        left: 0px;',
            '                        right: 0px;',
            '                        top: 0px;',
            '                        bottom: 0px;',
            '                        background-color: #000000;',
            '                        border-radius: 50%;',
            '                    "',
            '                 >',
            '                    <div',
            '                        class="block-task-ok-check"',
            '                        style="',
            '                            position: absolute;',
            '                            left: 1px;',
            '                            top: 3px;',
            '                            border-left: 1px solid #ffffff;',
            '                            border-bottom: 1px solid #ffffff;',
            '                            border-radius: 0px;',
            '                            width: 7px;',
            '                            height: 2px;',
            '                            transform: rotate(-50deg);',
            '                        "',
            '                    ></div>',
            '                </div>',
            '            </div>',
            '            <div class="block-content" ' + (thiz.readonly ? '' : 'contenteditable="true"') + '></div>',
            '        </div>',
            '    </div>',
            '    <div',
            '        class="block-attach"',
            '        style="',
            '            position: relative;',
            '        ">',
            '        <div ',
            '            class="block-attach-box"',
            '            style="',
            '                display: block;',
            '            "></div>',
            '    </div>',
            '</div>'
        ].join('')
    );

    thiz.boxEle = thiz.ele.find('.block-box');
    thiz.borderEle = thiz.ele.find('.block-border');
    thiz.actionsEle = thiz.ele.find('.block-actions');
    thiz.taskEle = thiz.ele.find('.block-task');
    thiz.taskOkEle = thiz.ele.find('.block-task-ok');
    thiz.setCheck(dataObj.check);

    thiz.attachEle = thiz.ele.find('.block-attach');
    thiz.setAttach(dataObj.attach);

    thiz.initActions();
    thiz.initTask();

    thiz.contentEle = thiz.ele.find('.block-content');

    thiz.loadStyle();
    thiz.setData(dataObj.text);

    thiz.ele.on('blur', function (e) {
        thiz.blur();
    });

    thiz.ele.on('keydown', function (e) {
        if (e.keyCode == KEYCODE.ENTER) {
            e.preventDefault();
            thiz.enter();
            return false;
        }

        if (e.keyCode == KEYCODE.BACKSPACE) {
            if (thiz.contentEle.text().length == 0) {
                thiz.remove();
            }
        }

        if (e.keyCode == KEYCODE.B && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.TEXT);
        }

        if (e.keyCode == KEYCODE.NUM1 && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.H1);
        }

        if (e.keyCode == KEYCODE.NUM2 && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.H2);
        }

        if (e.keyCode == KEYCODE.NUM3 && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.H3);
        }

        if (e.keyCode == KEYCODE.C && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.CODE);
        }

        if (e.keyCode == KEYCODE.G && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.GRID);
        }

        if (e.keyCode == KEYCODE.K
            && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.TASK);
        }

        if (e.keyCode == KEYCODE.UP) {
            if (isOption(e)) {
                e.preventDefault();
                e.stopPropagation();
                thiz.moveUp();
            } else {
                thiz.jumpUp();
            }
        }

        if (e.keyCode == KEYCODE.DOWN) {
            if (isOption(e)) {
                e.preventDefault();
                e.stopPropagation();
                thiz.moveDown();
            } else {
                thiz.jumpDown();
            }
        }

        if (e.keyCode == KEYCODE.BACKSPACE
            && isCommandOrControl(e)
            && isShift(e)) {
            e.preventDefault();
            thiz.remove();
        }

        if (e.keyCode == KEYCODE.C
            && isCommandAndControl(e)) {
            e.preventDefault();
            thiz.clone();
        }
    });

    thiz.ele.on('click', function (e) {
        thiz.focus();
    });

    $(p).replaceWith(thiz.ele);

    initEvent(thiz, Block.prototype);
};

Block.prototype.type = ELE_TYPE.BLOCK;

Block.prototype.remove = function () {
    var thiz = this;
    thiz.ele.remove();
};

Block.prototype.clone = function () {
    var thiz = this;
    thiz.trigger('clone');
};

Block.prototype.appendTo = function (place) {
    this.ele.appendTo(place);
};

Block.prototype.replaceTo = function (place) {
    place.replaceWith(this.ele);
};

Block.prototype.setSchema = function (schema) {
    var thiz = this;

    if (thiz.isLock) {
        return;
    }

    if (isNotEmpty(schema)) {
        thiz.schema = schema;
        thiz.loadStyle();

        if (schema === SCHEMA.GRID) {
            thiz.switchToGrid();
            thiz.setData('[]');
        }
    }
};

Block.prototype.switchToGrid = function () {
    var thiz = this;
    thiz.contentEle.empty();
    thiz.contentEle.prop('contenteditable', false);
    thiz.grid = new Grid(null, null, false, thiz.readonly);
    thiz.grid.appendTo(thiz.contentEle);
    if (thiz.readonly) {
        return;
    }
    thiz.grid.bind('blockop', function (block, writer, cell, row, grid) {
        thiz.trigger('blockop', block, writer, cell, row, grid, thiz);
    });
};

Block.prototype.getGridData = function () {
    var thiz = this;

    var data = '';

    if (isNotNone(thiz.grid)) {
        data = thiz.grid.getData();
    }

    return data;
};

Block.prototype.initActions = function () {
    var thiz = this;

    if (thiz.readonly) {
        thiz.actionsEle.remove();
        return;
    }

    thiz.opBtn = new Button('img/ellipsis-v-solid.png', null, 22, 12, 18, null);
    thiz.opBtn.hide();
    thiz.opBtn.middle();
    thiz.opBtn.appendTo(thiz.actionsEle);

    thiz.ele.on('mouseenter', function (e) {
        thiz.opBtn.show();
    }).on('mouseleave', function (e) {
        thiz.opBtn.hide();
    });

    thiz.opBtn.click(function (e) {
        thiz.trigger('blockop', thiz);
    });
};

Block.prototype.showAttach = function () {
    var thiz = this;
    var url = prompt('add attachement ...', '');
    thiz.setAttach(url);
};

Block.prototype.initTask = function () {
    var thiz = this;
    thiz.taskEle.on('mouseenter', function (e) {
        // todo
    }).on('mouseleave', function (e) {
        // todo
    }).on('click', function (e) {
        thiz.toggleCheck();
    });
};

Block.prototype.loadStyle = function () {
    var thiz = this;

    var style = getStyle(thiz.schema);

    if (isNotNone(style)) {
        // if in grid context then clear block content padding
        if (thiz.isGridContext()) {
            style.contentPaddingLeft = 0;
        }

        thiz.ele.prop('style', style.toString());

        thiz.ele.css({
            borderBottomWidth: 0,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            paddingLeft: '0px',
            paddingRight: '0px',
            cursor: 'text',
            backgroundColor: style.backgroundColor,
        });

        thiz.borderEle.css({
            borderBottom: style.borderBottom
        });

        var contentPaddingLeft = (parsePxToNum(style.paddingLeft)
            + parsePxToNum(style.contentPaddingLeft));

        var contentPaddingRight = (parsePxToNum(style.paddingRight)
            + parsePxToNum(style.contentPaddingRight));

        if (thiz.isTask()) {
            contentPaddingLeft += 20;
            thiz.taskEle.show();
        } else {
            thiz.taskEle.hide();
        }

        thiz.taskEle.css({
            left: style.contentPaddingLeft
        });

        thiz.attachEle.css({
            paddingLeft: style.contentPaddingLeft
        });

        thiz.contentEle.css({
            // do not set fontfamily, will cause some issue
            wordBreak: style.wordBreak,
            wordWrap: style.wordWrap,
            fontWeight: style.fontWeight,
            fontSize: style.fontSize,
            minHeight: style.minHeight,
            lineHeight: style.lineHeight,
            color: style.color,
            paddingTop: style.contentPaddingTop,
            paddingBottom: style.contentPaddingBottom,
            paddingLeft: contentPaddingLeft + 'px',
            paddingRight: contentPaddingRight + 'px',
            marginLeft: '-' + style.paddingLeft,
            marginRight: '-' + style.paddingRight
        });

        if (thiz.isGridContext()) {
            thiz.contentEle.css({
                wordBreak: "keep-all",
                wordWrap: 'normal'
            });
        }
    }
};

Block.prototype.blur = function () {
};

Block.prototype.focus = function () {
    this.contentEle.focus();
};

Block.prototype.enter = function () {
    var thiz = this;
    thiz.trigger('enter', thiz);
};

Block.prototype.moveUp = function () {
    var thiz = this;
    thiz.trigger('moveup', thiz);
};

Block.prototype.moveDown = function () {
    var thiz = this;
    thiz.trigger('movedown', thiz);
};

Block.prototype.jumpUp = function () {
    var thiz = this;
    if (getCaretPosition(thiz.contentEle[0]) <= 0) {
        thiz.trigger('jumpup', thiz);
    }
};

Block.prototype.jumpDown = function () {
    var thiz = this;
    if (getCaretPosition(thiz.contentEle[0]) >= thiz.contentEle.text().length) {
        thiz.trigger('jumpdown', thiz);
    }
};

Block.prototype.remove = function () {
    var thiz = this;
    thiz.trigger('remove', thiz);
};

Block.prototype.setData = function (content) {
    var thiz = this;

    if (thiz.schema === SCHEMA.GRID) {
        thiz.setGridData(content);
    } else {
        thiz.contentEle.text(content);
    }
};

Block.prototype.setGridData = function (content) {
    var thiz = this;

    if (isNone(thiz.grid)) {
        thiz.switchToGrid();
    }

    thiz.grid.setData(content);
};

Block.prototype.getData = function () {
    var thiz = this;

    var defaultData = thiz.defaultData();

    return $.extend({}, defaultData, {
        schema: thiz.schema,
        text: thiz.getContentData(),
        attach: thiz.getAttachData(),
        check: thiz.getCheckData()
    });
};

Block.prototype.getContentData = function () {
    var thiz = this;

    var data = '';

    if (thiz.schema === SCHEMA.GRID) {
        data = thiz.getGridData();
    } else {
        data = thiz.contentEle.text();
    }

    return data;
};

Block.prototype.getCheckData = function () {
    return this.isCheck() ? 1 : 0;
};

Block.prototype.isCheck = function () {
    var thiz = this;
    return thiz.taskOkEle.is(":visible");
};

Block.prototype.toggleCheck = function () {
    var thiz = this;
    var isCheck = thiz.isCheck();
    thiz.setCheck(!isCheck);
};

Block.prototype.setCheck = function (check) {
    var thiz = this;
    if (thiz.isTask()) {
        if (+check > 0) {
            thiz.taskOkEle.show();
        } else {
            thiz.taskOkEle.hide();
        }
    }
};

Block.prototype.defaultData = function () {
    return {
        schema: SCHEMA.TEXT,
        text: '',
        attach: '',
        check: 0
    };
};

Block.prototype.extractData = function (data) {
    var defaultData = this.defaultData();

    if (isObject(data)) {
        return $.extend({}, defaultData, data);
    }

    if (isString(data)) {
        try {
            var dataObj = data.startsWith('{') ? JSON.parse(data) : {
                text: data
            };
            return $.extend({}, defaultData, dataObj);
        } catch (error) {
            return $.extend({}, defaultData, {
                text: data
            });
        }
    }

    return defaultData;
};

Block.prototype.setAttach = function (url) {
    var attachBox = this.attachEle.find('.block-attach-box');

    if (isNotEmpty(url)) {
        this.attach = new Attach(url);
        this.attach.htmlTo(attachBox);
    }
};

Block.prototype.getAttachData = function () {
    if (isNotNone(this.attach)) {
        return this.attach.getUrl();
    }
    return "";
};

Block.prototype.isTask = function () {
    return this.schema === SCHEMA.TASK;
};

Block.prototype.isGridContext = function () {
    return this.context === SCHEMA.GRID;
};

window.Block = Block;
