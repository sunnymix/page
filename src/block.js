function Block(p, data, isLock) {
    var thiz = this;

    this.id = uuid();

    var dataObj = this.extractData(data);

    this.schema = dataObj.schema;
    this.style = getStyle(this.schema);
    this.isLock = isLock || false;

    this.ele = $(
        [
            '<div',
            '    class="block"',
            '>',
            '    <div',
            '        class="block-box"',
            '        style="',
            '            position: relative;',
            '        "',
            '    >',
            '        <div',
            '            class="block-border"',
            '            style="',
            '                position: absolute;',
            '                left: 0px;',
            '                right: 0px;',
            '                bottom: 0px;',
            '            "></div>',
            '        <div class="block-content" contenteditable="true"></div>',
            '    </div>',
            '</div>'
        ].join('')
    );

    this.boxEle = this.ele.find('.block-box');
    this.borderEle = this.ele.find('.block-border');
    this.contentEle = this.ele.find('.block-content');

    this.loadStyle();
    this.setData(dataObj.text);

    this.ele.on('blur', function (e) {
        thiz.blur();
    });

    this.ele.on('keydown', function (e) {
        if (e.keyCode == KEYCODE.ENTER) {
            e.preventDefault();
            thiz.enter();
            return false;
        }

        if (e.keyCode == KEYCODE.BACKSPACE) {
            if (thiz.contentEle.text().length == 0) {
                thiz.remove();
            }
        }

        if (e.keyCode == KEYCODE.B && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.TEXT);
        }

        if (e.keyCode == KEYCODE.NUM1 && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.H1);
        }

        if (e.keyCode == KEYCODE.NUM2 && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.H2);
        }

        if (e.keyCode == KEYCODE.NUM3 && isCommandOrControl(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.H3);
        }

        if (e.keyCode == KEYCODE.C && isCommandOrControl(e) && isShift(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.setSchema(SCHEMA.CODE);
        }

        if (e.keyCode == KEYCODE.UP && isOption(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.moveUp();
        }

        if (e.keyCode == KEYCODE.DOWN && isOption(e)) {
            e.preventDefault();
            e.stopPropagation();
            thiz.moveDown();
        }
    });

    this.ele.on('click', function (e) {
        e.stopPropagation();
        thiz.focus();
    });

    $(p).replaceWith(this.ele);

    this.listener = {};
};

Block.prototype.type = ELE_TYPE.BLOCK;

Block.prototype.appendTo = function (place) {
    this.ele.appendTo(place);
};

Block.prototype.replaceTo = function (place) {
    place.replaceWith(this.ele);
};

Block.prototype.setSchema = function (schema) {
    if (this.isLock) {
        return;
    }

    if (isNotEmpty(schema)) {
        this.schema = schema;
        this.loadStyle();
    }
};

Block.prototype.loadStyle = function () {
    var style = getStyle(this.schema);

    if (isNotNone(style)) {
        this.ele.prop('style', style.toString());

        this.ele.css({
            borderBottomWidth: 0,
            paddingTop: 0,
            paddingBottom: 0,
            backgroundColor: 'transparent'
        });

        this.contentEle.css({
            borderBottom: style.borderBottom,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            backgroundColor: style.backgroundColor
        });
    }
};

Block.prototype.blur = function () {
    this.contentEle.prop('contenteditable', false);
};

Block.prototype.focus = function () {
    this.contentEle.prop('contenteditable', true).focus();
};

Block.prototype.enter = function () {
    this.trigger('enter');
};

Block.prototype.bind = function (e, b) {
    this.listener[e] = b;
};

Block.prototype.trigger = function (e) {
    var cb = this.listener[e];
    if (cb) {
        cb(this);
    }
};

Block.prototype.moveUp = function () {
    this.trigger('moveup');
};

Block.prototype.moveDown = function () {
    this.trigger('movedown');
};

Block.prototype.remove = function () {
    this.trigger('remove');
};

Block.prototype.setData = function (content) {
    this.contentEle.text(content);
};

Block.prototype.getData = function () {
    return {
        schema: this.schema,
        text: this.contentEle.text()
    };
};

Block.prototype.extractData = function (data) {
    var defaultData = {
        schema: SCHEMA.TEXT,
        text: ''
    };

    if (typeof data === 'object') {
        return $.extend({}, defaultData, data);
    }

    if (typeof data === 'string') {
        try {
            var dataObj = JSON.parse(data);
            return $.extend({}, defaultData, dataObj);
        } catch (error) {
            return $.extend({}, defaultData, {
                text: data
            });
        }
    }

    return defaultData;
};

window.Block = Block;
