#!/bin/sh

echo "Waits for the database to come up"
sleep 5
dockerize -wait tcp://mysql:3306 -timeout 60m echo "Database Ready!"
npm run start
