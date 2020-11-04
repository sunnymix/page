(function () {
    function Menu() {
        var thiz = this;

        this.ele = $([
            '<div',
            '    style="',
            '        position: absolute;',
            '        left: 2px;',
            '        right: 2px;',
            '        top: 2px;',
            '        bottom: 2px;',
            '        background-color: #ffffff;',
            '        z-index: 2;',
            '        ;',
            '    "',
            '  >',
            '    <div',
            '        class="actions"',
            '        style="',
            '            text-align: right;',
            '            padding-right: 0px;',
            '        "',
            '    >',
            '    </div>',
            '    <div',
            '        class="nodes"',
            '        style="',
            '            border-left: 0px solid #dddddd;',
            '            background-color: #ffffff;',
            '            overflow: auto;',
            '            position: absolute;',
            '            left: 0px;',
            '            right: 0px;',
            '            top: 80px;',
            '            bottom: 0px;',
            '        "',
            '    ></div>',
            '</div>'
        ].join(''));

        thiz.nodesEle = thiz.ele.find('.nodes');
        thiz.nodes = [];

        thiz.actionsEle = thiz.ele.find('.actions');
        thiz.createActions();

        thiz.fetchPages();

        thiz.listener = [];
    }

    Menu.prototype.fetchPages = function (query) {
        var thiz = this;

        var _query = isNotNone(query) ? query : '';
        _query = _query.trim();

        $.get('/api/pages?query=' + _query, function (res) {
            if (isNotNone(res) && isNotEmpty(res.data)) {
                var pages = res.data || [];

                thiz.nodesEle.empty();
                thiz.nodes = [];

                for (var i = 0; i < pages.length; i++) {
                    var page = pages[i];
                    var node = new Node(thiz.nodesEle, page);
                    node.bind('click', function (e, node) {
                        thiz.trigger('click');
                        thiz.trigger('hide');
                    });
                    thiz.nodesEle.append(node.ele);
                    thiz.nodes.push(node);
                }

                thiz.navigate(1);
            }
        });
    };

    Menu.prototype.findActiveNodeIndex = function () {
        var thiz = this;

        return thiz.nodes.findIndex(function (node) {
            return node.active === true;
        });
    };

    Menu.prototype.findActiveNode = function () {
        var thiz = this;

        var curIndex = thiz.findActiveNodeIndex();

        if (curIndex >= 0
            && curIndex < thiz.nodes.length) {
            return thiz.nodes[curIndex];
        }

        return null;
    };

    Menu.prototype.navigate = function (offset) {
        var thiz = this;

        var curIndex = thiz.findActiveNodeIndex();

        var activeIndex = curIndex + offset;

        thiz.activeNode(curIndex, false);
        thiz.activeNode(activeIndex, true);
    };

    Menu.prototype.activeNode = function (index, active) {
        var thiz = this;

        if (index >= 0
            && index < thiz.nodes.length) {
            var node = thiz.nodes[index];
            if (isNotNone(node)) {
                if (active) {
                    node.setActive();
                } else {
                    node.setInactive();
                }
            }
        }
    };

    Menu.prototype.openActiveNode = function () {
        var thiz = this;

        var activeNode = thiz.findActiveNode();

        if (isNotNone(activeNode)) {
            activeNode.open();
        }
    };

    Menu.prototype.createActions = function () {
        var thiz = this;

        // create

        var createBtn = new Button('img/plus-solid.png');
        createBtn.appendTo(thiz.actionsEle);
        createBtn.click(function (e, btn) {
            thiz.createPage();
        });

        // clone

        var cloneBtn = new Button('img/clone.png');
        cloneBtn.appendTo(thiz.actionsEle);
        cloneBtn.click(function (e, btn) {
            thiz.trigger('clone');
        });

        // readonly

        var readonlyBtn = new Button('img/play-solid.png');
        readonlyBtn.appendTo(thiz.actionsEle);
        readonlyBtn.click(function (e, btn) {
            thiz.trigger('readonly');
        });

        // full screen

        var fullScreenBtn = new Button('img/compress-solid.png');
        fullScreenBtn.appendTo(thiz.actionsEle);
        fullScreenBtn.click(function (e, btn) {
            thiz.trigger('fullscreen');
        });

        // html

        var htmlBtn = new Button('img/html5.png');
        htmlBtn.appendTo(thiz.actionsEle);
        htmlBtn.click(function (e, btn) {
            thiz.trigger('export.html');
        });

        // markdown

        var markdownBtn = new Button('img/markdown.png');
        markdownBtn.appendTo(thiz.actionsEle);
        markdownBtn.click(function (e, btn) {
            thiz.trigger('export.markdown');
        });

        // hide

        var hideBtn = new Button('img/times-solid.png');
        hideBtn.appendTo(thiz.actionsEle);
        hideBtn.click(function (e, btn) {
            thiz.trigger('hide');
        });

        // search

        thiz.searchInput = new Input();
        thiz.searchInput.appendTo(thiz.actionsEle);
        thiz.searchInput.onSearch(function () {
            thiz.search();
        });
        thiz.searchInput.onUp(function () {
            thiz.navigate(-1);
        });
        thiz.searchInput.onDown(function () {
            thiz.navigate(1);
        });
        thiz.searchInput.onEnter(function () {
            thiz.openActiveNode();
        });
    };

    Menu.prototype.createPage = function () {
        window.location.hash = '#' + uuid();
        window.location.reload();
    };

    Menu.prototype.search = function () {
        this.throttleSearch();
    };

    Menu.prototype.throttleSearch = function () {
        var thiz = this;

        if (isNone(thiz.throttleSearchFn)) {
            thiz.throttleSearchFn = throttle(function () {
                var query = thiz.searchInput.val();
                if (isNotNone(query)) {
                    thiz.fetchPages(query);
                }
            }, 200);
        }

        thiz.throttleSearchFn();
    };

    Menu.prototype.hide = function () {
        this.ele.hide();
    };

    Menu.prototype.show = function () {
        var thiz = this;

        thiz.ele.fadeIn(50);
        thiz.searchInput.focus();
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
})();
