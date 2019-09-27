#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

GOOGLE_CLOUD_SDK_VERSION='264.0.0'

echo "$GITHUB_ACTIONS"
echo "$GITHUB_ACTION"
echo "$GITHUB_WORKFLOW"
echo "$GITHUB_JOB"
pwd
ls -la $GITHUB_WORKSPACE

# if [ "${GITHUB_ACTIONS:-}" != 'build-ios' ]; then
#   brew install imagemagick

#   curl -O "https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
#   tar -xzf "./google-cloud-sdk-$GOOGLE_CLOUD_SDK_VERSION-darwin-x86_64.tar.gz"
#   ./google-cloud-sdk/install.sh
#   ./google-cloud-sdk/bin/gcloud init
#   gcloud kms -h

#   # Authenticate with gcloud
# fi

# npm i
# bundle install
# bundle exec pod repo update
# (
#   cd ios
#   bundle exec pod install
# )
