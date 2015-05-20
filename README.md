# tech-radar [![Build Status](https://snap-ci.com/Trecenti/tech-radar/branch/master/build_image)](https://snap-ci.com/Trecenti/tech-radar/branch/master)
[![NPM](https://nodei.co/npm/tech-radar.png)](https://nodei.co/npm/tech-radar/)


A library that supports the creation of a Tech Radar, inspired by [thoughtworks.com/radar/](http://thoughtworks.com/radar/).

Check the example [here](http://brunotrecenti.com/tech-radar/)

### How To Use

The package has two dependencies [d3](http://d3js.org/) and [chancejs](http://chancejs.com/) that needs to be loaded separatedely for now, in the future there's a plan to add maintain these dependencies.

Please view the file `examples/index.html` for general usages.

### Contribute

All tasks are defined in the package.json
Pull Requests are welcome, write tests whenever possible.

- `git clone git@github.com:Trecenti/tech-radar`
- `npm install`
- `npm test` - to run your tests
- `npm run build` - to build out your changes
- `npm run examples` - to generate the examples
- `npm run test:dist` - make sure uglify doesn't break stuff
