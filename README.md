A library that generates an interactive radar, inspired by [thoughtworks.com/radar](http://thoughtworks.com/radar).

## How To Use

The easiest way to use the app out of the box is to provide a *public* Google Sheet ID from which all the data will be fetched.

You can enter that ID into the input field on the 'select page' of the application, and your radar will be generated.

The select page is accessed at http://host:port/select=true e.g. http://techradar.capgemini-psdu.com/?select=true

Alternatively if accessed at http://host:port e.g. http://techradar.capgemini-psdu.com the application will default to the Google Sheet hard coded into /src/util/factory.js

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

### Sharing the sheet

* In Google sheets, go to 'File', choose 'Publish to the web...' and then click 'Publish'.
* Close the 'Publish to the web' dialog.
* Copy the URL of your editable sheet from the browser (Don't worry, this does not share the editable version). 

The URL will be similar to [https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit](https://docs.google.com/spreadsheets/d/1waDG0_W3-yNiAaUfxcZhTKvl7AUCgXwQw8mdPjCz86U/edit). In theory we are only interested in the part between '/d/' and '/edit' but you can use the whole URL if you want.

### Building the radar

Paste the URL in the input field on the select page.

That's it!

Note: the quadrants of the radar, and the order of the rings inside the radar will be drawn in the order they appear in your Google Sheet.

### More complex usage

The app uses [Tabletop.js](https://github.com/jsoma/tabletop) to fetch the data from a Google Sheet, so refer to their documentation for more advanced interaction.  The input from the Google Sheet is sanitized by whitelisting HTML tags with [sanitize-html](https://github.com/punkave/sanitize-html).

The application uses [webpack](https://webpack.github.io/) to package dependencies and minify all .js and .scss files.

### Running the application

```
git clone git@gitlab.com:PSDU/build-your-own-radar.git
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
Make sure you have nodejs installed.

## Run on AWS

Currently a manual process to configure. We will automate this at some point.

### Create a virtual machine

A t2.micro EC2 instance running AWS Linux is sufficient

### Create a security group

We recommend a Web DMZ type zone that allows HTTP/S from anywhere, SSH from your office locations and all other TCP traffic from elsewhere in the zone.

Add the EC2 instance to this group.

### Create an elastic load balancer

This is necesary for two reasons.

Firstly, as the application listens on port 8080, we need to translate traffic from the default HTTP/S ports 80/443.

Secondly, it allows us to spin up/down the EC2 instance without affecting the public IP of the service.

- Create a new Target Group pointed at the EC2 instance and port 8080 (the ELB will translate from port 80 to the port 8080 that the app runs on)
- Create a new ELB and select the Target Group you just created
- Add the ELB to your Web DMZ security group

### Prepare the EC2 instance to run your application

SSH to the machine and install Git:

`yum install git`

Create a new SSH key pair and add the public key to your GitLab account in the usual way. You should then be able to pull the project code:

`git clone git@[project URI]`

Next install NPM. See https://nodejs.org/en/download/package-manager/ for details of how to do this on AWS Linux.

### Running the application

You should now be able to run the application:

```
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
