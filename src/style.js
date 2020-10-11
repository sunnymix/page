function Style(block) {
    var thiz = this;
    thiz.block = block;

    thiz.wordWrap = 'break-word';
    thiz.wordBreak = 'break-all';
    thiz.position = 'relative';

    thiz.fontFamily = '';
    thiz.fontWeight = 'normal';
    thiz.fontSize = Style.BaseFontSize;

    thiz.minHeight = '20px';
    thiz.lineHeight = '20px';

    thiz.paddingTop = '0px';
    thiz.paddingBottom = '6px';
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
    thiz.contentPaddingTop = '0px';
    thiz.contentPaddingBottom = '0px';
    thiz.contentPaddingLeft = '2px';
    thiz.contentPaddingRight = '2px';

    thiz.contentBorderTop = '0px solid transparent';
    thiz.contentBorderBottom = '0px solid transparent';

    thiz.contentMarginLeft = '0px';
    thiz.contentMarginRight = '0px';

    // const
    thiz.taskWidth = 20;
    thiz.priorityWidth = 25;
    thiz.linkWidth = 25;

    thiz.initStyle();
};

Style.BaseFontSize = '13px';

Style.Paper = {
    paddingX: '60px',
    paddingY: '60px'
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

Style.prototype.setContentBorderTop = function (size, style, color) {
    var thiz = this;
    thiz.contentBorderTop = size + ' ' +
        (style || 'solid') + ' ' +
        (color || thiz.color);
    return this;
};

Style.prototype.setContentBorderBottom = function (size, style, color) {
    var thiz = this;
    thiz.contentBorderBottom = size + ' ' +
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
    var thiz = this;
    return [
        'cursor: text',
        'position: ' + thiz.position,
        'padding-top: ' + thiz.getPaddingTop(),
        'padding-bottom: ' + thiz.paddingBottom,
        'padding-left: ' + thiz.paddingLeft,
        'padding-right: ' + thiz.paddingRight,
        'margin-top: ' + thiz.getMarginTop(),
        'margin-bottom: ' + thiz.marginBottom,
        'margin-left: ' + thiz.marginLeft,
        'margin-right: ' + thiz.marginRight,
    ].join(';');
};

Style.prototype.borderStyle = function () {
    var thiz = this;
    return [
        'background-color: ' + thiz.backgroundColor,
        'border-top: ' + thiz.borderTop,
        'border-bottom: ' + thiz.borderBottom,
        'border-left: ' + thiz.borderLeft,
        'border-right: ' + thiz.borderRight,
        'border-radius: ' + thiz.borderRadius,
    ].join(';');
};

Style.prototype.contentStyle = function () {
    var thiz = this;
    var isInGrid = thiz.block.isGridContext();
    return [
        'word-spacing: 0px',
        'display: ' + (thiz.block.isGrid() ? 'block' : 'inline-block'),
        'word-wrap: ' + (isInGrid ? 'normal' : thiz.wordWrap),
        'word-break: ' + (isInGrid ? 'keep-all' : thiz.wordBreak),
        'position: ' + this.position,
        'font-family: ' + this.fontFamily,
        'font-weight: ' + this.fontWeight,
        'font-size: ' + this.fontSize,
        'min-width: 1px',
        'min-height: ' + this.minHeight,
        'line-height: ' + this.lineHeight,
        'padding-top: ' + thiz.contentPaddingTop,
        'padding-bottom: ' + thiz.contentPaddingBottom,
        'padding-left: ' + thiz.getContentPaddingLeft(),
        'padding-right: ' + thiz.getContentPaddingRight(),
        'border-top: ' + thiz.contentBorderTop,
        'border-bottom: ' + thiz.getContentBorderBottom(),
        'border-radius: 0px',
        'margin-left: ' + thiz.getContentMarginLeft(),
        'margin-right: ' + thiz.getContentMarginRight(),
        'color: ' + thiz.getContentColor(),
        'text-decoration: none',
        'float: ' + (thiz.block.isGrid() ? 'none' : 'left'),
        // 'background-color: ' + thiz.getContentBackgroundColor()
    ].join(';');
};

Style.prototype.getTaskLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.contentMarginLeft)
    ) + 'px';
};

Style.prototype.getTagsLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.getTaskLeft())
        + (thiz.block.isTask() ? thiz.taskWidth : 0)
    ) + 'px';
};

Style.prototype.getLinkLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.getTagsLeft())
        + (thiz.block.isShowPriority() ? thiz.priorityWidth : 0)
    ) + 'px';
};

Style.prototype.getContentPaddingLeft = function () {
    var thiz = this;
    return thiz.contentPaddingLeft;
};

Style.prototype.getContentPaddingRight = function () {
    var thiz = this;
    return thiz.contentPaddingRight;
};

Style.prototype.getMarginTop = function () {
    var thiz = this;
    var marginTop = parsePxToNum(thiz.marginTop);
    if (marginTop === 0 && thiz.block.isFirstBlock()) {
        marginTop = thiz.marginBottom;
    }
    return marginTop;
};

Style.prototype.getPaddingTop = function () {
    var thiz = this;
    var paddingTop = parsePxToNum(thiz.paddingTop);
    if (paddingTop === 0 && thiz.block.isFirstBlock()) {
        paddingTop = thiz.paddingBottom;
    }
    return paddingTop;
};

Style.prototype.getBackgroundColor = function () {
    var thiz = this;
    var color = 'transparent';
    var light = thiz.block.getHighlightData();
    if (thiz.block.getCheckData() > 0) {
        // color = '#f0f0f0';
    }
    if (light > 0) {
        color = '#ffeeba';
    }
    if (light > 1) {
        color = '#cce5ff';
    }
    if (light > 2) {
        color = '#f8d7da';
    }
    return color;
};

Style.prototype.getBackgroundLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.getContentMarginLeft())
    ) + 'px';
};

Style.prototype.getBaseLineTop = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.getPaddingTop())
        + parsePxToNum(thiz.contentPaddingTop)
        + (parsePxToNum(thiz.lineHeight) / 2)
        - 7
    ) + 'px';
};

Style.prototype.getPriorityColor = function () {
    var thiz = this;
    var priority = thiz.block.getPriorityData();
    var color = '#007bff';
    var colors = ['#dc3545', '#ffc107', '#6c757d'];
    var colorIdx = priority - 1;
    if (colorIdx >= 0 && colorIdx < colors.length) {
        color = colors[colorIdx];
    }
    if (thiz.block.isCheck()) {
        // color = '#aaaaaa';
    }
    return color;
};

Style.prototype.getContentColor = function () {
    var thiz = this;
    var color = thiz.color;
    if (thiz.block.hasLink()) {
        // color = '#007bff';
    }
    return color;
};

Style.prototype.getContentBorderBottom = function () {
    var thiz = this;
    var color = 'transparent';
    if (thiz.block.hasLink()) {
        color = '#e1e4e8';
        return '1px solid ' + color;
    }
    return '0 none';
};

Style.prototype.setContentMarginLeft = function (contentMarginLeft) {
    this.contentMarginLeft = contentMarginLeft;
    return this;
}

Style.prototype.getContentMarginLeft = function () {
    var thiz = this;
    return (
        parsePxToNum(thiz.getLinkLeft())
    ) + 'px';
};

Style.prototype.setContentMarginRight = function (contentMarginRight) {
    this.contentMarginRight = contentMarginRight;
    return this;
};

Style.prototype.getContentMarginRight = function () {
    var thiz = this;
    return thiz.contentMarginRight;
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
        .setContentMarginLeft('10px')
        ;
};

Style.prototype.initH1 = function () {
    this
        .setFontWeight('bold')
        .setFontSize((parsePxToNum(Style.BaseFontSize) + 4) + 'px')
        .setLineHeight('22px')
        .setMinHeight('22px')
        ;
};

Style.prototype.initH2 = function () {
    this
        .setFontWeight('bold')
        .setFontSize((parsePxToNum(Style.BaseFontSize) + 2) + 'px')
        ;
}

Style.prototype.initH3 = function () {
    this
        .setFontWeight('bold')
        .setFontSize((parsePxToNum(Style.BaseFontSize) + 0) + 'px')
        ;
};

Style.prototype.initCode = function () {
    this
        .setFontFamily('Code, Cousine, Menlo, Monospaced, Consolas, Monaco')
        .setBackgroundColor('#ffffff')
        .setMarginLeft('10px')
        .setMarginRight('0px')
        .setBorderTop('1px', 'solid', '#e1e4e8')
        .setBorderBottom('1px', 'solid', '#e1e4e8')
        .setBorderLeft('1px', 'solid', '#e1e4e8')
        .setBorderRight('1px', 'solid', '#e1e4e8')
        .setBorderRadius('1px')
        .setContentPaddingLeft('5px')
        .setContentPaddingRight('5px')
        .setColor('#24292e')
        ;
};

Style.prototype.initTask = function () {
    this
        .setContentMarginLeft('10px')
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
        '    font-size: ' + Style.BaseFontSize + ';',
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
        '    padding: 20px;',
        '}',
        '@font-face {',
        '    font-family: Code;',
        '    src: local(SFMono-Regular), local(RobotoMono-Regular);',
        '}',
        '</style>'
    ].join(''));
};
