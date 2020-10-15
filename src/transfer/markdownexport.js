(function () {
    function MarkdownExport() {
        var thiz = this;
        thiz.init();
    }

    MarkdownExport.prototype.init = function () {
        var thiz = this;
    };

    MarkdownExport.prototype.parsePaper = function (paper) {
        var thiz = this;
        var data = [];
        data.push(thiz.parseWriter(paper.writer));
        return data.join('');
    };

    MarkdownExport.prototype.parseWriter = function (writer) {
        var thiz = this;
        var data = thiz.parseBlocks(writer.blocks);
        return data.join('');
    };

    MarkdownExport.prototype.parseBlocks = function (blocks) {
        var thiz = this;
        var res = [];
        var datas = [];
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            datas.push(block.getData());
        }
        res = thiz.parseBlockDatas(datas);
        return res;
    };

    MarkdownExport.prototype.parseBlockDatas = function (blockDatas) {
        var thiz = this;
        var res = [];
        for (var i = 0; i < blockDatas.length; i++) {
            var data = blockDatas[i];
            var previousData = (i > 0) ? blockDatas[i - 1] : null;
            var nextData = (i < blockDatas.length - 1) ? blockDatas[i + 1] : null;
            res.push(thiz.parseBlockData(data, previousData, nextData));
        }
        return res;
    };

    MarkdownExport.prototype.parseBlockData = function (data, previousData, nextData) {
        var thiz = this;
        var res = 'cannot parse\n\n';
        var parser = thiz.getParser(data.schema);
        if (isNotNone(parser)) {
            res = parser.call(thiz, data, previousData, nextData)
                + thiz.parseBlockAttach(data);
        }
        return res;
    };

    MarkdownExport.prototype.getParsers = function () {
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

    MarkdownExport.prototype.getParser = function (schema) {
        var thiz = this;
        return thiz.getParsers()[schema];
    };

    MarkdownExport.prototype.parseTextBlock = function (data) {
        var thiz = this;
        return thiz.parseTextContent(data) + '\n\n';
    };

    MarkdownExport.prototype.parseH1Block = function (data) {
        var thiz = this;
        return '# ' + thiz.parseTextContent(data) + '\n\n';
    };

    MarkdownExport.prototype.parseH2Block = function (data) {
        var thiz = this;
        return '## ' + thiz.parseTextContent(data) + '\n\n';
    };

    MarkdownExport.prototype.parseH3Block = function (data) {
        var thiz = this;
        return '### ' + thiz.parseTextContent(data) + '\n\n';
    };

    MarkdownExport.prototype.parseCodeBlock = function (data, previousData, nextData) {
        var thiz = this;
        var res = [];
        if (!thiz.isSameSchema(data, previousData)) {
            res.push('```\n');
        }
        res.push(data.text + '\n');
        if (!thiz.isSameSchema(data, nextData)) {
            res.push('```\n\n');
        }
        return res.join('');
    };

    MarkdownExport.prototype.parseGridBlock = function (data) {
        var thiz = this;
        var gridString = data.text;
        var rows = JSON.parse(gridString);
        var res = '\n\n';
        var rowsRes = [];
        if (isArray(rows)) {
            for (var rowIdx = 0; rowIdx < rows.length; rowIdx++) {
                var row = rows[rowIdx];
                var cells = row;
                var cellsRes = [];
                if (isArray(cells)) {
                    for (var cellIdx = 0; cellIdx < cells.length; cellIdx++) {
                        var cell = cells[cellIdx];
                        var blocks = cell;
                        var cellRes = '';
                        if (isArray(blocks)) {
                            cellRes = thiz
                                .parseBlockDatas(blocks)
                                .join('<br/>')
                                .replace(/\n/gi, '');
                        }
                        cellsRes.push(cellRes);
                    }

                }
                var rowRes = '| ' + cellsRes.join(' | ') + ' |';
                rowsRes.push(rowRes);
                if (rowIdx == 0) {
                    var gapCells = $.map(cellsRes, function (cellRes) {
                        return '---';
                    });
                    var gapRes = '| ' + gapCells.join(' | ') + ' |';
                    rowsRes.push(gapRes);
                }
            }
            res = rowsRes.join('\n') + '\n\n';
        }
        return res;
    };

    MarkdownExport.prototype.parseTaskBlock = function (data) {
        var thiz = this;
        var check = (data.check === 1) ? 'x' : ' ';
        return '[' + check + '] ' + thiz.parseTextContent(data) + '\n\n';
    };

    MarkdownExport.prototype.parseBlockAttach = function (data) {
        var thiz = this;
        var attach = data.attach;
        var res = '';
        if (isNotEmpty(attach)) {
            res = '![attach](' + attach + ')\n\n';
        }
        return res;
    };

    MarkdownExport.prototype.parseTextContent = function (data) {
        var thiz = this;
        var text = data.text || '';
        if (isNotBlank(data.link)) {
            text = '[' + text + '](' + data.link + ')';
        }
        return text;
    };

    MarkdownExport.prototype.isSameSchema = function (a, b) {
        var thiz = this;
        return isNotNone(a) && isNotNone(a.schema)
            && isNotNone(b) && isNotNone(b.schema)
            && a.schema === b.schema;
    }

    window.MarkdownExport = MarkdownExport;
})();
