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
        '      padding: 0 10px;',
        '    "',
        '  ></div>',
        '  <div',
        '    class="nodes"',
        '    style="',
        '      border-left: 1px solid #dddddd;',
        '      background-color: #ffffff;',
        '      position: absolute;',
        '      right: 0px;',
        '      top: 40px;',
        '      bottom: 0px;',
        '      width: 300px;',
        '      overflow: auto;',
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

    // create paper

    var createPaper = new Button('<img src="new.png" style="height: 20px;">');
    this.actionsEle.append(createPaper.ele);
    createPaper.ele.on('click', function (e) {
        window.location.hash = '#' + uuid();
        window.location.reload();
    });

    // finder

    var finderToggle = new Button('<img src="menu.png" style="height: 20px;">');
    this.actionsEle.append(finderToggle.ele);
    finderToggle.ele.on('click', function (e) {
        thiz.nodesEle.toggle();
    });

    // hide trigger

    thiz.nodesEle.on('click', function (e) {
        thiz.nodesEle.hide();
    });    

};

Menu.prototype.hideMenu = function () {
    this.nodesEle.hide();
}

window.Menu = Menu;
