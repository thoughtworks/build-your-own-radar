[TSDX](https://github.com/formium/tsdx) is a zero-config CLI that helps with development, testing, and publishing of modern [TypeScript]() packages. TypeScript, Rollup, [Jest](), ESlint and all other plumbing comes setup with best practices out-of-the-box.

### Pros

- Quickly bootstrap a new TypeScript project in seconds.
- Provides templates for basic TypeScript libraries, React component libraries, and React component libraries with [Storybook](https://storybook.js.org/) configured.
- Provides ability to have different development and production builds, multiple bundle formats, proper lodash-optimizations, treeshaking, and minification.

### Cons

- Customization requires overriding the Rollup config, which can potentially invalidate internal guarantees and assumptions making it fragile against updates.
- Storybook integration uses webpack, requiring modifications to both the webpack config and Rollup config when customizing.

When decision made: 8/1/2020

When decision will be revisited: 8/1/2021
