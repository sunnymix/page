(function () {
    function Tab(pid, title) {
        var thiz = this;
        
        thiz.pid = pid;
        thiz.title = title;

        thiz.init();
    }

    Tab.prototype.init = function () {
        var thiz = this;

        thiz.initEle();
    };

    Tab.prototype.initEle = function () {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.tab',
            position: 'relative',
            float: 'left',
        });

        thiz.contentEle = new Ele('div', {
            id: '.tab-content',
        });
        thiz.ele.append(thiz.contentEle);

        thiz.gapEle = new Ele('div', {
            borderRight: '1px solid #eeeeee',
            position: 'absolute',
            right: 0,
            top: '1px',
            bottom: '1px',
        });
        // thiz.ele.append(thiz.gapEle);

        thiz.linkEle = new Ele('a', {
            id: '.tab-link',
            body: thiz.title || 'Title',
            display: 'block',
            height: Style.Page.navHeight,
            lineHeight: Style.Page.navHeight,
            padding: '0 10px',
            href: '#' + thiz.pid,
            color: '#333333',
            textDecoration: 'none',
        });
        thiz.contentEle.append(thiz.linkEle);
    };

    Tab.prototype.appendTo = function (place) {
        var thiz = this;
        place.append(thiz.ele);
    };

    Tab.prototype.eq = function (pid, title) {
        var thiz = this;
        return pid == thiz.pid || title == thiz.title;
    };

    Tab.prototype.focus = function () {
        var thiz = this;
    };

    window.Tab = Tab;
})();
