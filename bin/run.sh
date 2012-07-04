#!/bin/sh

#Move to the folder where ep-lite is installed
cd `dirname $0`

#Was this script started in the bin folder? if yes move out
if [ -d "../bin" ]; then
  cd "../"
fi

echo "Ensure that all dependencies are up to date..."
(
  mkdir -p node_modules
  cd node_modules
  [ -e ep_etherpad-lite ] || ln -s ../src ep_etherpad-lite
  cd ep_etherpad-lite
  npm install
) || {
  rm -rf node_modules
  exit 1
}

cd "bin"
cp -v "./mongodb_db.js" "../src/node_modules/ueberDB/mongodb_db.js"
cd "../"

#Move to the node folder and start
echo "start..."
node node_modules/ep_etherpad-lite/node/server.js $*