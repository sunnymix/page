(function () {
    function Check() {
        var thiz = this;
        thiz.init();
    }

    Check.prototype.init = function () {
        var thiz = this;
        thiz.size = 14;
        thiz.borderWidth = 2;
        thiz.initEle();
        thiz.initBind();
        initEvent(thiz, Check.prototype);
    };

    Check.prototype.initEle = function () {
        var thiz = this;
        thiz.ele = new Ele('div', {
            id: '.check',
            position: 'relative',
            width: thiz.size + 'px',
            height: thiz.size + 'px',
            cursor: 'pointer',
        });

        thiz.offEle = new Ele('div', {
            id: '.check-off',
            position: 'absolute',
            width: (thiz.size - (thiz.borderWidth * 2)) + 'px',
            height: (thiz.size - (thiz.borderWidth * 2)) + 'px',
            backgroundColor: '#ffffff',
            border: thiz.borderWidth + 'px solid #444444',
            borderRadius: '1px',
        });
        thiz.ele.append(thiz.offEle);

        thiz.onEle = new Ele('div', {
            id: '.check-on',
            position: 'absolute',
            display: 'none',
            width: thiz.size + 'px',
            height: thiz.size + 'px',
            backgroundColor: '#444444',
            borderRadius: '1px',
        });
        thiz.ele.append(thiz.onEle);

        thiz.onDrawEle = new Ele('div', {
            id: '.check-on-draw',
            position: 'absolute',
            marginLeft: '4px',
            marginTop: '4px',
            borderLeft: '1px solid #ffffff',
            borderBottom: '1px solid #ffffff',
            width: '6px',
            height: '3px',
            transform: 'rotate(-50deg)',
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
