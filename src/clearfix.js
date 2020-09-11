function Clearfix(place) {
    var thiz = this;
    thiz.ele = $([
        '<div',
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

Window.Clearfix = Clearfix;
