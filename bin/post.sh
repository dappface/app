#!/bin/bash

set -o errexit
set -o nounset
set -o xtrace

npm run hack

# https://github.com/facebook/metro/issues/287#issuecomment-444177106
node bin/stfu.js

if [ -v CIRCLECI ] ; then
  echo "Skip installing Fastlane dependencies"
  echo "Skip installing iOS native dependencies"
else
  echo "Installing Fastlane dependencies"
  bundle install

  echo "Installing iOS native dependencies"
  (
    cd ios
    rm -rf Pods
    pod install
  )
fi
