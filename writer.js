function Writer(p) {
    this.ele = $(p);
    this.cursor = null;
    this.blocks = [];

    this.ele.on('click', this.click);

    this.focus();
};

Writer.prototype.type = ELE_TYPE.WRITER;

Writer.prototype.click = function (e) {
    e.preventDefault();
};

Writer.prototype.focus = function () {
    var blockLength = this.blocks.length;

    if (blockLength == 0) {
        this.createBlock();
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
        this.ele.append(tmp);
    }

    var newBlock = new Block(tmp, data);

    newBlock.bind('enter', function (block) {
        thiz.createBlock(block);
    });

    newBlock.bind('remove', function (block) {
        thiz.removeBlock(block);
    });

    newBlock.focus();

    this.addBlock(newBlock, previousBlock);

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

Writer.prototype.removeBlock = function (b) {
    var idx = this.getBlockIndex(b.id);

    if (idx < 0) {
        return;
    }

    this.blocks.splice(idx, 1);

    if (this.blocks.length > 0) {
        var focusIdx = idx - 1;
        focusIdx = focusIdx < 0 ? 0 : focusIdx;
        this.blocks[focusIdx].focus();
    } else {
        this.focus();
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

Writer.prototype.setData = function (data) {
    if (isNotEmpty(data)) {
        this.ele.empty();
        this.blocks = [];

        var curBlock = null;

        for (var i = 0; i < data.length; i++) {
            var blockData = data[i];
            var block = this.createBlock(curBlock, blockData);
            curBlock = block;
        }
    }
}

window.Writer = Writer;
