function Button(html) {
    this.ele = $([
        '<a',
        '  href="javascript:;"',
        '  style="',
        '    display: inline-block;',
        '    border: 0px solid #eeeeee;',
        '    padding: 15px 20px;',
        '  "',
        '>',
        html || 'button',
        '</a>'
    ].join(''));
}

window.Button = Button;
