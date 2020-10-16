(function () {
    var Zoom = function (p, setZoom) {
        var zoomVal = isNotNone(setZoom) ? setZoom : zoom;

        if (p > 0) {
            return p * zoomVal;
        }

        if (p.endsWith('px')) {
            var v = p.replace(/px$/gi, '');
            if (v.length > 0 && +v > 0) {
                return (+v * zoomVal) + 'px';
            }
        }

        return p;
    };

    window.zoom = 1;
    window.Zoom = Zoom;
})();
