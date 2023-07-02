#!/bin/bash

TEST_URL=$1

npm run dev &

sleep 30
TEST_URL=$TEST_URL npm run test:e2e-headless
