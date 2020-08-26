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
        '        border: 1px solid #eeeeee;',
        '    "',
        '>',
        '    <div',
        '        class="pop"',
        '        style="',
        '            position: absolute;',
        '            left: 0;',
        '            top: 0;',
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
    thiz.popEle.on('click', function (e) {
        e.stopPropagation();
    });
    thiz.ele.on('click', function (e) {
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
        thiz.popEle.css({
            left: offset.left,
            top: offset.top
        });
    }
};

Pop.prototype.show = function (ele) {
    var thiz = this;
    thiz.ele.css({
        overflow: 'auto',
        right: '0px',
        bottom: '0px'
    });
    thiz.beside(ele);
};

Pop.prototype.hide = function () {
    var thiz = this;
    thiz.ele.css({
        overflow: 'hidden',
        right: '100%',
        bottom: '100%'
    });
};

window.Pop = Pop;
