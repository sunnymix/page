
function Style() {
    this.wordBreak = 'break-all';
    this.position = 'relative';
        this.fontWeight = 'normal';
        this.fontSize = '12px';
        this.minHeight = '20px';
        this.lineHeight = '20px';
        this.paddingTop = '10px';
        this.paddingBottom = '0px';
        this.paddingLeft = '20px';
        this.paddingRight = '20px';
        this.borderBottom = '0px solid transparent';
        this.marginBottom = '0px';
}

Style.prototype.setFontWeight = function (fontWeight) {
    this.fontWeight = fontWeight;
    return this;
};

Style.prototype.setFontSize = function (fontSize) {
    this.fontSize = Zoom(fontSize);
    return this;
};

Style.prototype.setMinHeight = function (minHeight) {
    this.minHeight = Zoom(minHeight);
    return this;
};

Style.prototype.setLineHeight = function (lineHeight) {
    this.lineHeight = Zoom(lineHeight);
    return this;
};

Style.prototype.setPaddingTop = function (paddingTop) {
    this.paddingTop = Zoom(paddingTop);
    return this;
};

Style.prototype.setPaddingBottom = function (paddingBottom) {
    this.paddingBottom = Zoom(paddingBottom);
    return this;
};

Style.prototype.setPaddingLeft = function (paddingLeft) {
    this.paddingLeft = Zoom(paddingLeft);
    return this;
};

Style.prototype.setPaddingRight = function (paddingRight) {
    this.paddingRight = Zoom(paddingRight);
    return this;
};

Style.prototype.setBorderBottom = function (size, style, color) {
    this.borderBottom = size + ' ' +
        (style || 'solid') + ' ' +
        (color || '#eeeeee');
    return this;
};

Style.prototype.setMarginBottom = function (marginBottom) {
    this.marginBottom = Zoom(marginBottom);
    return this;
};

Style.prototype.toString = function () {
    return [
        'word-break: break-all',
        'position: relative',
        'font-family: "PingFang SC", Aria',
        'font-weight: ' + this.fontWeight || 'normal',
        'font-size: ' + this.fontSize || '12px',
        'min-height: ' + this.minHeight || '20px',
        'line-height: ' + this.lineHeight || '20px',
        'padding-top: ' + this.paddingTop || '10px',
        'padding-bottom: ' + this.paddingBottom || '0px',
        'padding-left: ' + this.paddingLeft || '40px',
        'padding-right: ' + this.paddingRight || '40px',
        'border-bottom: ' + this.borderBottom || '0px none transparent',
        'margin-bottom: ' + this.marginBottom || '0px'
    ].join(';');
};

var STYLE_TEXT = new Style()
    .setFontWeight('normal')
    .setFontSize('12px')
    .setMinHeight('20px')
    .setLineHeight('20px')
    .setPaddingTop('10px')
    .setPaddingBottom('0px')
    .setPaddingLeft('40px')
    .setPaddingRight('40px')
    .setBorderBottom('0px')
    .setMarginBottom('0px');

var STYLE_H1 = new Style()
    .setFontWeight('bold')
    .setFontSize('15px')
    .setMinHeight('26px')
    .setLineHeight('26px')
    .setPaddingTop('8px')
    .setPaddingBottom('8px')
    .setPaddingLeft('40px')
    .setPaddingRight('40px')
    .setBorderBottom('2px')
    .setMarginBottom('0px');

var STYLE_H2 = new Style()
    .setFontWeight('bold')
    .setFontSize('14px')
    .setMinHeight('24px')
    .setLineHeight('24px')
    .setPaddingTop('6px')
    .setPaddingBottom('6px')
    .setPaddingLeft('40px')
    .setPaddingRight('40px')
    .setBorderBottom('1px')
    .setMarginBottom('0px');

var STYLE_H3 = new Style()
    .setFontWeight('bold')
    .setFontSize('13px')
    .setMinHeight('22px')
    .setLineHeight('22px')
    .setPaddingTop('11px')
    .setPaddingBottom('0px')
    .setPaddingLeft('40px')
    .setPaddingRight('40px')
    .setBorderBottom('0px')
    .setMarginBottom('0px');

window.Style = Style;
window.getStyle = function (schema) {
    if (schema === SCHEMA.TEXT) {
        return STYLE_TEXT;
    } else if (schema === SCHEMA.H1) {
        return STYLE_H1;
    } else if (schema === SCHEMA.H2) {
        return STYLE_H2;
    } else if (schema === SCHEMA.H3) {
        return STYLE_H3;
    }
    return STYLE_TEXT;
}

window.resetCss = function () {
    $('head').append([
        '<style>',
        '',
        'html, body, div, span, applet, object, iframe,',
        'h1, h2, h3, h4, h5, h6, p, blockquote, pre,',
        'a, abbr, acronym, address, big, cite, code,',
        'del, dfn, em, img, ins, kbd, q, s, samp,',
        'small, strike, strong, sub, sup, tt, var,',
        'b, u, i, center,',
        'dl, dt, dd, ol, ul, li,',
        'fieldset, form, label, legend,',
        'table, caption, tbody, tfoot, thead, tr, th, td,',
        'article, aside, canvas, details, embed, ',
        'figure, figcaption, footer, header, hgroup, ',
        'menu, nav, output, ruby, section, summary,',
        'time, mark, audio, video ',
        '{',
        '	margin: 0; padding: 0;',
        '	border: 0;',
        '	font-size: 100%;',
        '	font: inherit;',
        '	vertical-align: baseline;',
        '}',
        'article, aside, details, figcaption, figure, ',
        'footer, header, hgroup, menu, nav, section {',
        '    display: block;',
        '}',
        'body {',
        '    line-height: 1;',
        '    font-family: "PingFang SC", Aria;',
        '    font-size: 12px;',
        '}',
        'ol, ul {',
        '    list-style: none;',
        '}',
        'blockquote, q {',
        '    quotes: none;',
        '}',
        'blockquote:before, blockquote:after,',
        'q:before, q:after {',
        '    content: "";',
        '    content: none;',
        '}',
        'table {',
        '    border-collapse: collapse;',
        '    border-spacing: 0;',
        '}',
        '* {',
        '    outline: none;',
        '}',
        'body {',
        '    padding: 20px;',
        '}',
        '',
        '</style>'
    ].join(''));
};
