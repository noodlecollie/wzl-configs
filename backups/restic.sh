#!/bin/bash

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

if [[ -f "$SCRIPT_DIR/credentials_env" ]]; then
	source "$SCRIPT_DIR/credentials_env"
else
	echo "$SCRIPT_DIR/credentials_env does not exist"
	exit 1
fi

restic -r b2:wzl-vault:main-desktop-docs/ $*
