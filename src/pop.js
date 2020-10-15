function Pop() {
    var thiz = this;
    thiz.init();
}

Pop.prototype.init = function () {
    var thiz = this;
    thiz.initEle();
    thiz.initBind();
};

Pop.prototype.initEle = function () {
    var thiz = this;
    thiz.ele = $([
        '<div',
        '    class="pop-lay"',
        '    style="',
        '        position: absolute;',
        '        left: 0;',
        '        top: 0;',
        '        right: 0;',
        '        bottom: 0;',
        '        border: 1px solid transparent;',
        '        z-index: 100;',
        '    "',
        '>',
        '    <div',
        '        class="pop"',
        '        style="',
        '            position: absolute;',
        '            left: 0;',
        '            right: 0;',
        '            top: 0;',
        '            bottom: 0;',
        '            z-index: 150;',
        '        "',
        '    >',
        '        <div',
        '            class="pop-box"',
        '            style="',
        '                ;',
        '            "',
        '        >',
        '        </div>',
        '    </div>',
        '</div>'
    ].join(''));
    thiz.popEle = thiz.ele.find('> .pop');
    thiz.boxEle = thiz.ele.find('> .pop > .pop-box');
    $('body').append(thiz.ele);
    thiz.hide();
};

Pop.prototype.initBind = function () {
    var thiz = this;
    thiz.boxEle.on('click', function (e) {
        e.stopPropagation();
    });
    thiz.popEle.on('click', function (e) {
        e.stopPropagation();
        thiz.hide();
    });
};

Pop.prototype.append = function (ele) {
    var thiz = this;
    thiz.boxEle.append(ele);
};

Pop.prototype.beside = function (ele) {
    var thiz = this;
    if (isNotNone(ele)) {
        var offset = ele.offset();
        offset.top += ele.height();
        thiz.boxEle.css({
            marginLeft: offset.left,
            marginTop: offset.top
        });
    }
};

Pop.prototype.fixed = function () {
    var thiz = this;
    thiz.popEle.css({
        position: 'fixed'
    });
};

Pop.prototype.rightTop = function () {
    var thiz = this;
    thiz.boxEle.css({
        float: 'right',
        marginTop: '2px',
        marginRight: '2px'
    });
};

Pop.prototype.show = function (ele) {
    var thiz = this;
    thiz.ele.show();
    thiz.beside(ele);
};

Pop.prototype.hide = function () {
    var thiz = this;
    thiz.ele.hide();
};

window.Pop = Pop;
