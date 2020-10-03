function Block(writer, p, data, isLock, readonly, context, previousBlock) {
    var thiz = this;
    thiz.isBlock = true;
    thiz.writer = writer;
    
    thiz.id = uuid();
    var dataObj = thiz.extractData(data);

    thiz.schema = dataObj.schema;
    thiz.isLock = isTrue(isLock);

    thiz.readonly = isTrue(readonly);
    thiz.context = isNotNone(context) ? context : SCHEMA.PAPER;
    thiz.previousBlock = previousBlock;

    thiz.initEle(p, dataObj);

    thiz.initBind();
    initEvent(thiz, Block.prototype);
};

Block.prototype.type = ELE_TYPE.BLOCK;

Block.prototype.initEle = function (p, dataObj) {
    var thiz = this;

    thiz.ele = $(
        [
            '<div',
            '    class="block"',
            '    style="',
            '        position: relative;',
            '        ;',
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
            '            class="block-background"',
            '            style="',
            '                position: absolute;',
            '                left: 0px;',
            '                right: 0px;',
            '                top: 0px;',
            '                bottom: 0px;',
            '            "',
            '        ></div>',
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
            '                    left: 0px;',
            '                    top: 2px;',
            '                    width: 14px;',
            '                    height: 14px;',
            '                    border-radius: 50%;',
            '                    cursor: pointer;',
            '                "',
            '            >',
            '                <div',
            '                    class="block-task-uncheck"',
            '                    style="',
            '                        position: absolute;',
            '                        left: 0px;',
            '                        right: 0px;',
            '                        top: 0px;',
            '                        bottom: 0px;',
            '                        background-color: #ffffff;',
            '                        border: 1px solid #aaaaaa;',
            '                        border-radius: 1px;',
            '                    "',
            '                 ></div>',
            '                <div',
            '                    class="block-task-check"',
            '                    style="',
            '                        position: absolute;',
            '                        display: none;',
            '                        left: 0px;',
            '                        right: 0px;',
            '                        top: 0px;',
            '                        bottom: 0px;',
            '                        background-color: #aaaaaa;',
            '                        border-radius: 1px;',
            '                    "',
            '                 >',
            '                    <div',
            '                        class=""',
            '                        style="',
            '                            position: absolute;',
            '                            left: 4px;',
            '                            top: 5px;',
            '                            border-left: 1px solid #ffffff;',
            '                            border-bottom: 1px solid #ffffff;',
            '                            border-radius: 0px;',
            '                            width: 5px;',
            '                            height: 2px;',
            '                            transform: rotate(-50deg);',
            '                        "',
            '                    ></div>',
            '                </div>',
            '            </div>',
            '        </div>',
            '    </div>',
            '    <div',
            '        class="block-tags"',
            '        style="',
            '            position: absolute;',
            '            top: 2px;',
            '            bottom: 0px;',
            '            left: 0;',
            '        ">',
            '        <div',
            '            class="block-priority-tag"',
            '            style="',
            '                position: absolute;',
            '                display: none;',
            '                left: 0px;',
            '                top: 0;',
            '                width: 20px;',
            '                height: 14px;',
            '                line-height: 14px;',
            '                margin-top: 0;',
            '                text-align: center;',
            '                color: #ffffff;',
            '                border-radius: 1px;',
            // '                opacity: 0.8;',
            '            "',
            '        >',
            '            <div',
            '                class="block-priority-data"',
            '                style="',
            '                    position: absolute;',
            '                    left: 0;',
            '                    right: 0;',
            '                    top: 0;',
            '                    bottom: 0;',
            '                    font-size: 12px;',
            '                    font-weight: normal;',
            '                    border-radius: 0px;',
            '                    transform: scale(0.8);',
            '                    word-break: keep-all;',
            '                    white-space: nowrap;',
            '                "',
            '            ></div>',
            '        </div>',
            '    </div>',
            '    <div',
            '        class="block-link"',
            '        style="',
            '            position: absolute;',
            '            top: 100%;',
            '            left: 0px;',
            '            right: 0px;',
            '            z-index: 1;',
            '            margin-top: -18px;',
            '            ;',
            '        ">',
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

    thiz.boxEle = thiz.ele.find('> .block-box');
    thiz.backgroundEle = thiz.ele.find('> .block-box > .block-background');
    thiz.borderEle = thiz.ele.find('> .block-box > .block-border');
    thiz.actionsEle = thiz.ele.find('.block-actions');
    thiz.taskEle = thiz.ele.find('> .block-box > .block-border > .block-task');
    thiz.taskUncheckEle = thiz.ele.find('> .block-box > .block-border > .block-task > .block-task-uncheck');
    thiz.taskCheckEle = thiz.ele.find('> .block-box > .block-border > .block-task > .block-task-check');
    thiz.setCheckData(dataObj.check);

    thiz.attachEle = thiz.ele.find('> .block-attach');
    thiz.setAttach(dataObj.attach);

    thiz.tagsEle = thiz.ele.find('> .block-tags');
    thiz.priorityTagEle = thiz.ele.find('> .block-tags > .block-priority-tag');
    thiz.priorityDataEle = thiz.ele.find('> .block-tags > .block-priority-tag > .block-priority-data');

    thiz.linkEle = thiz.ele.find('> .block-link');
    thiz.link = new Link(thiz.linkEle);

    thiz.initActions();
    thiz.initTask();

    //thiz.contentEle = thiz.ele.find('> .block-box > .block-border > .block-content');
    thiz.initContentEle();

    thiz.setContentData(dataObj.text);
    thiz.setPriorityData(dataObj.priority);
    thiz.setLinkData(dataObj.link);
    thiz.setHighlightData(dataObj.highlight);

    thiz.loadStyle();

    $(p).replaceWith(thiz.ele);
};

Block.prototype.initContentEle = function () {
    var thiz = this;
    thiz.contentEle = thiz.isGrid() ? newEle('div') : newEle('a');
    if (isNotTrue(thiz.readonly)) {
        thiz.contentEle.prop('contenteditable', true);
    }
    thiz.borderEle.prepend(thiz.contentEle);
};

Block.prototype.initBind = function () {
    var thiz = this;

    thiz.ele.on('blur', function (e) {
        thiz.blur();
    });

    thiz.ele.on('click', function (e) {
        thiz.focus();
    });

    thiz.ele.on('keydown', function (e) {
        if (e.keyCode == KEYCODE.ENTER) {
            e.preventDefault();
            e.stopPropagation();
            if (isCommandOrControl(e)) {
                thiz.forceEnter();
            } else {
                thiz.enter();
            }
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

    // thiz.linkEle
    //     .on('mouseenter', function () {
    //         thiz.expandLink();
    //     })
    //     .on('mouseleave', function () {
    //         thiz.shrinkLink();
    //     });
};

Block.prototype.expandLink = function () {
    var thiz = this;
    thiz.linkEle
        .css({
            // right: 0
        });
    thiz.link.expand();
};

Block.prototype.shrinkLink = function () {
    var thiz = this;
    thiz.linkEle
        .css({
            // right: 'auto'
        });
    thiz.link.shrink();
};

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
            thiz.setContentData('[]');
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
    thiz.grid.bind('enter', function (block, writer, cell, row, grid) {
        thiz.trigger('grid.enter', block, writer, cell, row, grid, thiz);
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
    if (thiz.readonly || thiz.isLock) {
        thiz.actionsEle.remove();
        return;
    }
    thiz.opBtn = new Button('img/ellipsis-v-solid.png', null, 18, 12, 18, null);
    thiz.opBtn.hide();
    // thiz.opBtn.middle();
    thiz.opBtn.appendTo(thiz.actionsEle);

    thiz.ele.on('mouseenter', function (e) {
        thiz.opBtn.show();
        // thiz.expandLink();
    }).on('mouseleave', function (e) {
        thiz.opBtn.hide();
        // thiz.shrinkLink();
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

Block.prototype.resetPreviousStyle = function (nextBlock) {
    var thiz = this;
    if (isNotNone(nextBlock)
        && thiz.isSameSchema(nextBlock)) {
        if (thiz.isCode()) {
            var style = $.extend({}, thiz.style);
            style.setBorderBottom(0);
            style.setBorderRadius([style.borderRadius, style.borderRadius, '0px', '0px'].join(' '));
            thiz.applyStyle(style);
        }
    }
};

Block.prototype.reload = function () {
    var thiz = this;
    thiz.loadStyle();
};

Block.prototype.loadStyle = function () {
    var thiz = this;
    var style = new Style(thiz);
    if (thiz.isGridContext()) {
        style.contentPaddingLeft = '0px';
    }
    if (isNotNone(thiz.previousBlock)) {
        if (thiz.isSameSchema(thiz.previousBlock)) {
            if (thiz.isCode()) {
                style.setBorderTop(0);
                style.setBorderRadius(['0px', '0px', style.borderRadius, style.borderRadius].join(' '));
                thiz.previousBlock.resetPreviousStyle(thiz);
            }
        }
    }
    thiz.applyStyle(style);
};

Block.prototype.applyStyle = function (style) {
    var thiz = this;
    thiz.style = style;
    if (isNotNone(thiz.style)) {
        thiz.style.setPaddingLeft('0px');
        thiz.style.setPaddingRight('0px');

        thiz.ele.prop('style', thiz.style.eleStyle(thiz.context));

        thiz.contentEle.prop('style', thiz.style.contentStyle(thiz.context));

        if (thiz.isTask()) {
            thiz.taskEle.css({
                // top: thiz.style.getBaseLineTop(),
                left: thiz.style.getTaskLeft()
            }).show();
            if (+thiz.check > 0) {
                thiz.taskCheckEle.show();
                thiz.taskUncheckEle.hide();
            } else {
                thiz.taskCheckEle.hide();
                thiz.taskUncheckEle.show();
            }
        } else {
            thiz.taskEle.hide();
        }

        thiz.tagsEle.css({
            left: thiz.style.getTagsLeft(),
            top: thiz.style.getBaseLineTop()
        });

        if (thiz.priority > 0) {
            var color = thiz.style.getPriorityColor();
            thiz.priorityTagEle.show()
                .css({
                    backgroundColor: color
                });
            thiz.priorityDataEle.text('P' + thiz.priority);
        } else {
            thiz.priorityTagEle.hide();
            thiz.priorityDataEle.text(thiz.priority);
        }

        if (thiz.isShowLink()) {
            thiz.linkEle
                .css({
                    left: thiz.style.getContentMarginLeft(),
                    // top: thiz.style.getBaseLineTop()
                })
                .show();
        } else {
            thiz.linkEle.hide();
        }

        thiz.backgroundEle.css({
            left: thiz.style.getBackgroundLeft(),
            backgroundColor: thiz.style.getBackgroundColor()
        });

        thiz.attachEle.css({
            paddingLeft: thiz.style.contentPaddingLeft
        });

        thiz.actionsEle.css({
            top: thiz.style.getBaseLineTop()
        });
    }
};

Block.prototype.isFirstBlock = function () {
    var thiz = this;
    return isNotNone(thiz.writer) && thiz.writer.isFirstBlock(thiz.id);
};

Block.prototype.isLastBlock = function () {
    var thiz = this;
    return isNotNone(thiz.writer) && thiz.writer.isLastBlock(thiz.id);
};

Block.prototype.blur = function () {
    var thiz = this;
    // thiz.linkEle.hide();
    thiz.shrinkLink();
};

Block.prototype.focus = function () {
    var thiz = this;
    thiz.contentEle.focus();
    if (thiz.isShowLink()) {
        // thiz.linkEle.show();
    }
    thiz.expandLink();
    thiz.trigger('focus', thiz);
};

Block.prototype.enter = function () {
    var thiz = this;
    thiz.trigger('enter', thiz);
};

Block.prototype.forceEnter = function () {
    var thiz = this;
    thiz.trigger('forceenter', thiz);
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

Block.prototype.getCaretPosition = function () {
    var thiz = this;
    return getCaretPosition(thiz.contentEle[0]);
};

Block.prototype.trimCaretContent = function () {
    var thiz = this;
    if (thiz.isGrid()) {
        return '';
    }
    var caretPos = thiz.getCaretPosition();
    var content = thiz.getContentData();
    if (caretPos + 1 > content.length
        || content.length <= 0) {
        return '';
    }
    var leftContent = content.substring(0, caretPos);
    thiz.setContentData(leftContent);
    var rightContent = content.substring(caretPos);
    return rightContent;
};

Block.prototype.remove = function () {
    var thiz = this;
    thiz.trigger('remove', thiz);
};

Block.prototype.setContentData = function (content) {
    var thiz = this;
    if (thiz.schema === SCHEMA.GRID) {
        thiz.setGridData(content);
    } else {
        thiz.setContentText(content);
    }
};

Block.prototype.setContentText = function (text) {
    var thiz = this;
    thiz.contentEle.text(text);
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
        check: thiz.getCheckData(),
        priority: thiz.getPriorityData(),
        link: thiz.getLinkData(),
        highlight: thiz.getHighlightData()
    });
};

Block.prototype.center = function (isCenter) {
    var thiz = this;
    var textAlign = isFalse(isCenter) ? 'left' : 'center';
    thiz.borderEle.css({
        textAlign: textAlign
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
    return thiz.check > 0;
};

Block.prototype.toggleCheck = function () {
    var thiz = this;
    var isCheck = thiz.isCheck();
    thiz.setCheckData(!isCheck);
    thiz.loadStyle();
};

Block.prototype.setCheckData = function (check) {
    var thiz = this;
    thiz.check = check;
    // fixme: uniform style render
    if (thiz.isTask()) {
        if (+check > 0) {
            thiz.taskCheckEle.show();
            thiz.taskUncheckEle.hide();
        } else {
            thiz.taskCheckEle.hide();
            thiz.taskUncheckEle.show();
        }
    }
};

Block.prototype.defaultData = function () {
    return {
        schema: SCHEMA.TEXT,
        text: '',
        attach: '',
        check: 0,
        priority: 0,
        link: '',
        highlight: 0
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
    var thiz = this;
    var attachBox = this.attachEle.find('.block-attach-box');
    attachBox.empty();
    thiz.attach = null;
    if (isNotEmpty(url)) {
        thiz.attach = new Attach(url);
        thiz.attach.htmlTo(attachBox);
    }
};

Block.prototype.getAttachData = function () {
    var thiz = this;
    if (isNotNone(thiz.attach)) {
        return thiz.attach.getUrl();
    }
    return '';
};

Block.prototype.togglePriority = function (priority) {
    var thiz = this;
    var curPriority = thiz.getPriorityData();
    var newPriority = (curPriority === priority) ? 0 : priority;
    thiz.setPriorityData(newPriority);
    thiz.applyPriority();
};

Block.prototype.setPriorityData = function (priority) {
    var thiz = this;
    thiz.priority = priority;
};

Block.prototype.applyPriority = function () {
    var thiz = this;
    thiz.loadStyle();
};

Block.prototype.getPriorityData = function () {
    var thiz = this;
    return thiz.priority;
};

Block.prototype.isShowPriority = function () {
    var thiz = this;
    return thiz.getPriorityData() > 0;
};

Block.prototype.applyLink = function (link) {
    var thiz = this;
    thiz.setLinkData(link);
    thiz.loadStyle();
};

Block.prototype.setLinkData = function (link) {
    var thiz = this;
    thiz.link.setData(link);
    thiz.contentEle.prop('href', link);
    thiz.contentEle.prop('target', '_blank');
};

Block.prototype.getLinkData = function () {
    var thiz = this;
    return thiz.link.getData();
};

Block.prototype.hasLink = function () {
    var thiz = this;
    return isNotBlank(thiz.getLinkData());
};

Block.prototype.isShowLink = function () {
    var thiz = this;
    var notBlankLink = isNotBlank(thiz.getLinkData());
    return !thiz.isLock && !thiz.readonly && notBlankLink;
};

Block.prototype.showLink = function () {
    var thiz = this;
    var link = prompt('add link ...', '');
    thiz.applyLink(link);
};

Block.prototype.toggleHighlight = function (light) {
    var thiz = this;
    var curLight = thiz.getHighlightData();
    var newLight = 0;
    if (light >= 0 && curLight != light) {
        newLight = light;
    }
    thiz.setHighlightData(newLight);
    thiz.applyHighlight(newLight);
};

Block.prototype.setHighlightData = function (highlight) {
    var thiz = this;
    thiz.highlight = highlight;
};

Block.prototype.applyHighlight = function () {
    var thiz = this;
    thiz.loadStyle();
};

Block.prototype.getHighlightData = function () {
    var thiz = this;
    var highlight = isNumber(thiz.highlight) ? thiz.highlight : 0;
    return highlight;
};

Block.prototype.setContentColor = function (color) {
    var thiz = this;
    thiz.contentEle.css({
        color: color || '#000000'
    });
};

Block.prototype.isText = function () {
    return this.schema === SCHEMA.TEXT;
};

Block.prototype.isH1 = function () {
    return this.schema === SCHEMA.H1;
};

Block.prototype.isH2 = function () {
    return this.schema === SCHEMA.H2;
};

Block.prototype.isH3 = function () {
    return this.schema === SCHEMA.H3;
};

Block.prototype.isCode = function () {
    return this.schema === SCHEMA.CODE;
};

Block.prototype.isGrid = function () {
    return this.schema === SCHEMA.GRID;
};

Block.prototype.isTask = function () {
    return this.schema === SCHEMA.TASK;
};

Block.prototype.isSameSchema = function (block) {
    return this.schema === block.schema;
};

Block.prototype.isGridContext = function () {
    return this.context === SCHEMA.GRID;
};

window.Block = Block;
