(function () {
    function BlockDef(schema, text, check) {
        var thiz = this;
        thiz.schema = schema;
        thiz.text = text;
        thiz.check = check || 0;
        thiz.parseTextLink();
    }

    BlockDef.prototype.parseTextLink = function () {
        var thiz = this;
        var matchArray = new RegExp('^\\[(.+)\\]\\((.+)\\)$').exec(thiz.text);
        if (isNotNone(matchArray)
            && matchArray.length == 3) {
            thiz.text = matchArray[1];
            thiz.link = matchArray[2];
            console.log(matchArray);
        }
    };

    function Parser(order, schema, regexp) {
        var thiz = this;
        thiz.order = order || 0;
        thiz.schema = schema;
        thiz.regexp = regexp;
        thiz.buildParse();
    }

    Parser.prototype.buildParse = function () {
        var thiz = this;
        thiz.parse = function (sourceText, schemaText, contentText) {
            var schema = thiz.schema;

            var text = contentText;
            if ([SCHEMA.CODE].includes(schema)) {
                text = sourceText;
            }
            if (SCHEMA.GRID == schema) {
                text = thiz.parseGrid(sourceText);
            }

            var check = 0;
            if ([SCHEMA.TASK].includes(schema)) {
                check = (new RegExp('^\\[[xX√]+\\]$')).test(schemaText) ? 1 : 0;
            }

            return new BlockDef(schema, text, check);
        };
    };

    Parser.prototype.parseGrid = function (sourceText) {
        var thiz = this;
        var rowTextArray = sourceText.trim().split('\n');
        var rowDataArray = [];
        for (var i in rowTextArray) {
            var rowText = rowTextArray[i];
            var rowData = thiz.parseGridRow(rowText);
            if (isNotNone(rowData)) {
                rowDataArray.push(rowData);
            }
        }
        return JSON.stringify(rowDataArray);
    };

    Parser.prototype.parseGridRow = function (sourceRowText) {
        var thiz = this;
        var isGapRow = new RegExp('^[\\|\\s-]+$').test(sourceRowText);
        if (isGapRow) {
            return null;
        }
        var contentRowText = (new RegExp('^\\|(.*)\\|$').exec(sourceRowText))[1];
        var cellTextArray = contentRowText.split('|');
        var cellDataArray = [];
        for (var i in cellTextArray) {
            var cellText = cellTextArray[i].trim();
            var cellData = thiz.parseGridCell(cellText);
            cellDataArray.push(cellData);
        }
        return cellDataArray;
    };

    Parser.prototype.parseGridCell = function (sourceCellText) {
        var thiz = this;
        var cellText = sourceCellText.replace(/\<br\/?\>/g, '\n');
        var blocks = new MarkdownImport().parse(cellText);
        return blocks;
    };

    Parser.array = [
        new Parser(0, SCHEMA.TEXT, '.*'),
        new Parser(1, SCHEMA.H1, '^(#)(.*)$'),
        new Parser(2, SCHEMA.H2, '^(##)(.*)$'),
        new Parser(3, SCHEMA.H3, '^(###)(.*)$'),
        new Parser(4, SCHEMA.TASK, '^(\\[[.\\sxX√]?\\])(.*)$'),
        new Parser(5, SCHEMA.CODE, '^```\\s*$'),
        new Parser(6, SCHEMA.GRID, '^(\\|)(.)+(\\|)$')
    ];

    Parser.get = function (text) {
        var res = null;
        var goodParsers = Parser.array.filter(function (parser) {
            return new RegExp(parser.regexp).test(text);
        });

        goodParsers.sort(function (a, b) {
            return b.order - a.order;
        });

        if (goodParsers.length > 0) {
            res = goodParsers[0];
        }
        return res;
    };

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
            var isLastItem = (i == rows.length - 1);

            var parser = Parser.get(rowText);

            if (isNone(parser)) {
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
            if (parser.schema == SCHEMA.CODE) {
                isPushData = false; // ``` has no content
                isHandleCache = false;
                isStartToggle = !isToggling;
                isStopToggle = isToggling;
            } else if (parser.schema == SCHEMA.GRID) {
                isPushData = false;
                isHandleCache = false;
                isStartToggle = !isToggling;
                isStopToggle = false;
                rowTextCacheArray.push(rowText);
            } else {
                isPushData = true;
                isHandleCache = isToggling;
                isStartToggle = false;
                isStopToggle = !isTogglingCode
                    || isTogglingGrid;
            }

            // <------ switch toggle, cache data <------

            var isApplyCache = isLastItem || isHandleCache;
            if (isApplyCache) {
                if (isToggling && isNotEmpty(rowTextCacheArray)) {
                    var cacheRowsText = rowTextCacheArray.join('\n');
                    var cacheBlockData = thiz.applyParser(cacheRowsText, toggleParser);
                    if (isNotNone(cacheBlockData)) {
                        blockDataArray.push(cacheBlockData);
                    }
                }
            }

            if (isStartToggle) {
                toggleSchema = parser.schema;
                toggleParser = parser;
            }

            if (isPushData) {
                isToggling = isAllNotNone(toggleSchema, toggleParser);
                var selectParser = isToggling ? toggleParser : parser;
                var blockData = thiz.applyParser(rowText, selectParser);
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

    window.MarkdownImport = MarkdownImport;
})();
