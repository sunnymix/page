(function () {
    function Alert() {
        var thiz = this;
        thiz.init();
    }

    Alert.prototype.init = function () {
        var thiz = this;
        thiz.initEle();
        thiz.initBind();
    }

    Alert.prototype.initEle = function () {
        var thiz = this;
        thiz.pop = new Pop();

        thiz.ele = new Ele('div', {
            id: '.alert',
            border: '1px solid #007bff',
            borderRadius: '1px',
            backgroundColor: '#007bff',
            padding: '10px',
            minWidth: '200px',
            maxWidth: '300px',
            color: '#ffffff',
            boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.15)',
        });
        thiz.pop.append(thiz.ele);

        thiz.pop.fixed();
        thiz.pop.miniLay();
    };

    Alert.prototype.initBind = function () {
        var thiz = this;
        thiz.ele.on('click', function () {
            thiz.hide();
        });
    };

    Alert.prototype.show = function (msg) {
        var thiz = this;
        thiz.ele.html(msg);
        thiz.pop.show(Pop.POS.CENTER_TOP);
        setTimeout(function () {
            // return;
            thiz.hide();
        }, 1000);
    };

    Alert.prototype.hide = function () {
        var thiz = this;
        thiz.ele.html('');
        thiz.pop.hide();
    };

    window.Alert = Alert;
})();
