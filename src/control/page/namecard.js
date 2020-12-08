(function () {
    function Namecard(writer, block, data) {
        this.init(data);
    }

    Namecard.prototype.init = function (data) {
        this.initEle(data);
    };

    Namecard.prototype.initEle = function (data) {
        var thiz = this;

        thiz.ele = new Ele('div', {
            id: '.namecard',
        });

        thiz.contentEle = new Ele('div', {
            id: '.namecard-content',
        });
        thiz.ele.append(thiz.contentEle);

        thiz.setData(data);
    };

    Namecard.prototype.defaultData = function () {
        return {
            greeting: 'Best Regards.',
            title: '中文名 English Title',
            logo: '',
            phone: '+86 123-1234-1234',
            mail: 'mail@corp.com',
            website: 'www.corp.com',
            headquarters: 'Beijing: Address Info;Shanghai: Address Info',
            hightlightTitle: 'Highlight Title',
            hightlightContent: 'Highlight Content'
        };
    };

    Namecard.prototype.getData = function () {
        var thiz = this;
        return JSON.stringify(thiz.data || '{}');
    };

    Namecard.prototype.setData = function (data) {
        var thiz = this;
        var obj = parseObject(data);
        var newData = $.extend(thiz.defaultData(), obj);
        thiz.data = newData;
        thiz.applyData(thiz.data);
    };

    Namecard.prototype.applyData = function (data) {
        var thiz = this;

        thiz.contentEle.empty();

        var lineHeight = '18px';
        var primaryColor = '#99cc00';

        var newGap = function () {
            return new Ele('div', {
                body: ' ',
                fontSize: '12px',
                height: lineHeight,
                lineHeight: lineHeight,
            });
        };

        var newSpace = function () {
            return new Ele('div', {
                body: '&nbsp;',
                fontSize: '12px',
                fontWeight: 'bold',
                color: primaryColor,
                height: lineHeight,
                lineHeight: lineHeight,
            });
        };

        thiz.greetingEle = new Ele('div', {
            body: data.greeting,
            fontSize: '12px',
            height: lineHeight,
            lineHeight: lineHeight,
            borderTop: '2px solid #b5c4df',
            paddingTop: lineHeight,
        });
        thiz.greetingWrapEle = createWrapEle(thiz.greetingEle);
        thiz.contentEle.append(thiz.greetingWrapEle);

        thiz.contentEle.append(newGap());

        thiz.titleEle = new Ele('div', {
            body: data.title,
            fontSize: '16px',
            fontWeight: 'bold',
            height: lineHeight,
            lineHeight: lineHeight,
        });
        thiz.titleWrapEle = createWrapEle(thiz.titleEle);
        thiz.contentEle.append(thiz.titleWrapEle);

        thiz.contentEle.append(newGap());

        thiz.logoEle = new Ele('img', {
            src: data.logo,
            height: '36px',
            lineHeight: '36px',
            display: 'block',
        });
        thiz.logoWrapEle = createWrapEle(thiz.logoEle);
        thiz.contentEle.append(thiz.logoWrapEle);

        thiz.contentEle.append(newGap());

        thiz.phoneEle = new Ele('div', {
            body: data.phone,
            fontSize: '12px',
            height: lineHeight,
            lineHeight: lineHeight,
        });
        thiz.phoneWrapEle = createWrapEle(new Ele('div', {
            body: 'T:',
            fontSize: '12px',
            fontWeight: 'bold',
            color: primaryColor,
            height: lineHeight,
            lineHeight: lineHeight,
        }), newSpace(), thiz.phoneEle);
        thiz.contentEle.append(thiz.phoneWrapEle);

        thiz.mailEle = new Ele('div', {
            body: data.mail,
            fontSize: '12px',
            height: lineHeight,
            lineHeight: lineHeight,
        });
        thiz.mailWrapEle = createWrapEle(new Ele('div', {
            body: 'M:',
            fontSize: '12px',
            fontWeight: 'bold',
            color: primaryColor,
            height: lineHeight,
            lineHeight: lineHeight,
        }), newSpace(), thiz.mailEle);
        thiz.contentEle.append(thiz.mailWrapEle);

        thiz.websiteEle = new Ele('div', {
            body: data.website,
            fontSize: '12px',
            height: lineHeight,
            lineHeight: lineHeight,
        });
        thiz.websiteWrapEle = createWrapEle(new Ele('div', {
            body: 'W:',
            fontSize: '12px',
            fontWeight: 'bold',
            color: primaryColor,
            height: lineHeight,
            lineHeight: lineHeight,
        }), newSpace(), thiz.websiteEle);
        thiz.contentEle.append(thiz.websiteWrapEle);

        thiz.contentEle.append(newGap());

        var headquarters = data.headquarters.split(';');
        for (var i in headquarters) {
            var headquarter = headquarters[i];
            if (isNotBlank(headquarter)) {
                var titleAndContent = headquarter.split(':');
                if (titleAndContent.length != 2) {
                    continue;
                }
                var title = titleAndContent[0];
                var content = titleAndContent[1];

                var titleEle = new Ele('div', {
                    body: title + ':',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: primaryColor,
                    height: lineHeight,
                    lineHeight: lineHeight,
                });
                var contentEle = new Ele('div', {
                    body: content,
                    fontSize: '12px',
                    height: lineHeight,
                    lineHeight: lineHeight,
                });

                var headquarterWrapEle = createWrapEle(
                    titleEle, newSpace(), contentEle
                );
                thiz.contentEle.append(headquarterWrapEle);
            }
        }

        thiz.contentEle.append(newGap());

        thiz.hightlightTitleEle = createWrapEle(new Ele('div', {
            body: data.hightlightTitle,
            fontSize: '12px',
            fontWeight: 'bold',
            color: primaryColor,
            height: lineHeight,
            lineHeight: lineHeight,
        }));
        thiz.contentEle.append(thiz.hightlightTitleEle);

        thiz.hightlightContentEle = createWrapEle(new Ele('div', {
            body: data.hightlightContent,
            fontSize: '12px',
            height: lineHeight,
            lineHeight: lineHeight,
        }));
        thiz.contentEle.append(thiz.hightlightContentEle);

        thiz.contentEle.append(newGap());
    };

    window.Namecard = Namecard;
})();
