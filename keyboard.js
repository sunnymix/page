var KEYCODE = {
    ENTER: 13,
    BACKSPACE: 8,
    S: 83,
    NUM1: 49,
    NUM2: 50,
    NUM3: 51
}

window.KEYCODE = KEYCODE;

window.isSaveAction = function (e) {
    return e.keyCode === KEYCODE.S
        && isCommandOrControl(e);
};

window.isCommandOrControl = function (e) {
    return e.metaKey === true || e.ctrlKey === true;
};
