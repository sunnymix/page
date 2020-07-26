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

Writer.prototype.createBlock = function (p, d) {
    var thiz = this;

    var data = isNotEmpty(d) ? d : '';

    var tmp = $('<div></div>');

    if (isBlock(p)) {
        p.ele.after(tmp);
    } else {
        this.ele.append(tmp);
    }

    var block = new Block(tmp, data);

    block.bind('enter', function (block) {
        thiz.createBlock(block);
    });

    block.bind('remove', function (b) {
        thiz.removeBlock(b);
    });

    block.focus();

    this.blocks.push(block);

    return block;
}

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
