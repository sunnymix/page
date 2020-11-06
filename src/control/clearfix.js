(function () {
    function Clearfix(place) {
        var thiz = this;
        thiz.ele = $([
            '<div',
            '    class="clearfix"',
            '    style="',
            '        visibility: hidden;',
            '        display: block;',
            '        font-size: 0;',
            '        clear: both;',
            '        height: 0;',
            '        overflow: hidden;',
            '    "',
            '></div>'
        ].join(''));
        place.after(thiz.ele);
    }

    window.Clearfix = Clearfix;
})();
