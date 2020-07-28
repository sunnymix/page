function Button(html) {
    this.ele = $([
        '<a',
        '  href="javascript:;"',
        '  style="',
        '    display: inline-block;',
        '    border: 0px solid #eeeeee;',
        '    padding: 10px;',
        '  "',
        '>',
        html || 'button',
        '</a>'
    ].join(''));
}

window.Button = Button;
