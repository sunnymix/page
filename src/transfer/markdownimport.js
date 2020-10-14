function MarkdownImport() {
    var thiz = this;
}

/**
 * Import markdown source text as Block data array.
 * 
 * @param {string} text Markdown source text.
 * @returns Block data array.
 */
MarkdownImport.prototype.parse = function (sourceText) {
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
        var blockData = thiz.applyParser(rowText, parser);

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
            if (isToggling && isNotEmpty(rowTextCacheArray)) {
                var cacheRowsText = rowTextCacheArray.join('\n');
                var cacheBlockData = thiz.applyParser(cacheRowsText, toggleParser);
                if (isNotNone(cacheBlockData)) {
                    blockDataArray.push(cacheBlockData);
                }
            }
        }

        if (isStartToggle) {
            toggleSchema = blockData.schema;
            toggleParser = parser;
        }

        if (isPushData) {
            isToggling = isAllNotNone(toggleSchema, toggleParser);
            if (isToggling) {
                blockData = thiz.applyParser(rowText, toggleParser);
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

MarkdownImport.prototype.applyParser = function (rowText, parser) {
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
    var parsers = thiz.getParses();

    var regexp = '.*';
    var parse = thiz.parseText;

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

MarkdownImport.prototype.getParses = function () {
    var thiz = this;
    if (isNotNone(thiz.parses)) {
        return thiz.parses;
    }
    map = {};

    map['^(###)(.*)$'] = thiz.parseH3;
    map['^(##)(.*)$'] = thiz.parseH2;
    map['^(#)(.*)$'] = thiz.parseH1;
    map['^(\\[[.\\sxX√]?\\])(.*)$'] = thiz.parseTask;
    map['^```\\s*$'] = thiz.parseCode;
    map['^(\\|)(.)+(\\|)$'] = thiz.parseGrid;

    thiz.parses = map;
    return thiz.parses;
};

MarkdownImport.prototype.parseText = function (sourceText, schemaText, contentText) {
    return this.createBlock(SCHEMA.TEXT, contentText);
};

MarkdownImport.prototype.parseH1 = function (sourceText, schemaText, contentText) {
    return this.createBlock(SCHEMA.H1, contentText);
};

MarkdownImport.prototype.parseH2 = function (sourceText, schemaText, contentText) {
    return this.createBlock(SCHEMA.H2, contentText);
};

MarkdownImport.prototype.parseH3 = function (sourceText, schemaText, contentText) {
    return this.createBlock(SCHEMA.H3, contentText);
};

MarkdownImport.prototype.parseTask = function (sourceText, schemaText, contentText) {
    var check = (new RegExp('^\\[[xX√]+\\]$')).test(schemaText) ? 1 : 0;
    return this.createBlock(SCHEMA.TASK, contentText, check);
};

MarkdownImport.prototype.parseCode = function (sourceText, schemaText, contentText) {
    return this.createBlock(SCHEMA.CODE, sourceText);
};

MarkdownImport.prototype.parseGrid = function (sourceText, schemaText, contentText) {
    return this.createBlock(SCHEMA.GRID, '[[[]]]');
};

MarkdownImport.prototype.createBlock = function (schema, text, check) {
    return {
        schema: schema,
        text: text,
        check: check || 0
    };
};

window.MarkdownImport = MarkdownImport;
