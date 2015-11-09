A library that generates an interactive radar, inspired by [thoughtworks.com/radar/](http://thoughtworks.com/radar/).

[This example](https://thenano.github.io/tech-radar/?sheetId=1--_uLSNfiD19i8rAcF_f3qlgZGk2lzSS3bbSrypcx4Y) uses a google sheet as the source of data, and can also generate any radar from any sheet (given that it conforms to the format, see below) by accessing [the root](https://thenano.github.io/tech-radar/) of the example and providing your own *public* google sheet id.

## How To Use

The easiest way to use the app out of the box is to provide a *public* google sheet id from which all the data will be fetched. You can then enter that id into the input field, and your radar will be generated. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

The first step is to get your data out into a form we can digest

Take a Google Spreadsheet. Give it at least these column headers, and put in the content that you want

    Name 			cycle	quadrant				isNew	description
	Composer		adopt	tools					TRUE	Although the idea of dependency management ...
	Canary builds	trial	techniques				FALSE	Many projects have external code dependencies ...
	Apache Kylin	assess	platforms				TRUE	Apache Kylin is an open source analytics solution ...
	JSF				hold	languages & frameworks	FALSE	We continue to see teams run into trouble using JSF ...

In Google Docs, then go up to the `File` menu and pick `Publish to the web`. Fiddle with whatever you want, then click `Start publishing`. A URL will appear, something like `https://docs.google.com/spreadsheets/d/1--_uLSNfiD19i8rAcF_f3qlgZGk2lzSS3bbSrypcx4Y/pubhtml`

Copy that! In theory you're interested in the part between `/d/` and `/pubhtml` but you can use the whole thing if you want.

That's it! You can now use that ID with the example provided.

### More complex usage

Dependencies and code are all packaged together and minified in the `tech-radar.min.js` file.

To create the data representation, you can use the google sheet data factory, and you can also insert all your data straight into the code.

The app uses [Tabletop](https://github.com/jsoma/tabletop) to fetch the data from a google sheet, so refer to their documentation for google sheet interaction.

If you want to understand the how it's wired and make it your own, check the file `examples/index.html` for general usage.

## Contribute

All tasks are defined in the package.json
Pull Requests are welcome, write tests whenever possible (I actually haven't yet, so tests are broken - I accept pull request with fixes too!).

- `git clone git@github.com:thenano/tech-radar`
- `npm install`
- `npm test` - to run your tests
- `npm run build` - to build out your changes
- `npm run examples` - to generate the examples
- `npm run test:dist` - make sure uglify doesn't break stuff
