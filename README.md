[![Build Status](https://snap-ci.com/thoughtworks/build-your-own-radar/branch/master/build_image)](https://snap-ci.com/thoughtworks/build-your-own-radar/branch/master)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## Demo

You can see this in action at https://radar.thoughtworks.com. If you plug in [this data](https://docs.google.com/spreadsheets/d/1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI/) you'll see [this visualization](https://radar.thoughtworks.com/?sheetId=1YXkrgV7Y6zShiPeyw4Y5_19QOfu5I6CyH5sGnbkEyiI). 

## How To Use

The easiest way to use the app out of the box is to provide a *public* Google Sheet ID from which all the data will be fetched. You can enter that ID into the input field on the first page of the application, and your radar will be generated. The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

| name          | ring   | quadrant               | isGrowth | description                                             |
|---------------|--------|------------------------|----------|---------------------------------------------------------|
| Composer      | adopt  | tools                  | TRUE     | Although the idea of dependency management ...          |
| Canary builds | trial  | techniques             | FALSE    | Many projects have external code dependencies ...       |
| Apache Kylin  | assess | platforms              | TRUE     | Apache Kylin is an open source analytics solution ...   |
| JSF           | hold   | languages & frameworks | FALSE    | We continue to see teams run into trouble using JSF ... |

### Sharing the sheet

* In Google sheets, go to 'File', choose 'Publish to the web...' and then click 'Publish'.
* Close the 'Publish to the web' dialog.
* Copy the URL of your editable sheet from the browser (Don't worry, this does not share the editable version). 

The URL will be similar to [https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit](https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit). In theory we are only interested in the part between '/d/' and '/edit' but you can use the whole URL if you want.

### Building the radar

Paste the URL in the input field on the home page.

That's it!

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your Google Sheet.

### More complex usage

To create the data representation, you can use the Google Sheet [factory](/src/util/factory.js), or you can also insert all your data straight into the code.

The app uses [Tabletop.js](https://github.com/jsoma/tabletop) to fetch the data from a Google Sheet, so refer to their documentation for more advanced interaction.  The input from the Google Sheet is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible.

- `git clone git@github.com:thoughtworks/build-your-own-radar.git`
- `npm install`
- `npm test` - to run your tests
- `npm run dev` - to run application in localhost:8080. This will watch the .js and .css files and rebuild on file changes

## Run on AWS

Currently a manual process to configure. We will automate this at some point.

- Create a new AWS Linux EC2 instance
- Select t2.micro
- If the WEB-DMZ security group exists add the instance to that, otherwise create a new one that allows HTTP/S access from anywhere, SSH from your current IP, and all traffic from within the SG itself
- If the TechRadarEC2Key exists and you have access to the private key use that, otherwise create a new key pair
- Create a new ELB Target Group
- Target the new instance and port 8080 (the ELB will translate from port 80 to the port 8080 that the app runs on)
- Create a new ELB
- Select the new Target Group you've created
- Add to the WEB-DMZ security group
- SSH to the instance e.g. `ssh ec2-user@[ip] -i TechRadarEC2Key.pem`
- Install Git
- `yum install git`
- Create a new SSH key pair and add the public key to your GitLab account in the usual way
- Pull the project
- `git clone git@[project URI]`
- Install NPM
- See https://nodejs.org/en/download/package-manager/
- cd to the project dir
- Run `npm run dev`
- Test that all works as expected via the ELB public DNS
- Kill the process
- Create an upstart job to run it as a OS service e.g. /etc/init/techradar.conf

description "techradar"

start on (runlevel [345] and started network)
stop on (runlevel [!345] and stopping network)

respawn limit 99 5

script
  cd /home/ec2-user/build-your-own-radar
  exec npm run dev >> /var/log/techradar.log 2>&1
end script

- Start and stop using upstart e.g. `sudo start techradar`

## Pulling changes to the app
- SSH to the instance e.g. `ssh ec2-user@[ip] -i TechRadarEC2Key.pem`
- Stop the service `sudo stop techradar`
- Change to the app dir `cd ~ec2-user/build-your-own-radar`
- Pull the changes `git pull`
- Start the service `sudo start techradar`
- 