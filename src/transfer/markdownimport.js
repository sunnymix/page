function MarkdownImport() {
    var thiz = this;
}

/**
 * Import markdown source text as Block data array.
 * 
 * @param {string} text Markdown source text.
 * @returns Block data array.
 */
MarkdownImport.prototype.import = function (sourceText) {
    var thiz = this;
    var blockDataArray = [];

    var text = sourceText.trim();
    if (isBlank(text)) {
        return blockDataArray;
    }

    var rows = text.split('\n');

    for (var i in rows) {
        var rowText = rows[i];
        var parser = thiz.getParser(rowText);
        var blockData = thiz.parseRowToBlockData(rowText, parser);
        if (isNotNone(blockData)) {
            blockDataArray.push(blockData);
        }
    }

    return blockDataArray;
};

MarkdownImport.prototype.parseRowToBlockData = function (rowText, parser) {
    var thiz = this;
    if (isBlank(rowText)) {
        return null;
    }

    var schemaText = '';
    var contentText = rowText;

    var regexp = new RegExp(parser.regexp);
    var regexpRes = regexp.exec(rowText);

    if (isNotEmpty(regexpRes) && regexpRes.length >= 3) {
        schemaText = regexpRes[1].trim();
        contentText = regexpRes[2].trim();
    }

    return parser.parse.call(thiz, rowText, schemaText, contentText);
};

MarkdownImport.prototype.getParser = function (rowText) {
    var thiz = this;
    var thiz = this;
    if (isBlank(rowText)) {
        return null;
    }
    var parsers = thiz.getParsers();

    var regexp = '.*';
    var parse = thiz.parseTextBlockData;

    for (var regexpText in parsers) {
        if (new RegExp(regexpText).test(rowText)) {
            regexp = regexpText;
            parse = parsers[regexpText];
            break;
        }
    }

    return {
        regexp: regexp,
        parse: parse
    };
};

MarkdownImport.prototype.getParsers = function () {
    var thiz = this;
    if (isNotNone(thiz.parsers)) {
        return thiz.parsers;
    }
    map = {};

    // ****** priority by order ******

    map['^(###)(.*)$'] = thiz.parseH3BlockData;
    map['^(##)(.*)$'] = thiz.parseH2BlockData;
    map['^(#)(.*)$'] = thiz.parseH1BlockData;
    map['^(\\[[.\\sxX√]?\\])(.*)$'] = thiz.parseTaskBlockData;
    // map['^```\\s*$'] = thiz.parseCodeBlockData;
    // map[SCHEMA.GRID] = thiz.parseGridBlock;

    thiz.parsers = map;
    return thiz.parsers;
};

MarkdownImport.prototype.parseTextBlockData = function (rowText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.TEXT, contentText);
};

MarkdownImport.prototype.parseH1BlockData = function (rowText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.H1, contentText);
};

MarkdownImport.prototype.parseH2BlockData = function (rowText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.H2, contentText);
};

MarkdownImport.prototype.parseH3BlockData = function (rowText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.H3, contentText);
};

MarkdownImport.prototype.parseTaskBlockData = function (rowText, schemaText, contentText) {
    var check = (new RegExp('^\\[[xX√]+\\]$')).test(schemaText) ? 1 : 0;
    return this.createBlockData(SCHEMA.TASK, contentText, check);
};

MarkdownImport.prototype.createBlockData = function (schema, text, check) {
    return {
        schema: schema,
        text: text,
        check: check || 0
    };
};

window.MarkdownImport = MarkdownImport;
