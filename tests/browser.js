const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// setup the simplest document possible
const dom = new JSDOM(`<!DOCTYPE html>`);

// get the window object out of the document
var win = dom.defaultView

// set globals for mocha that make access to document and window feel 
// natural in the test environment
global.document = dom
global.window = win

// NOTE - this line stops errors being thrown. I guess it might be even
// better to set it to be jsdom's own HTMLElement?
global.HTMLElement = () => { };
global.HTMLSelectElement = () => { };
global.HTMLInputElement = () => { };
global.HTMLButtonElement = () => { };
// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue
        if (key in global) continue

        global[key] = window[key]
    }
}