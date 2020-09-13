function Link(place) {
    var thiz = this;
    thiz.ele = $([
        '<div',
        '    class="link"',
        '    style="',
        '        position: relative;',
        '        display: inline-block;',
        '    "',
        '>',
        '    <div',
        '        class="link-icon"',
        '        style="',
        '            position: relative;',
        '            width: 16px;',
        '            height: 10px;',
        '            background-color: transparent;',
        '        "',
        '    >',
        '        <div',
        '            style="',
        '                position: absolute;',
        '                left: 0;',
        '                width: 30%;',
        '                top: 0;',
        '                height: 6px;',
        '                border: 2px solid #007bff;',
        '                border-right-width: 0px;',
        '                border-radius: 5px 0 0 5px',
        '            "',
        '        ></div>',
        '        <div',
        '            style="',
        '                position: absolute;',
        '                right: 0;',
        '                width: 30%;',
        '                top: 0;',
        '                height: 6px;',
        '                border: 2px solid #007bff;',
        '                border-left-width: 0px;',
        '                border-radius: 0 5px 5px 0',
        '            "',
        '        ></div>',
        '        <div',
        '            style="',
        '                position: absolute;',
        '                left: 5px;',
        '                right: 5px;',
        '                top: 4px;',
        '                height: 0px;',
        '                border-top: 2px solid #007bff;',
        '            "',
        '        ></div>',
        '    </div>',
        '</div>'
    ].join(''));
    if (isNotNone(place)) {
        place.append(thiz.ele);
    }
}

window.Link = Link;
