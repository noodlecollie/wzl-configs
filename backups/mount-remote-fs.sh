#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

if [[ -f "$SCRIPT_DIR/backblaze.env" ]];
then
	source "$SCRIPT_DIR/backblaze.env"
	mkdir -p "$SCRIPT_DIR/mount"
	restic -r "b2:wzl-vault:main-desktop-docs/" mount "$SCRIPT_DIR/mount"
else
	echo "$SCRIPT_DIR/backblaze.env does not exist"
fi
