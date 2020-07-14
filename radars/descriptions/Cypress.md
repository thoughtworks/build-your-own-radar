[Cypress](https://cypress.io) is a tool for fast, easy, reliable testing of anything that runs in a browser.

### Pros

- Easy to debug using familiar tools like Chrome DevTools.
- Takes snapshots as tests run, making it possible to click through step by step and see exactly what happened.
- No more async hell. Cypress automatically waits for commands and assertions before moving on.

### Cons

- Does not support as many browsers as tools built on [Selenium](https://www.selenium.dev/).
- Does not allow scripts to execute across multiple domains, causing complications with things like 3rd-party OAuth flows.

Replaces [Protractor]().

When decision made: 5/1/2021

When decision will be revisited: 5/1/2021