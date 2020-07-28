function Menu(place) {
    this.ele = $([
        '<div',
        '  style="',
        '      position: absolute;',
        '      right: 1px;',
        '      top: 1px;',
        '      bottom: 1px;',
        '    "',
        '  >',
        '  <div',
        '    class="actions"',
        '    style="',
        '      text-align: right;',
        '    "',
        '  ></div>',
        '  <div',
        '    class="nodes"',
        '    style="',
        '      border-left: 1px solid #dddddd;',
        '      background-color: #ffffff;',
        '      position: absolute;',
        '      right: 0px;',
        '      top: 0px;',
        '      bottom: 0px;',
        '      width: 300px;',
        '    "',
        '  ></div>',
        '</div>'
    ].join(''));

    this.nodesEle = this.ele.find('.nodes');
    this.nodesEle.hide();

    this.actionsEle = this.ele.find('.actions');
    this.createActions();

    if (isNotNone(place)) {
        place.append(this.ele);
    }

    var ids = Object.keys(localStorage);

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        var node = new Node(this.nodesEle, id);
        this.nodesEle.append(node.ele);
    }
}

Menu.prototype.createActions = function () {
    var thiz = this;

    var finderToggle = new Button('<img src="menu.png" style="height: 18px;">');
    this.actionsEle.append(finderToggle.ele);
    finderToggle.ele.on('click', function (e) {
        thiz.nodesEle.toggle();
    });

    thiz.nodesEle.on('click', function (e) {
        thiz.nodesEle.hide();
    });
};

window.Menu = Menu;
