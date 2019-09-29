#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

npm i
bundle install
bundle exec pod repo update
(
  cd ios
  bundle exec pod install
)
