## We Are You: Tech Radar

This is a fork of the [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar).
It is modified for use within the We Are You (WAY) company for sharing knowledge to collegues and the world in a more visual way.

More information about the original ThoughtWorks radar you can find here:
https://github.com/thoughtworks/build-your-own-radar
https://www.thoughtworks.com/radar/how-to-byor

---

### Added files

```/src_way/*```
This is the location where the added WAY code is stored. Here you will find a 'scss' and 'js' setup where modifications can be done and new code added. **Please try to minimize changing the original code and (only) add changes to the codebase in this folder.**
_NOTE: Momentarily NO (S)CSS and JS from the original code is modified. The new code is compiled along with the original code and merged with Webpack. Read below for Webpack info._

```/dist```
The CSV files with radar data need to be placed in the dist folder for the app to find them.
```/dist/images, /dist/font```
Momentarily the added images and fonts are also located in the dist folder.
It seems not possible to use a relative path in the scss to the 'src-way/css' folder in the current setup, but I found out that the 'dist' folder is merged in Webpack. Due to this, using files from the 'dist' folder is as easy as: 'images/x.png'. Not the perfect implementation, but it works for now.
_NOTE/TODO: Probably this can be solved somehow with Webpack by adding/modifying a 'copy task' from the 'src-way' to 'dist' folder or adding a reference to the way src somewhere. There was no time to research this._

---

# Modified code in the ThoughtWorks project

The modifications that are made in the original project files are only in two files at the moment. The changes are mainly concentrated around the Webpack config file to minimize changes to the original ThoughtWorks files.

```webpack.config```
The webpack config is modified to merge the WAY scss and js files with the original project in the build.
_The modified lines in the config are:_
```Line 23 | const way = ["./src_way/js/base.js", "./src_way/css/base.scss"];```
Added the references to the scss and js base files.
```Line 35 | chunks: ['main', 'way'],```
Added to chunk for compiling with main code.
```Line 61 | way: way```
Added entry reference.
```Line 119 | host: "127.0.0.1",```
Changed from 0.0.0.0 to localhost.

```src/index.html```
Minor change. In this file the Favicon is commented and not shown due to this. It is not automatically loading the version from the dist folder (like with the other images). So for the quick win, for now, it is disabled.
_Could be a TODO._

---

# Building the radar

For running the app build and some more documentation, have a look at:
https://github.com/thoughtworks/build-your-own-radar
