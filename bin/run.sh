#!/bin/sh

#Move to the folder where ep-lite is installed
cd `dirname $0`

#Was this script started in the bin folder? if yes move out
if [ -d "../bin" ]; then
  cp -v "./mongodb_db.js" "./node_modules/ueberDB/mongodb_db.js"
else
  cd "bin"
  cp -v "./mongodb_db.js" "./node_modules/ueberDB/mongodb_db.js"
fi

cd "../"

#echo "Ensure that all dependencies are up to date..."
#(
#  mkdir -p node_modules
#  cd node_modules
#  [ -e ep_etherpad-lite ] || ln -s ../src ep_etherpad-lite
#  cd ep_etherpad-lite
#  npm install
#) || {
#  rm -rf node_modules
#  exit 1
#}

#Move to the node folder and start
echo "start..."
node src/node/server.js