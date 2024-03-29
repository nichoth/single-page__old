function singlePage (cb, opts) {
    var page = new Page(cb, opts);
    window.addEventListener('popstate', onpopstate);

    function onpopstate () {
        var href = getPath();
        page.show(href);
    }
    setTimeout(onpopstate, 0)

    var fn = function (href) { return page.show(href) };
    fn.push = function (href) { return page.push(href) };
    fn.show = function (href) { return page.show(href) };
    return fn;
};

function Page (cb, opts) {
    if (!opts) opts = {};
    this.current = null;
    this.hasPushState = opts.pushState !== undefined
        ? opts.pushState
        : window.history && window.history.pushState
    ;
    this.scroll = opts.saveScroll !== false ? {} : null;
    this.cb = cb;
}

Page.prototype.show = function (href) {
    href = href.replace(/^\/+/, '/');

    if (this.current === href) return;
    this.saveScroll(href);
    this.current = href;

    var scroll = this.scroll[href];
    this.pushHref(href);

    this.cb(href, {
        scrollX : scroll && scroll[0] || 0,
        scrollY : scroll && scroll[1] || 0
    });
};

Page.prototype.saveScroll = function (href) {
    if (this.scroll && this.current) {
        this.scroll[this.current] = [ window.scrollX, window.scrollY ];
    }
};

Page.prototype.push = function (href) {
    href = href.replace(/^\/+/, '/');
    this.saveScroll(href);
    this.pushHref(href);
};

Page.prototype.pushHref = function (href) {
    this.current = href;
    var mismatched = getPath() !== href;
    if (mismatched) window.history.pushState(null, '', href);
};

function getPath () {
    return window.location.pathname
        + (window.location.search || '')
        + (window.location.hash || '')
    ;
}

export { singlePage }
export default singlePage
