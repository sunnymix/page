(function () {
    function Clip() {
        var thiz = this;
        thiz.id = uuid();
        thiz.init();
    }

    Clip.prototype.init = function () {
        var thiz = this;
        thiz.initEle();
    };

    Clip.prototype.initEle = function () {
        var thiz = this;
        thiz.ele = $([
            '<div',
            '    class="clip"',
            '    style="',
            '        position: absolute;',
            '        left: 2px;',
            '        right: 2px;',
            '        top: 2px;',
            '        z-index: -1;',
            '    "',
            '  >',
            '    <div',
            '        class="clip-box"',
            '        style="',
            '            position: relative;',
            '        "',
            '    >',
            '        <button',
            '            class="clip-copy-btn"',
            '            data-clipboard-target="#clip-text-' + thiz.id + '"',
            '            style="',
            '                position: absolute;',
            '                left: 0;',
            '                top: 0;',
            '                border: 1px solid #eeeeee;',
            '                border-radius: 0px;',
            '                background-color: #ffffff;',
            '                height: 30px;',
            '            "',
            '        >clip</button>',
            '        <textarea',
            '            class="clip-text"',
            '            id="clip-text-' + thiz.id + '"',
            '            style="',
            '                display: block;',
            '                position: absolute;',
            '                left: 0;',
            '                right: 0;',
            '                top: 30px;',
            '                border: 0px solid #eeeeee;',
            '                border-radius: 0px;',
            '                padding: 0px;',
            '                width: 100%;',
            '                height: 300px;',
            '            "',
            '        ></textarea>',
            '    </div>',
            '</div>'
        ].join(''));
        thiz.textEle = thiz.ele.find('> .clip-box > .clip-text');
        thiz.copyBtn = thiz.ele.find('> .clip-box > .clip-copy-btn');
        thiz.clipboard = new ClipboardJS(thiz.copyBtn[0]);
    };

    Clip.prototype.appendTo = function (place) {
        var thiz = this;
        if (isNotNone(place)) {
            place.append(thiz.ele);
        }
    };

    Clip.prototype.copy = function (data) {
        var thiz = this;
        thiz.textEle.val(data);
        thiz.copyBtn.trigger('click');
    };

    window.Clip = Clip;
})();
