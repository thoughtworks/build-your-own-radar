const JSDOM = require('jsdom').JSDOM
const dom = new JSDOM('<html><body></body></html>')
global.document = dom.window.document
global.window = dom.window
global.navigator = dom.window.navigator
global.jQuery = global.$ = global.jquery = require('jquery')
require('jquery-ui')
