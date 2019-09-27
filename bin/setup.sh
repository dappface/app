#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

GOOGLE_CLOUD_SDK_VERSION='264.0.0'

if "${IS_MACOS:-false}" ; then
  brew install imagemagick

  curl -O "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
  tar -xzf "./google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
  ./google-cloud-sdk/install.sh
  gcloud auth activate-service-account --key-file
  echo "$GOOGLE_CLOUD_KEY" | base64 --decode > "$HOME"/google-cloud-key.json
  gcloud auth activate-service-account --key-file=$HOME/google-cloud-key.json
  gcloud kms -h
fi

# npm i
# bundle install
# bundle exec pod repo update
# (
#   cd ios
#   bundle exec pod install
# )
