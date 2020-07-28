function Node(place, data) {
    this.id = data || uuid();

    var data = this.getData(this.id);
    var paperHash = this.id.substring(this.id.indexOf('#'));

    this.ele = $([
        '<div',
        '  class="node"',
        '  style="',
        '    border-bottom: 1px solid #e0e0e0;',
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
        '      href="' + paperHash + '"',
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
        '      >' + data.paper.title + '</div>',
        '    </a>',
        '  </div>',
        '</div>'
    ].join(''));
}

Node.prototype.getData = function (id) {
    var paperData = JSON.parse(localStorage.getItem(id));

    var paperDefault = {
        title: id
    };

    paperData = $.extend({}, paperDefault, paperData);

    return {
        id: id,
        paper: paperData
    };
};

window.Node = Node;
