(function () {
    function Nav(place, readonly, fullscreen) {
        var thiz = this;
        thiz.init(place);
    }

    Nav.prototype.init = function (place) {
        var thiz = this;
        thiz.tabs = [];
        thiz.initEle(place);
        thiz.loadPinTabs();
        thiz.loadCache();
        thiz.initBind();
        initEvent(thiz, Nav.prototype);
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
            zIndex: '10',
            overflow: 'hidden',
        });
        place.append(thiz.ele);

        thiz.contentEle = new Ele('div', {
            id: '.nav-content',
            display: 'flex',
        });
        thiz.ele.append(thiz.contentEle);
    };

    Nav.prototype.initBind = function () {
        var thiz = this;
        thiz.ele
            .on('mouseenter', function (e) {
                thiz.ele.css({
                    overflowX: 'auto',
                });
                thiz.trigger('mouseenter', e);
            })
            .on('mouseleave', function (e) {
                thiz.ele.css({
                    overflowX: 'hidden',
                });
                thiz.trigger('mouseleave', e);
            })
            .on('mousemove', function (e) {
                thiz.trigger('mousemove', e);
            });

        $(document).on('keydown', 'body', function (e) {
            if (isCloseAction(e)) {
                e.preventDefault();
                e.stopPropagation();
                thiz.closeTab();
            }
        });
    };

    Nav.prototype.closeTab = function () {
        var thiz = this;
        var idx = thiz.getFocusIndex();

        if (idx < 0) {
            return;
        }

        var tab = thiz.tabs[idx];
        tab.ele.remove();
        thiz.tabs.splice(idx, 1);

        var activeIdx = idx - 1;
        var activePid = null;
        if (activeIdx >= 0) {
            var activeTab = thiz.tabs[activeIdx];
            activePid = activeTab.pid;
        }

        thiz.loadPid(activePid);
    };

    Nav.prototype.loadPid = function (pid) {
        window.location.hash = '#' + (pid || uuid());
        window.location.reload();
    };

    Nav.prototype.focusTab = function (pid) {
        var thiz = this;

        for (var i in thiz.tabs) {
            var tab = thiz.tabs[i];
            if (tab.eq(pid)) {
                tab.focus();
            } else {
                tab.blur();
            }
        }
    };

    Nav.prototype.createTab = function (pid, title) {
        var thiz = this;
        var tab = thiz.doCreateTab(pid, title);
        thiz.focusTab(pid);
        thiz.saveCache();
    };

    Nav.prototype.doCreateTab = function (pid, title) {
        var thiz = this;
        var idx = thiz.getTabIndex(pid, title);
        var curTab = null;
        if (idx >= 0) {
            var tab = thiz.tabs[idx];

            tab.setTitle(title);

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
        return curTab;
    };

    Nav.prototype.saveCache = function () {
        var thiz = this;
        localStorage.setItem('page-tabs-cache', JSON.stringify(thiz.tabs));
    };

    Nav.prototype.loadPinTabs = function () {
        var thiz = this;
        if (isNotEmpty(pinTabs)) {
            for (var i in pinTabs) {
                var pidAndTitle = pinTabs[i].split(',');
                thiz.doCreateTab(pidAndTitle[0], pidAndTitle[1]);
            }
        }
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

    Nav.prototype.updateTab = function (pid, title) {
        var thiz = this;
        thiz.createTab(pid, title);
    };

    Nav.prototype.removeTab = function (tab) {
        var thiz = this;
        var idx = thiz.getTabIndex(tab.pid);

        if (idx < 0) {
            return;
        }

        thiz.tabs.splice(idx, 1);
        tab.ele.remove();

        thiz.saveCache();
    };

    Nav.prototype.getTabIndex = function (pid) {
        var thiz = this;
        var idx = -1;
        for (var i in thiz.tabs) {
            var tab = thiz.tabs[i];
            if (tab.eq(pid)) {
                idx = +i;
                break;
            }
        }
        return idx;
    };

    Nav.prototype.getFocusIndex = function (pid) {
        var thiz = this;
        var idx = -1;
        for (var i in thiz.tabs) {
            var tab = thiz.tabs[i];
            if (isTrue(tab.active)) {
                idx = +i;
                break;
            }
        }
        return idx;
    };

    Nav.prototype.shrink = function () {
        var thiz = this;
        thiz.ele.css({
            // height: 0,
            opacity: '0',
        });
        // thiz.ele.fadeOut(50);
    };

    Nav.prototype.expand = function () {
        var thiz = this;
        thiz.ele.css({
            // height: Style.Page.navHeight,
            opacity: '1',
        });
        // thiz.ele.fadeIn(50);
    };

    window.Nav = Nav;
})();
