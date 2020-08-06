function Menu() {
    var thiz = this;

    this.ele = $([
        '<div',
        '  style="',
        '      position: absolute;',
        '      left: 1px;',
        '      right: 1px;',
        '      top: 1px;',
        '      bottom: 1px;',
        '      background-color: #ffffff;',
        '      border-left: 1px solid #dddddd;',
        '      box-shadow: 0px 0px 2px rgba(0,0,0,0.2);',
        '    "',
        '  >',
        '  <div',
        '    class="actions"',
        '    style="',
        '      text-align: right;',
        '      padding-right: 0px;',
        '    "',
        '  ></div>',
        '  <div',
        '    class="nodes"',
        '    style="',
        '      border-left: 0px solid #dddddd;',
        '      background-color: #ffffff;',
        '      overflow: auto;',
        '      position: absolute;',
        '      left: 0px;',
        '      right: 0px;',
        '      top: 44px;',
        '      bottom: 0px;',
        '    "',
        '  ></div>',
        '</div>'
    ].join(''));

    this.nodesEle = this.ele.find('.nodes');

    this.actionsEle = this.ele.find('.actions');
    this.createActions();

    var ids = Object.keys(localStorage);

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var node = new Node(this.nodesEle, id);
        node.bind('click', function(e, node) {
            thiz.trigger('click');
            thiz.trigger('hide');
        });
        this.nodesEle.append(node.ele);
    }

    this.listener = [];
}

Menu.prototype.createActions = function () {
    var thiz = this;

    // create

    var createBtn = new Button('<img src="img/plus-solid.png" style="height: 20px;">');
    createBtn.appendTo(this.actionsEle);
    createBtn.click(function (e, btn) {
        window.location.hash = '#' + uuid();
        window.location.reload();
    });

    // hide

    var hideBtn = new Button('<img src="img/times-solid.png" style="height: 20px;">');
    hideBtn.appendTo(this.actionsEle);
    hideBtn.click(function (e, btn) {
        thiz.trigger('hide');
    });

};

Menu.prototype.hide = function () {
    this.ele.hide();
};

Menu.prototype.show = function () {
    this.ele.fadeIn(50);
};

Menu.prototype.appendTo = function (place) {
    this.ele.appendTo(place);
};

Menu.prototype.bind = function (e, b) {
    this.listener[e] = b;
};

Menu.prototype.trigger = function (e) {
    var cb = this.listener[e];
    if (cb) {
        cb(this);
    }
};

window.Menu = Menu;
