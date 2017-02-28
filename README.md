[![Build Status](https://travis-ci.org/capgemini-psdu/build-your-own-radar.svg?branch=master)](https://travis-ci.org/capgemini-psdu/build-your-own-radar)

A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## How To Use

The easiest way to use the app out of the box is to provide a *public* (can be read-only) Google Sheet ID from which all the data will be fetched.

The data must conform to the format below for the radar to be generated correctly.

### Setting up your data

You need to make your data public in a form we can digest.

Create a Google Sheet. Give it at least the below column headers, and put in the content that you want:

| name          | ring       | quadrant               | skills   | description                                             |
|---------------|------------|------------------------|----------|---------------------------------------------------------|
| Composer      | adopt      | tools                  | good     | Although the idea of dependency management ...          |
| Canary builds | deprecate  | techniques             | poor     | Many projects have external code dependencies ...       |
| Apache Kylin  | core       | platforms              | average  | Apache Kylin is an open source analytics solution ...   |
| JSF           | evaluate   | languages & frameworks | poor     | We continue to see teams run into trouble using JSF ... |

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your Google Sheet.

### Sharing the sheet

* In Google sheets, go to 'File', choose 'Publish to the web...' and then click 'Publish'.
* Close the 'Publish to the web' dialog.
* Copy the URL of your editable sheet from the browser (Don't worry, this does not share the editable version). 

The URL will be similar to [https://docs.google.com/spreadsheets/d/1_RAVpdvXinxgqxC_vwY4JtHC2NSiXuP38u-33Hffukw/edit](https://docs.google.com/spreadsheets/d/1_RAVpdvXinxgqxC_vwY4JtHC2NSiXuP38u-33Hffukw/edit).

### Configuring the radar to use your sheet

The easiest way to use the radar is to hard code the Google Sheet link in /src/util/factory.js

Then when you run the radar and access it at e.g. http://techradar.capgemini-psdu.com the application will use that default.

Alternatively there is a 'select page' that allows you to specify an alternative sheet by entering the link via the radar's UI. That page is accessed at e.g. http://techradar.capgemini-psdu.com?select=true

### More complex sheet interaction

The app uses [Tabletop.js](https://github.com/jsoma/tabletop) to fetch the data from a Google Sheet, so refer to their documentation for more advanced interaction.  The input from the Google Sheet is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

### Running the application

```
git clone git@github.com:capgemini-psdu/build-your-own-radar.git
npm install
npm test
npm run dev
```

The application will listen on localhost:8080. This will also watch the .js and .css files and rebuild on file changes.

### Don't want to install node? Run with one line docker

     $ docker run -p 8080:8080 -v $PWD:/app -w /app -it node:7.3.0 /bin/sh -c 'npm install && npm run dev'

## Contribute

All tasks are defined in `package.json`.

Pull requests are welcome; please write tests whenever possible.

## Run on AWS

This section describes to manual process to set this up. We will automate this process at some point.

### Set up the necessary AWS infra

#### Create a virtual machine

A t2.micro EC2 instance running AWS Linux is sufficient.

#### Create a security group

We recommend a Web DMZ type zone that allows HTTP/S from anywhere, SSH from your office locations and all other TCP traffic from elsewhere in the zone.

Add the EC2 instance to this group.

#### Create an elastic load balancer

This is necesary for two reasons.

Firstly, as the application listens on port 8080, we need to translate traffic from the default HTTP/S ports 80/443.

Secondly, it allows us to spin up/down the EC2 instance without affecting the public IP of the service.

- Create a new Target Group pointed at the EC2 instance and port 8080 (the ELB will translate from port 80 to the port 8080 that the app runs on)
- Create a new ELB and select the Target Group you just created
- Add the ELB to your Web DMZ security group

#### Prepare the EC2 instance to run your application

We need to install git and npm.

SSH to the machine and install git:

`yum install git`

Create a new SSH key pair and add the public key to your GitHub account in the usual way.

Next install npm. See https://nodejs.org/en/download/package-manager/ for details of how to do this on AWS Linux.

### Deploying the application

You should now be able to pull the project code and run the application:

```
git clone git@github.com:capgemini-psdu/build-your-own-radar.git
cd build-your-own-radar
npm install
npm run dev
```

Test that all works as expected via the ELB public DNS

### Installing the application as an OS service

We recommend that you configure the application to run via upstart so that it automatically restarts after e.g. the EC2 instance is rebooted.

Create the upstart job configuration:

`sudo vi /etc/init/techradar.conf`

Example contents for this file are supplied below:

```
description "techradar"

start on (runlevel [345] and started network)
stop on (runlevel [!345] and stopping network)

respawn limit 99 5

script
  cd /home/ec2-user/build-your-own-radar
  exec npm run dev >> /var/log/techradar.log 2>&1
end script
```

You should then be able to start and stop the application using upstart e.g.:

```
sudo start techradar
sudo stop techradar
sudo restart techradar
```
