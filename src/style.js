
function Style() {
    this.wordWrap = 'break-word';
    this.wordBreak = 'normal';
    this.position = 'relative';

    this.fontFamily = '"PingFang SC", Aria';
    this.fontWeight = 'normal';
    this.fontSize = '12px';

    this.minHeight = '18px';
    this.lineHeight = '18px';

    this.paddingTop = '2px';
    this.paddingBottom = '2px';
    this.paddingLeft = '10px';
    this.paddingRight = '10px';

    this.borderBottom = '0px solid transparent';

    this.marginBottom = '0px';

    this.color = '#000000';
    this.backgroundColor = '#ffffff';

    // content override

    this.contentPaddingTop = '3px';
    this.contentPaddingBottom = '3px';

    this.contentPaddingLeft = '0px';
    this.contentPaddingRight = '0px';
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
        (color || '#000000');
    return this;
};

Style.prototype.setMarginBottom = function (marginBottom) {
    this.marginBottom = Zoom(marginBottom);
    return this;
};

Style.prototype.setColor = function (color) {
    this.color = color;
    return this;
};

Style.prototype.setBackgroundColor = function (backgroundColor) {
    this.backgroundColor = backgroundColor;
    return this;
};

Style.prototype.setContentPaddingTop = function (contentPaddingTop) {
    this.contentPaddingTop = contentPaddingTop;
    return this;
};

Style.prototype.setContentPaddingBottom = function (contentPaddingBottom) {
    this.contentPaddingBottom = contentPaddingBottom;
    return this;
}

Style.prototype.setContentPaddingLeft = function (contentPaddingLeft) {
    this.contentPaddingLeft = contentPaddingLeft;
    return this;
};

Style.prototype.setContentPaddingRight = function (contentPaddingRight) {
    this.contentPaddingRight = contentPaddingRight;
    return this;
};

Style.prototype.toString = function () {
    return [
        'word-wrap: ' + this.wordWrap,
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

// static variable

Style.Paper = {
    paddingX: '90px',
    paddingY: '100px'
};

var STYLE_TEXT = new Style();

var STYLE_H1 = new Style()
    .setFontWeight('bold')
    .setFontSize('15px')
    .setMinHeight('26px')
    .setLineHeight('26px')
    //.setBorderBottom('2px')
    ;

var STYLE_H2 = new Style()
    .setFontWeight('bold')
    .setFontSize('14px')
    .setMinHeight('24px')
    .setLineHeight('24px')
    //.setBorderBottom('1px')
    ;

var STYLE_H3 = new Style()
    .setFontWeight('bold')
    .setFontSize('13px')
    .setMinHeight('22px')
    .setLineHeight('22px')

var STYLE_CODE = new Style()
    .setFontFamily('"Roboto Mono", Menlo, Monaco')
    .setBackgroundColor('#f6f6f6')
    .setContentPaddingLeft('10px')
    .setContentPaddingRight('10px')
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
        '    background-color: #484C4F;',
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
        '    padding: 1%;',
        '}',
        '',
        '</style>'
    ].join(''));
};
