(function () {
    function Alert() {
        var thiz = this;
        thiz.init();
    }

    Alert.prototype.init = function () {
        var thiz = this;
        thiz.pop = new Pop();

        thiz.ele = new Ele('div', {
            id: '.alert',
            border: '1px solid #e1e4e8',
            borderRadius: '1px',
            backgroundColor: '#f6f6f6',
            padding: '10px',
            minWidth: '200px',
            maxWidth: '300px',
        });
        thiz.pop.append(thiz.ele);

        thiz.pop.fixed();
        thiz.pop.rightTop();
    };

    Alert.prototype.show = function (msg) {
        var thiz = this;
        thiz.ele.html(msg);
        thiz.pop.show();
        setTimeout(function () {
            thiz.ele.html('');
            thiz.pop.hide();
        }, 1000);
    };

    window.Alert = Alert;
})();
