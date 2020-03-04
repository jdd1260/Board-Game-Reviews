  
mkdir -p ~/.postgres-data/cs411
docker start cs411-postgres || docker run --name cs411-postgres -d -p 32769:5432 postgres:11.5
until docker exec cs411-postgres pg_isready; do date; echo "waiting for postgres to start"; sleep 1; done;