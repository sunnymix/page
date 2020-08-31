function Writer(p, readonly, context) {
    var thiz = this;

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
        thiz.blocks[0].focus();
    } else {
        if (isFunction(thiz.createBlock)) {
            var newBlock = thiz.createBlock();
            newBlock.focus();
        }
    }
};

Writer.prototype.createBlock = function (place, data) {
    var thiz = this;

    var tmp = $('<div></div>');
    var previousBlock = null;

    if (isBlock(place)) {
        place.ele.after(tmp);
        previousBlock = place;
    } else {
        thiz.ele.append(tmp);
    }

    var isLock = false;

    var newBlock = new Block(tmp, data, isLock, thiz.readonly, thiz.context);

    newBlock.bind('enter', function (block) {
        var nextBlock = thiz.createBlock(block);
        nextBlock.focus();
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

    thiz.addBlock(newBlock, previousBlock);

    return newBlock;
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
    var idx = this.getBlockIndex(block.id);
    var isAutoFocus = isNotNone(autoFocus) ? autoFocus : true;

    if (idx < 0) {
        return;
    }

    this.blocks.splice(idx, 1);
    block.ele.remove();

    if (isAutoFocus) {
        if (this.blocks.length > 0) {
            var focusIdx = idx - 1;
            focusIdx = focusIdx < 0 ? 0 : focusIdx;
            this.blocks[focusIdx].focus();
        } else {
            this.focus();
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
    }
};

window.Writer = Writer;
