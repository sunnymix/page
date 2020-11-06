(function () {
    function Check() {
        var thiz = this;
        thiz.init();
    }

    Check.prototype.init = function () {
        var thiz = this;
        thiz.initEle();
        thiz.initBind();
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
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#ffffff',
            border: '1px solid #000000',
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
            backgroundColor: '#000000',
            border: '1px solid #000000',
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
            backgroundColor: '#000000',
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
            transform: 'rotate(-45deg)',
        });
        thiz.onEle.append(thiz.onDrawEle);
    };

    Check.prototype.initBind = function () {
        var thiz = this;
        thiz.ele.on('mousedown', function (e) {
            e.preventDefault();
            e.stopPropagation();
            thiz.toggleCheck();
        });
    };

    Check.prototype.setPrimaryColor = function (color) {
        var thiz = this;
        thiz.offEle.css({
            borderColor: color,
        });

        thiz.onEle.css({
            borderColor: color,
            backgroundColor: color,
        });

        thiz.onBgEle.css({
            backgroundColor: color,
        });
    };

    Check.prototype.show = function () {
        var thiz = this;
        thiz.ele.show();
        return thiz;
    };

    Check.prototype.hide = function () {
        var thiz = this;
        thiz.ele.hide();
        return thiz;
    };

    Check.prototype.check = function (isCheck) {
        var thiz = this;
        if (isNone(isCheck)) {
            return thiz.isCheck();
        }
        if (isTrue(isCheck)) {
            thiz.onEle.show();
            thiz.offEle.hide();
        } else {
            thiz.onEle.hide();
            thiz.offEle.show();
        }
        return thiz;
    };

    Check.prototype.isCheck = function () {
        var thiz = this;
        return thiz.onEle.is(':visible');
    };

    Check.prototype.toggleCheck = function () {
        var thiz = this;
        var isCheck = !thiz.isCheck();
        thiz.check(isCheck);
        thiz.trigger('check', isCheck);
    };

    Check.prototype.style = function (style) {
        var thiz = this;
        thiz.ele.css(style);
        return thiz;
    };

    Check.prototype.addClass = function (classes) {
        var thiz = this;
        thiz.ele.addClass(classes);
        return thiz;
    }

    window.Check = Check;
})();
