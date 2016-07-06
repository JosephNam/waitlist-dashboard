#!/usr/bin/env bash
set -eu
mkdir -p app/client

BABEL_ENV=production browserify -v -t [ babelify --presets [es2015 react] ] ./client/src/*.js -o ./client/bundle.js
rsync --delete -qaP client/ app/client/
rsync --delete -qaP server/ app/server/
