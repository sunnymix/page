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
        // '      border-left: 1px solid #dddddd;',
        // '      box-shadow: 0px 0px 2px rgba(0,0,0,0.2);',
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
        '      top: 80px;',
        '      bottom: 0px;',
        '    "',
        '  ></div>',
        '</div>'
    ].join(''));

    thiz.nodesEle = thiz.ele.find('.nodes');

    thiz.actionsEle = thiz.ele.find('.actions');
    thiz.createActions();

    thiz.fetchPapers();

    thiz.listener = [];
}

Menu.prototype.fetchPapers = function (query) {
    var thiz = this;

    var _query = isNotNone(query) ? query : '';
    _query = _query.trim();

    $.get('/api/papers?query=' + _query, function (res) {
        if (isNotNone(res) && isNotEmpty(res.data)) {
            var papers = res.data || [];

            thiz.nodesEle.empty();

            for (var i = 0; i < papers.length; i++) {
                var paper = papers[i];
                var node = new Node(thiz.nodesEle, paper);
                node.bind('click', function (e, node) {
                    thiz.trigger('click');
                    thiz.trigger('hide');
                });
                thiz.nodesEle.append(node.ele);
            }
        }
    });
};

Menu.prototype.createActions = function () {
    var thiz = this;

    // create

    var createBtn = new Button('img/plus-solid.png');
    createBtn.appendTo(thiz.actionsEle);
    createBtn.click(function (e, btn) {
        thiz.createPaper();
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
    thiz.searchInput.search(function () {
        thiz.search();
    });
};

Menu.prototype.createPaper = function () {
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
                thiz.fetchPapers(query);
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
