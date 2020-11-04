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

        initEvent(thiz, Tab.prototype);
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
            float: 'left'
        });
        thiz.ele.append(thiz.contentEle);

        var closeBtnSize = 24;
        var closeBtnMargin = ((parsePxToNum(Style.Page.navHeight) - closeBtnSize) / 2) + 'px';
        thiz.closeBtn = new Button('img/times-solid.png', null, closeBtnSize, closeBtnSize, 12, 12);
        thiz.closeBtn.float('left');
        thiz.closeBtn.style({
            marginTop: closeBtnMargin,
            marginRight: closeBtnMargin,
            borderRadius: '50%',
        });
        thiz.closeBtn.appendTo(thiz.ele);
        thiz.closeBtn.click(function () {
            thiz.trigger('remove', thiz);
        });

        thiz.gapEle = new Ele('div', {
            borderRight: '1px solid #f8f8f8',
            position: 'absolute',
            right: 0,
            top: '1px',
            bottom: '1px',
        });
        thiz.ele.append(thiz.gapEle);

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
