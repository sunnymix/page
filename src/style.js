
function Style() {
    var thiz = this;

    thiz.schema = SCHEMA.TEXT;

    thiz.wordWrap = 'break-word';
    thiz.wordBreak = 'normal';
    thiz.position = 'relative';

    // thiz.fontFamily = '"Noto Serif SC", "PingFang SC", Aria';
    thiz.fontFamily = '"PingFang SC", Aria';
    thiz.fontWeight = 'normal';
    thiz.fontSize = '12px';

    thiz.minHeight = '18px';
    thiz.lineHeight = '18px';

    thiz.paddingTop = '2px';
    thiz.paddingBottom = '2px';
    thiz.paddingLeft = '10px';
    thiz.paddingRight = '10px';

    thiz.borderTop = '0px solid transparent';
    thiz.borderBottom = '0px solid transparent';
    thiz.borderLeft = '0px solid transparent';
    thiz.borderRight = '0px solid transparent';

    thiz.borderRadius = '0px';

    thiz.marginBottom = '0px';
    thiz.marginLeft = '0px';
    thiz.marginRight = '0px';

    thiz.color = '#000000';
    thiz.backgroundColor = '#ffffff';

    // content override

    thiz.contentPaddingTop = '3px';
    thiz.contentPaddingBottom = '3px';

    thiz.contentPaddingLeft = '0px';
    thiz.contentPaddingRight = '0px';
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

Style.prototype.setBorderTop = function (size, style, color) {
    var thiz = this;
    thiz.borderTop = size + ' ' +
        (style || 'solid') + ' ' +
        (color || thiz.color);
    return this;
};

Style.prototype.setBorderBottom = function (size, style, color) {
    var thiz = this;
    thiz.borderBottom = size + ' ' +
        (style || 'solid') + ' ' +
        (color || thiz.color);
    return this;
};

Style.prototype.setBorderLeft = function (size, style, color) {
    var thiz = this;
    thiz.borderLeft = size + ' ' +
        (style || 'solid') + ' ' +
        (color || thiz.color);
    return this;
};

Style.prototype.setBorderRight = function (size, style, color) {
    var thiz = this;
    thiz.borderRight = size + ' ' +
        (style || 'solid') + ' ' +
        (color || thiz.color);
    return this;
};

Style.prototype.setBorderRadius = function (borderRadius) {
    this.borderRadius = borderRadius;
    return this;
};

Style.prototype.setMarginBottom = function (marginBottom) {
    this.marginBottom = Zoom(marginBottom);
    return this;
};

Style.prototype.setMarginLeft = function (marginLeft) {
    this.marginLeft = Zoom(marginLeft);
    return this;
};

Style.prototype.setMarginRight = function (marginRight) {
    this.marginRight = Zoom(marginRight);
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

Style.prototype.setSchema = function (schema) {
    this.schema = schema;
    return this;
};

Style.prototype.eleStyle = function (context) {
    return [
        'cursor: text',
        'word-wrap: ' + this.wordWrap,
        'word-break: ' + this.wordBreak,
        'position: ' + this.position,
        'font-family: ' + this.fontFamily,
        'font-weight: ' + this.fontWeight,
        'font-size: ' + this.fontSize,
        'padding-top: ' + this.paddingTop,
        'padding-bottom: ' + this.paddingBottom,
        'padding-left: ' + this.paddingLeft,
        'padding-right: ' + this.paddingRight,
        'border-top: ' + this.borderTop,
        'border-bottom: ' + this.borderBottom,
        'border-left: ' + this.borderLeft,
        'border-right: ' + this.borderRight,
        'border-radius: ' + this.borderRadius,
        'margin-bottom: ' + this.marginBottom,
        'margin-left: ' + this.marginLeft,
        'margin-right: ' + this.marginRight,
        'background-color: ' + this.backgroundColor
    ].join(';');
};

Style.prototype.contentStyle = function (context) {
    var thiz = this;
    var isGrid = isNotNone(context) && context === SCHEMA.GRID;
    return [
        'word-wrap: ' + (isGrid ? 'normal' : thiz.wordWrap),
        'word-break: ' + (isGrid ? 'keep-all' : thiz.wordBreak),
        'position: ' + this.position,
        'font-family: ' + this.fontFamily,
        'font-weight: ' + this.fontWeight,
        'font-size: ' + this.fontSize,
        'min-width: 1px',
        'min-height: ' + this.minHeight,
        'line-height: ' + this.lineHeight,
        'padding-top: ' + this.paddingTop,
        'padding-bottom: ' + this.paddingBottom,
        'padding-left: ' + thiz.getContentPaddingLeft(),
        'padding-right: ' + thiz.getContentPaddingRight(),
        'margin-left: ' + '-' + thiz.paddingLeft,
        'margin-right: ' + '-' + thiz.paddingRight,
        'color: ' + thiz.color
    ].join(';');
};

Style.prototype.getContentPaddingLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.paddingLeft)
        + parsePxToNum(thiz.contentPaddingLeft)
        + (thiz.isTask() ? 20 : 0)
    ) + 'px';
};

Style.prototype.getContentPaddingRight = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.paddingRight)
        + parsePxToNum(thiz.contentPaddingRight)
    ) + 'px';
};

Style.prototype.isGrid = function () {
    var thiz = this;
    return thiz.schema === SCHEMA.GRID;
};

Style.prototype.isTask = function () {
    var thiz = this;
    return thiz.schema === SCHEMA.TASK;
};

// static variable

Style.Paper = {
    paddingX: '20px',
    paddingY: '40px'
};

var STYLE_TEXT = new Style()
    .setSchema(SCHEMA.TEXT)
    .setPaddingLeft('10px')
    .setContentPaddingLeft('10px')
    ;

var STYLE_H1 = new Style()
    .setSchema(SCHEMA.H1)
    .setFontWeight('bold')
    .setFontSize('15px')
    .setMinHeight('26px')
    .setLineHeight('26px')
    .setBorderBottom('2px')
    .setMarginBottom('5px')
    ;

var STYLE_H2 = new Style()
    .setSchema(SCHEMA.H2)
    .setFontWeight('bold')
    .setFontSize('14px')
    .setMinHeight('24px')
    .setLineHeight('24px')
    .setBorderBottom('1px')
    .setMarginBottom('5px')
    ;

var STYLE_H3 = new Style()
    .setSchema(SCHEMA.H3)
    .setFontWeight('bold')
    .setFontSize('13px')
    .setMinHeight('22px')
    .setLineHeight('22px')

var STYLE_CODE = new Style()
    .setSchema(SCHEMA.CODE)
    .setFontSize('12px')
    .setFontFamily('"SF Mono", "Roboto Mono", Menlo, Monaco')
    // .setColor('#555555')
    .setBackgroundColor('#f9f9f9')
    .setMarginLeft('10px')
    .setMarginRight('0px')
    .setBorderTop('1px', 'solid', '#dddddd')
    .setBorderBottom('1px', 'solid', '#dddddd')
    .setBorderLeft('1px', 'solid', '#dddddd')
    .setBorderRight('1px', 'solid', '#dddddd')
    .setBorderRadius('2px')
    .setContentPaddingTop('0px')
    .setContentPaddingBottom('0px')
    .setContentPaddingLeft('5px')
    .setContentPaddingRight('5px')
    ;

var STYLE_TASK = new Style()
    .setSchema(SCHEMA.TASK)
    .setPaddingLeft('10px')
    .setContentPaddingLeft('10px')
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
    } else if (schema === SCHEMA.TASK) {
        return STYLE_TASK;
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
        '    background-color: #ffffff;',
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
        '    padding: 2%;',
        '}',
        '',
        '</style>'
    ].join(''));
};
