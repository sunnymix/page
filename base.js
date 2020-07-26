
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

    return id.replace(/\-/gi, '');
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

window.isUndefined = function (p) {
    return typeof p === 'undefined';
};

window.isDefined = function (p) {
    return !isUndefined(p);
}

window.isNull = function (p) {
    return typeof p === 'object' && null === p;
}

window.isNotNull = function (p) {
    return !isNull(p);
}

window.isNone = function (p) {
    return isUndefined(p) || isNull(p);
}

window.isNotNone = function (p) {
    return !isNone(p);
}

window.isEmpty = function (p) {
    return isNone(p) || (typeof p.length === 'number' && p.length === 0);
}

window.isNotEmpty = function (p) {
    return !isEmpty(p);
}

$(document).on('paste', '[contenteditable]', function (event) {
    event.preventDefault();
    document.execCommand('inserttext', false, window.event.clipboardData.getData('text'));
});
