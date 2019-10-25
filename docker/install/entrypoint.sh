#!/bin/sh

echo Copying node_modules to host...
cp -r /usr/cache/node_modules/. /usr/app/node_modules/
echo Done copying node_modules