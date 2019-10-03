#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

npm i
bundle install
(
  cd ios
  bundle exec pod install --repo-update
)
