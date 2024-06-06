# build-your-own-radar

This project is forked from the [upstream Thoughtworks project](https://github.com/thoughtworks/build-your-own-radar) and constitutes Fetch's own Tech Radar.

## Running Locally

When running locally, it is relatively easy to build and run the application as it would be in production.  Then, you can simply update the radar in `./radars` and refresh to see the updates.  There's probably a better way using webpack, but my Javascript chops aren't up to snuff after all these years...

### Build

```bash
docker build -t tech-radar:latest .
```

### Run

```bash
docker run -it -p 8080:80 --mount type=bind,source=$(pwd)/radars/,target=/opt/build-your-own-radar/files/ tech-radar:latest
```

### Access

To access the locally-running radar, visit [this link](http://localhost:8080/?documentId=http%3A%2F%2Flocalhost%3A8080%2Ffiles%2Ffetch_radar.json).

## Adding a Radar

To add a radar, simply add another file to the `radars` folder and it will be deployed alongside the others!