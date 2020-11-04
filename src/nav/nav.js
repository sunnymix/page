(function () {
    function Nav(place, readonly, fullscreen) {
        var thiz = this;
        thiz.init(place);
    }

    Nav.prototype.init = function (place) {
        var thiz = this;
        thiz.tabs = [];
        thiz.initEle(place);
        thiz.loadCache();
    };

    Nav.prototype.initEle = function (place) {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.nav',
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #eeeeee',
            height: Style.Page.navHeight,
            zIndex: '10',
            overflow: 'hidden',
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
        thiz.doCreateTab(pid, title);
        thiz.saveCache();
    };

    Nav.prototype.doCreateTab = function (pid, title) {
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

    Nav.prototype.saveCache = function () {
        var thiz = this;
        localStorage.setItem('page-tabs-cache', JSON.stringify(thiz.tabs));
    };

    Nav.prototype.loadCache = function () {
        var thiz = this;
        var tabsJson = localStorage.getItem('page-tabs-cache');
        if (isNotBlank(tabsJson)) {
            try {
                var tabs = JSON.parse(tabsJson);
                for (var i in tabs) {
                    var tab = tabs[i];
                    thiz.doCreateTab(tab.pid, tab.title);
                }
            } catch (error) { }
        }
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
