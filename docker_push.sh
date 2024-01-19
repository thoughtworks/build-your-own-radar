#!/usr/bin/env bash

docker login -u $DOCKER_USER -p $DOCKER_PASS

export REPO=wwwthoughtworks/build-your-own-radar
export TAG=$CIRCLE_TAG

docker build -f Dockerfile -t $REPO:latest .
docker tag $REPO:latest $REPO:$TAG

docker push $REPO:latest
docker push $REPO:$TAG
