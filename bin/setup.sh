#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

GOOGLE_CLOUD_SDK_VERSION='264.0.0'

if [ "${GITHUB_WORKFLOW:-}" == 'CI' ]; then
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  brew install imagemagick

  curl -O "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
  tar -xzf "./google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
  ./google-cloud-sdk/install.sh

  # Authenticate with gcloud
fi

npm i
bundle install
bundle exec pod repo update
(
  cd ios
  bundle exec pod install
)
