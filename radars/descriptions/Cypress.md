[Cypress](https://cypress.io) is a tool for fast, easy, reliable testing of anything that runs in a browser.

### Pros

- Easy to debug using familiar tools like Chrome DevTools.
- Takes snapshots as tests run, making it possible to click through step by step and see exactly what happened.
- No more async hell. Cypress automatically waits for commands and assertions before moving on.
- Fast execution
- Easy to use with Continous Integration
- Simple usage

### Cons

- Does not support as many browsers as tools built on [Selenium WebDriver]().
- Does not allow scripts to execute across multiple domains, causing complications with things like 3rd-party OAuth flows.
- No multiple domain support (ie single origin URLs)
- No XPath support (workaround available)
- Switch Browser Tabs is not supported
- No iFrame support (workaround available)
- No File upload support

Replaces [Protractor]() and [Selenium WebDriver]().

When paired with [Applitools]() it enables easy automated visual regression testing across multiple browsers.  Applitools is recommended when using Cypress for visual testing (not functional testing).

When decision made: 08/2021

When decision will be revisited: 08/2023
