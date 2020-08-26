function Blockop() {
    var thiz = this;

    thiz.ele = $([
        '<div',
        '    class="blockop"',
        '    style="',
        '        position: absolute;',
        '        z-index: 100;',
        '        background-color: #ffffff;',
        '    "',
        '>',
        '    <div',
        '        class="blockop-actions"',
        '        style="',
        '            position: relative;',
        '        "',
        '    >',
        '    </div>',
        '</div>'
    ].join(''));

    thiz.init();
}

Blockop.prototype.init = function () {
    var thiz = this;
    thiz.initPop();
    thiz.initActions();
    thiz.initEvents();
};

Blockop.prototype.initPop = function () {
    var thiz = this;
};

Blockop.prototype.initActions = function () {
    var thiz = this;
    thiz.actionsEle = thiz.ele.find('.blockop-actions');

    var cloneBtn = new Button('img/clone.png', 'clone', 28, null, 18, null);
    cloneBtn.appendTo(thiz.actionsEle);
    cloneBtn.click(function (e, btn) {
        thiz.trigger('clone');
    });

    var attachBtn = new Button('img/clone.png', 'clone', 28, null, 18, null);
    attachBtn.appendTo(thiz.actionsEle);
    attachBtn.click(function (e, btn) {
        thiz.trigger('attach');
    });
};

Blockop.prototype.appendTo = function (place) {
    var thiz = this;
    if (isNotNone(place)) {
        place.append(thiz.ele);
    }
};

Blockop.prototype.initEvents = function () {
    this.listener = {};
};

Blockop.prototype.trigger = function (event, arg) {
    var thiz = this;
    var cb = thiz.listener[event];
    if (isFunction(cb)) {
        cb(thiz, arg);
    }
};

Blockop.prototype.bind = function (event, cb) {
    this.listener[event] = cb;
};

Blockop.prototype.hide = function () {
    thiz = this;
    thiz.ele.hide();
};

Blockop.prototype.show = function () {
    thiz = this;
    thiz.ele.show();
};

window.Blockop = Blockop;
