#!/bin/bash
set -e

cd /src/build-your-own-radar

echo "Starting webpack build..."
npm run build:prod

echo "Copying built files to nginx directories..."
mkdir -p /opt/build-your-own-radar
cd /opt/build-your-own-radar
cp -r /src/build-your-own-radar/dist/* ./
mkdir -p files
cp /radar.csv ./files/
cp /src/build-your-own-radar/default.template /etc/nginx/conf.d/default.conf

echo "Starting nginx server..."
exec nginx -g 'daemon off;'
