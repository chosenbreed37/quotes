#!/bin/bash

docker-compose build
docker-compose run -p 8080:8080 app npm run start
docker exec -it quotes_db_1 mongoimport --verbose --db quotes --collection quotes --type tsv --headerline --file /tmp/data/quotes.tsv --drop

