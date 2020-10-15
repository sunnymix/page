var KEYCODE = {
    BACKSPACE: 8,
    ENTER: 13,
    ESCAPE: 27,
    UP: 38,
    DOWN: 40,
    NUM1: 49,
    NUM2: 50,
    NUM3: 51,
    A: 65,
    B: 66,
    C: 67,
    E: 69,
    F: 70,
    G: 71,
    I: 73,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
};

window.KEYCODE = KEYCODE;

window.isSaveAction = function (e) {
    return e.keyCode === KEYCODE.S
        && isCommandOrControl(e);
};

window.isShowMenuAction = function (e) {
    return e.keyCode === KEYCODE.F
        && isCommandOrControl(e) && isShift(e);
};

window.isEscapeAction = function (e) {
    return e.keyCode === KEYCODE.ESCAPE;
};

window.isCommand = function (e) {
    return e.metaKey === true;
};

window.isControl = function (e) {
    return e.ctrlKey === true;
};

window.isCommandOrControl = function (e) {
    return isCommand(e)
        || isControl(e);
};

window.isCommandAndControl = function (e) {
    return isCommand(e)
        && isControl(e);
};

window.isCreatePaperAction = function (e) {
    return e.keyCode === KEYCODE.I
        && (isCommand(e) && !isOption(e));
};

window.isShift = function (e) {
    return e.shiftKey === true;
};

window.isOption = function (e) {
    return e.altKey === true;
};

window.isUpKey = function (e) {
    return e.keyCode === KEYCODE.UP;
};

window.isDownKey = function (e) {
    return e.keyCode === KEYCODE.DOWN;
};

window.isEnterKey = function (e) {
    return e.keyCode === KEYCODE.ENTER;
};
