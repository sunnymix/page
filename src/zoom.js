var Zoom = function (p) {
    if (p > 0) {
        return p * zoom;
    }

    if (p.endsWith('px')) {
        var v = p.replace(/px$/gi, '');
        if (v.length > 0 && +v > 0) {
            return (+v * zoom) + 'px';
        }
    }

    return p;
};

window.zoom = 1;
window.Zoom = Zoom;
