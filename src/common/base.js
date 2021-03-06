(function () {

    window.uuid = function () {
        var d = Date.now();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return id.replace(/\-/gi, '').substring(0, 12);
    }

    window.selectText = function (node) {
        if (node) {
            if (document.body.createTextRange) {
                const range = document.body.createTextRange();
                range.moveToElementText(node);
                range.select();
            } else if (window.getSelection) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(node);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    window.throttle = function (fn, delay, atleast) {
        if (isFunction(fn) && isNotNone(delay)) {
            var timer = null;
            var previous = null;

            return function () {
                var thiz = this;
                var args = arguments;

                var now = +new Date();

                if (!previous) previous = now;

                if (now - previous > atleast) {
                    fn.apply(thiz, args);
                    previous = now;
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fn.apply(thiz, args);
                    }, delay);
                }
            }
        }
        return null;
    };

    window.initEvent = function (obj, prototype) {
        obj.listener = {};
        prototype.bind = newBind();
        prototype.trigger = newTrigger();
    };

    window.newBind = function () {
        return function (event, cb) {
            this.listener[event] = cb;
        };
    };

    window.newTrigger = function () {
        return function () {
            var thiz = this;
            var args = arguments;
            if (args.length > 0) {
                var event = args[0];
                var passArgs = [].slice.call(args).slice(1);
                var cb = thiz.listener[event];
                if (isFunction(cb)) {
                    cb.apply(thiz, passArgs);
                }
            }
        };
    };

    window.isFunction = function (f) {
        return typeof f === 'function';
    };

    window.isNotFunction = function (f) {
        return !isFunction(f);
    };

    window.isUndefined = function (p) {
        return typeof p === 'undefined';
    };

    window.isDefined = function (p) {
        return !isUndefined(p);
    };

    window.isNull = function (p) {
        return typeof p === 'object' && null === p;
    };

    window.isNotNull = function (p) {
        return !isNull(p);
    };

    window.isNone = function (p) {
        return isUndefined(p) || isNull(p);
    };

    window.isNotNone = function (p) {
        return !isNone(p);
    };

    window.isAllNotNone = function () {
        var args = parseFuncArgsToArray(arguments);
        var allNotNone = false;
        if (args.length > 0) {
            var pass = true;
            for (var i in args) {
                var arg = args[i];
                if (isNone(arg)) {
                    pass = false;
                    break;
                }
            }
            allNotNone = pass;
        }
        return allNotNone;
    };

    window.isEmpty = function (p) {
        return isNone(p) || (typeof p.length === 'number' && p.length === 0);
    };

    window.isNotEmpty = function (p) {
        return !isEmpty(p);
    };

    window.isNotBlank = function (p) {
        return isNotEmpty(p) && p.length > 0;
    };

    window.isBlank = function (p) {
        return !isNotBlank(p);
    };

    window.isObject = function (p) {
        return typeof p === 'object';
    };

    window.isString = function (p) {
        return typeof p === 'string';
    };

    window.isNumber = function (p) {
        return typeof p === 'number';
    };

    window.isArray = function (p) {
        return isNotNone(p)
            && isNumber(p.length)
            && isFunction(p.push)
    };

    // $(document).on('paste', '[contenteditable]', function (event) {
    //     event.preventDefault();
    //     document.execCommand('inserttext', false, window.event.clipboardData.getData('text'));
    // });

    window.getSearchParam = function (name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };

    window.isTrue = function (p) {
        return isDefined(p) && true === p;
    };

    window.isFalse = function (p) {
        return isDefined(p) && false === p;
    };

    window.isNotTrue = function (p) {
        return !isTrue(p);
    };

    window.getImgSize = function (src, cb) {
        var draft = Draft();
        var fragment = document.createDocumentFragment();

        var img = $('<img>');
        img.prop('src', src);

        img.on('load', function () {
            if (isFunction(cb)) {
                cb(img.width() || 0, img.height() || 0);
            }
            draft.remove();
        });

        fragment.appendChild(img[0]);

        draft.append(fragment);
    };

    window.Draft = function () {
        var ele = $([
            '<div',
            '    style="',
            '        position: absolute;',
            '        left: 0;',
            '        top: 0;',
            '        width: 0px;',
            '        height: 0px;',
            '        z-index: -1000;',
            '        overflow: hidden;',
            '    ">',
            '</div>'
        ].join(''));

        $('body').append(ele);

        return ele;
    };

    window.isNum = function (p) {
        return typeof p === 'number';
    };

    window.parsePxToNum = function (p) {
        if (isNone(p)) {
            return 0;
        }

        if (isNum(p)) {
            return p;
        }

        if (isString(p)) {
            if (p.endsWith('px')) {
                var v = p.replace(/px$/gi, '');
                if (v.length > 0 && +v > 0) {
                    return +v;
                }
            }
        }

        return 0;
    };

    window.parseObject = function (data) {
        var res = null;
        if (isObject(data)) {
            res = data;
        } else if (isString(data)) {
            try {
                res = JSON.parse(data);
            } catch (err) {}
        }
        return res;
    };

    window.findEleIndex = function (p) {
        var index = -1;
        var ele = $(p);
        if (isNotEmpty(ele)) {
            index = ele.index();
        }
        return index;
    };

    window.isContainsRange = function (length, fromIndex, toIndex) {
        return fromIndex >= 0 && fromIndex < length
            && toIndex >= 0 && toIndex < length;
    };

    window.restDefaultData = function () {
        return {
            code: 0,
            msg: null,
            data: null
        };
    };

    window.restData = function (code, msg, data) {
        return $.extend(restDefaultData(), {
            code: code,
            msg: msg,
            data: data
        });
    };

    window.rest = function (url, type, data, cb) {
        if (isNone(url)
            || isNone(type)
            || isNotFunction(cb)) {
            return;
        }

        var _data = type === 'GET' ? '' : JSON.stringify(data || {});

        $.ajax({
            url: url,
            type: type,
            contentType: 'application/json',
            dataType: 'json',
            data: _data,
            complete: function (xhr, status) {
                if (isNotNone(status)
                    && 'success' === status
                    && isNotNone(xhr)
                    && isNotNone(xhr.responseJSON)) {
                    var resData = $.extend(restDefaultData(), xhr.responseJSON);
                    cb(resData);
                } else {
                    cb(restData(1, xhr.responseText || 'server error'));
                }
            }
        });
    };

    window.restGet = function (url, cb) {
        rest(url, 'GET', null, cb);
    };

    window.restPost = function (url, data, cb) {
        rest(url, 'POST', data, cb);
    };

    // Caret

    window.getCursorPosition = function (editableDiv) {
        var pos = 0, sel, range;
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                pos = range.endOffset;
            }
        }
        return pos;
    };

    window.setCursorToEnd = function (ele) {
        setCursor(ele, ele.innerText.length);
    };

    window.setCursorToStart = function (ele) {
        setCursor(ele, 0);
    };

    window.setCursor = function (ele, position) {
        var range = document.createRange();
        var cursorEle = ele.innerText.length > 0 ? ele.firstChild : ele;
        if (cursorEle) {
            try {
                range.setStart(cursorEle, position);
                range.collapse(true);

                var sel = window.getSelection();
                sel.removeAllRanges();

                sel.addRange(range);
            } catch (err) {
                console.warn(err);
            }
        }
    };

    window.clearSelection = function () {
        var sel = window.getSelection();
        sel.removeAllRanges();
    };

    window.newEle = function (type, clazz) {
        var ele = $('<' + type + '>');
        if (isNotBlank(clazz)) {
            ele.prop('class', clazz);
        }
        return ele;
    };

    window.parseFuncArgsToArray = function (args) {
        var res = [];
        if (isNotNone(args)) {
            res = [].slice.call(args);
        }
        return res;
    };

    window.getPasteText = function (e) {
        var text = '';
        if (window.clipboardData && window.clipboardData.getData) { // IE
            text = window.clipboardData.getData('Text');
        } else if (e.clipboardData && e.clipboardData.getData) { // Standard
            text = e.clipboardData.getData('text/plain');
        } else if (e.originalEvent) { // JQuery
            text = getPasteText(e.originalEvent);
        }
        return text;
    };

    window.pastePlainText = function (e, compress) {
        var pasteText = getPasteText(e).trim();

        if (isTrue(compress)) {
            pasteText = pasteText.replace(/\n/g, ' ');
        }

        var singleRow = pasteText.indexOf('\n') < 0;

        if (singleRow) {
            document.execCommand("insertHTML", false, pasteText);
        }

        return singleRow;
    };

    window.getSelectedText = function () {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        }
        return text;
    };

    window.selectText = function (ele) {
        if (window.getSelection) {
            var range = document.createRange()
            var cursorEle = ele.innerText.length > 0 ? ele.firstChild : ele;
            range.setStart(cursorEle, 0);
            range.setEnd(cursorEle, ele.innerText.length);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    };

    window.selectEles = function (eles) {
        if (window.getSelection) {
            var ranges = [];

            for (var i in eles) {
                var ele = eles[i];
                var cursorEle = ele.innerText.length > 0 ? ele.firstChild : ele;
                
                var range = document.createRange()
                range.setStart(cursorEle, 0);
                range.setEnd(cursorEle, ele.innerText.length);

                ranges.push(range);
            }

            var winSelection = window.getSelection();
            winSelection.removeAllRanges();
            
            for (var i in ranges) {
                var range = ranges[i];
                winSelection.addRange(range);
            }
        }
    };

    window.deepCopy = function (obj) {
        return $.extend({}, obj);
    };

    window.createWrapEle = function () {
        var eles = parseFuncArgsToArray(arguments);
        var tableEle = null;

        if (isNotEmpty(eles)) {
            tableEle = new Ele('table', {
                id: '.namecard-table',
                border: '0px none',
                borderSpacing: 0,
                borderCollapse: 'collapse',
                width: 'auto',
            });
    
            var rowEle = new Ele('tr', {
            });
            tableEle.append(rowEle);

            for (var i in eles) {
                var ele = eles[i];

                var tdEle = new Ele('td', {
                });
                rowEle.append(tdEle);
    
                tdEle.append(ele);
            }
        }

        return tableEle;
    };

    Object.defineProperty(Array.prototype, 'chunk', {
        value: function (chunkSize) {
            var array = this;
            return [].concat.apply([],
                array.map(function (elem, i) {
                    return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
                })
            );
        }
    });

})();
