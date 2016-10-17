[![Build Status](https://snap-ci.com/thoughtworks/build-your-own-radar/branch/master/build_image)](https://snap-ci.com/thoughtworks/build-your-own-radar/branch/master)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar/](http://thoughtworks.com/radar/).

## How To Use

The easiest way to use the app out of the box is to provide a *public* google sheet id from which all the data will be fetched. You can enter that id into the input field on the first page of the application, and your radar will be generated. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

    name 		ring	quadrant                isNew	description
	Composer		adopt	tools					        TRUE	Although the idea of dependency management ...
	Canary builds	trial	techniques				        FALSE	Many projects have external code dependencies ...
	Apache Kylin	assess	platforms				        TRUE	Apache Kylin is an open source analytics solution ...
	JSF		hold	languages & frameworks  FALSE	We continue to see teams run into trouble using JSF ...

In Google Docs, go up to the `File` menu and pick `Publish to the web`. Fiddle with whatever you want, then click `Start publishing`. A URL will appear, something like `https://docs.google.com/spreadsheets/d/1--_uLSNfiD19i8rAcF_f3qlgZGk2lzSS3bbSrypcx4Y/pubhtml`.

Copy that! In theory you're interested only in the part between `/d/` and `/pubhtml` but you can use the whole url if you want.

Paste the url in the input field on the main page.

That's it!

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your google sheet.

### More complex usage

Application is using [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

To create the data representation, you can use the google sheet data factory, or you can also insert all your data straight into the code.

The app uses [Tabletop](https://github.com/jsoma/tabletop) to fetch the data from a google sheet, so refer to their documentation for more advanced google sheet interaction.

The input from the google sheet is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

If you want to understand how it's wired and make it your own, check the file `examples/index.html` for general usage.

## Contribute

All tasks are defined in the package.json.
Pull Requests are welcome, write tests whenever possible.

- `git clone git@github.com:thoughtworks/build-your-own-radar.git`
- `npm install`
- `npm test` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes
