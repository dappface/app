#!/bin/bash

set -o errexit
set -o nounset
set -o xtrace

sed -i -e 's/.\/build\/Release\/scrypt/scrypt/g' ./node_modules/scrypt/index.js
rn-nodeify --install crypto,http,https,os,process,stream,vm --hack
