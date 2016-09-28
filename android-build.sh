#!/bin/bash

ZIPALIGN=$ANDROID_HOME/build-tools/24.0.1/zipalign
BUILDAPK=./snakeTracker/platforms/android/build/outputs/apk/android-release-unsigned.apk
# build
cd ./snakeTracker
cordova build --release android
cd ..

#jarsign
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore snekTrakr.keystore $BUILDAPK snekTrakr

#zipalign
$ZIPALIGN -v 4 $BUILDAPK snekTrakr2.apk
