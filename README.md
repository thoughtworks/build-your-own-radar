[![Thoughtworks](https://circleci.com/gh/thoughtworks/build-your-own-radar.svg?style=shield)](https://circleci.com/gh/thoughtworks/build-your-own-radar)
[![Stars](https://badgen.net/github/stars/thoughtworks/build-your-own-radar)](https://github.com/thoughtworks/build-your-own-radar)
[![dependencies Status](https://david-dm.org/thoughtworks/build-your-own-radar/status.svg)](https://david-dm.org/thoughtworks/build-your-own-radar)
[![devDependencies Status](https://david-dm.org/thoughtworks/build-your-own-radar/dev-status.svg)](https://david-dm.org/thoughtworks/build-your-own-radar?type=dev)
[![peerDependencies Status](https://david-dm.org/thoughtworks/build-your-own-radar/peer-status.svg)](https://david-dm.org/thoughtworks/build-your-own-radar?type=peer)
[![Docker Hub Pulls](https://img.shields.io/docker/pulls/wwwthoughtworks/build-your-own-radar.svg)](https://hub.docker.com/r/wwwthoughtworks/build-your-own-radar)
[![GitHub contributors](https://badgen.net/github/contributors/thoughtworks/build-your-own-radar?color=cyan)](https://github.com/thoughtworks/build-your-own-radar/graphs/contributors)
[![Prettier-Standard Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/sheerun/prettier-standard)
[![AGPL License](https://badgen.net/github/license/thoughtworks/build-your-own-radar)](https://github.com/thoughtworks/build-your-own-radar)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Demo

You can see this in action at https://radar.thoughtworks.com. If you plug in [this data](https://docs.google.com/spreadsheets/d/18A7oDuavlh89rAmqcaXpqle8QLqIvlAkoEUxcObzuUM/edit#gid=1985253373) you'll see [this visualization](https://radar.thoughtworks.com/?sheetId=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fd%2F18A7oDuavlh89rAmqcaXpqle8QLqIvlAkoEUxcObzuUM%2Fedit%23gid%3D1985253373).

## How To Use

The easiest way to use the app out of the box is to provide a _public_ Google Sheet ID from which all the data will be fetched. You can enter that ID into the input field, sign in to Google using the prompt and your radar will be generated. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

| name          | ring   | quadrant               | isNew | description                                             |
| ------------- | ------ | ---------------------- | ----- | ------------------------------------------------------- |
| Composer      | adopt  | tools                  | TRUE  | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE  | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE | We continue to see teams run into trouble using JSF ... |

### Sharing the sheet

- In Google sheets, go to 'File', choose 'Publish to the web...' and then click 'Publish'.
- Close the 'Publish to the web' dialog.
- Copy the URL of your editable sheet from the browser (Don't worry, this does not share the editable version).

The URL will be similar to [https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit](https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit). In theory we are only interested in the part between '/d/' and '/edit' but you can use the whole URL if you want.

### Using CSV data

The other way to provide your data is using CSV document format.
You can enter any URL that responds CSV data into the input field on the first page.
The format is just the same as that of the Google Sheet, the example is as follows:

```
name,ring,quadrant,isNew,description
Composer,adopt,tools,TRUE,"Although the idea of dependency management ..."
Canary builds,trial,techniques,FALSE,"Many projects have external code dependencies ..."
Apache Kylin,assess,platforms,TRUE,"Apache Kylin is an open source analytics solution ..."
JSF,hold,languages & frameworks,FALSE,"We continue to see teams run into trouble using JSF ..."
```

**_Note:_** The CSV file parsing is using D3 library, so consult the [D3 documentation](https://github.com/d3/d3-request/blob/master/README.md#csv) for the data format details.

### Using JSON data

Another other way to provide your data is using a JSON array.
You can enter any URL that responds JSON data into the input field on the first page.
The format of the JSON is an array of objects with the the fields: `name`, `ring`, `quadrant`, `isNew`, and `description`.

An example:

```json
[
  {
    "name": "Composer",
    "ring": "adopt",
    "quadrant": "tools",
    "isNew": "TRUE",
    "description": "Although the idea of dependency management ..."
  },
  {
    "name": "Canary builds",
    "ring": "trial",
    "quadrant": "techniques",
    "isNew": "FALSE",
    "description": "Many projects have external code dependencies ..."
  },
  {
    "name": "Apache Kylin",
    "ring": "assess",
    "quadrant": "platforms",
    "isNew": "TRUE",
    "description": "Apache Kylin is an open source analytics solution ..."
  },
  {
    "name": "JSF",
    "ring": "hold",
    "quadrant": "languages & frameworks",
    "isNew": "FALSE",
    "description": "We continue to see teams run into trouble using JSF ..."
  }
]
```

**_Note:_** The JSON file parsing is using D3 library, so consult the [D3 documentation](https://github.com/d3/d3-request/blob/master/README.md#json) for the data format details.

### Building the radar

Paste the URL in the input field on the home page.

That's it!

**_Note:_** The quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your data.

Check [this page](https://www.thoughtworks.com/radar/how-to-byor) for step by step guidance.

### More complex usage

To create the data representation, you can use the Google Sheet [factory](/src/util/factory.js) or CSV, or you can also insert all your data straight into the code.

The app uses [Google Sheets APIs](https://developers.google.com/sheets/api/reference/rest) to fetch the data from a Google Sheet or [D3.js](https://d3js.org/) if supplied as CSV, so refer to their documentation for more advanced interaction. The input data is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

By default, there is no distinction between both public and private Google Sheets as we now require authentication from Google (using OAuth Client ID and optionally, API Key), per Google's updated documentation. OAuth Client ID and API Key can be obtained from your Google developer console.

```
export CLIENT_ID=[Google Client ID]
```

Optionally, API Key can be set to bypass Google Authentication for public sheets.

```
export API_KEY=[Google API Key]
```

To enable Google Tag Manager, add the following environment variable.

```
export GTM_ID=[GTM ID]
```

## Docker Image

We have released BYOR as a docker image for our users. The image is available in our [DockerHub Repo](https://hub.docker.com/r/wwwthoughtworks/build-your-own-radar/). To pull and run the image, run the following commands.

```
$ docker pull wwwthoughtworks/build-your-own-radar
$ docker run --rm -p 8080:80 -e CLIENT_ID="[Google Client ID]" wwwthoughtworks/build-your-own-radar
$ open http://localhost:8080
```

### Advanced option - Docker image with a csv/json file from the host machine

You can check your setup by clicking on "Build my radar" and by loading the `csv`/`json` file from these locations:

- http://localhost:8080/files/radar.csv
- http://localhost:8080/files/radar.json

```
$ docker pull wwwthoughtworks/build-your-own-radar
$ docker run --rm -p 8080:80 -e SERVER_NAMES="localhost 127.0.0.1" -v /mnt/radar/files/:/opt/build-your-own-radar/files wwwthoughtworks/build-your-own-radar
$ open http://localhost:8080
```

This will:

- Spawn a server that will listen locally on port 8080.
- Mount the host volume on `/mnt/radar/files/` into the container on `/opt/build-your-own-radar/files/`.
- Open http://localhost:8080 and for the URL enter: http://localhost:8080/files/${NAME_OF_YOUR_FILE}.${EXTENSION_OF_YOUR_FILE[csv/json]}. It needs to be a csv/json file.

You can now work locally on your machine, updating the csv/json file and render the result back on your browser.
There is a sample csv and json file placed in `spec/end_to_end_tests/resources/localfiles/` for reference.

**_Note:_**

- If API Key is also available, same can be provided to the `docker run` command as `-e API_KEY=[Google API Key]`.
- For setting the `publicPath` in the webpack config while using this image, the path can be passed as an environment variable called `ASSET_PATH`.

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible.
Make sure you have nodejs installed.

- `git clone git@github.com:thoughtworks/build-your-own-radar.git`
- `npm install`
- `npm run quality` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

## End to End Tests

To run End to End tests in headless mode

- add a new environment variable 'TEST_URL' and set it to 'http://localhost:8080/'
- add a new environment variable 'TEST_ENV' and set it to 'development' or 'production'
- `npm run test:e2e`

To run End to End tests in debug mode

- add a new environment variable 'TEST_URL' and set it to 'http://localhost:8080/'
- add a new environment variable 'TEST_ENV' and set it to 'development' or 'production'
- `npm run start`
- Click on 'Run all specs' in cypress window

**_Note:_** Currently, end to end tests are not working, as the flow requires Google login via prompt, which Cypress does not support. We are working to find some alternative solution for this.

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:10.15.3 /bin/sh -c 'npm install && npm run dev'

**_Note:_** If you are facing Node-sass compile error while running, please prefix the command `npm rebuild node-sass` before `npm run dev`. like this

```
npm install && npm rebuild node-sass && npm run dev
```

After building it will start on `localhost:8080`
