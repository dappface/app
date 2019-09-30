#!/bin/bash

set -o errexit
set -o nounset
set -o xtrace

if [[ ${APP_ENV} == 'prd' ]] ; then
  export PROJECT_NAME='dappface-prd-v2'
elif [[ ${APP_ENV} == 'beta' ]] ; then
  export PROJECT_NAME='dappface-stg-v2'
elif [[ ${APP_ENV} == 'dev' ]] ; then
  export PROJECT_NAME='dappface-dev'
else
  exit 0
fi

gcloud kms decrypt \
  --key=projects/${PROJECT_NAME}/locations/global/keyRings/dappface/cryptoKeys/app-env \
  --plaintext-file=.env \
  --ciphertext-file=env/${APP_ENV}/.env.encrypted

gcloud kms decrypt \
  --key=projects/${PROJECT_NAME}/locations/global/keyRings/dappface/cryptoKeys/google-service-info \
  --plaintext-file=ios/GoogleService-Info.plist \
  --ciphertext-file=env/${APP_ENV}/GoogleService-Info.plist.encrypted
