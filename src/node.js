function Node(place, paper) {
    var thiz = this;

    if (isNone(paper)) {
        return;
    }

    thiz.paper = paper;
    
    thiz.id = paper.pid;
    thiz.title = paper.title;

    this.ele = $([
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

    $(document).on('click', '.node-link', function (e) {
        thiz.trigger('click');
    });

    this.listener = [];
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

window.Node = Node;
