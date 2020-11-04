(function () {
    function Tab(pid, title) {
        var thiz = this;

        thiz.pid = pid;

        thiz.init();

        thiz.setTitle(title);
    }

    Tab.prototype.init = function (pid, title) {
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

        var closeBtnSize = 18;
        thiz.closeBtn = new Button('img/times-solid.png', null, closeBtnSize, closeBtnSize, 12, 12);
        thiz.closeBtn.float('left');
        thiz.closeBtn.style({
            position: 'absolute',
            top: '0px',
            right: '0px',
            // borderRadius: '50%',
        });
        thiz.closeBtn.appendTo(thiz.ele);
        thiz.closeBtn.click(function () {
            thiz.trigger('remove', thiz);
        });
        thiz.closeBtn.hide();
        thiz.ele
            .on('mouseenter', function () {
                thiz.closeBtn.show();
            })
            .on('mouseleave', function () {
                thiz.closeBtn.hide();
            });

        thiz.gapEle = new Ele('div', {
            borderRight: '1px solid #f4f4f4',
            position: 'absolute',
            right: 0,
            top: '1px',
            bottom: '1px',
        });
        thiz.ele.append(thiz.gapEle);

        thiz.linkEle = new Ele('a', {
            id: '.tab-link',
            display: 'block',
            height: Style.Page.navHeight,
            lineHeight: Style.Page.navHeight,
            padding: '0 20px',
            href: '#' + thiz.pid,
            textDecoration: 'none',
        });
        thiz.contentEle.append(thiz.linkEle);
    };

    Tab.prototype.appendTo = function (place) {
        var thiz = this;
        place.append(thiz.ele);
    };

    Tab.prototype.eq = function (pid) {
        var thiz = this;
        return pid == thiz.pid;
    };

    Tab.prototype.focus = function () {
        var thiz = this;
        thiz.linkEle.css({
            color: '#000000',
        });
    };

    Tab.prototype.blur = function () {
        var thiz = this;
        thiz.linkEle.css({
            color: '#888888',
        });
    };

    Tab.prototype.setTitle = function (title) {
        var thiz = this;
        thiz.title = title;
        thiz.linkEle.text(thiz.title);
    };

    window.Tab = Tab;
})();
