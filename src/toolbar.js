function Toolbar(paper) {
    var thiz = this;

    thiz.paper = paper;
    thiz.ele = $([
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

    thiz.toolsEle = thiz.ele.find('.tools');
    thiz.menusEle = thiz.ele.find('.menus');

    thiz.createTools();
    thiz.createMenus();

    thiz.init();
}

Toolbar.prototype.init = function () {
    var thiz = this;
    thiz.initEvent();
};

Toolbar.prototype.initEvent = function () {
    var thiz = this;

    $(document).on('keydown', 'body', function (e) {

        if (isShowMenuAction(e)) {
            e.preventDefault();
            thiz.showMenu();
        }

        if (isEscapeAction(e)) {
            e.preventDefault();
            thiz.hideMenu();
        }

        if (isCreatePaperAction(e)) {
            e.preventDefault();
            thiz.menu.createPaper();
        }
    });
};

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

Toolbar.prototype.readonly = function () {
    var thiz = this;
    thiz.hideMenu();

    var readonly = isNotNone(getSearchParam('read'));
    var fullscreen = isNotNone(getSearchParam('fullscreen'));
    readonly = !readonly;

    var params = [];
    if (readonly) {
        params.push('read');
    }
    if (fullscreen) {
        params.push('fullscreen');
    }

    var newPath = '/?' + params.join('&') + location.hash;

    location.href = newPath;
};

Toolbar.prototype.fullScreen = function () {
    var thiz = this;
    thiz.hideMenu();

    var readonly = isNotNone(getSearchParam('read'));
    var fullscreen = isNotNone(getSearchParam('fullscreen'));
    fullscreen = !fullscreen;

    var params = [];
    if (readonly) {
        params.push('read');
    }
    if (fullscreen) {
        params.push('fullscreen');
    }

    var newPath = '/?' + params.join('&') + location.hash;

    location.href = newPath;
};

Toolbar.prototype.clonePaper = function () {
    var thiz = this;
    thiz.paper.clone();
    thiz.hideMenu();
};

Toolbar.prototype.exportHtml = function () {
    var thiz = this;
    console.log('export.html');
};

Toolbar.prototype.exportMarkdown = function () {
    var thiz = this;
    console.log('export.markdown');
};

Toolbar.prototype.createMenus = function () {
    var thiz = this;

    thiz.menu = new Menu();
    thiz.menu.appendTo(this.menusEle);
    thiz.hideMenu();
    thiz.menu.bind('hide', function () {
        thiz.hideMenu();
    });
    thiz.menu.bind('readonly', function () {
        thiz.readonly();
    });
    thiz.menu.bind('fullscreen', function () {
        thiz.fullScreen();
    });
    thiz.menu.bind('clone', function () {
        thiz.clonePaper();
    });
    thiz.menu.bind('export.html', function () {
        thiz.exportHtml();
    });
    thiz.menu.bind('export.markdown', function () {
        thiz.exportMarkdown();
    });
};

window.Toolbar = Toolbar;
