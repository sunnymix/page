function Button(icon, content, height) {
    var thiz = this;

    thiz.icon = isNotNone(icon) ? $(icon) : null;
    thiz.content = isNotNone(content) ? $(content) : null;
    thiz.height = isNotNone(height) ? height : '40px';

    thiz.background = '#ffffff';
    thiz.backgroundHover = '#f0f0f0';

    thiz.ele = $([
        '<button',
        '    class="btn"',
        '    style="',
        '        position: relative;',
        '        display: inline-block;',
        '        border: 0px solid #eeeeee;',
        '        border-radius: 0px;',
        '        background-color: ' + thiz.background + ';',
        '    "',
        '>',
        '    <div',
        '        class="btn-icon"',
        '        style="',
        '            position: absolute;',
        '            top: 0;',
        '            left: 0;',
        '        "',
        '    ></div>',
        '    <div class="btn-content"></div>',
        '</button>'
    ].join(''));

    thiz.iconEle = thiz.ele.find('.btn-icon');
    thiz.contentEle = thiz.ele.find('.btn-content');
    
    thiz.init();

    
}

Button.prototype.init = function () {
    var thiz = this;
    
    thiz.width = isNotNone(thiz.content) ? "auto" : thiz.height;

    thiz.ele.css({
        width: thiz.width,
        height: thiz.height
    });
    
    thiz.initIcon();

    thiz.bindReaction();
};

Button.prototype.initIcon = function () {
    var thiz = this;

    if (isNotNone(thiz.icon)) {
        thiz.iconEle.css({
            width: thiz.height,
            height: thiz.height
        });

        thiz.iconEle.html(thiz.icon);

        // fixme
    
        thiz.icon.css({
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-10px',
            marginLeft: '-10px'
        });
    }
};

Button.prototype.appendTo = function (place) {
    this.ele.appendTo(place);
};

Button.prototype.click = function (cb) {
    var thiz = this;

    this.ele.on('click', function (e) {
        cb(e, thiz);
    });
};

Button.prototype.bindReaction = function () {
    var thiz = this;

    this.ele.on('mouseenter', function (e) {
        thiz.ele.css({
            background: thiz.backgroundHover
        });
    }).on('mouseleave', function (e) {
        thiz.ele.css({
            background: thiz.background
        });
    });
}

window.Button = Button;
