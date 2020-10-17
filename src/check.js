(function () {
    function Check() {
        var thiz = this;
        thiz.init();
    }

    Check.prototype.init = function () {
        var thiz = this;
        thiz.initEle();
        initEvent(thiz, Check.prototype);
    };

    Check.prototype.initEle = function () {
        var thiz = this;
        thiz.ele = new Ele('div', {
            id: '.check',
            position: 'relative',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            cursor: 'pointer',
        });

        thiz.offEle = new Ele('div', {
            id: '.check-off',
            position: 'absolute',
            display: 'none',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            border: '1px solid #aaaaaa',
            borderRadius: '50%',
        });
        thiz.ele.append(thiz.offEle);

        thiz.onEle = new Ele('div', {
            id: '.check-on',
            position: 'absolute',
            display: 'none',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#aaaaaa',
            border: '1px solid #aaaaaa',
            borderRadius: '50%',
        });
        thiz.ele.append(thiz.onEle);

        thiz.onBgEle = new Ele('div', {
            id: '.check-on-bg',
            position: 'absolute',
            width: '12px',
            height: '12px',
            left: '1px',
            top: '1px',
            borderRadius: '50%',
            backgroundColor: '#aaaaaa',
        });
        thiz.onEle.append(thiz.onBgEle);

        thiz.onDrawEle = new Ele('div', {
            id: '.check-on-draw',
            position: 'absolute',
            left: '4px',
            top: '5px',
            borderLeft: '1px solid #ffffff',
            borderBottom: '1px solid #ffffff',
            width: '5px',
            height: '2px',
            transform: 'rotate(-50deg)',
        });
        thiz.onEle.append(thiz.onDrawEle);
    };

    Check.prototype.show = function () {
        var thiz = this;
        thiz.ele.show();
    };

    Check.prototype.hide = function () {
        var thiz = this;
        thiz.ele.hide();
    };

    Check.prototype.check = function (isCheck) {
        var thiz = this;
        if (isNone(isCheck)) {
            return thiz.onEle.is(':visible');
        }
        if (isTrue(isCheck)) {
            thiz.onEle.show();
            thiz.offEle.hide();
        } else {
            thiz.onEle.hide();
            thiz.offEle.show();
        }
    };

    window.Check = Check;
})();
