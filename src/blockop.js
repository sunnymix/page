function Blockop() {
    var thiz = this;

    thiz.ele = $([
        '<div',
        '    class="blockop"',
        '    style="',
        '        background-color: #ffffff;',
        '        border: 1px solid #eeeeee;',
        '        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);',
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

    var priority1Btn = new Button(null, 'P1', 36, 36);
    priority1Btn.border('0 1px 0 0').float('left');
    priority1Btn.appendTo(thiz.actionsEle);
    priority1Btn.click(function (e, btn) {
        thiz.setPriority(1);
    });

    var priority2Btn = new Button(null, 'P2', 36, 36);
    priority2Btn.border('0 1px 0 0').float('left');
    priority2Btn.appendTo(thiz.actionsEle);
    priority2Btn.click(function (e, btn) {
        thiz.setPriority(2);
    });

    var priority3Btn = new Button(null, 'P3', 36, 36);
    priority3Btn.border('0 1px 0 0').float('left');
    priority3Btn.appendTo(thiz.actionsEle);
    priority3Btn.click(function (e, btn) {
        thiz.setPriority(3);
    });

    var highlightBtn = new Button(null, 'Highlight', 36, null);
    highlightBtn.border('0 1px 0 0').float('left');
    highlightBtn.appendTo(thiz.actionsEle);
    highlightBtn.click(function (e, btn) {
        thiz.toggleHighlight();
    });

    var cloneBtn = new Button('img/clone.png', null, 36, 36, 18, 18);
    cloneBtn.border('0 1px 0 0').float('left');
    cloneBtn.appendTo(thiz.actionsEle);
    cloneBtn.click(function (e, btn) {
        thiz.clone();
    });

    var attachBtn = new Button('img/image.png', null, 36, 36, 18, 18);
    attachBtn.border('0 1px 0 0').float('left');
    attachBtn.appendTo(thiz.actionsEle);
    attachBtn.click(function (e, btn) {
        thiz.attach();
    });

    var linkBtn = new Button('img/link.png', null, 36, 36, 18, 18);
    linkBtn.border('0 1px 0 0').float('left');
    linkBtn.appendTo(thiz.actionsEle);
    linkBtn.click(function (e, btn) {
        thiz.link();
    });

    var removeBtn = new Button('img/times-solid.png', null, 36, 36, 18, 18);
    removeBtn.border('0 0px 0 0').float('left');
    removeBtn.appendTo(thiz.actionsEle);
    removeBtn.click(function (e, btn) {
        thiz.remove();
    });

    new Clearfix(thiz.actionsEle);
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

Blockop.prototype.link = function () {
    var thiz = this;
    thiz.block.showLink();
    thiz.hide();
};

Blockop.prototype.remove = function () {
    var thiz = this;
    thiz.block.trigger('remove', thiz.block);
    thiz.hide();
};

Blockop.prototype.setPriority = function (priority) {
    var thiz = this;
    thiz.block.togglePriority(priority);
    thiz.hide();
};

Blockop.prototype.toggleHighlight = function () {
    var thiz = this;
    thiz.block.toggleHighlight();
    thiz.hide();
};

window.Blockop = Blockop;
