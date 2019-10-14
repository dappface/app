#!/bin/sh

set -o errexit
set -o nounset
set -o xtrace

while test $# -gt 0; do
  case "$1" in
    --clean)
      shift

      watchman watch-del-all
      rm -rf node_modules
      (
        cd ios
        rm -rf Pods
      )

      rm -rf $TMPDIR/react-native-packager-cache-*
      rm -rf $TMPDIR/metro-bundler-cache-*
      rm -rf $TMPDIR/react*
      rm -rf $TMPDIR/metro*
      rm -rf $TMPDIR/haste-*
      ;;
    *)
      shift
      ;;
  esac
done


npm i
bundle install
(
  cd ios
  bundle exec pod install --repo-update
)
