
function Style(block) {
    var thiz = this;
    thiz.block = block;

    thiz.wordWrap = 'break-word';
    thiz.wordBreak = 'break-all';
    thiz.position = 'relative';

    thiz.fontFamily = '';
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

    // const
    thiz.priorityWidth = 25;
    thiz.taskWidth = 20;

    thiz.initStyle();
};

Style.Paper = {
    paddingX: '40px',
    paddingY: '40px'
};

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
        'position: ' + this.position,
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

Style.prototype.contentStyle = function () {
    var thiz = this;
    var isInGrid = thiz.block.isGridContext();
    return [
        'word-wrap: ' + (isInGrid ? 'normal' : thiz.wordWrap),
        'word-break: ' + (isInGrid ? 'keep-all' : thiz.wordBreak),
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
        'color: ' + thiz.getContentColor()
        // 'background-color: ' + thiz.getContentBackgroundColor()
    ].join(';');
};

Style.prototype.getContentPaddingLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.paddingLeft)
        + parsePxToNum(thiz.contentPaddingLeft)
        + (thiz.block.isTask() ? thiz.taskWidth : 0)
        + (thiz.block.isShowPriority() ? thiz.priorityWidth : 0)
    ) + 'px';
};

Style.prototype.getTagsLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.contentPaddingLeft)
        + (thiz.block.isTask() ? thiz.taskWidth : 0)
    ) + 'px';
};

Style.prototype.getTaskLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.contentPaddingLeft)
    ) + 'px';
};

Style.prototype.getContentPaddingRight = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.paddingRight)
        + parsePxToNum(thiz.contentPaddingRight)
    ) + 'px';
};

Style.prototype.getContentBackgroundColor = function () {
    var thiz = this;
    var color = 'transparent';
    if (thiz.block.getHighlightData() > 0) {
        color = '#ffeeba';
    }
    if (thiz.block.getCheckData() > 0) {
        color = '#f0f0f0';
    }
    return color;
};

Style.prototype.getBorderBackgroundColor = function () {
    var thiz = this;
    return thiz.getContentBackgroundColor();
};

Style.prototype.getTagsTop = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.paddingTop)
        + parsePxToNum(thiz.contentPaddingTop)
        + (parsePxToNum(thiz.lineHeight) / 2)
        - 8
    ) + 'px';
};

Style.prototype.getPriorityColor = function () {
    var thiz = this;
    var priority = thiz.block.getPriorityData();
    var color = '#007bff';
    var colors = ['#dc3545', '#28a745', '#007bff'];
    var colorIdx = priority - 1;
    if (colorIdx >= 0 && colorIdx < colors.length) {
        color = colors[colorIdx];
    }
    if (thiz.block.isCheck()) {
        color = '#aaaaaa';
    }
    return color;
};

Style.prototype.getContentColor = function () {
    var thiz = this;
    var color = thiz.block.isCheck() ? '#555555' : thiz.color;
    return color;
};

Style.prototype.initStyle = function () {
    var thiz = this;
    var handers = {};
    handers[SCHEMA.TEXT] = thiz.initText;
    handers[SCHEMA.H1] = thiz.initH1;
    handers[SCHEMA.H2] = thiz.initH2;
    handers[SCHEMA.H3] = thiz.initH3;
    handers[SCHEMA.CODE] = thiz.initCode;
    handers[SCHEMA.TASK] = thiz.initTask;
    var handler = handers[thiz.block.schema];
    if (isFunction(handler)) {
        handler.call(thiz);
    }
};

Style.prototype.initText = function () {
    this
        .setPaddingLeft('10px')
        .setContentPaddingLeft('10px')
        ;
};

Style.prototype.initH1 = function () {
    this
        .setFontWeight('bold')
        .setFontSize('15px')
        .setMinHeight('26px')
        .setLineHeight('26px')
        .setBorderBottom('2px')
        .setMarginBottom('5px')
        ;
};

Style.prototype.initH2 = function () {
    this
        .setFontWeight('bold')
        .setFontSize('14px')
        .setMinHeight('24px')
        .setLineHeight('24px')
        .setBorderBottom('1px')
        .setMarginBottom('5px')
        ;
}

Style.prototype.initH3 = function () {
    this
        .setFontWeight('bold')
        .setFontSize('13px')
        .setMinHeight('22px')
        .setLineHeight('22px')
        ;
};

Style.prototype.initCode = function () {
    this
        .setFontSize('12px')
        .setFontFamily('Code, Cousine, Menlo, Monospaced, Consolas, Monaco')
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
};

Style.prototype.initTask = function () {
    this
        .setPaddingLeft('10px')
        .setContentPaddingLeft('10px')
        ;
};

window.Style = Style;

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
        '@font-face {',
        '    font-family: Code;',
        '    src: local(SFMono-Medium), local(SFMono);',
        '}',
        '</style>'
    ].join(''));
};
