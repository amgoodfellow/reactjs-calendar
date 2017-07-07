#!bin/bash
echo "Starting init script (⌒▽⌒)"
if hash psql 2>/dev/null; then
    if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw "courses"; then
        echo "Looks like the database already exists.\n Time to drop some tables (╯°□°）╯︵ ┻━┻"
        psql -U coursesuser -d courses -W < drop.sql
    else
        echo "Creating database 'courses' with owner 'coursesuser'"
        psql -U postgres -c "CREATE user coursesuser with password 'courses'"
        psql -U postgres -c "CREATE DATABASE courses WITH ENCODING 'UTF8' owner coursesuser" 
    fi
else
    echo "You don't have postgresql on your system. See README for manual setup"
    exit 1
fi

if hash go 2>/dev/null; then
    echo "running main.go"
    timeout 2s go run main.go 
    echo "Running sql.sql file for courses database\n Password is: 'courses'"
    printf 'courses' | psql -U coursesuser -d courses -W < sql.sql
    echo "\n\nInit completed succesfully. Try 'go run main.go' and 'yarn start' to begin testing"
else
    echo "You need to install go on your machine\nhttps://golang.org/dl/"
    exit 1
fi