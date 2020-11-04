(function () {
    function Link(place) {
        var thiz = this;
        thiz.ele = $([
            '<div',
            '    class="link"',
            '    style="',
            '        display: none;',
            '        position: relative;',
            '        background-color: transparent;',
            '        z-index: 1;',
            '        margin-top: 0px;',
            '        height: 15px;',
            '        padding-left: 0px;',
            '        overflow: hidden;',
            '        ;',
            '    "',
            '>',
            '    <a',
            '        class="link-anchor"',
            // '        target="_blank"',
            '        style="',
            '            display: inline-block;',
            '            height: 15px;',
            '            line-height: 15px;',
            '            text-decoration: none;',
            '            white-space: nowrap;',
            '            z-index: 1;',
            '            background-color: transparent;',
            '            overflow: hidden;',
            '            padding: 0 2px;',
            '            color: #999999;',
            '            ;',
            '        "',
            '    ></a>',
            '</div>'
        ].join(''));

        thiz.anchorEle = thiz.ele.find('> .link-anchor');

        thiz.anchorEle
            .on('mouseenter', function () {
                thiz.anchorEle.css({
                    color: '#007bff'
                });
            })
            .on('mouseleave', function () {
                thiz.anchorEle.css({
                    color: '#999999'
                });
            });

        if (isNotNone(place)) {
            place.append(thiz.ele);
        }
    }

    Link.prototype.setData = function (url) {
        var thiz = this;
        thiz.url = url.trim();
        thiz.anchorEle
            .attr('href', thiz.url)
            .text(thiz.url);
    };

    Link.prototype.getData = function (url) {
        var thiz = this;
        return thiz.url || '';
    };

    Link.prototype.show = function () {
        var thiz = this;
        thiz.ele.show();
    };

    Link.prototype.hide = function () {
        var thiz = this;
        thiz.ele.hide();
    };

    Link.prototype.expand = function () {
        var thiz = this;
        thiz.show();
    };

    Link.prototype.shrink = function () {
        var thiz = this;
        thiz.hide();
    };

    window.Link = Link;
})();
