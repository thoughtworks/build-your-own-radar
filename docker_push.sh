#!/usr/bin/env bash

docker login -u $DOCKER_USER -p $DOCKER_PASS
export REPO=wwwthoughtworks/build-your-own-radar
export TAG=latest
export COMMIT=${CIRCLE_SHA1:0:8}
docker build -f Dockerfile -t $REPO:$COMMIT .
docker tag $REPO:$COMMIT $REPO:$TAG
docker push $REPO