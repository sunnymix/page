(function () {
    function Style(block) {
        var thiz = this;
        thiz.block = block;

        thiz.wordWrap = 'break-word';
        thiz.wordBreak = 'break-all';
        thiz.position = 'relative';

        thiz.textAlign = 'left';

        thiz.fontFamily = ''; //'Noto Serif SC';
        thiz.fontWeight = 'normal';
        thiz.fontSize = Style.BaseFontSize;

        thiz.minHeight = '18px';
        thiz.lineHeight = '18px';

        thiz.paddingTop = '0px';
        thiz.paddingBottom = '10px';
        thiz.paddingLeft = '0px';
        thiz.paddingRight = '0px';

        thiz.borderTop = '0px solid transparent';
        thiz.borderBottom = '0px solid transparent';
        thiz.borderLeft = '0px solid transparent';
        thiz.borderRight = '0px solid transparent';
        thiz.borderPaddingBottom = '0px';

        thiz.borderRadius = '0px';

        thiz.marginBottom = '0px';
        thiz.marginLeft = '0px';
        thiz.marginRight = '0px';

        thiz.color = '#000000';
        thiz.backgroundColor = '#ffffff';

        thiz.boxShadow = null;

        // ------> body ------>

        thiz.bodyPaddingTop = '0px';
        thiz.bodyPaddingBottom = '0px';
        thiz.bodyPaddingLeft = '0px';
        thiz.bodyPaddingRight = '0px';

        thiz.bodyBorderTop = '0 none';
        thiz.bodyBorderBottom = '0 none';
        thiz.bodyBorderLeft = '0 none';
        thiz.bodyBorderRight = '0 none';

        thiz.bodyBackgroundColor = 'transparent';

        // <------ body <------

        // ------> content ------>

        // content override
        thiz.contentPaddingTop = '0px';
        thiz.contentPaddingBottom = '0px';
        thiz.contentPaddingLeft = '0px';
        thiz.contentPaddingRight = '0px';

        thiz.contentBorderLeft = '0px solid transparent';
        thiz.contentBorderRight = '0px solid transparent';
        thiz.contentBorderTop = '0px solid transparent';
        thiz.contentBorderBottom = '0px solid transparent';

        thiz.contentBackgroundColor = 'transparent';

        thiz.contentMarginLeft = '0px';
        thiz.contentMarginRight = '0px';

        // <------ content <------

        // const
        thiz.taskWidth = 22;
        thiz.priorityWidth = 24;

        thiz.initStyle();
    };

    Style.BaseFontSize = '13px';

    Style.ScrollbarSize = '6px';

    Style.SmallFontSize = (parsePxToNum(Style.BaseFontSize) - 1) + 'px';

    Style.Page = {
        paddingX: '60px',
        paddingY: '50px',
        navHeight: '40px',
    };

    Style.Tab = {
        normal: {
            color: '#999999',
            fontWeight: 'bold',
            // textShadow: '0 0 0 transparent',
        },
        active: {
            color: '#000000',
            fontWeight: 'bold',
            // textShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
        },
    };

    Style.SiblingSchemas = [SCHEMA.CODE, SCHEMA.QUOTE, SCHEMA.TASK];

    Style.isSiblingSchema = function (schema) {
        return Style.SiblingSchemas.includes(schema);
    };

    Style.prototype.setTextAlign = function (textAlign) {
        this.textAlign = textAlign;
        return this;
    };

    Style.prototype.getTextAlign = function (textAlign) {
        return this.textAlign;
    };

    Style.prototype.setFontFamily = function (fontFamily) {
        this.fontFamily = fontFamily;
        return this;
    };

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
        return thiz;
    };

    Style.prototype.setBorderPaddingBottom = function (borderPaddingBottom) {
        var thiz = this;
        thiz.borderPaddingBottom = borderPaddingBottom;
        return thiz;
    };

    Style.prototype.setContentBorderLeft = function (size, style, color) {
        var thiz = this;
        thiz.contentBorderLeft = size + ' ' +
            (style || 'solid') + ' ' +
            (color || thiz.color);
        return thiz;
    };

    Style.prototype.setContentBorderRight = function (size, style, color) {
        var thiz = this;
        thiz.contentBorderRight = size + ' ' +
            (style || 'solid') + ' ' +
            (color || thiz.color);
        return thiz;
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

    Style.prototype.setContentBackgroundColor = function (contentBackgroundColor) {
        var thiz = this;
        thiz.contentBackgroundColor = contentBackgroundColor;
        return thiz;
    };

    Style.prototype.setBorderRadius = function () {
        var thiz = this;
        var args = parseFuncArgsToArray(arguments);
        if (args.length > 0) {
            thiz.borderRadius = args.join(' ');
        }
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
        ].join(';');
    };

    Style.prototype.boxStyle = function (context) {
        var thiz = this;
        var style = [
            'position: relative',
            'padding-top: ' + thiz.getPaddingTop(),
            'padding-bottom: ' + thiz.paddingBottom,
            'padding-left: ' + thiz.paddingLeft,
            'padding-right: ' + thiz.paddingRight,
            'margin-top: ' + thiz.getMarginTop(),
            'margin-bottom: ' + thiz.marginBottom,
            'margin-left: ' + thiz.marginLeft,
            'margin-right: ' + thiz.marginRight,
        ];

        return style.join(';')
    };

    Style.prototype.borderStyle = function () {
        var thiz = this;
        var style = [
            'background-color: ' + thiz.backgroundColor,
            'border-top: ' + thiz.borderTop,
            'border-bottom: ' + thiz.borderBottom,
            'border-left: ' + thiz.borderLeft,
            'border-right: ' + thiz.borderRight,
            'border-radius: ' + thiz.borderRadius,
            'padding-bottom: ' + thiz.borderPaddingBottom,
            'text-align: ' + thiz.textAlign,
            (isNotNone(thiz.boxShadow) ? 'box-shadow: ' + thiz.boxShadow : ''),
        ];

        return style.join(';');
    };

    Style.prototype.bodyStyle = function () {
        var thiz = this;
        var isInGrid = thiz.block.isGridContext();
        var style = [
            'padding-top: ' + thiz.bodyPaddingTop,
            'padding-bottom: ' + thiz.bodyPaddingBottom,
            'padding-left: ' + thiz.getBodyPaddingLeft(),
            'padding-right: ' + thiz.getBodyPaddingRight(),
            'border-left: ' + thiz.bodyBorderLeft,
            'border-right: ' + thiz.bodyBorderRight,
            'border-top: ' + thiz.bodyBorderTop,
            'border-bottom: ' + thiz.bodyBorderBottom,
            'margin-left: ' + thiz.getBodyMarginLeft(),
            'background-color: ' + thiz.bodyBackgroundColor,
        ];

        return style.join(';');
    };

    Style.prototype.contentStyle = function () {
        var thiz = this;
        var isInGrid = thiz.block.isGridContext();
        var style = [
            // layout:
            'padding-top: ' + thiz.contentPaddingTop,
            'padding-bottom: ' + thiz.contentPaddingBottom,
            'padding-left: ' + thiz.getContentPaddingLeft(),
            'padding-right: ' + thiz.getContentPaddingRight(),
            'border-left: ' + thiz.contentBorderLeft,
            'border-right: ' + thiz.contentBorderRight,
            'border-top: ' + thiz.contentBorderTop,
            'border-bottom: ' + thiz.contentBorderBottom,
            'border-radius: 0px',
            'margin-left: ' + thiz.getContentMarginLeft(),
            'margin-right: ' + thiz.getContentMarginRight(),
            'background-color: ' + thiz.getHighlightColor(),
            // text:
            'word-spacing: 0px',
            'word-wrap: ' + (isInGrid ? 'normal' : thiz.wordWrap),
            'word-break: ' + (isInGrid ? 'keep-all' : thiz.wordBreak),
            'font-family: ' + this.fontFamily,
            'font-weight: ' + this.fontWeight,
            'font-size: ' + this.fontSize,
            'min-width: 1px',
            'min-height: ' + this.minHeight,
            'line-height: ' + this.lineHeight,
            'color: ' + thiz.getContentColor(),
            'text-decoration: none',
        ];

        return style.join(';');
    };

    Style.prototype.wrapBodyMarginLeft = function () {
        var thiz = this;
        if (thiz.block.isGridContext()) {
            return '0px';
        }
        return thiz.bodyMarginLeft;
    };

    Style.prototype.getTaskLeft = function () {
        var thiz = this;
        return (
            parsePxToNum(thiz.wrapBodyMarginLeft())
        ) + 'px';
    };

    Style.prototype.getTagsLeft = function () {
        return (
            parsePxToNum(this.getTaskLeft())
            + (this.block.isTask() ? this.taskWidth : 0)
        ) + 'px';
    };

    Style.prototype.getBodyPaddingLeft = function () {
        return this.bodyPaddingLeft;
    };

    Style.prototype.getBodyPaddingRight = function () {
        return this.bodyPaddingRight;
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
        return thiz.paddingTop;
    };

    Style.prototype.getBackgroundColor = function () {
        var thiz = this;
        return thiz.backgroundColor;
    };

    Style.prototype.getHighlightColor = function () {
        var thiz = this;
        var color = thiz.contentBackgroundColor;
        var light = thiz.block.getHighlightData();
        if (thiz.block.getCheckData() > 0) {
            // color = '#f0f0f0';
        }
        if (light == 1) {
            color = '#b8e994';
        } else if (light == 2) {
            color = '#f8d7da';
        } else if (light == 3) {
            color = '#fffd7d';
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
            parsePxToNum(thiz.contentPaddingTop)
            + (parsePxToNum(thiz.lineHeight) / 2)
            - 7
        ) + 'px';
    };

    Style.prototype.getBoxBaseLineTop = function () {
        var thiz = this;
        return (
            parsePxToNum(thiz.getBaseLineTop())
            + (parsePxToNum(thiz.getPaddingTop()))
        ) + 'px';
    };

    Style.prototype.getActionsTop = function () {
        var thiz = this;
        return (
            parsePxToNum(thiz.getBoxBaseLineTop())
            - 3
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
        return this.color;
    };

    Style.prototype.setBodyMarginLeft = function (bodyMarginLeft) {
        this.bodyMarginLeft = bodyMarginLeft;
        return this;
    };

    Style.prototype.setContentMarginLeft = function (contentMarginLeft) {
        this.contentMarginLeft = contentMarginLeft;
        return this;
    };

    Style.prototype.getBodyMarginLeft = function () {
        return (
            parsePxToNum(this.getTagsLeft())
        ) + 'px';
    };

    Style.prototype.getContentMarginLeft = function () {
        return this.contentMarginLeft;
    };

    Style.prototype.setContentMarginRight = function (contentMarginRight) {
        this.contentMarginRight = contentMarginRight;
        return this;
    };

    Style.prototype.getContentMarginRight = function () {
        var thiz = this;
        return thiz.contentMarginRight;
    };

    Style.prototype.setBoxShadow = function (boxShadow) {
        var thiz = this;
        return thiz.boxShadow = boxShadow;
    };

    Style.prototype.initStyle = function () {
        var thiz = this;
        var handers = {};
        handers[SCHEMA.TITLE] = thiz.initTitle;
        handers[SCHEMA.H1] = thiz.initH1;
        handers[SCHEMA.H2] = thiz.initH2;
        handers[SCHEMA.H3] = thiz.initH3;
        handers[SCHEMA.TEXT] = thiz.initText;
        handers[SCHEMA.GRID] = thiz.initGrid;
        handers[SCHEMA.CODE] = thiz.initCode;
        handers[SCHEMA.TASK] = thiz.initTask;
        handers[SCHEMA.QUOTE] = thiz.initQuote;
        var handler = handers[thiz.block.schema];
        if (isFunction(handler)) {
            handler.call(thiz);
        }
    };

    Style.prototype.initTitle = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            .setFontWeight('bold')
            .setFontSize((parsePxToNum(Style.BaseFontSize) + 6) + 'px')
            .setTextAlign('center')
            .setColor('#00b389')
            ;
    };

    Style.bodyMarginGap = 10;

    Style.prototype.initH1 = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            .setFontWeight('bold')
            .setFontSize((parsePxToNum(Style.BaseFontSize) + 4) + 'px')
            .setTextAlign('center')
            .setColor('#00b389')
            .setContentBorderBottom('2px', 'solid', '#00b389')
            ;
    };

    Style.prototype.initH2 = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            .setFontWeight('bold')
            .setFontSize((parsePxToNum(Style.BaseFontSize) + 2) + 'px')
            ;
    }

    Style.prototype.initH3 = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            .setFontWeight('bold')
            .setFontSize((parsePxToNum(Style.BaseFontSize) + 0) + 'px')
            ;
    };

    Style.prototype.initText = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            ;
    };

    Style.prototype.initGrid = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            ;
    };

    Style.prototype.initCode = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            .setFontFamily('Code, Cousine, Menlo, Monospaced, Consolas, Monaco')
            .setContentPaddingLeft('15px')
            .setContentPaddingRight('15px')
            .setFontSize(Style.SmallFontSize)
            .setColor('#666666')
            ;
    };

    Style.prototype.initTask = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            ;
    };

    Style.prototype.initQuote = function () {
        this
            .setBodyMarginLeft((Style.bodyMarginGap * this.block.getIndentValue()) + 'px')
            .setContentBorderLeft('2px', 'solid', '#e1e4e8')
            .setContentBackgroundColor('#f8f8f8')
            .setContentPaddingLeft('15px')
            .setContentPaddingRight('15px')
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
            '    overflow: auto scroll;',
            '}',
            'body {',
            '    line-height: 1;',
            '    font-family: "PingFang SC", Aria;',
            '    font-size: ' + Style.BaseFontSize + ';',
            '    background-color: #ffffff;',
            '    padding-top: ' + (parsePxToNum(Style.Page.navHeight) + parsePxToNum(Style.Page.ScrollbarSize)) + 'px',
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
            '@font-face {',
            '    font-family: Code;',
            '    src: local(SFMono-Regular), local(RobotoMono-Regular);',
            '}',
            '::-webkit-scrollbar {',
            '    height: ' + Style.ScrollbarSize + ';',
            '    width: ' + Style.ScrollbarSize + ';',
            '}',
            '::-webkit-scrollbar-track {',
            '    background: #ffffff;',
            '}',
            '::-webkit-scrollbar-thumb {',
            '    background: #cccccc;',
            '}',
            '::-webkit-scrollbar-thumb:hover {',
            '    background: #aaaaaa;',
            '}',
            '</style>'
        ].join(''));
    };

})();
