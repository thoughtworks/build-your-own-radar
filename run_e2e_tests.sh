#!/bin/bash

TEST_URL=$1
TEST_ENV=$2

if [[ $TEST_ENV == "production" ]]; then
  npm run dev:old-ui &
else
  npm run dev &
fi

sleep 30
TEST_URL=$TEST_URL TEST_ENV=$TEST_ENV npm run test:e2e
