(function () {
    function Nav(place, readonly, fullscreen) {
        var thiz = this;
        thiz.init(place);
    }

    Nav.prototype.init = function (place) {
        var thiz = this;
        thiz.tabs = [];
        thiz.initEle(place);
    };

    Nav.prototype.initEle = function (place) {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.nav',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            height: Style.Page.navHeight,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #eeeeee',
            zIndex: '10',
        });
        place.append(thiz.ele);

        thiz.contentEle = new Ele('div', {
            id: '.nav-content',
        });
        thiz.ele.append(thiz.contentEle);

        new Clearfix(thiz.contentEle);
    };

    Nav.prototype.createTab = function (pid, title) {
        var thiz = this;
        var idx = thiz.getTabIndex(pid, title);
        var curTab = null;
        if (idx >= 0) {
            var tab = thiz.tabs[idx];
            curTab = tab;
        } else {
            var newTab = new Tab(pid, title);

            newTab.bind('remove', function (tab) {
                thiz.removeTab(tab);
            });

            thiz.tabs.push(newTab);
            newTab.appendTo(thiz.contentEle);
            curTab = newTab;
        }
        curTab.focus();
    };

    Nav.prototype.removeTab = function (tab) {
        var thiz = this;
        var idx = thiz.getTabIndex(tab.pid, tab.title);

        if (idx < 0) {
            return;
        }

        thiz.tabs.splice(idx, 1);
        tab.ele.remove();
    };

    Nav.prototype.getTabIndex = function (pid, title) {
        var thiz = this;
        var idx = -1;
        for (var i in thiz.tabs) {
            var tab = thiz.tabs[i];
            if (tab.eq(pid, title)) {
                idx = +i;
                break;
            }
        }
        return idx;
    };

    window.Nav = Nav;
})();
