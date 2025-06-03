podman network create chendlar-net --subnet 10.100.7.0/24
podman pod create --name chendlar-pod --network chendlar-net -p 127.0.0.1:2999:2999

podman run -d --restart always --replace \
  --name chendlar-psql \
  --pod chendlar-pod \
  -e POSTGRES_DB=chendlar \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e PGDATA=/var/lib/postgresql/data \
  -v pg-data:/var/lib/postgresql/data \
  postgres:16

baseDir="$(realpath "$(dirname $0)")"

podman run -d --replace \
  --name chendlar-web \
  -v "$baseDir":/app \
  -w /app \
  --pod chendlar-pod \
  node:21-alpine \
  yarn start:pod
