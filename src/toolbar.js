function Toolbar(paper) {
    this.paper = paper;
    this.ele = $([
        '<div',
        '    class="toolbar"',
        '    style="',
        '        position: absolute;',
        '        top: 0px;',
        '        left: 0px;',
        '        right: 0px;',
        '    "',
        '>',
        '    <div',
        '        class="toolbar-box"',
        '        style="',
        '            padding: 1px;',
        '        "',
        '    >',
        '        <div',
        '            class="tools"',
        '            style="',
        '                text-align: right;',
        '            "',
        '        ></div>',
        '        <div class="menus"></div>',
        '    </div>',
        '</div>'
    ].join(''));

    this.toolsEle = this.ele.find('.tools');
    this.menusEle = this.ele.find('.menus');

    this.createTools();
    this.createMenus();
}

Toolbar.prototype.createTools = function () {
    this.createMenuTool();
};

Toolbar.prototype.createMenuTool = function () {
    var thiz = this;
    var showMenuBtn = new Button('img/ellipsis-h-solid.png');
    showMenuBtn.appendTo(this.toolsEle);
    showMenuBtn.click(function (e, tool) {
        thiz.showMenu();
    });
};

Toolbar.prototype.fullfill = function () {
    this.ele.css({
        bottom: 0
    });
};

Toolbar.prototype.noneFill = function () {
    this.ele.css({
        bottom: 'auto'
    });
};

Toolbar.prototype.showMenu = function () {
    var thiz = this;

    thiz.fullfill();
    thiz.menu.show();
};

Toolbar.prototype.hideMenu = function () {
    var thiz = this;
    
    thiz.noneFill();
    thiz.menu.hide();
};

Toolbar.prototype.createMenus = function () {
    var thiz = this;

    thiz.menu = new Menu();
    thiz.menu.appendTo(this.menusEle);
    thiz.menu.hide();
    thiz.menu.bind('hide', function () {
        thiz.hideMenu();
    });
};

window.Toolbar = Toolbar;
