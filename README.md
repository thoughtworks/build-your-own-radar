A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Demo

You can see this in action at https://radar.thoughtworks.com. If you plug in [this data](https://docs.google.com/spreadsheets/d/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/) you'll see [this visualization](https://radar.thoughtworks.com/?sheetId=1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI). 

## How To Use

<<<<<<< HEAD
There are two options for sourcing your data for the app out of the box.
The first is to provide a *public* Google Sheet ID from which all the data will be fetched. You can enter that ID into the input field on the first page of the application, and your radar will be generated. The data must conform to the format below for the radar to be generated correctly.

The second option is to provide a data.csv file with your radar data.  The data must conform to the format below for the radar to be generated correctly. 
=======
The easiest way to use the app out of the box is to update the data.csv file with your radar data.  The data must conform to the format below for the radar to be generated correctly.
>>>>>>> 597dc3403fcdd35fd9a720ae99d833273d26827a

## Setting up your data

In the data.csv file (src/resources/data) give it at least the below column headers, and put in the content that you want:

<<<<<<< HEAD
If using the Google Sheet option, create a Google Sheet. Give it at least the below column headers, and put in the content below that you want
If using the local data file, create a data.csv file (src/resources/data) give it at least the below column headers.
=======
>>>>>>> 597dc3403fcdd35fd9a720ae99d833273d26827a

| name          | ring   | quadrant               | isNew | description                                             |
|---------------|--------|------------------------|-------|---------------------------------------------------------|
| Composer      | adopt  | tools                  | TRUE  | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE  | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE | We continue to see teams run into trouble using JSF ... |


## Building the radar

Paste the URL in the input field on the home page.

That's it!

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your csv file

The application uses webpack to package dependencies and minify all .js and .scss files.

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
