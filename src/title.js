function Title(p, readonly) {
    var thiz = this;
    
    thiz.readonly = isTrue(readonly);

    thiz.block = new Block(null, {
        schema: SCHEMA.H1,
        text: 'Title'
    }, true, thiz.readonly);

    thiz.block.replaceTo(p);
};

Title.prototype.type = ELE_TYPE.TITLE;

Title.prototype.getData = function () {
    return this.block.getData().text;
};

Title.prototype.setData = function (data) {
    this.block.setData(data || 'Title');
};

window.Title = Title;
