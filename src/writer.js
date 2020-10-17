(function () {
    function Writer(p, readonly, context) {
        var thiz = this;
        thiz.isWriter = true;

        thiz.readonly = isTrue(readonly);
        thiz.context = isNotNone(context) ? context : SCHEMA.PAPER;

        thiz.ele = $(p);
        thiz.cursor = null;
        thiz.blocks = [];

        thiz.init();
    };

    Writer.prototype.init = function () {
        var thiz = this;
        initEvent(thiz, Writer.prototype);
        thiz.focus();
    };

    Writer.prototype.type = ELE_TYPE.WRITER;

    Writer.prototype.initBind = function () {
        var thiz = this;
    };

    Writer.prototype.focus = function () {
        var thiz = this;
        if (isNotEmpty(thiz.blocks)) {
            thiz.blocks[thiz.blocks.length - 1].focus();
        } else {
            if (isFunction(thiz.createBlock)) {
                var newBlock = thiz.createBlock();
                newBlock.focus();
            }
        }
    };

    Writer.prototype.createBlock = function (blockOrContainer, data) {
        var thiz = this;

        var tmpPlace = $('<div></div>');
        var previousBlock = null;

        if (isBlock(blockOrContainer)) {
            blockOrContainer.ele.after(tmpPlace);
            previousBlock = blockOrContainer;
        } else {
            thiz.ele.append(tmpPlace);
        }

        var isLock = false;

        var newBlock = new Block(thiz, tmpPlace, data, isLock, thiz.readonly, thiz.context, previousBlock);

        newBlock.bind('enter', function (block) {
            var caretPosition = block.getCursorPosition();
            var newBlock;
            if (caretPosition == 0) {
                newBlock = thiz.createBlock(block);
                thiz.movedownBlock(block);
            } else {
                var caretRightContent = block.trimCaretContent();
                newBlock = thiz.createBlock(block, caretRightContent);
                newBlock.setSchema(thiz.inheritSchema(block.schema));
                newBlock.focus();
            }
        });

        newBlock.bind('forceenter', function (block) {
            // forceenter -> grid.enter:
            if (block.isGridContext()) {
                thiz.trigger('enter', block, thiz);
            } else {
                var newBlock = thiz.createBlock(block);
                newBlock.focus();
            }
        });

        newBlock.bind('grid.enter', function (block, writer, cell, row, grid, parentBlock) {
            var newBlock = thiz.createBlock(parentBlock);
            newBlock.focus();
        });

        newBlock.bind('remove', function (block) {
            thiz.removeBlock(block);
        });

        newBlock.bind('moveup', function (block) {
            thiz.moveupBlock(block);
        });

        newBlock.bind('movedown', function (block) {
            thiz.movedownBlock(block);
        });

        newBlock.bind('jumpup', function (block) {
            thiz.jumpupBlock(block);
        });

        newBlock.bind('jumpdown', function (block) {
            thiz.jumpdownBlock(block);
        });

        newBlock.bind('clone', function (block) {
            thiz.cloneBlock(block);
        });

        newBlock.bind('blockop', function () {
            var args = [].slice.call(arguments);
            args.unshift('blockop');
            args.push(thiz);
            thiz.trigger.apply(thiz, args);
        });

        newBlock.bind('focus', function (block) {
            thiz.handleBlockFocus(block);
        });

        newBlock.bind('paste', function (block, e) {
            thiz.handlePasteEvent(block, e);
        });

        newBlock.bind('select.start', function (block) {
            thiz.selectStart(block);
        });

        thiz.addBlock(newBlock, previousBlock);

        return newBlock;
    };

    Writer.prototype.selectStart = function (startBlock) {
        var thiz = this;
        thiz.selecting = true;
        for (var i in thiz.blocks) {
            var block = thiz.blocks[i];
            block.selectStart();
        }
        startBlock.select(true);
    };

    Writer.prototype.handlePasteEvent = function (block, e) {
        var thiz = this;
        if (!thiz.isGridContext()) {
            var pasteText = getPasteText(e).trim();
            thiz.pasteRows(block, pasteText);
        }
    };

    Writer.prototype.pasteRows = function (block, pasteText) {
        var thiz = this;
        var markdownImport = new MarkdownImport();
        var blockDataArray = markdownImport.parse(pasteText);
        if (isNotEmpty(blockDataArray)) {
            var previousBlock = block;
            for (var i in blockDataArray) {
                var newBlockData = blockDataArray[i];
                var newBlock = thiz.createBlock(previousBlock, newBlockData);
                previousBlock = newBlock;
            }
        }
    };

    Writer.prototype.handleBlockFocus = function (focusBlock) {
        var thiz = this;
        var blurBlocks = thiz.blocks.filter(function (e) {
            return e.id != focusBlock.id;
        });
        for (var i = 0; i < blurBlocks.length; i++) {
            var blurBlock = blurBlocks[i];
            blurBlock.blur();
        }
    };

    Writer.prototype.inheritSchema = function (blockSchema) {
        var res = blockSchema;
        if ([
            SCHEMA.PAPER,
            SCHEMA.TEXT,
            SCHEMA.H1,
            SCHEMA.H2,
            SCHEMA.H3,
            SCHEMA.GRID,
            SCHEMA.QUOTE,
        ].includes(blockSchema)) {
            res = SCHEMA.TEXT;
        }
        return res;
    };

    Writer.prototype.isGridContext = function () {
        var thiz = this;
        return thiz.context == SCHEMA.GRID;
    };

    Writer.prototype.addBlock = function (newBlock, previousBlock) {
        if (isNotNone(previousBlock)) {
            var previousIdx = this.getBlockIndex(previousBlock.id);
            if (previousIdx >= 0) {
                this.blocks.splice(previousIdx + 1, 0, newBlock);
                return true;
            }
        }
        this.blocks.push(newBlock);
        return true;
    };

    Writer.prototype.getBlockIndex = function (id) {
        var idx = -1;

        for (var i = 0; i < this.blocks.length; i++) {
            if (this.blocks[i].id === id) {
                idx = i;
                break;
            }
        }

        return idx;
    };

    Writer.prototype.removeBlock = function (block, autoFocus) {
        var thiz = this;
        var idx = thiz.getBlockIndex(block.id);
        var isAutoFocus = isNotNone(autoFocus) ? autoFocus : true;

        if (idx < 0) {
            return;
        }

        thiz.blocks.splice(idx, 1);
        block.ele.remove();

        if (isAutoFocus) {
            if (thiz.blocks.length > 0) {
                var focusIdx = idx - 1;
                focusIdx = focusIdx < 0 ? 0 : focusIdx;
                setTimeout(function () {
                    thiz.blocks[focusIdx].focus();
                }, 1);
            } else {
                thiz.focus();
            }
        }
    };

    Writer.prototype.moveupBlock = function (block) {
        var curIdx = this.getBlockIndex(block.id);
        var toIdx = curIdx - 1;
        if (toIdx >= 0) {
            var upBlock = this.blocks[toIdx];
            this.createBlock(block, upBlock.getData());
            this.removeBlock(upBlock, false);
            block.focus();
        }
    };

    Writer.prototype.movedownBlock = function (block) {
        var curIdx = this.getBlockIndex(block.id);
        var toIdx = curIdx + 1;
        if (toIdx < this.blocks.length) {
            var downBlock = this.blocks[toIdx];
            var movedBlock = this.createBlock(downBlock, block.getData());
            this.removeBlock(block, false);
            movedBlock.focus();
        }
    };

    Writer.prototype.jumpupBlock = function (block) {
        var thiz = this;
        var curIdx = thiz.getBlockIndex(block.id);
        var toIdx = curIdx - 1;
        if (toIdx >= 0) {
            var upBlock = thiz.blocks[toIdx];
            upBlock.focus();
        }
    };

    Writer.prototype.jumpdownBlock = function (block) {
        var thiz = this;
        var curIdx = thiz.getBlockIndex(block.id);
        var toIdx = curIdx + 1;
        if (toIdx < thiz.blocks.length) {
            var downBlock = thiz.blocks[toIdx];
            downBlock.focus();
        }
    };

    Writer.prototype.cloneBlock = function (block) {
        var thiz = this;
        if (isNotNone(block)) {
            var nextBlock = thiz.createBlock(block, block.getData());
            nextBlock.focus();
        }
    };

    Writer.prototype.getData = function () {
        var data = [];
        if (this.blocks.length > 0) {
            for (var i = 0; i < this.blocks.length; i++) {
                data.push(this.blocks[i].getData());
            }
        }
        return data;
    };

    Writer.prototype.getFirstBlockData = function () {
        var thiz = this;
        var data = '';
        if (thiz.blocks.length > 0) {
            data = thiz.blocks[0].getData().text || '';
        }
        return data;
    };

    Writer.prototype.setData = function (data) {
        var thiz = this;
        if (isNotEmpty(data)) {
            thiz.ele.empty();
            thiz.blocks = [];
            var curBlock = null;
            for (var i = 0; i < data.length; i++) {
                var blockData = data[i];
                var block = thiz.createBlock(curBlock, blockData);
                curBlock = block;
            }
            var firstBlock = thiz.blocks[0];
            if (isNotNone(firstBlock)) {
                firstBlock.reload();
            }
        }
    };

    Writer.prototype.isFirstBlock = function (blockId) {
        var thiz = this;
        return thiz.getBlockIndex(blockId) === 0;
    };

    Writer.prototype.isLastBlock = function (blockId) {
        var thiz = this;
        return thiz.getBlockIndex(blockId) === thiz.blocks.length - 1;
    };

    window.Writer = Writer;
})();
