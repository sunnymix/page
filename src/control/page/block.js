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

        thiz.ele.prop('id', thiz.id);

        ////// block //////

        // schema
        thiz.initSchemaEle(initData);
        thiz.ele.append(thiz.schemaEle);

        // box
        thiz.initBoxEle(initData);
        thiz.ele.append(thiz.boxEle);

        // attach
        thiz.initAttachEle();
        thiz.ele.append(thiz.attachEle);

        // actions
        thiz.initActionsEle(initData);
        thiz.ele.append(thiz.actionsEle);

        ////// data //////

        thiz.setCheckData(initData.check);

        thiz.setAttach(initData.attach);

        thiz.initActions();

        thiz.setContentData(initData.text);
        thiz.setCheckData(initData.check);
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
        });
    };

    Block.prototype.schemaVisible = function () {
        var thiz = this;
        var isHighlight = [SCHEMA.REFER, SCHEMA.TITLE, SCHEMA.H1, SCHEMA.H2, SCHEMA.H3].includes(thiz.schema);
        var isEdit = isNotTrue(thiz.readonly);
        var isNotInGrid = !thiz.isGridContext();
        return isHighlight && isEdit && isNotInGrid;
    };

    Block.prototype.initBoxEle = function (initData) {
        var thiz = this;
        thiz.boxEle = new Ele('div', {
            id: '.block-box',
        });

        // background
        thiz.initBackgroundEle();
        thiz.boxEle.append(thiz.backgroundEle);

        // border
        thiz.initBorderEle(initData);
        thiz.boxEle.append(thiz.borderEle);

        // indent
        thiz.initIndentEle();
        thiz.boxEle.append(thiz.indentEle);

        // task
        thiz.initTaskEle();
        thiz.boxEle.append(thiz.task.ele);

        // tags
        thiz.initTagsEle();
        thiz.boxEle.append(thiz.tagsEle);

        // link
        thiz.initLinkEle();
        thiz.boxEle.append(thiz.linkEle);
        thiz.link = new Link(thiz.linkEle);
    };

    Block.prototype.initIndentEle = function () {
        var thiz = this;

        thiz.indentEle = new Ele('div', {
            id: '.block-indent',
            position: 'absolute',
            left: 6,
            top: 0,
            bottom: 0,
        });

        var indentSize = '1px';
        var indentColor = 'rgba(0, 0, 0, 0.1)';

        thiz.indent1Ele = new Ele('div', {
            id: '.block-indent1',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            borderLeft: indentSize + ' solid ' + indentColor,
        });
        thiz.indentEle.append(thiz.indent1Ele);

        thiz.indent2Ele = new Ele('div', {
            id: ".block-indent2",
            position: 'absolute',
            left: '10px',
            top: 0,
            bottom: 0,
            borderLeft: indentSize + ' dashed ' + indentColor,
        });
        thiz.indentEle.append(thiz.indent2Ele);

        thiz.indent3Ele = new Ele('div', {
            id: ".block-indent3",
            position: 'absolute',
            left: '20px',
            top: 0,
            bottom: 0,
            width: indentSize,
            borderLeft: indentSize + ' solid ' + indentColor,
        });
        thiz.indentEle.append(thiz.indent3Ele);
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
            zIndex: -1, // fixme
        });
    };

    Block.prototype.initBorderEle = function (initData) {
        var thiz = this;
        thiz.borderEle = new Ele('div', {
            id: '.block-border',
            position: 'relative',
        });

        thiz.bodyEle = new Ele('div', {
            id: '.block-body'
        });

        thiz.initBodyTableEle(initData);
        thiz.bodyEle.append(thiz.bodyTableEle);

        thiz.borderEle.append(thiz.bodyEle);

        // // content
        // thiz.initContentEle(initData);
        // thiz.borderEle.append(thiz.contentEle);

        // // tail
        // thiz.initTailEle(initData);
        // thiz.contentEle.append(thiz.tailEle);

        new Clearfix(thiz.bodyTableEle);
    };

    Block.prototype.initBodyTableEle = function (initData) {
        var thiz = this;
        thiz.bodyTableEle = new Ele('table', {
            id: '.block-body-table',
            display: 'inline-block',
            border: '0px none',
            borderSpacing: 0,
            borderCollapse: 'collapse',
            width: 'auto',
            float: 'left',
        });

        thiz.bodyRowEle = new Ele('tr', {
            id: '.block-body-row',
        });
        thiz.bodyTableEle.append(thiz.bodyRowEle);

        thiz.bodyContentEle = new Ele('td', {
            id: '.block-body-content',
            verticalAlign: 'top',
        });
        thiz.initContentEle(initData);
        thiz.bodyContentEle.append(thiz.contentEle);
        thiz.bodyRowEle.append(thiz.bodyContentEle);

        thiz.bodyTailEle = new Ele('td', {
            id: '.block-body-tail',
            verticalAlign: 'top',
        });
        thiz.initTailEle(initData);
        thiz.bodyTailEle.append(thiz.tailEle);
        thiz.bodyRowEle.append(thiz.bodyTailEle);
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
            float: 'right',
            marginLeft: '2px',
        }).prop('contenteditable', false);

        thiz.initLinkIconEle(initData);
        thiz.tailEle.append(thiz.linkIconEle);
    };

    Block.prototype.initLinkIconEle = function (initData) {
        var thiz = this;
        thiz.linkIconEle = new Ele('a', {
            id: '.block-link-icon',
            position: 'relative',
            // target: '_blank',
            display: 'inline-block',
            padding: 0,
            width: '11px',
            height: '11px',
            lineHeight: '11px',
            backgroundColor: '#444444',
            border: '1px solid #444444',
            borderRadius: '50%',
            // boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
        });

        var dotEle = new Ele('div', {
            id: '.block-link-dot',
            width: '1px',
            height: '1px',
            backgroundColor: '#ffffff',
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
            backgroundColor: '#ffffff',
            borderRadius: '2px',
            position: 'absolute',
            bottom: '2px',
            left: '5px',
        });
        thiz.linkIconEle.append(stringEle);
    };

    Block.prototype.initActionsEle = function () {
        var thiz = this;
        thiz.actionsEle = new Ele('div', {
            id: '.block-actions',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '-20px',
            width: '20px',
        });

        // selector
        thiz.initSelectorEle();
        thiz.actionsEle.append(thiz.selector.ele);
    };

    Block.prototype.actionsVisible = function () {
        var thiz = this;
        var isEdit = isNotTrue(thiz.readonly);
        var isNotLock = isNotTrue(thiz.isLock);
        return isEdit && isNotLock;
    };

    Block.prototype.initSelectorEle = function () {
        var thiz = this;
        thiz.selector = new Check();
        thiz.selector.setPrimaryColor('#28a745');
        thiz.selector.addClass('block-selector').style({
            position: 'absolute',
            left: 0,
            top: 0
        });
        thiz.selector.hide();
    };

    Block.prototype.selectorVisible = function () {
        var thiz = this;
        var isEdit = isNotTrue(thiz.readonly);
        var isNotInGrid = !thiz.isGridContext();
        return isEdit && isNotInGrid;
    };

    Block.prototype.selectStart = function () {
        var thiz = this;
        thiz.selecting = true;
        thiz.disableEdit();
        thiz.select(false);
        if (thiz.isGrid()) {
            thiz.grid.selectStart();
        }
    };

    Block.prototype.selectStop = function () {
        var thiz = this;
        thiz.selecting = false;
        thiz.enableEdit();
        thiz.select(false);
        if (thiz.isGrid()) {
            thiz.grid.selectStop();
        }
    };

    Block.prototype.disableEdit = function () {
        var thiz = this;

        if (!thiz.isGridContext()) {
            thiz.opBtn.hide();
            thiz.selector.show();
        }

        if (!thiz.isGrid()) {
            thiz.contentEle
                .prop('contenteditable', false)
                .css({
                    // userSelect: 'none'
                });
        }
    };

    Block.prototype.enableEdit = function () {
        var thiz = this;

        if (!thiz.isGridContext()) {
            thiz.opBtn.hide();
            thiz.selector.hide();
        }

        if (!thiz.isGrid()) {
            thiz.contentEle
                .prop('contenteditable', true)
                .css({
                    // userSelect: 'auto'
                });
        }
    };

    Block.prototype.isSelecting = function () {
        var thiz = this;
        return isTrue(thiz.selecting);
    };

    Block.prototype.select = function (isSelect) {
        var thiz = this;
        if (isNone(isSelect)) {
            return isSelect();
        }
        thiz.selector.check(isSelect);
    };

    Block.prototype.isSelect = function () {
        var thiz = this;
        return thiz.selector.check();
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
            left: '0px',
            top: '-12px',
            width: '12px',
            height: '12px',
            lineHeight: '12px',
            marginTop: 0,
            textAlign: 'center',
            color: '#ffffff',
            borderRadius: '50%',
            zIndex: 0,
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
            marginTop: '5px',
            marginBottom: '5px',
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

        thiz.ele.on('keyup', function (e) {
            thiz.handleKeyupEvnet(e);
        });

        thiz.ele.on('paste', function (e) {
            e.preventDefault();
            e.stopPropagation();
            thiz.handlePasteEvent(e);
            return false;
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
            thiz.backspace();
        }

        if (e.keyCode == KEYCODE.BACKSPACE
            && isCommandOrControl(e)
            && isShift(e)) {
            e.preventDefault();
            thiz.remove();
        }

        if (e.keyCode == KEYCODE.A) {
            if (isCommandOrControl(e)) {
                if (isShift(e)) {
                    thiz.showAttach();
                } else {
                    if (!thiz.isTitle()) {
                        e.preventDefault();
                        e.stopPropagation();
                        thiz.selectOn();
                    }
                }
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

        if (e.keyCode == KEYCODE.E && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.REFER);
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

        if (isNamecardAction(e)) {
            e.preventDefault();
            thiz.setSchema(SCHEMA.NAMECARD);
        }
    };

    Block.prototype.backspace = function () {
        var thiz = this;

        if (thiz.contentEle.text().length == 0) {
            thiz.remove();
        } else {
            var cursorPos = thiz.getCursorPosition();
            if (cursorPos <= 0) {
                thiz.trigger('backspace', thiz);
            }
        }
    };

    Block.prototype.handleKeyupEvnet = function (e) {
        var thiz = this;
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
        var currentContent = thiz.getContentData();
        if (isNotEmpty(schema)) {
            thiz.schema = schema;
            thiz.schemaEle.text(thiz.schema);
            thiz.loadStyle();
            if (thiz.isGrid()) {
                thiz.switchToGrid();
                thiz.setContentData('[]');
            } else if (thiz.isNamecard()) {
                thiz.setContentData(currentContent);
            } else {
                thiz.contentEle.prop('contenteditable', true);
                thiz.setContentData(currentContent);
            }
            thiz.writer.reloadSiblingBlocks(thiz, true, 1);
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

    Block.prototype.switchToNamecard = function (content) {
        var thiz = this;
        thiz.contentEle.empty();
        thiz.contentEle.prop('contenteditable', false);
        thiz.namecard = new Namecard(thiz.writer, thiz, content);
        thiz.contentEle.append(thiz.namecard.ele);
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
            if (!thiz.isSelecting()) {
                thiz.opBtn.show();
            }
        }).on('mouseleave', function (e) {
            if (!thiz.isSelecting()) {
                thiz.opBtn.hide();
            }
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

    Block.prototype.reload = function () {
        var thiz = this;
        thiz.loadStyle();
    };

    Block.prototype.loadStyle = function () {
        var thiz = this;
        thiz.style = new Style(thiz);
        thiz.resetStyle();
        thiz.applyStyle(thiz.style);
    };

    Block.prototype.resetStyle = function () {
        var thiz = this;
        if (thiz.isTitle()) {
            return;
        }
        var curIndex = thiz.writer.getBlockIndex(thiz.id);
        if (curIndex == 0) {
            thiz.style
                .setPaddingTop(thiz.style.paddingBottom);
        }
        if (Style.isSiblingSchema(thiz.schema)) {
            if (thiz.writer.hasPreviousSibling(thiz)) {
                thiz.style
                    .setBodyBorderTop('0px')
                    .setBodyBorderTopLeftRadius('0px')
                    .setBodyBorderTopRightRadius('0px')
                    ;
            }
            if (thiz.writer.hasNextSibling(thiz)) {
                thiz.style
                    .setPaddingBottom('0px')
                    .setBodyBorderBottom('0px')
                    .setBodyBorderBottomLeftRadius('0px')
                    .setBodyBorderBottomRightRadius('0px')
                    ;
            }
        }
    };

    Block.prototype.applyStyle = function () {
        var thiz = this;
        if (isNotNone(thiz.style)) {
            thiz.ele.prop('style', thiz.style.eleStyle(thiz.context));

            thiz.boxEle.prop('style', thiz.style.boxStyle(thiz.context));

            thiz.borderEle.prop('style', thiz.style.borderStyle(thiz.context));

            thiz.bodyEle.prop('style', thiz.style.bodyStyle(thiz.context));

            thiz.contentEle.prop('style', thiz.style.contentStyle(thiz.context));

            // ------> editor components ------>
            if (thiz.readonly) {
                thiz.actionsEle.remove();
                thiz.schemaEle.remove();
            } else {
                // actions
                if (thiz.actionsVisible()) {
                    thiz.actionsEle.show();
                } else {
                    thiz.actionsEle.hide();
                }
                thiz.opBtn.style({
                    position: 'absolute',
                    top: thiz.style.getActionsTop()
                });
                // schema
                if (thiz.schemaVisible()) {
                    thiz.schemaEle.css({
                        top: thiz.style.getBoxBaseLineTop()
                    }).show();
                } else {
                    thiz.schemaEle.hide();
                }
                // selector
                thiz.selector.style({
                    top: thiz.style.getBoxBaseLineTop()
                });
            }
            // <------ editor components <------

            if (thiz.isTask()) {
                thiz.task.show().style({
                    top: thiz.style.getBoxBaseLineTop(),
                    left: thiz.style.getTaskLeft()
                });
            } else {
                thiz.task.hide();
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
                thiz.priorityDataEle.text(thiz.priority);
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
                paddingLeft: thiz.style.getBodyMarginLeft(),
            });

            thiz.applyIndentStyle();
        }
    };

    Block.prototype.applyIndentStyle = function () {
        var thiz = this;
        var indentValue = thiz.getIndentValue();

        thiz.indent1Ele.hide();
        thiz.indent2Ele.hide();
        thiz.indent3Ele.hide();

        if (thiz.isGridContext()) {
            return;
        }

        if (indentValue > 0) {
            // thiz.indent1Ele.show();
        }

        if (indentValue > 1) {
            // thiz.indent2Ele.show();
        }

        if (indentValue > 2) {
            // thiz.indent3Ele.show();
        }
    };

    Block.prototype.getIndentValue = function () {
        var thiz = this;

        var indentValueMap = {};
        indentValueMap[SCHEMA.REFER] = 0;
        indentValueMap[SCHEMA.TITLE] = 0;
        indentValueMap[SCHEMA.H1] = 0;
        indentValueMap[SCHEMA.H2] = 0;
        indentValueMap[SCHEMA.H3] = 1;
        indentValueMap[SCHEMA.TEXT] = 2;
        indentValueMap[SCHEMA.CODE] = 2;
        indentValueMap[SCHEMA.GRID] = 2;
        indentValueMap[SCHEMA.TASK] = 2;
        indentValueMap[SCHEMA.QUOTE] = 2;

        return indentValueMap[thiz.schema] || 0;
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

        if (thiz.isNotFocusable()) {
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

    Block.prototype.focusPosition = function (position) {
        var thiz = this;

        if (thiz.isGrid()) {
            return;
        }

        setTimeout(function () {
            thiz.contentEle.focus();
            setTimeout(function () {
                setCursor(thiz.contentEle[0], position);
            }, 1);
        }, 1);
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
        if (thiz.isGrid()) {
            thiz.setGridData(content);
        } else if (thiz.isNamecard()) {
            thiz.setNamecardData(content);
        } else {
            thiz.setContentText(content);
        }
    };

    Block.prototype.setContentText = function (text) {
        var thiz = this;
        // Do not use jQuery::html(), or jQuery::text()
        // - jQuery::html() will transfer ESC chars, 
        // e.g. &timestamp would be transfered to xtamp
        // - jQuery::text() could not set space char correctly
        thiz.contentEle[0].innerText = text;
    };

    Block.prototype.setGridData = function (content) {
        var thiz = this;
        if (isNone(thiz.grid)) {
            thiz.switchToGrid();
        }
        thiz.grid.setData(content);
    };

    Block.prototype.setNamecardData = function (content) {
        var thiz = this;
        if (isNone(thiz.namecard)) {
            thiz.switchToNamecard(content);
        } else {
            thiz.namecard.setData(content);
        }
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
        } else if (thiz.schema === SCHEMA.NAMECARD && isNotNone(thiz.namecard)) {
            data = thiz.namecard.getData();
        } else {
            data = thiz.contentEle.text();
        }
        return data;
    };

    Block.prototype.getCheckData = function () {
        var thiz = this;
        return thiz.isCheck() ? 1 : 0;
    };

    Block.prototype.isCheck = function () {
        var thiz = this;
        return thiz.task.isCheck();
    };

    Block.prototype.setCheckData = function (check) {
        var thiz = this;
        var isCheck = check > 0 || isTrue(check);
        thiz.task.check(isCheck);
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

        if (thiz.isGrid()) {
            return;
        }

        if (isBlank(thiz.getContentData())) {
            thiz.setContentText(link);
        }

        // TODO: Refer Schema
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
        return !thiz.isLock && notBlankLink;
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

    Block.prototype.isSelectedAll = function () {
        var thiz = this;
        return getSelectedText().indexOf(thiz.getContentData()) >= 0;
    };

    Block.prototype.selectOn = function () {
        var thiz = this;
        // if (thiz.isSelectedAll()) {
        //     thiz.trigger('selectextend', thiz);
        // } else {
        //     selectText(thiz.contentEle[0]);
        //     thiz.trigger('selectall', thiz);
        // }
        thiz.trigger('selecton', thiz);
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

    Block.prototype.isNamecard = function () {
        return this.schema === SCHEMA.NAMECARD;
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

    Block.prototype.isQuote = function () {
        return this.schema === SCHEMA.QUOTE;
    };

    Block.prototype.isRefer = function () {
        return this.schema === SCHEMA.REFER;
    };

    Block.prototype.isFocusable = function () {
        return !this.isNotFocusable();
    };

    Block.prototype.isNotFocusable = function () {
        return [SCHEMA.GRID, SCHEMA.NAMECARD].indexOf(this.schema) >= 0;
    };

    window.Block = Block;
})();
