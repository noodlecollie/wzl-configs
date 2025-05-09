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

run-backup()
{
	echo "Backup for ${credentialsFile} has started---$(date)" | mailx -s "${subject}" ${EMAIL_ADDRESS}

	local credentialsFile="$1"

	if [[ -f "$SCRIPT_DIR/${credentialsFile}" ]];
	then
		source "$SCRIPT_DIR/${credentialsFile}"
		command1="restic -r ${RESTIC_URL} backup /media/vesper/Backups/ --exclude-file="$SCRIPT_DIR/restic-exclude.txt" 2>&1"
		output1=$(eval "${command1}")
		result1=$?
	else
		command1=""
		output1="$SCRIPT_DIR/${credentialsFile} does not exist"
		result1=1
	fi

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
		subject="${credentialsFile} Backup FAILED---$(date)"
	else
		message="${message}
	----------------------------------------
	Backup SUCCEEDED.
	----------------------------------------
	"
		subject="${credentialsFile} Backup successful---$(date)"
	fi

	message="${message}
	\$ ${command1}
	${output1}
	----------------------------------------
	Snapshot history:
	----------------------------------------
	$(restic -r ${RESTIC_URL} snapshots | tail)
	"

	echo "Subject: ${subject}"
	echo "Message: ${message}"

	echo "${message}" | mailx -s "${subject}" ${EMAIL_ADDRESS}
}

run-backup "backblaze.env"

# TODO: Get this set up with SSH keys. I'm ill and CBA right now.
# run-backup "nas.env"
