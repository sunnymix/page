function Title(p) {
    this.ele = new Block(null, {
        schema: SCHEMA.H1,
        text: 'Title'
    }, true).ele;

    $(p).replaceWith(this.ele);
};

Title.prototype.type = ELE_TYPE.TITLE;

Title.prototype.getData = function () {
    return this.ele.text();
};

Title.prototype.setData = function (data) {
    this.ele.text(data || 'Title');
}

window.Title = Title;
