[Storybook](https://storybook.js.org/) is a tool for developing UI components in isolation for [React](), Vue, [Angular](), and more.

### Pros

- Create components without needing to stand up screens, fuss with data, or build business logic.
- Mock hard to reach use cases by rendering components in key states that are tricky to reproduce in an app.
- Save use cases as stories in plain JavaScript or [TypeScript]() to revisit during development, testing, and QA.

### Cons

- Requires separate build config from that required by your application or library.
- Can be difficult to write stories for components that depend on certain global state (i.e. [Redux]()) or retrieving backend data.
- Integrations for other frameworks, such as Angular, are not as robust as those for React.

When decision made: 6/1/2020

When decision will be revisited: 6/1/2021
