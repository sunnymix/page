function Button(html, padding) {

    this.background = '#ffffff';
    this.backgroundHover = '#f0f0f0';
    this.padding = padding || '10px'

    this.ele = $([
        '<button',
        '  class="tool"',
        '  style="',
        '    display: inline-block;',
        '    border: 0px solid #eeeeee;',
        '    background-color: ' + this.background + ';',
        '    padding: ' + this.padding + ';',
        '  "',
        '>',
        html || 'button',
        '</button>'
    ].join(''));
    
    this.bindReaction();
}

Button.prototype.appendTo = function (place) {
    this.ele.appendTo(place);
};

Button.prototype.click = function (cb) {
    var thiz = this;

    this.ele.on('click', function (e) {
        cb(e, thiz);
    });
};

Button.prototype.bindReaction = function () {
    var thiz = this;

    this.ele.on('mouseenter', function (e) {
        thiz.ele.css({
            background: thiz.backgroundHover
        });
    }).on('mouseleave', function (e) {
        thiz.ele.css({
            background: thiz.background
        });
    });
}

window.Button = Button;
