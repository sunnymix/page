function Button(icon, content, height, width, iconHeight, iconWidth) {
    var thiz = this;

    thiz.icon = isNotNone(icon) ? icon : null;
    thiz.content = isNotNone(content) ? content : null;

    thiz.height = isNotNone(height) ? height : '40px';
    thiz.width = isNotNone(width) ? width : (isNotNone(thiz.content) ? "auto" : thiz.height);

    thiz.iconHeight = isNotNone(iconHeight) ? iconHeight : '18px';
    thiz.iconWidth = isNotNone(iconWidth) ? iconWidth : thiz.iconHeight;

    thiz.background = '#ffffff';
    thiz.backgroundHover = '#f8f8f8';

    thiz.ele = $([
        '<button',
        '    class="btn"',
        '    style="',
        '        padding: 0;',
        '        position: relative;',
        '        display: inline-block;',
        '        border: 1px solid transparent;',
        '        border-radius: 1px;',
        '        opacity: 1;',
        '        cursor: pointer;',
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
        '    <div',
        '        class="btn-content"',
        '        style="',
        '            position: relative;',
        '        "',
        '    ></div>',
        '</button>'
    ].join(''));

    thiz.iconEle = thiz.ele.find('.btn-icon');
    thiz.contentEle = thiz.ele.find('.btn-content');

    thiz.init();
}

Button.prototype.init = function () {
    var thiz = this;

    thiz.ele.css({
        width: thiz.width,
        height: thiz.height
    });

    thiz.initIcon();

    thiz.initContent();

    thiz.bindReaction();
};

Button.prototype.initIcon = function () {
    var thiz = this;

    if (isNotNone(thiz.icon)) {
        thiz.iconEle.css({
            height: thiz.height,
            width: thiz.height > thiz.width ? thiz.width : thiz.height
        });

        thiz.iconImg = $('<img style="width:0; height:0;">');
        thiz.iconImg.prop('src', thiz.icon);
        thiz.iconEle.empty().append(thiz.iconImg);

        getImgSize(thiz.icon, function (width, height) {
            var iconHeight = parsePxToNum(thiz.iconHeight);
            var iconWidth = (1.0 * width / height) * iconHeight;

            thiz.iconImg.height(iconHeight).width(iconWidth);

            var marginTop = '-' + (iconHeight * 0.5 + 1) + 'px';
            var marginLeft = '-' + (iconWidth * 0.5 + 1) + 'px';

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

Button.prototype.initContent = function () {
    var thiz = this;

    if (isNotNone(thiz.content)) {
        thiz.contentEle.html(thiz.content);
        if (isNotNone(thiz.icon)) {
            thiz.contentEle.css({
                paddingLeft: (parsePxToNum(thiz.height) * 1) + 'px',
                paddingRight: (parsePxToNum(thiz.height) * 0.3) + 'px'
            });
        }
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
            background: thiz.backgroundHover,
            //boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.3)',
            //opacity: 1
            borderColor: '#dddddd'
        });
    }).on('mouseleave', function (e) {
        thiz.ele.css({
            background: thiz.background,
            //boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
            //opacity: 1
            borderColor: 'transparent'
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
