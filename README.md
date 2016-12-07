# react-starter
My (evolving) base React front end stack.
<img src="https://codeship.com/projects/0f71e140-8f7b-0134-fdc9-0e20509a962c/status?branch=master" alt="Codeship badge"/>

## Dependencies
### Building, minifying
- [Webpack][7] For running builds
- [Babel][8] For transpiling ES6 JS to ES5 JS

### View & State
- [react][4]
- [redux][5]
- [react-redux][6]

### Testing
- [Mocha][1] For running tests
- [Chai][2] For test assertions
- [Karma][3] Karma is a testing environment that allows you to run your mocha or jasmine JavaScript tests in multiple web browsers simultaneously. You can run Firefox, Chrome and PhantomJS testing environments all at once and bringing up and tearing down as needed.
Run `npm test` or `yarn test` to run the testing configuration

Currently, this runs a base assertion (true must equal true) to gauge testing works and a basic React test to validate rendering React components to gauge that React tests are configured right (Code is being transpiled and run correctly)

The Karma test configuration (`karma.conf.js`) relies on the Webpack test configuration (`webpack.config.test.js`) for building and transpiling JavaScript ES6 into ES5 via babel and the babel plugin for Webpack.





[comment]: <> (References)
[1]: https://mochajs.org/
[2]: http://chaijs.com/
[3]: https://karma-runner.github.io/1.0/index.html
[4]: https://facebook.github.io/react/
[5]: http://redux.js.org/
[6]: https://github.com/reactjs/react-redux
[7]: https://webpack.github.io/
[8]: https://babeljs.io/
