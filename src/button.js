function Button(icon, content, height, iconHeight) {
    var thiz = this;

    thiz.icon = isNotNone(icon) ? icon : null;
    thiz.content = isNotNone(content) ? $(content) : null;
    thiz.height = isNotNone(height) ? height : '40px';
    thiz.iconHeight = isNotNone(iconHeight) ? iconHeight : Zoom(thiz.height, 0.5);

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
            height: thiz.height,
            width: thiz.height
        });

        thiz.iconImg = $('<img style="width:0; height:0;">');
        thiz.iconImg.prop('src', thiz.icon);
        thiz.iconEle.empty().append(thiz.iconImg);

        getImgSize(thiz.icon, function (width, height) {
            var iconHeight = parsePxToNum(thiz.iconHeight);
            var iconWidth = (1.0 * width / height) * iconHeight;

            thiz.iconImg.height(iconHeight).width(iconWidth);

            var marginTop = '-' + (iconHeight * 0.5) + 'px';
            var marginLeft = '-' + (iconWidth * 0.5) + 'px';

            thiz.iconImg.css({
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: marginLeft,
                marginTop: marginTop
            });
        });
    }
};

Button.prototype.appendTo = function (place) {
    var thiz = this;
    thiz.ele.appendTo(place);
};

Button.prototype.middle = function () {
    var thiz = this;
    thiz.ele.css({
        position: 'absolute',
        left: 0,
        top: '50%',
        marginTop: '-' + (thiz.height * 0.5) + 'px'
    });
}

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
};

Button.prototype.show = function () {
    var thiz = this;

    thiz.ele.show();
};

Button.prototype.hide = function () {
    var thiz = this;

    thiz.ele.hide();
};

window.Button = Button;
