var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.mjs
var single_page_exports = {};
__export(single_page_exports, {
  singlePage: () => singlePage
});
module.exports = __toCommonJS(single_page_exports);
function singlePage(cb, opts) {
  var page = new Page(cb, opts);
  window.addEventListener("popstate", onpopstate);
  function onpopstate() {
    var href = getPath();
    page.show(href);
  }
  __name(onpopstate, "onpopstate");
  setTimeout(onpopstate, 0);
  var fn = /* @__PURE__ */ __name(function(href) {
    return page.show(href);
  }, "fn");
  fn.push = function(href) {
    return page.push(href);
  };
  fn.show = function(href) {
    return page.show(href);
  };
  return fn;
}
__name(singlePage, "singlePage");
function Page(cb, opts) {
  if (!opts)
    opts = {};
  this.current = null;
  this.hasPushState = opts.pushState !== void 0 ? opts.pushState : window.history && window.history.pushState;
  this.scroll = opts.saveScroll !== false ? {} : null;
  this.cb = cb;
}
__name(Page, "Page");
Page.prototype.show = function(href) {
  href = href.replace(/^\/+/, "/");
  if (this.current === href)
    return;
  this.saveScroll(href);
  this.current = href;
  var scroll = this.scroll[href];
  this.pushHref(href);
  this.cb(href, {
    scrollX: scroll && scroll[0] || 0,
    scrollY: scroll && scroll[1] || 0
  });
};
Page.prototype.saveScroll = function(href) {
  if (this.scroll && this.current) {
    this.scroll[this.current] = [window.scrollX, window.scrollY];
  }
};
Page.prototype.push = function(href) {
  href = href.replace(/^\/+/, "/");
  this.saveScroll(href);
  this.pushHref(href);
};
Page.prototype.pushHref = function(href) {
  this.current = href;
  var mismatched = getPath() !== href;
  if (mismatched)
    window.history.pushState(null, "", href);
};
function getPath() {
  return window.location.pathname + (window.location.search || "") + (window.location.hash || "");
}
__name(getPath, "getPath");
