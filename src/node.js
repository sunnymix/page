function Node(place, paper) {
    var thiz = this;

    if (isNone(paper)) {
        return;
    }

    thiz.paper = paper;
    
    thiz.id = paper.pid;
    thiz.title = paper.title;

    thiz.ele = $([
        '<div',
        '  class="node"',
        '  style="',
        '    border-top: 1px solid #eeeeee;',
        '    border-radius: 0px;',
        '  "',
        '  >',
        '  <div',
        '    class="node-box"',
        '    style="',
        '      border: 0px solid #e0e0e0;',
        '      border-radius: 0px;',
        '    "',
        '  >',
        '    <a',
        '      class="node-link"',
        '      href="#' + thiz.id + '"',
        '      style="',
        '        display: block;',
        '        color: #000000;',
        '        text-decoration: none;',
        '      "',
        '    >',
        '      <div',
        '        class="node-info"',
        '        style="',
        '          padding: ' + Zoom('12px') + ';',
        '        "',
        '      >' + thiz.title + '</div>',
        '    </a>',
        '  </div>',
        '</div>'
    ].join(''));

    thiz.linkEle = thiz.ele.find('.node-link');
    thiz.linkEle.on('click', function (e) {
        thiz.trigger('click');
    });

    thiz.listener = [];

    thiz.active = false;
}

Node.prototype.bind = function (e, b) {
    this.listener[e] = b;
};

Node.prototype.trigger = function (e) {
    var cb = this.listener[e];
    if (cb) {
        cb(this);
    }
};

Node.prototype.setActive = function () {
    var thiz = this;

    thiz.active = true;
    thiz.ele.addClass('active');
    thiz.ele.css({
        backgroundColor: '#f9f9f9'
    });
};

Node.prototype.setInactive = function () {
    var thiz = this;

    thiz.active = false;
    thiz.ele.removeClass('active');
    thiz.ele.css({
        backgroundColor: '#ffffff'
    });
};

Node.prototype.open = function () {
    var thiz = this;
    
    thiz.linkEle.trigger('click');

    window.location.hash = '#' + thiz.id;
};

window.Node = Node;
