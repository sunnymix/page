function Title(place, readonly) {
    var thiz = this;

    thiz.readonly = isTrue(readonly);

    thiz.block = new Block(null, {
        schema: SCHEMA.Text,
        text: 'Title'
    }, true, thiz.readonly);

    thiz.block.appendTo(place);
    thiz.init();
};

Title.prototype.init = function () {
    var thiz = this;
    initEvent(thiz, Title.prototype);
    thiz.initBind();
};

Title.prototype.initBind = function () {
    var thiz = this;
    thiz.block.bind('enter', function (block) {
        thiz.trigger('enter', thiz);
    });
};

Title.prototype.type = ELE_TYPE.TITLE;

Title.prototype.getData = function () {
    return this.block.getData().text;
};

Title.prototype.setData = function (data) {
    this.block.setContentData(data || 'Title');
};

Title.prototype.focus = function () {
    var thiz = this;
    thiz.block.focus();
};

window.Title = Title;
