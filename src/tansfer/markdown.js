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
    data.push(thiz.parseTitle(paper.title));
    data.push(thiz.parseWriter(paper.writer));
    return data.join('\n\n');
};

Markdown.prototype.parseTitle = function (title) {
    var thiz = this;
    return '# ' + title.getData();
};

Markdown.prototype.parseWriter = function (writer) {
    var thiz = this;
    var data = [];
    for (var i = 0; i < writer.blocks.length; i++) {
        var block = writer.blocks[i];
        data.push(thiz.parseBlock(block));
    }
    return data.join('\n\n');
};

Markdown.prototype.parseBlock = function (block) {
    var thiz = this;
    var data = 'cannot parse';
    var parser = thiz.getParser(block.schema);
    if (isNotNone(parser)) {
        data = parser(block);
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
    return block.getData().text;
};

Markdown.prototype.parseH1Block = function (block) {
    return '# ' + block.getData().text;
};

Markdown.prototype.parseH2Block = function (block) {
    return '## ' + block.getData().text;
};

Markdown.prototype.parseH3Block = function (block) {
    return '### ' + block.getData().text;
};

Markdown.prototype.parseCodeBlock = function (block) {
    return [
        '```',
        block.getData().text,
        '```'
    ].join('\n');
};

Markdown.prototype.parseTaskBlock = function (block) {
    var check = (block.getData().check === 1) ? 'x' : ' ';
    return '[' + check +'] ' + block.getData().text;
};

window.Markdown = Markdown;
