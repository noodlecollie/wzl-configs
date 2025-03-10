#!/bin/bash

# From https://medium.com/codex/linux-backup-with-backblaze-b2-and-email-notifications-3acdb5282fa1

# Originally this script did this:
#
# export B2_ACCOUNT_ID=<your keyID here>
# export B2_ACCOUNT_KEY=<your key here>
# export RESTIC_PASSWORD=<your restic repository password here>
#
# Instead, we now source this information from a script that is not
# tracked by Git, because otherwise it'd be dumb.

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

if [[ -f "$SCRIPT_DIR/credentials_env" ]];
then
	source "$SCRIPT_DIR/credentials_env"
	command1="restic -r b2:wzl-vault:main-desktop-docs/ backup /media/vesper/Backups/ --exclude-file="$SCRIPT_DIR/restic-exclude.txt" 2>&1"
	output1=$(eval "${command1}")
	result1=$?
else
	command1=""
	output1="$SCRIPT_DIR/credentials_env does not exist"
	result1=1
fi

# The dude also used the following, but we don't need this right now.
#
# command2="restic -r b2:mybucket-desktop-backups:alfred/ backup /home/eric/repos/ 2>&1"
# output2=$(eval "${command2}")
# result2=$?

message="
----------Backup Report----------
$(date)
"

if [[ $result1 != 0 ]]; then
    message="${message}
----------------------------------------
BACKUP FAILED!! See output below.
----------------------------------------
"
    subject="Backup FAILED---$(date)"
else
    message="${message}
----------------------------------------
Backup SUCCEEDED.
----------------------------------------
"
    subject="Backup successful---$(date)"
fi

message="${message}
\$ ${command1}
${output1}
----------------------------------------
Snapshot history:
----------------------------------------
$(restic -r b2:wzl-vault:main-desktop-docs/ snapshots | tail)
"

echo "Subject: ${subject}"
echo "Message: ${message}"

echo "${message}" | mailx -s "${subject}" jonathan.poncelet@protonmail.com
