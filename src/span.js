function Span(place) {
    var thiz = this;

    thiz.ele = $([
        '<div',
        '    class="span"',
        '    style="',
        '        display: inline-block;',
        '    "',
        '></div>'
    ].join(''));
}

window.Span = Span;
