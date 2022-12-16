// @ts-check
const { test } = require('tapzero')
const dom = require('@socketsupply/test-dom')
const singlePage = require('../index.cjs').default

var divs = {
    foo: document.querySelector('#foo'),
    bar: document.querySelector('#bar'),
    baz: document.querySelector('#baz')
}

for (const [_, div] of Object.entries(divs)) {
    hide(div)
}

function hide (el) { el.style.display = 'none' }
function show (e) { e.style.display = 'block' }

test('single page', t => {
    var showPage = singlePage(function (href) {
        Object.keys(divs).forEach(key => {
            hide(divs[key])
        })
        
        var div = divs[href.replace(/^\//, '')]
        if (div) show(div)
        else show(divs.foo)
    })

    var links = document.querySelectorAll('a[href]')
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (ev) {
            ev.preventDefault()
            showPage(this.getAttribute('href'))
        })
    }

    const link = document.querySelector('a[href="/foo"]')
    link?.dispatchEvent(new window.Event('click', { bubbles: true }))

    t.ok(dom.isElementVisible(dom.qs('#foo')),
        'should be able to see "foo" div')

    const barLink = dom.qs('a[href="/bar"]')
    barLink?.dispatchEvent(new window.Event('click', { bubbles: true }))
    t.ok(dom.isElementVisible(dom.qs('#bar')), 'should show the "bar" element')
    t.ok(!dom.isElementVisible(dom.qs('#foo')), '"foo" should be hidden')
})
