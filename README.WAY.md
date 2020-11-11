# We are you: Tech Radar

This is a fork of the [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar).  
It is modified for use within the We Are You (WAY) company for sharing knowledge to collegues and the world in a more visual way.

More information about the original ThoughtWorks radar you can find here:  
https://github.com/thoughtworks/build-your-own-radar  
https://www.thoughtworks.com/radar/how-to-byor

---
### Locations
External url: https://techradar.weareyou.com/<br>
Internal url: https://techradar.weareyou.com/internal<br>
Build pipeline: https://dev.azure.com/weareyou/WAY/_build?definitionId=193<br>
Release pipeline: https://dev.azure.com/weareyou/WAY/_releaseDefinition?definitionId=1&_a=environments-editor-preview <br>
Drop location: \\sharedweb01.boolhosting.tld\d$\Website\techradar

### Maintaining the content
In the /dist folder you find a csv file calles technonlogy radar - we are you.csv. Here the content of the radar is specified.
Unfortunatelly the system is quite sensitive. Please remind to:
1. There has to be at least 1 blip in 4 rings. if not, generation fails
2. Rings and quadrants are case sensitive. There can be no more and no lees that 4 different rings and 4 different quadrants. If you make a typo (also casing), generation will fail.
3. The order of appearance determines the order of the rings from inside to outside

The added column "exposure" determines if a blip is shown in the internal or external tech radar.
If value = all, the blip is show in both
If value = no, the blip is not show in eithe
If vale = internal of external, you get the drill...

The added column "order" can be used to order the records of the csv. The record order in the csv determines the order in the tech radar, so use this column in combination with Excel sort function to get the record-order straight. 

### Added files

```
/src_way/*
```

This is the location where the added WAY code is stored. Here you will find a 'scss' and 'js' setup where modifications can be done and new code added.  
**Please try to minimize changing the original code and (only) add changes to the codebase in this folder.**  
_NOTE: Momentarily NO (S)CSS and JS from the original code is modified. The new code is compiled along with the original code and merged with Webpack. Read below for Webpack info._

```
/dist
```

The CSV file with radar data need to be placed in the dist folder for the app to find them.

```
/dist/images, /dist/font
```

Momentarily the added images and fonts are also located in the dist folder.  
It seems not possible to use a relative path in the scss to the 'src-way/css' folder in the current setup, but I found out that the 'dist' folder is merged in Webpack. Due to this, using files from the 'dist' folder is as easy as: 'images/x.png'. Not the perfect implementation, but it works for now.  
_NOTE/TODO: Probably this can be solved somehow with Webpack by adding/modifying a 'copy task' from the 'src-way' to 'dist' folder or adding a reference to the way src somewhere. There was no time to research this._

---

# Modified code in the ThoughtWorks project

The modifications that are made in the original project files are only in two files at the moment. The changes are mainly concentrated around the Webpack config file to minimize changes to the original ThoughtWorks files.

#### webpack.config

The webpack config is modified to merge the WAY scss and js files with the original project in the build.  
_The modified lines in the config are:_

```
Line 23 | const way = ["./src_way/js/base.js", "./src_way/css/base.scss"];
```

Added the references to the scss and js base files.

```
Line 35 | chunks: ['main', 'way'],
```

Added to chunk for compiling with main code.

```
Line 61 | way: way
```

Added entry reference.

```
Line 119 | host: "127.0.0.1",
```

Changed from 0.0.0.0 to localhost.

#### src/index.html

Minor change. In this file the Favicon is commented and not shown due to this. It is not automatically loading the version from the dist folder (like with the other images). So for the quick win, for now, it is disabled.  
_Could be a TODO._

---

# Building the radar

For running the app build and some more documentation, have a look at:  
https://github.com/thoughtworks/build-your-own-radar
