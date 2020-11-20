(function () {
    function Selector(baseEle, writer) {
        var thiz = this;
        thiz.baseEle = baseEle;
        thiz.writer = writer;
        thiz.active = false;
        thiz.blocks = [];
        thiz.init();
    }

    Selector.prototype.init = function () {
        var thiz = this;
        thiz.initBind();
        thiz.initClip();
    };

    Selector.prototype.initBind = function () {
        var thiz = this;
        $(document)
            .on('keydown', function (e) {
                if (isCopyAction(e)) {
                    thiz.tryCopy();
                }
            });

        thiz.writer.bind('click', function (e) {
            thiz.closeCopy();
        });
    };

    Selector.prototype.initClip = function () {
        var thiz = this;
        thiz.clip = new Clip();
        thiz.clip.appendTo($('body'));
    };

    Selector.prototype.createEle = function () {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.selector',
            position: 'relative',
        });

        thiz.borderEle = new Ele('div', {
            id: '.selector-border',
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 255, 0.08)',
            zIndex: 100,
        });
        thiz.ele.append(thiz.borderEle);

        thiz.contentEle = new Ele('div', {
            id: '.selector-content',
        });
        thiz.ele.append(thiz.contentEle);
    };

    Selector.prototype.selectOn = function (selectBlock) {
        var thiz = this;
        thiz.active = true;
        thiz.blocks = [];

        var siblingBlocks = thiz.getSiblingBlocks(selectBlock);

        var firstBlock = siblingBlocks[0];

        thiz.createEle();
        firstBlock.ele.before(thiz.ele);

        for (var i in siblingBlocks) {
            var block = siblingBlocks[i];
            thiz.contentEle.append(block.ele);
            thiz.blocks.push(block);
        }
    };

    Selector.prototype.getSiblingBlocks = function (block) {
        var thiz = this;
        var blocks = [];
        if (block.isCode()) {
            var idx = thiz.writer.getBlockIndex(block.id);
            for (var i = idx - 1; i >= 0; i--) {
                var previousBlock = thiz.writer.blocks[i];
                if (previousBlock.schema == block.schema) {
                    blocks.unshift(previousBlock);
                } else {
                    break;
                }
            }
            blocks.push(block);
            for (var i = idx + 1; i < thiz.writer.blocks.length; i++) {
                var nextBlock = thiz.writer.blocks[i];
                if (nextBlock.schema == block.schema) {
                    blocks.push(nextBlock);
                } else {
                    break;
                }
            }
        } else {
            blocks = thiz.writer.blocks;
        }
        return blocks;
    };

    Selector.prototype.tryCopy = function () {
        var thiz = this;
        if (isTrue(thiz.active)) {
            var md = new MarkdownExport().parseBlocks(thiz.blocks).join('');
            thiz.clip.copy(md);
        }
    };

    Selector.prototype.closeCopy = function () {
        var thiz = this;
        if (isTrue(thiz.active)) {
            thiz.ele.after(thiz.contentEle.children());
            thiz.ele.remove();
            thiz.active = false;
            thiz.blocks = [];
        }
    };

    window.Selector = Selector;
})();
