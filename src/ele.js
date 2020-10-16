function Ele() {
    var thiz = this;

    var args = parseFuncArgsToArray(arguments);
    var argsLen = args.length;
    var opt = Ele.getDefaultOpt();

    var lastArg = argsLen > 0 ? args[argsLen - 1] : null
    var lastArgIsOpt = isNotNone(lastArg) && isObject(lastArg);
    var opt = lastArgIsOpt ? Ele.extendDefaultOpt(lastArg) : Ele.getDefaultOpt();

    var tmplArgs = lastArgIsOpt ? args.slice(0, argsLen - 1) : args;

    var ele = Ele.tmpl.apply(thiz, tmplArgs);

    if (isNotBlank(opt.clazz)) {
        ele.prop('class', opt.clazz);
    }

    if (isNotNone(opt.style)) {
        ele.css(opt.style);
    }

    if (isNotNone(opt.props)) {
        for (var prop in opt.props) {
            ele.prop(prop, opt.props[prop]);
        }
    }

    if (isNotBlank(opt.body)) {
        ele.html(opt.body);
    }

    return ele;
};

Ele.tmpl = function () {
    var res = null;

    var args = parseFuncArgsToArray(arguments);
    var argsLen = args.length;

    var raw = '';

    if (argsLen > 0) {
        if (argsLen === 1 && isArray(args[0])) {
            raw = args[0].join('');
        } else {
            raw = args.join('');
        }
        raw = raw.trim();
    }

    if (isNotBlank(raw)) {
        if (raw.indexOf('<') != 0) {
            raw = '<' + raw;
        }
        if (raw.lastIndexOf('>') != raw.length - 1) {
            raw = raw + '>'
        }
    } else {
        raw = '<div>'
    }

    res = $(raw);
    return res;
};

Ele.getDefaultOpt = function () {
    return {
        id: '',
        clazz: '',
        hash: '',
        style: null,
        body: '',
        props: null
    };
}

Ele.extendDefaultOpt = function (inputOpt) {
    var opt = Ele.getDefaultOpt();
    if (isNotNone(inputOpt)) {
        if (isNotBlank(inputOpt.id)) {
            opt.id = inputOpt.id.trim();
            if (isNotBlank(opt.id)) {
                var firstChar = opt.id[0];
                if ('.' == firstChar) {
                    opt.clazz = opt.id.substring(1);
                } else if ('#' == firstChar) {
                    opt.hash = opt.id.substring(1);
                }
            }
        }

        var styleProps = {};
        var eleProps = {}

        for (var prop in inputOpt) {
            var isStyleProp = Ele.styleProps.includes(prop);
            var isMetaProps = Ele.metaProps.includes(prop);

            if (isStyleProp) {
                styleProps[prop] = inputOpt[prop];
            }

            if (!isStyleProp
                && !isMetaProps) {
                eleProps[prop] = inputOpt[prop];
            }
        }

        if (isNotNone(styleProps)
            || isNotNone(inputOpt.style)) {
            opt.style = $.extend({}, styleProps, inputOpt.style);
        }

        opt.props = eleProps;

        if (isNotBlank(inputOpt.body)) {
            opt.body = inputOpt.body;
        }
    }
    return opt;
};

Ele.metaProps = [
    'id', 'clazz', 'hash', 'style', 'body'
];

Ele.styleProps = [
    'position', 'display',
    'zIndex',
    'left', 'right', 'top', 'bottom',
    'margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom',
    'padding', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom',
    'width', 'minWidth', 'maxWidth',
    'height', 'minHeight', 'maxHeight',
    'lineHeight',
    'border', 'borderLeft', 'borderRight', 'borderTop', 'borderBottom', 'borderWidth', 'borderColor', 'borderWidth', 'borderStyle',
    'borderRadius', // todo
    'cursor',
    'background', 'backgroundColor',
    'textDecoration', 'textAlign',
    'color', 'fontSize', 'fontFamily',
    'float',
    'transform',
    'boxShadow',
];

window.Ele = Ele;
