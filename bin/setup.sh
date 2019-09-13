#!/bin/bash

set -o errexit
set -o nounset
set -o xtrace

npm i
bundle install
(
  cd ios
  pod install
)
