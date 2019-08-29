#!/bin/bash

set -o errexit
set -o nounset
set -o xtrace

watchman watch-del-all
rm -rf node_modules

rm -rf $TMPDIR/react-native-packager-cache-* 
rm -rf $TMPDIR/metro-bundler-cache-*
rm -rf $TMPDIR/react*
rm -rf $TMPDIR/metro*
rm -rf $TMPDIR/haste-*

npm i
