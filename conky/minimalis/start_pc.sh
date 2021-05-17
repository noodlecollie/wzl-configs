#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "$(readlink -f "${BASH_SOURCE[0]}")" )" &> /dev/null && pwd )"

# These things don't die easily, and for some reason KDE refuses to
# kill them off properly even if this command is run on logout, so
# I'm putting it here to kill off any residual processes before
# starting new ones.
killall conky

sleep 10
conky -c "$SCRIPT_DIR/conky_right_pc.conf" &
