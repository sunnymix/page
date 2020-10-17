(function () {
    function Block(writer, place, data, isLock, readonly, context, previousBlock) {
        var thiz = this;
        thiz.isBlock = true;
        thiz.writer = writer;

        thiz.id = uuid();
        var initData = thiz.extractData(data);

        thiz.schema = initData.schema;
        thiz.isLock = isTrue(isLock);

        thiz.readonly = isTrue(readonly);
        thiz.context = isNotNone(context) ? context : SCHEMA.PAPER;
        thiz.previousBlock = previousBlock;

        thiz.initEle(place, initData);

        thiz.initBind();
        initEvent(thiz, Block.prototype);
    };

    Block.prototype.type = ELE_TYPE.BLOCK;

    Block.prototype.initEle = function (place, initData) {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.block',
            position: 'relative'
        });

        ////// block (schema, actions, box, attach) //////

        // schema
        thiz.initSchemaEle(initData);
        thiz.ele.append(thiz.schemaEle);

        // actions
        thiz.initActionsEle(initData);
        thiz.ele.append(thiz.actionsEle);

        // box
        thiz.initBoxEle(initData);
        thiz.ele.append(thiz.boxEle);

        // attach
        thiz.initAttachEle();
        thiz.ele.append(thiz.attachEle);

        ////// data //////

        thiz.setCheckData(initData.check);

        thiz.setAttach(initData.attach);

        thiz.initActions();
        thiz.initTask();

        thiz.setContentData(initData.text);
        thiz.setPriorityData(initData.priority);
        thiz.setLinkData(initData.link);
        thiz.setHighlightData(initData.highlight);

        thiz.loadStyle();

        if (isNotNone(place)) {
            $(place).replaceWith(thiz.ele);
        }
    };

    Block.prototype.initSchemaEle = function (initData) {
        var thiz = this;
        thiz.schemaEle = new Ele('div', {
            id: '.block-schema',
            position: 'absolute',
            left: '-50px',
            top: 0,
            height: '16px',
            lineHeight: '16px',
            color: '#dddddd',
            body: initData.schema,
            fontSize: Style.SmallFontSize,
            // transform: 'rotate(90deg)',
        });
    };

    Block.prototype.schemaVisible = function () {
        var thiz = this;
        var isHighlight = [SCHEMA.TITLE, SCHEMA.H1, SCHEMA.H2, SCHEMA.H3, SCHEMA.GRID].includes(thiz.schema);
        var isEdit = isNotTrue(thiz.readonly);
        var isNotInGrid = !thiz.isGridContext();
        return isHighlight && isEdit && isNotInGrid;
    };

    Block.prototype.initBoxEle = function (initData) {
        var thiz = this;
        thiz.boxEle = new Ele('div', {
            id: '.block-box',
            position: 'relative',
        });

        // background
        thiz.initBackgroundEle();
        thiz.boxEle.append(thiz.backgroundEle);

        // border
        thiz.initBorderEle(initData);
        thiz.boxEle.append(thiz.borderEle);

        // tags
        thiz.initTagsEle();
        thiz.boxEle.append(thiz.tagsEle);

        // task
        thiz.initTaskEle();
        thiz.boxEle.append(thiz.task.ele);

        // link
        thiz.initLinkEle();
        thiz.boxEle.append(thiz.linkEle);
        thiz.link = new Link(thiz.linkEle);
    };

    Block.prototype.initBackgroundEle = function () {
        var thiz = this;
        thiz.backgroundEle = new Ele('div', {
            id: '.block-background',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        });
    };

    Block.prototype.initBorderEle = function (initData) {
        var thiz = this;
        thiz.borderEle = new Ele('div', {
            id: '.block-border',
            position: 'relative',
        });

        // content
        thiz.initContentEle(initData);
        thiz.borderEle.append(thiz.contentEle);

        // tail
        thiz.initTailEle(initData);
        thiz.borderEle.append(thiz.tailEle);

        new Clearfix(thiz.tailEle);
    };

    Block.prototype.initContentEle = function (initData) {
        var thiz = this;

        var isReadonlyLink = thiz.readonly && isNotBlank(initData.link);
        var eleType = isReadonlyLink ? 'a' : 'div';

        thiz.contentEle = new Ele(eleType, {
            id: '.block-content'
        });

        var isEditable = isFalse(thiz.readonly);
        if (isEditable) {
            thiz.contentEle.prop('contenteditable', true);
        }
    };

    Block.prototype.initTailEle = function (initData) {
        var thiz = this;

        thiz.tailEle = new Ele('div', {
            id: '.block-tail',
            position: 'relative',
            display: 'inline-block',
            float: 'left',
            marginLeft: '2px',
        });

        thiz.initLinkIconEle(initData);
        thiz.tailEle.append(thiz.linkIconEle);
    };

    Block.prototype.initLinkIconEle = function (initData) {
        var thiz = this;
        thiz.linkIconEle = new Ele('a', {
            id: '.block-link-icon',
            position: 'relative',
            target: '_blank',
            display: 'inline-block',
            padding: 0,
            width: '11px',
            height: '11px',
            lineHeight: '11px',
            // backgroundColor: '#e1e4e8',
            border: '1px solid #0064bd',
            borderRadius: '50%',
        });

        var dotEle = new Ele('div', {
            id: '.block-link-dot',
            width: '1px',
            height: '1px',
            backgroundColor: '#0064bd',
            borderRadius: '2px',
            position: 'absolute',
            top: '2px',
            left: '5px',
        });
        thiz.linkIconEle.append(dotEle);

        var stringEle = new Ele('div', {
            id: '.block-link-string',
            width: '1px',
            height: '5px',
            backgroundColor: '#0064bd',
            borderRadius: '2px',
            position: 'absolute',
            bottom: '2px',
            left: '5px',
        });
        thiz.linkIconEle.append(stringEle);

        var arrowEle = new Ele('div', {
            id: '.block-link-arrow',
            position: 'absolute',
            width: '4px',
            height: '4px',
            left: '4px',
            top: '5px',
            borderStyle: 'solid',
            borderColor: '#ffffff',
            borderWidth: '1px 1px 0 0',
            marginLeft: '-1px',
            transform: 'rotate(45deg)',
            borderRadius: '1px',
        });
        // thiz.linkIconEle.append(arrowEle);

    };

    Block.prototype.initActionsEle = function () {
        var thiz = this;
        thiz.actionsEle = new Ele('div', {
            id: '.block-actions',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '-20px',
            right: '-20px',
        });
    };

    Block.prototype.initTaskEle = function () {
        var thiz = this;
        thiz.task = new Check();
        thiz.task.ele.css({
            position: 'absolute',
            left: 0,
            top: 0,
        });
    };

    Block.prototype.initTagsEle = function () {
        var thiz = this;

        thiz.tagsEle = new Ele('div', {
            id: '.block-tags',
            position: 'absolute',
            top: 0,
            left: 0,
        });

        thiz.priorityTagEle = new Ele('div', {
            id: '.block-priority-tag',
            position: 'absolute',
            display: 'none',
            left: 0,
            top: 0,
            width: '20px',
            height: '16px',
            lineHeight: '16px',
            marginTop: 0,
            textAlign: 'center',
            color: '#ffffff',
            borderRadius: '1px',
        });
        thiz.tagsEle.append(thiz.priorityTagEle);

        thiz.priorityDataEle = new Ele('div', {
            id: '.block-priority-data',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            fontSize: Style.SmallFontSize,
            transform: 'scale(0.8)',
        });
        thiz.priorityTagEle.append(thiz.priorityDataEle);
    };

    Block.prototype.initAttachEle = function () {
        var thiz = this;
        thiz.attachEle = new Ele('div', {
            id: '.block-attach',
            position: 'relative'
        });

        thiz.attachBoxEle = new Ele('div', {
            id: '.block-attach-box',
            display: 'block',
            marginTop: '10px',
        });
        thiz.attachEle.append(thiz.attachBoxEle);
    };

    Block.prototype.initLinkEle = function () {
        var thiz = this;
        thiz.linkEle = new Ele('div', {
            id: '.block-link',
            position: 'relative',
            zIndex: 1,
        });
    };

    Block.prototype.initBind = function () {
        var thiz = this;

        thiz.ele.on('blur', function (e) {
            thiz.blur();
        });

        thiz.ele.on('mousedown', function (e) {
            e.stopPropagation();
            thiz.focus();
        });

        thiz.contentEle.on('mousedown', function (e) {
            e.stopPropagation();
            thiz.focus(true);
        });

        thiz.ele.on('keydown', function (e) {
            thiz.handleKeydownEvent(e);
        });

        thiz.ele.on('paste', function (e) {
            e.preventDefault();
            thiz.handlePasteEvent(e);
        });
    };

    Block.prototype.handleKeydownEvent = function (e) {
        var thiz = this;
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

        if (e.keyCode == KEYCODE.BACKSPACE
            && isCommandOrControl(e)
            && isShift(e)) {
            e.preventDefault();
            thiz.remove();
        }

        if (e.keyCode == KEYCODE.A && isCommandOrControl(e) && isShift(e)) {
            thiz.showAttach();
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

        if (e.keyCode == KEYCODE.K && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.TASK);
        }

        if (e.keyCode == KEYCODE.L && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.showLink();
        }

        if (e.keyCode == KEYCODE.O && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.QUOTE);
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

        if (e.keyCode == KEYCODE.C && isCommandAndControl(e)) {
            e.preventDefault();
            thiz.clone();
        }
    };

    Block.prototype.handlePasteEvent = function (e) {
        var thiz = this;
        var isCompress = thiz.isTitle();
        var pasteSingleRow = pastePlainText(e, isCompress);
        if (isNotTrue(pasteSingleRow)) {
            thiz.trigger('paste', thiz, e);
        }
    };

    Block.prototype.expandLink = function () {
        var thiz = this;
        thiz.link.expand();
    };

    Block.prototype.shrinkLink = function () {
        var thiz = this;
        thiz.link.shrink();
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
            thiz.schemaEle.text(thiz.schema);
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
        thiz.opBtn = new Button('img/ellipsis-v-solid.png', null, 20, 16, 20, null);
        thiz.opBtn.hide();
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
        var url = prompt('add attachement ...', thiz.getAttachData());
        thiz.setAttach(url);
    };

    Block.prototype.initTask = function () {
        var thiz = this;
        thiz.task.ele.on('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            thiz.toggleCheck();
        });
    };

    Block.prototype.reload = function () {
        var thiz = this;
        thiz.loadStyle();
    };

    Block.prototype.loadStyle = function () {
        var thiz = this;
        var style = new Style(thiz);
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

    Block.prototype.resetPreviousStyle = function (nextBlock) {
        var thiz = this;
        if (isNotNone(nextBlock)
            && thiz.isSameSchema(nextBlock)) {
            if (thiz.isCode()) {
                var style = $.extend({}, thiz.style);
                style.setBorderBottom(0);
                style.setBorderRadius([style.borderRadius, style.borderRadius, '0px', '0px'].join(' '));
                style.setPaddingBottom('0px');
                thiz.applyStyle(style);
            }
        }
    };

    Block.prototype.applyStyle = function (style) {
        var thiz = this;
        thiz.style = style;
        if (isNotNone(thiz.style)) {
            thiz.ele.prop('style', thiz.style.eleStyle(thiz.context));

            thiz.borderEle.prop('style', thiz.style.borderStyle(thiz.context));

            thiz.contentEle.prop('style', thiz.style.contentStyle(thiz.context));

            if (thiz.schemaVisible()) {
                thiz.schemaEle.css({
                    top: thiz.style.getBoxBaseLineTop()
                }).show();
            } else {
                thiz.schemaEle.hide();
            }

            if (thiz.readonly || thiz.isLock) {
                thiz.actionsEle.remove();
            } else {
                thiz.opBtn.style({
                    position: 'absolute',
                    top: thiz.style.getActionsTop()
                });
            }

            thiz.opBtn.ele.css({
                top: thiz.style.getActionsTop()
            });

            if (thiz.isTask()) {
                thiz.task.ele.css({
                    top: thiz.style.getBaseLineTop(),
                    left: thiz.style.getTaskLeft()
                }).show();
                thiz.task.check(+thiz.check > 0);
            } else {
                thiz.task.ele.hide();
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
                thiz.linkIconEle.show();
            } else {
                thiz.linkEle.hide();
                thiz.linkIconEle.hide();
            }

            thiz.backgroundEle.css({
                left: thiz.style.getBackgroundLeft(),
                backgroundColor: thiz.style.getBackgroundColor()
            });

            thiz.attachEle.css({
                paddingLeft: thiz.style.contentPaddingLeft
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
        // thiz.shrinkLink();
    };

    Block.prototype.focus = function (keepCursor, toStart) {
        var thiz = this;
        var resetCursor = !isTrue(keepCursor);

        if (thiz.isGrid()) {
            return;
        }

        if (isTrue(toStart)) {
            setTimeout(function () {
                thiz.contentEle.focus();
                setCursorToStart(thiz.contentEle[0]);
            }, 1);
        } else if (resetCursor) {
            setTimeout(function () {
                thiz.contentEle.focus();
                setCursorToEnd(thiz.contentEle[0]);
            }, 1);
        }

        if (thiz.isShowLink()) {
            // thiz.linkEle.show();
        }
        // thiz.expandLink();
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
        if (getCursorPosition(thiz.contentEle[0]) <= 0) {
            thiz.trigger('jumpup', thiz);
        }
    };

    Block.prototype.jumpDown = function () {
        var thiz = this;
        if (getCursorPosition(thiz.contentEle[0]) >= thiz.contentEle.text().length) {
            thiz.trigger('jumpdown', thiz);
        }
    };

    Block.prototype.getCursorPosition = function () {
        var thiz = this;
        return getCursorPosition(thiz.contentEle[0]);
    };

    Block.prototype.setCursorPosition = function (position) {
        var thiz = this;
        setCursor(thiz.contentEle[0], position);
    };

    Block.prototype.trimCaretContent = function () {
        var thiz = this;
        if (thiz.isGrid()) {
            return '';
        }
        var caretPos = thiz.getCursorPosition();
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
        thiz.ele.remove();
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
        if (thiz.isCode()) {
            text = text.replace(/\s/g, '&nbsp;');
        }
        thiz.contentEle.html(text);
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
            thiz.task.check(+check > 0);
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

    // fixme
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
        if (isNone(url)) {
            return;
        }
        var attachBox = this.attachEle.find('.block-attach-box');
        thiz.attachBoxEle.empty();
        thiz.attach = new Attach(url);
        thiz.attach.htmlTo(attachBox);
        if (isNotBlank(url)) {
            thiz.attachEle.show();
        } else {
            thiz.attachEle.hide();
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
        thiz.linkIconEle.prop('href', link);
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
        var link = prompt('add link ...', thiz.getLinkData());
        if (isNotNone(link)) {
            thiz.applyLink(link);
        }
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

    Block.prototype.isTitle = function () {
        return this.schema === SCHEMA.TITLE;
    };

    Block.prototype.isSameSchema = function (block) {
        return this.schema === block.schema;
    };

    Block.prototype.isGridContext = function () {
        return this.context === SCHEMA.GRID;
    };

    window.Block = Block;
})();
