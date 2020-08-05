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
            '    style="',
            '        position: relative;',
            '    "',
            '>',
            '    <div',
            '        class="block-actions"',
            '        style="',
            '            position: absolute;',
            '            top: 0px;',
            '            bottom: 0px;',
            '            left: 0px;',
            '        ">',
            '        <button ',
            '            class="attach-btn"',
            '            style="',
            '                display: none;',
            '                position: absolute;',
            '                top: 0px;',
            '                bottom: 0px;',
            '                left: 0px;',
            '                right: 0px;',
            '                min-width: 30px;',
            '                background-color: #ffffff;',
            '                border: 0px solid #ffffff;',
            '                border-radius: 0px;',
            '                opacity: 0.3;',
            '            ">',
            '            <img',
            '                 src="img/ellipsis-v-solid.png"',
            '                 style="',
            '                     display: block;',
            '                     position: absolute;',
            '                     width: 20px;',
            '                     height: 20px;',
            '                     top: 50%;',
            '                     left: 50%;',
            '                     margin-top: -10px;',
            '                     margin-left: -10px;',
            '                 ">',
            '        </button>',
            '    </div>',
            '    <div',
            '        class="block-box"',
            '        style="',
            '            position: relative;',
            '        "',
            '        >',
            '        <div',
            '            class="block-border"',
            '            style="',
            '                position: absolute;',
            '                top: 0px;',
            '                bottom: 0px;',
            '                left: 0px;',
            '            "></div>',
            '        <div class="block-content" contenteditable="true"></div>',
            '    </div>',
            '    <div',
            '        class="block-attach"',
            '        style="',
            '            position: relative;',
            '        ">',
            '        <div ',
            '            class="block-attach-box"',
            '            style="',
            '                display: block;',
            '            "></div>',
            '    </div>',
            '</div>'
        ].join('')
    );

    this.boxEle = this.ele.find('.block-box');

    this.actionsEle = this.ele.find('.block-actions');
    this.attachBtn = this.ele.find('.attach-btn');
    this.attachEle = this.ele.find('.block-attach');
    this.setAttach(dataObj.attach);

    this.initActions();

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

Block.prototype.initActions = function () {
    var thiz = this;

    this.ele.on('mouseenter', function (e) {
        thiz.attachBtn.show();
    }).on('mouseleave', function (e) {
        thiz.attachBtn.hide();
    });

    this.attachBtn
        .on('mouseenter', function (e) {
            thiz.attachBtn.css('opacity', '1');
        }).on('mouseleave', function (e) {
            thiz.attachBtn.css('opacity', '0.3');
        }).on('click', function (e) {
            var url = prompt('add attachement ...', '');
            thiz.setAttach(url);
        });
};

Block.prototype.loadStyle = function () {
    var style = getStyle(this.schema);

    if (isNotNone(style)) {
        this.ele.prop('style', style.toString());

        this.ele.css({
            borderBottomWidth: 0,
            paddingTop: style.paddingTop,
            paddingBottom: style.paddingBottom,
            paddingLeft: style.paddingLeft,
            paddingRight: style.paddingRight,
            cursor: 'text',
            backgroundColor: '#ffffff'
        });

        this.contentEle.css({
            // do not set fontfamily, will cause some issue
            wordBreak: style.wordBreak,
            fontWeight: style.fontWeight,
            fontSize: style.fontSize,
            minHeight: style.minHeight,
            lineHeight: style.lineHeight,
            color: style.color,
            borderBottom: style.borderBottom,
            paddingTop: style.contentPaddingTop,
            paddingBottom: style.contentPaddingBottom,
            paddingLeft: style.contentPaddingLeft,
            paddingRight: style.contentPaddingRight,
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
    var defaultData = this.defaultData();

    return $.extend({}, defaultData, {
        schema: this.schema,
        text: this.contentEle.text(),
        attach: this.getAttachData()
    });
};

Block.prototype.defaultData = function () {
    return {
        schema: SCHEMA.TEXT,
        text: '',
        attach: ''
    };
}

Block.prototype.extractData = function (data) {
    var defaultData = this.defaultData();

    if (isObject(data)) {
        return $.extend({}, defaultData, data);
    }

    if (isString(data)) {
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

Block.prototype.setAttach = function (url) {
    var attachBox = this.attachEle.find('.block-attach-box');

    if (isNotEmpty(url)) {
        this.attach = new Attach(url);
        this.attach.htmlTo(attachBox);
    }
};

Block.prototype.getAttachData = function () {
    if (isNotNone(this.attach)) {
        return this.attach.getUrl();
    }
    return "";
};

window.Block = Block;
