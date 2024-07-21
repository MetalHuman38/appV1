#!/bin/bash

DATABASE="FindSomeOne"
TABLES=$(mariadb -e "SHOW TABLES FROM $DATABASE" -s --skip-column-names)

for TABLE in $TABLES; do
    echo "Optimizing table $TABLE..."
    OUTPUT=$(mariadb -e "OPTIMIZE TABLE $DATABASE.$TABLE")
    echo "$OUTPUT"
done