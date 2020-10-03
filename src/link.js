function Link(place) {
    var thiz = this;
    thiz.ele = $([
        '<div',
        '    class="link"',
        '    style="',
        // '        position: absolute;',
        // '        left: 0px;',
        // '        right: 0px;',
        // '        top: 0px;',
        '        background-color: #ffffff;',
        '        z-index: 1;',
        // '        border-top: 1px solid #007bff;',
        '        margin-top: 0px;',
        '        height: 10px;',
        '        padding-left: 0px;',
        '        ;',
        '    "',
        '>',
        // '    <div',
        // '        class="link-icon"',
        // '        style="',
        // '            position: absolute;',
        // '            left: 0px;',
        // '            top: 0px;',
        // '            width: 3px;',
        // '            height: 20px;',
        // '            background-color: #007bff;',
        // '            border-radius: 1px;',
        // '            ;',
        // '        "',
        // '    ></div>',
        '    <a',
        '        class="link-anchor"',
        '        target="_blank"',
        '        style="',
        // '            position: absolute;',
        '            display: none;',
        // '            left: 2px;',
        // '            top: 50%;',
        // '            margin-top: -6px;',
        '            height: 12px;',
        '            line-height: 12px;',
        '            text-decoration: none;',
        '            white-space: nowrap;',
        '            z-index: 1;',
        '            background-color: transparent;',
        '            overflow: hidden;',
        '            padding: 0 2px;',
        '            color: #aaaaaa;',
        '            ;',
        '        "',
        '    ></a>',
        '</div>'
    ].join(''));

    thiz.anchorEle = thiz.ele.find('> .link-anchor');

    if (isNotNone(place)) {
        place.append(thiz.ele);
    }
}

Link.prototype.setData = function (url) {
    var thiz = this;
    thiz.url = url.trim();
    thiz.anchorEle
        .attr('href', thiz.url)
        .text(thiz.url);
};

Link.prototype.getData = function (url) {
    var thiz = this;
    return thiz.url || '';
};

Link.prototype.show = function () {
    var thiz = this;
    thiz.ele.show();
};

Link.prototype.hide = function () {
    var thiz = this;
    thiz.ele.hide();
};

Link.prototype.expand = function () {
    var thiz = this;
    thiz.expandTimer = setTimeout(function () {
        thiz.anchorEle.css({
            display: 'block'
        });
    }, 10);
};

Link.prototype.shrink = function () {
    var thiz = this;
    clearTimeout(thiz.expandTimer);
    thiz.anchorEle.css({
        display: 'none'
    });
};

window.Link = Link;
