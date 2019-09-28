#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

GOOGLE_CLOUD_SDK_VERSION='264.0.0'

if "${IS_MACOS:-false}" ; then
  brew install imagemagick

  curl -O "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
  tar -xzf "./google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
  CLOUDSDK_CORE_DISABLE_PROMPTS=1 ./google-cloud-sdk/install.sh

  source ./google-cloud-sdk/completion.bash.inc
  source ./google-cloud-sdk/path.bash.inc

  echo "$GOOGLE_CLOUD_KEY" | base64 --decode > "$HOME"/google-cloud-key.json
  gcloud auth activate-service-account --key-file="$HOME"/google-cloud-key.json
fi

npm i
bundle install
bundle exec pod repo update
(
  cd ios
  bundle exec pod install
)
