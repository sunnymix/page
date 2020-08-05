function Attach(url) {
    this.url = url || '';

    this.ele = $([
        '<div ',
        '    class="attach"',
        '    style="',
        '        display: block;',
        '    ">',
        '    <img',
        '        class="attach-img"',
        '        src="' + this.url + '"',
        '        style="',
        '            display: block;',
        '            max-width: 100%;',
        '        "',
        '        >',
        '</div>'
    ].join(''));
}

Attach.prototype.htmlTo = function (place) {
    place.html(this.ele);
};

Attach.prototype.getUrl = function () {
    return this.url || '';
};

window.Attach = Attach;
