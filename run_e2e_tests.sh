#!/bin/bash

API_KEY=$1
CLIENT_ID=$2
TEST_URL=$3

API_KEY=$API_KEY CLIENT_ID=$CLIENT_ID npm run dev &
sleep 30
TEST_URL=$TEST_URL npm run test:e2e
