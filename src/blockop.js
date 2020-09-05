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

    var cloneBtn = new Button('img/clone.png', 'Clone', 30, null, 12);
    cloneBtn.border('0 1px 0 0');
    cloneBtn.appendTo(thiz.actionsEle);
    cloneBtn.click(function (e, btn) {
        thiz.clone();
    });

    var attachBtn = new Button('img/paperclip-solid.png', 'Attach', 30, null, 12);
    attachBtn.border('0 1px 0 0');
    attachBtn.appendTo(thiz.actionsEle);
    attachBtn.click(function (e, btn) {
        thiz.attach();
    });

    var removeBtn = new Button('img/times-solid.png', 'Remove', 30, null, 12);
    removeBtn.border('0 1px 0 0');
    removeBtn.appendTo(thiz.actionsEle);
    removeBtn.click(function (e, btn) {
        thiz.remove();
    });

    var priority1Btn = new Button(null, 'P1', 30, null);
    priority1Btn.border('0 1px 0 0');
    priority1Btn.appendTo(thiz.actionsEle);
    priority1Btn.click(function (e, btn) {
        thiz.setPriority(1);
    });

    var priority2Btn = new Button(null, 'P2', 30, null);
    priority2Btn.border('0 1px 0 0');
    priority2Btn.appendTo(thiz.actionsEle);
    priority2Btn.click(function (e, btn) {
        thiz.setPriority(2);
    });

    var priority3Btn = new Button(null, 'P3', 30, null);
    priority3Btn.border('0 1px 0 0');
    priority3Btn.appendTo(thiz.actionsEle);
    priority3Btn.click(function (e, btn) {
        thiz.setPriority(3);
    });

    var priority0Btn = new Button(null, 'P0', 30, null);
    priority0Btn.appendTo(thiz.actionsEle);
    priority0Btn.click(function (e, btn) {
        thiz.setPriority(0);
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
    thiz.pop.show(thiz.block.opBtn.ele);
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
    thiz.block.showAttach();
    thiz.hide();
};

Blockop.prototype.remove = function () {
    var thiz = this;
    thiz.block.trigger('remove', thiz.block);
    thiz.hide();
};

Blockop.prototype.setPriority = function (priority) {
    var thiz = this;
    thiz.block.setPriority(priority);
    thiz.hide();
};

window.Blockop = Blockop;
