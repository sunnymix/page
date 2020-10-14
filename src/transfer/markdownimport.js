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

    var toggleSchema = null;
    var toggleParser = null;
    var rowTextCacheArray = [];

    for (var i in rows) {
        var rowText = rows[i];

        var parser = thiz.getParser(rowText);
        var blockData = thiz.parseRowToBlockData(rowText, parser);

        if (isNone(blockData)) {
            continue;
        }

        var isToggling = isAllNotNone(toggleSchema, toggleParser);
        var isTogglingCode = isToggling && toggleSchema == SCHEMA.CODE;
        var isTogglingGrid = isToggling && toggleSchema == SCHEMA.GRID;

        var isStartToggle = false;
        var isStopToggle = false;

        var isPushData = true;
        var isHandleCache = true;

        // ------> switch toggle, cache data ------>

        // Code toggle
        if (blockData.schema == SCHEMA.CODE) {
            isPushData = false; // ``` has no content
            isHandleCache = false;
            isStartToggle = !isToggling;
            isStopToggle = isToggling;
        } else if (blockData.schema == SCHEMA.GRID) {
            isPushData = false;
            isHandleCache = false;
            isStartToggle = !isToggling;
            isStopToggle = false;
            rowTextCacheArray.push(rowText);
        } else {
            isPushData = true;
            isHandleCache = isTogglingGrid;
            isStartToggle = false;
            isStopToggle = !isTogglingCode
                || isTogglingGrid;
        }

        // <------ switch toggle, cache data <------

        if (isHandleCache) {
            // todo
            console.log('isHandleCache')
        }

        if (isStartToggle) {
            toggleSchema = blockData.schema;
            toggleParser = parser;
        }

        if (isPushData) {
            isToggling = isAllNotNone(toggleSchema, toggleParser);
            if (isToggling) {
                blockData = thiz.parseRowToBlockData(rowText, toggleParser);
            }
            if (isNotNone(blockData)) {
                blockDataArray.push(blockData);
            }
        }

        if (isStopToggle) {
            toggleSchema = toggleParser = null;
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

    map['^(###)(.*)$'] = thiz.parseH3BlockData;
    map['^(##)(.*)$'] = thiz.parseH2BlockData;
    map['^(#)(.*)$'] = thiz.parseH1BlockData;
    map['^(\\[[.\\sxX√]?\\])(.*)$'] = thiz.parseTaskBlockData;
    map['^```\\s*$'] = thiz.parseCodeBlockData;
    // map['^(\\|)(.)+(\\|)$'] = thiz.parseGridBlockData;

    thiz.parsers = map;
    return thiz.parsers;
};

MarkdownImport.prototype.parseTextBlockData = function (sourceText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.TEXT, contentText);
};

MarkdownImport.prototype.parseH1BlockData = function (sourceText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.H1, contentText);
};

MarkdownImport.prototype.parseH2BlockData = function (sourceText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.H2, contentText);
};

MarkdownImport.prototype.parseH3BlockData = function (sourceText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.H3, contentText);
};

MarkdownImport.prototype.parseTaskBlockData = function (sourceText, schemaText, contentText) {
    var check = (new RegExp('^\\[[xX√]+\\]$')).test(schemaText) ? 1 : 0;
    return this.createBlockData(SCHEMA.TASK, contentText, check);
};

MarkdownImport.prototype.parseCodeBlockData = function (sourceText, schemaText, contentText) {
    return this.createBlockData(SCHEMA.CODE, sourceText);
};

MarkdownImport.prototype.createBlockData = function (schema, text, check) {
    return {
        schema: schema,
        text: text,
        check: check || 0
    };
};

window.MarkdownImport = MarkdownImport;
