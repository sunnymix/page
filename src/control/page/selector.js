(function () {
    function Selector (baseEle) {
        var thiz = this;
        thiz.baseEle = baseEle;
        thiz.init();
    }

    Selector.prototype.init = function () {
        var thiz = this;
        thiz.initEle();
    };

    Selector.prototype.initEle = function () {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.selector',
        });
        thiz.baseEle.append(thiz.ele);
    };

    window.Selector = Selector;
})();
