#!/bin/sh

THISDIR=$(dirname $(readlink -f "$0"))

mariadb-dump --single-transaction --flush-logs --events --routines --master-data=2 --all-databases \
| gzip > $THISDIR/db_backup.gz
echo 'purge master logs before date_sub(now(), interval 7 day);' | mariadb
