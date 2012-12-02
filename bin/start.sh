#!/bin/sh

#Move to the folder where ep-lite is installed
cd `dirname $0`

#Was this script started in the bin folder? if yes move out
if [ -d "../bin" ]; then
  cd "../"
fi

#Stop the script if its started as root
if [ "$(id -u)" -eq 0 ]; then
   echo "You shouldn't start Etherpad-Lite as root!"
   echo "Please type 'Etherpad Lite rocks my socks' if you still want to start it as root"
   read rocks
   if [ ! $rocks = "Etherpad Lite rocks my socks" ]
   then
     echo "Your input was incorrect"
     exit 1
   fi
fi

#Install Etherpad settings files for CoHoop environment
echo "Install CoHoop Settings"
[ -f "./settings.json" ] || cp "./bin/settings.json" "./settings.json"
cp "./bin/src/package.json" "./src/package.json"

#Install Cohoop theme
echo "Install CoHoop theme"
[ -f "./src/static/custom/pad.css" ] || cp "./bin/src/custom/pad.css" "./src/static/custom/pad.css"

#prepare the environment
echo "Install Etherpad dependence"
bin/installDeps.sh $* || exit 1

#import mongodb on ueberDB
echo "Install mongodb dependence"
[ -f "./src/node_modules/ueberDB/mongodb_db.js" ] || cp "./bin/mongodb_db.js" "./src/node_modules/ueberDB/mongodb_db.js"

#Move to the node folder and start
echo "start..."

#Invoke the Forever module (to START our Node.js server).
./node_modules/forever/bin/forever \
start \
-al forever.log \
-ao out.log \
-ae err.log \
node_modules/ep_etherpad-lite/node/server.js