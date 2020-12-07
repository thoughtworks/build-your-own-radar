[single-spa](https://github.com/single-spa/single-spa) is a JavaScript framework for building front-end micro-services or [micro frontends](https://www.thoughtworks.com/radar/techniques/micro-frontends), allowing you to build frontend applications that coexist and can be written in their own framework.

### Pros

- Use multiple frameworks (e.g. [React](), [Angular](), etc.) on the same page without refreshing the page.
- Lazy load frontend applications for improved initial load time.
- Teams can build and deploy parts of an application independently.
- Provides the [create-single-spa CLI tool](https://single-spa.js.org/docs/create-single-spa) for bootstrapping new micro frontend applications.

### Cons

- Uses in-browser ES modules + import maps, which requires polyfills to support older browsers.
- Teams must be more mindful of what global state should be shared (or could be shared in the future), to avoid tight coupling of micro frontend applications.
- Can present unique versioning issues, particularly with shared libraries served as in-browser modules.

When decision made: 10/1/2020

When decision will be revisited: 10/1/2021