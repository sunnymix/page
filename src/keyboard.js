var KEYCODE = {
    ENTER: 13,
    BACKSPACE: 8,
    B: 66,
    C: 67,
    F: 70,
    S: 83,
    NUM1: 49,
    NUM2: 50,
    NUM3: 51,
    UP: 38,
    DOWN: 40
}

window.KEYCODE = KEYCODE;

window.isSaveAction = function (e) {
    return e.keyCode === KEYCODE.S
        && isCommandOrControl(e);
};

window.isShowMenuAction = function (e) {
    return e.keyCode === KEYCODE.F
        && isCommandOrControl(e) && isShift(e);
}

window.isCommandOrControl = function (e) {
    return e.metaKey === true || e.ctrlKey === true;
};

window.isShift = function (e) {
    return e.shiftKey === true;
};

window.isOption = function (e) {
    return e.altKey === true;
};
