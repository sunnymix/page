function Blockop() {
    var thiz = this;

    thiz.ele = $([
        '<div',
        '    class="blockop"',
        '    style="',
        '        background-color: #ffffff;',
        '        border: 1px solid #eeeeee;',
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
    initEvent(thiz, Blockop.prototype);
};

Blockop.prototype.initPop = function () {
    var thiz = this;
    thiz.pop = new Pop();
    thiz.pop.append(thiz.ele);
};

Blockop.prototype.initActions = function () {
    var thiz = this;
    thiz.actionsEle = thiz.ele.find('.blockop-actions');

    var cloneBtn = new Button('img/clone.png', 'clone', 28, null, 12);
    cloneBtn.appendTo(thiz.actionsEle);
    cloneBtn.click(function (e, btn) {
        thiz.clone();
    });

    var attachBtn = new Button('img/paperclip-solid.png', 'attach', 28, null, 12);
    attachBtn.appendTo(thiz.actionsEle);
    attachBtn.click(function (e, btn) {
        thiz.attach();
    });

    var removeBtn = new Button('img/times-solid.png', 'remove', 28, null, 12);
    removeBtn.appendTo(thiz.actionsEle);
    removeBtn.click(function (e, btn) {
        thiz.remove();
    });
};

Blockop.prototype.appendTo = function (place) {
    var thiz = this;
    if (isNotNone(place)) {
        place.append(thiz.ele);
    }
};

Blockop.prototype.show = function (block) {
    var thiz = this;
    thiz.block = block;
    thiz.pop.show(thiz.block.attachBtn.ele);
};

Blockop.prototype.hide = function () {
    var thiz = this;
    thiz.block = null;
    thiz.pop.hide();
};

Blockop.prototype.clone = function () {
    var thiz = this;
    thiz.block.trigger('clone', thiz.block);
    thiz.hide();
};

Blockop.prototype.attach = function () {
    var thiz = this;
    thiz.block.trigger('attach', thiz.block);
    thiz.hide();
};

Blockop.prototype.remove = function () {
    var thiz = this;
    thiz.block.trigger('remove', thiz.block);
    thiz.hide();
};

window.Blockop = Blockop;
