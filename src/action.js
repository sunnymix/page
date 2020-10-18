(function () {
    function Action () {
        var thiz = this;
        thiz.init();
    }

    Action.prototype.init = function () {
        var thiz = this;
        thiz.initEle();
        thiz.initClip();
    };

    Action.prototype.initEle = function () {
        var thiz = this;
        thiz.pop = new Pop();

        thiz.ele = new Ele('div', {
            id: '.action',
            position: 'relative',
            border: '1px solid #eeeeee',
            borderRadius: '1px',
            backgroundColor: '#ffffff',
            boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.15)',
        });
        thiz.pop.append(thiz.ele);

        thiz.pop.fixed();
        thiz.pop.miniLay();
    };

    Action.prototype.initClip = function () {
        var thiz = this;
        thiz.clip = new Clip();
        thiz.clip.appendTo($('body'));
    };

    Action.prototype.copy = function (text) {
        var thiz = this;
        thiz.clip.copy(text);
    };

    Action.prototype.show = function () {
        var thiz = this;
        thiz.pop.show(Pop.POS.CENTER_TOP);
    };

    Action.prototype.hide = function () {
        var thiz = this;
        thiz.pop.hide();
    };

    Action.prototype.append = function (ele) {
        var thiz = this;
        thiz.ele.append(ele);
    };

    window.Action = Action;
})();
