[![Build Status](https://travis-ci.org/thoughtworks/build-your-own-radar.svg?branch=master)](https://travis-ci.org/thoughtworks/build-your-own-radar)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Demo

You can see this in action at https://radar.thoughtworks.com. If you plug in [this data](https://docs.google.com/spreadsheets/d/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/) you'll see [this visualization](https://radar.thoughtworks.com/?sheetId=1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI). 

## How To Use

The easiest way to use the app out of the box is to provide a *public* Google Sheet ID from which all the data will be fetched. You can enter that ID into the input field on the first page of the application, and your radar will be generated. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

| name          | ring   | quadrant               | isNew | description                                             |
|---------------|--------|------------------------|-------|---------------------------------------------------------|
| Composer      | adopt  | tools                  | TRUE  | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE  | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE | We continue to see teams run into trouble using JSF ... |

### Sharing the sheet

* In Google sheets, go to 'File', choose 'Publish to the web...' and then click 'Publish'.
* Close the 'Publish to the web' dialog.
* Copy the URL of your editable sheet from the browser (Don't worry, this does not share the editable version). 

The URL will be similar to [https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit](https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit). In theory we are only interested in the part between '/d/' and '/edit' but you can use the whole URL if you want.

[Do not want to Publish your Google Sheet?](#allow-authentication)

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

Note: The CSV file parsing is using D3 library, so consult the D3 documentation for the data format details.

### Building the radar

Paste the URL in the input field on the home page.

That's it!

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your data.

### More complex usage

To create the data representation, you can use the Google Sheet [factory](/src/util/factory.js) or CSV, or you can also insert all your data straight into the code.

The app uses the [Sheets API](https://developers.google.com/sheets/api/quickstart/js) to fetch the data from a Google Sheet or [D3.js](https://d3js.org/) if supplied as CSV, so refer to their documentation for more advanced interaction.  The input data is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

## Docker Image
We have released BYOR as a docker image for our users. The image is available in our [DockerHub Repo](https://hub.docker.com/r/wwwthoughtworks/build-your-own-radar/). To pull and run the image, run the following commands.

```
$ docker pull wwwthoughtworks/build-your-own-radar
$ docker run --rm -p 8080:80 -e SERVER_NAMES="localhost 127.0.0.1" wwwthoughtworks/build-your-own-radar
$ open http://localhost:8080
```

## Allow Authentication

This radar can be run with [Google OAuth 2.0](https://developers.google.com/identity/protocols/OAuth2) access. This feature is useful, when you do not want to make your Google Sheet public, or if you have an intranet-"Google Drive"-solution. Users, which are allowed to view the referenced Google Sheet, can also view the radar. This feature can be configured by using the following environment variables

| Variable           | Type    | Description                                                                                     |
|--------------------|---------|-------------------------------------------------------------------------------------------------|
| USE_AUTHENTICATION | Boolean | If the user must be authenticated using Google OAuth 2.0 in order to view the site                  |
| API_KEY            | String  | The API Key for the Google OAuth 2.0 Authentication. Gets ignored if USE_AUTHENTICATION=false   |
| CLIENT_ID          | String  | The Client ID for the Google OAuth 2.0 Authentication. Gets ignored if USE_AUTHENTICATION=false |
| ENV_FILE           | String  | The path to the .env-File which have the above environment variables configured                 |

If you prefer an environment file, copy the `template.env` file of this repository, and change the values.

### Get the CLIENT_ID and API_KEY from Google

[Google: Authorizing requests with OAuth 2.0](https://developers.google.com/sheets/api/guides/authorizing#OAuth2Authorizing).
The radar will use the scope `spreadsheets.readonly`.

### Docker

The environment variables must be set during building. They can not be altered when the docker image is already built

```bash
docker build --build-arg ENV_FILE=./template.env -t build-your-own-radar .
# or use --build-arg USE_AUTHENTICATION=true --build-arg CLIENT_ID=<ID> --build-arg API_KEY=<KEY>
# in case you do not want to use an environment file
docker run --rm -p 8080:80 -e SERVER_NAMES="localhost 127.0.0.1" build-your-own-radar
```

### Developing

When you want to change settings while developing, you can use environment variables.

```bash
USE_AUTHENTICATION=true API_KEY=<KEY> CLIENT_ID=<ID> npm run dev
```

or give your environment file as parameter

```bash
npm run dev -- --env-file ./template.env
```

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible.
Make sure you have nodejs installed.

- `git clone git@github.com:thoughtworks/build-your-own-radar.git`
- `npm install`
- `npm test` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:7.3.0 /bin/sh -c 'npm install && npm run dev'

After building it will start on localhost:8080
