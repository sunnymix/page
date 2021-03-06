(function () {
    function Input() {
        var thiz = this;

        thiz.ele = $([
            '<div',
            '    class="input"',
            '    style="',
            '        position: relative;',
            '        background-color: #ffffff;',
            '        position: relative;',
            '        border: 0px solid green;',
            '        min-width: 40px;',
            '        min-height: 40px;',
            '    "',
            '>',
            '    <div',
            '        class="input-box"',
            '        style="',
            '            position: absolute;',
            '            background-color: transparent;',
            '            border: 0px solid blue;',
            '            top: 4px;',
            '            bottom: 4px;',
            '            left: 10px;',
            '            right: 10px;',
            '        "',
            '    >',
            '        <input',
            '            style="',
            '                display: block;',
            '                background-color: transparent;',
            '                border: 0px solid red;',
            '                border-radius: 0px;',
            '                position: absolute;',
            '                top: 0px;',
            '                bottom: 0px;',
            '                left: 0px;',
            '                right: 0px;',
            '                padding: 0px;',
            '                width: 100%;',
            '                height: 100%;',
            '            "',
            '        />',
            '    </div>',
            '</div>'
        ].join(''));

        thiz.inputEle = thiz.ele.find('input');

        thiz.listener = [];

        thiz.init();
    }

    Input.prototype.appendTo = function (place) {
        var thiz = this;
        place.append(thiz.ele);
    };

    Input.prototype.style = function (style) {
        var thiz = this;
        thiz.ele.css(style);
    };

    Input.prototype.init = function () {
        var thiz = this;

        thiz.inputEle.on('keyup', function (e) {
            thiz.trigger('keyup', e);

            if (isUpKey(e)) {
                thiz.trigger('up', e);
            } else if (isDownKey(e)) {
                thiz.trigger('down', e);
            } else if (isEnterKey(e)) {
                thiz.trigger('enter');
            } else {
                thiz.trigger('search', e);
            }
        });
    };

    Input.prototype.onSearch = function (cb) {
        var thiz = this;

        if (isNone(cb) || isNotFunction(cb)) {
            return;
        }

        thiz.bind('search', function (e, input) {
            var val = input.val();

            cb(val);
        });
    };

    Input.prototype.onKeyup = function (cb) {
        var thiz = this;

        if (isNone(cb) || isNotFunction(cb)) {
            return;
        }

        thiz.bind('keyup', function (e, input) {
            cb(e, input);
        });
    };

    Input.prototype.onUp = function (cb) {
        var thiz = this;

        if (isNone(cb) || isNotFunction(cb)) {
            return;
        }

        thiz.bind('up', function (e, input) {
            cb(e, input);
        });
    };

    Input.prototype.onDown = function (cb) {
        var thiz = this;

        if (isNone(cb) || isNotFunction(cb)) {
            return;
        }

        thiz.bind('down', function (e, input) {
            cb(e, input);
        });
    };

    Input.prototype.onEnter = function (cb) {
        var thiz = this;

        if (isNone(cb) || isNotFunction(cb)) {
            return;
        }

        thiz.bind('enter', function (e, input) {
            cb(e, input);
        });
    };

    Input.prototype.val = function (newVal) {
        var thiz = this;

        if (isNotNone(newVal)) {
            thiz.inputEle.val(newVal);
        } else {
            return thiz.inputEle.val();
        }
    };

    Input.prototype.focus = function () {
        var thiz = this;

        setTimeout(function () {
            thiz.inputEle.focus();
        }, 200);
    };

    Input.prototype.bind = function (e, b) {
        this.listener[e] = b;
    };

    Input.prototype.trigger = function (event, e) {
        var thiz = this;
        var cb = thiz.listener[event];
        if (cb) {
            cb(e, thiz);
        }
    };

    window.Input = Input;
})();
