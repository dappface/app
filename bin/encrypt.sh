#!/bin/bash

set -o errexit
set -o nounset
set -o xtrace

for APP_ENV in dev beta prd
do
  if [[ ${APP_ENV} == 'prd' ]] ; then
    export PROJECT_NAME='dappface-prd-v2'
  elif [[ ${APP_ENV} == 'beta' ]] ; then
    export PROJECT_NAME='dappface-stg-v2'
  elif [[ ${APP_ENV} == 'dev' ]] ; then
    export PROJECT_NAME='dappface-dev'
  else
    exit 0
  fi

  ENV_FILE=env/${APP_ENV}/.env
  GOOGLE_SERVICE_IFNO_FILE=env/${APP_ENV}/GoogleService-Info.plist

  gcloud kms encrypt \
    --key=projects/${PROJECT_NAME}/locations/global/keyRings/dappface/cryptoKeys/app-env \
    --plaintext-file=${ENV_FILE} \
    --ciphertext-file=${ENV_FILE}.encrypted

  gcloud kms encrypt \
    --key=projects/${PROJECT_NAME}/locations/global/keyRings/dappface/cryptoKeys/google-service-info \
    --plaintext-file=${GOOGLE_SERVICE_IFNO_FILE} \
    --ciphertext-file=${GOOGLE_SERVICE_IFNO_FILE}.encrypted
done

