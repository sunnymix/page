function Paper(p) {
    var thiz = this;

    var hash = window.location.hash.replace(/^#/, '');
    if (hash.length > 0) {
        this.id = hash;
    } else {
        this.id = uuid();
        window.location.hash = '#' + this.id;
    }

    var ele = $(
        [
            '<div',
            '  class="paper"',
            '  style="',
            '    max-width: 760px;',
            '    border: 1px solid #f8f8f8;',
            '    border-radius: 2px;',
            '    margin: 0 auto;',
            '    "',
            '  >',
            '  <div',
            '    class="paper-box"',
            '    style="',
            '      border: 1px solid #e0e0e0;',
            '      border-radius: 1px;',
            '      padding: 30px;',
            '      "',
            '    >',
            '    <div class="title"></div>',
            '    <div class="writer"></div>',
            '  </div>',
            '</div>'
        ].join('')
    );
    $(p).replaceWith(ele);
    this.ele = ele;

    this.title = new Title(this.ele.find('.title'));
    this.writer = new Writer(this.ele.find('.writer'));

    this.ele.on('click', function (e) {
        thiz.click();
    });

    $(document).on('keydown', 'body', function (e) {
        if (isSaveAction(e)) {
            e.preventDefault();
            thiz.save();
        }
    });

    this.loadData();
}

Paper.prototype.type = ELE_TYPE.PAPER;

Paper.prototype.click = function () {
    this.writer.focus();
};

Paper.prototype.save = function () {
    var data = this.getData();
    this.saveData(data);
};

Paper.prototype.getData = function () {
    var titleData = this.title.getData();
    var writerData = this.writer.getData();
    return {
        title: titleData,
        writer: writerData
    };
};

Paper.prototype.loadData = function () {
    var paperData = localStorage.getItem(this.cacheId());
    if (isNotNone(paperData)) {
        var paperObj = JSON.parse(paperData);
        console.log(paperObj);
        this.title.setData(paperObj.title);
        this.writer.setData(paperObj.writer);
    }
};

Paper.prototype.saveData = function (data) {
    if (isNotNone(data)) {
        var dataRaw = JSON.stringify(data);
        console.log(dataRaw);
        localStorage.setItem(this.cacheId(), dataRaw);
    }
}

Paper.prototype.cacheId = function () {
    return 'paper#' + this.id;
}

jQuery(function () {
    resetCss();

    var paper = new Paper('.paper');

});
