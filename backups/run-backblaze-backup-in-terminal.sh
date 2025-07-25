SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
ENVFILE="$SCRIPT_DIR/backblaze.env"

if [[ ! -f "$ENVFILE" ]]; then
	echo "Could not find $ENVFILE"
	exit 1
fi

source "$ENVFILE"
restic -r ${RESTIC_URL} backup /media/vesper/Backups/ --exclude-file="$SCRIPT_DIR/restic-exclude.txt"
