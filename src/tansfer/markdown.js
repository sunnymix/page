function Markdown() {
    var thiz = this;
    thiz.init();
}

Markdown.prototype.init = function () {
    var thiz = this;
};

Markdown.prototype.parsePaper = function (paper) {
    var thiz = this;
    var data = [];
    data.push(thiz.parseWriter(paper.writer));
    return data.join('');
};

Markdown.prototype.parseWriter = function (writer) {
    var thiz = this;
    var data = [];
    for (var i = 0; i < writer.blocks.length; i++) {
        var block = writer.blocks[i];
        var previousBlock = (i > 0) ? writer.blocks[i - 1] : null;
        var nextBlock = (i < writer.blocks.length - 1) ? writer.blocks[i + 1] : null;
        data.push(thiz.parseBlock(block, previousBlock, nextBlock));
    }
    return data.join('');
};

Markdown.prototype.parseBlock = function (block, previousBlock, nextBlock) {
    var thiz = this;
    var data = 'cannot parse';
    var parser = thiz.getParser(block.schema);
    if (isNotNone(parser)) {
        data = parser.call(thiz, block, previousBlock, nextBlock)
            + thiz.parseBlockAttach(block);
    }
    return data;
};

Markdown.prototype.getParsers = function () {
    var thiz = this;
    if (isNotNone(thiz.parsers)) {
        return thiz.parsers;
    }
    map = {};
    map[SCHEMA.PAPER] = thiz.parsePaper;
    map[SCHEMA.TEXT] = thiz.parseTextBlock;
    map[SCHEMA.H1] = thiz.parseH1Block;
    map[SCHEMA.H2] = thiz.parseH2Block;
    map[SCHEMA.H3] = thiz.parseH3Block;
    map[SCHEMA.CODE] = thiz.parseCodeBlock;
    map[SCHEMA.GRID] = thiz.parseGridBlock;
    map[SCHEMA.TASK] = thiz.parseTaskBlock;
    thiz.parsers = map;
    return thiz.parsers;
};

Markdown.prototype.getParser = function (schema) {
    var thiz = this;
    return thiz.getParsers()[schema];
};

Markdown.prototype.parseTextBlock = function (block) {
    return block.getData().text + '\n\n';
};

Markdown.prototype.parseH1Block = function (block) {
    return '# ' + block.getData().text + '\n\n';
};

Markdown.prototype.parseH2Block = function (block) {
    return '## ' + block.getData().text + '\n\n';
};

Markdown.prototype.parseH3Block = function (block) {
    return '### ' + block.getData().text + '\n\n';
};

Markdown.prototype.parseCodeBlock = function (block, previousBlock, nextBlock) {
    var thiz = this;
    var res = [];
    if (!thiz.isSameSchema(block, previousBlock)) {
        res.push('```\n');
    }
    res.push(block.getData().text + '\n');
    if (!thiz.isSameSchema(block, nextBlock)) {
        res.push('```\n\n');
    }
    return res.join('');
};

Markdown.prototype.isSameSchema = function (a, b) {
    return isNotNone(a) && isNotNone(a.schema)
        && isNotNone(b) && isNotNone(b.schema)
        && a.schema === b.schema;
}

Markdown.prototype.parseTaskBlock = function (block) {
    var check = (block.getData().check === 1) ? 'x' : ' ';
    return '[' + check + '] ' + block.getData().text;
};

Markdown.prototype.parseBlockAttach = function (block) {
    var thiz = this;
    var attach = block.getData().attach;
    var res = '';
    if (isNotEmpty(attach)) {
        res = '![attach](' + attach + ')\n\n';
    }
    return res;
};

window.Markdown = Markdown;
