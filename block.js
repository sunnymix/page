function Block(p, data, isLock) {
    var thiz = this;

    this.id = uuid();

    var dataObj = this.extractData(data);

    this.schema = dataObj.schema;
    this.style = getStyle(this.schema);
    this.isLock = isLock || false;

    var ele = $(
        [
            '<div',
            '  contenteditable="true"',
            '  style="' + this.style.toString() + '"',
            '>',
            dataObj.text,
            '</div>'
        ].join('')
    );

    ele.on('blur', function (e) {
        thiz.blur();
    });

    ele.on('keydown', function (e) {
        if (e.keyCode == KEYCODE.ENTER) {
            e.preventDefault();
            thiz.enter();
            return false;
        }

        if (e.keyCode == KEYCODE.BACKSPACE) {
            if (ele.text().length == 0) {
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

    ele.on('click', function (e) {
        e.stopPropagation();
        thiz.focus();
    });

    $(p).replaceWith(ele);

    this.ele = ele;
    this.listener = {};
};

Block.prototype.type = ELE_TYPE.BLOCK;

Block.prototype.setSchema = function (schema) {
    if (this.isLock) {
        return;
    }

    if (isNotEmpty(schema)) {
        this.schema = schema;

        var style = getStyle(schema);

        if (isNotNone(style)) {
            this.ele.prop('style', style.toString());
        }
    }
};

Block.prototype.blur = function () {
    var ele = this.ele;

    if (ele.text().length == 0) {
        ele.text('');
    }

    this.ele.prop('contenteditable', false);
};

Block.prototype.focus = function () {
    var ele = this.ele;
    this.ele.prop('contenteditable', true);

    setTimeout(function () {
        // selectText(ele[0]);
        ele.focus();
    }, 10);
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

Block.prototype.getData = function () {
    return {
        schema: this.schema,
        text: this.ele.text()
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
