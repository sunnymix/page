
function Style() {
    this.wordBreak = 'break-all';
    this.position = 'relative';

    this.fontFamily = '"PingFang SC", Aria';
    this.fontWeight = 'normal';
    this.fontSize = '12px';

    this.minHeight = '20px';
    this.lineHeight = '20px';

    this.paddingTop = '5px';
    this.paddingBottom = '5px';
    this.paddingLeft = '40px';
    this.paddingRight = '40px';

    this.borderBottom = '0px solid transparent';

    this.marginBottom = '0px';

    this.color = '#000000';
    this.backgroundColor = '#ffffff';
}


Style.prototype.setFontFamily = function (fontFamily) {
    this.fontFamily = fontFamily;
    return this;
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

Style.prototype.setColor = function (color) {
    this.color = color;
    return this;
}

Style.prototype.setBackgroundColor = function (backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
}

Style.prototype.toString = function () {
    return [
        'word-break: ' + this.wordBreak,
        'position: ' + this.position,
        'font-family: ' + this.fontFamily,
        'font-weight: ' + this.fontWeight,
        'font-size: ' + this.fontSize,
        'min-height: ' + this.minHeight,
        'line-height: ' + this.lineHeight,
        'padding-top: ' + this.paddingTop,
        'padding-bottom: ' + this.paddingBottom,
        'padding-left: ' + this.paddingLeft,
        'padding-right: ' + this.paddingRight,
        'border-bottom: ' + this.borderBottom,
        'margin-bottom: ' + this.marginBottom,
        'color: ' + this.color,
        'background-color: ' + this.backgroundColor
    ].join(';');
};

var STYLE_TEXT = new Style();

var STYLE_H1 = new Style()
    .setFontWeight('bold')
    .setFontSize('15px')
    .setMinHeight('26px')
    .setLineHeight('26px')
    .setPaddingTop('8px')
    .setPaddingBottom('8px')
    .setBorderBottom('2px');

var STYLE_H2 = new Style()
    .setFontWeight('bold')
    .setFontSize('14px')
    .setMinHeight('24px')
    .setLineHeight('24px')
    .setPaddingTop('6px')
    .setPaddingBottom('6px')
    .setBorderBottom('1px');

var STYLE_H3 = new Style()
    .setFontWeight('bold')
    .setFontSize('13px')
    .setMinHeight('22px')
    .setLineHeight('22px')
    .setPaddingTop('4px')
    .setPaddingBottom('4px');

var STYLE_CODE = new Style()
    .setFontFamily('"Roboto Mono", Menlo, Monaco')
    .setBackgroundColor('#f4f4f4')
    ;


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
    } else if (schema === SCHEMA.CODE) {
        return STYLE_CODE;
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
