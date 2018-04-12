#!/bin/bash

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root."
   exit 1
fi

cacheFile="/usr/share/applications/mimeinfo.cache"
cacheFileBackup="$cacheFile.backup"

if [ ! -f $cacheFile ]; then
    echo "Could not find $cacheFile"
	exit 1
fi

echo "Located $cacheFile, backing up to $cacheFileBackup"

if ! cp $cacheFile $cacheFileBackup; then
	echo "Failed to back up file."
	exit 1
fi

echo "Stripping references to Visual Studio Code..."

if ! sed -i -e 's/visual-studio-code.desktop;//g' $cacheFile; then
	echo "Failed to strip references."
	exit 1
fi

echo "Complete."
exit 0
