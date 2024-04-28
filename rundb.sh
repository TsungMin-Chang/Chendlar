# podman volume rm --force pg-data
# podman volume create pg-data
podman run -d -it --replace \
  --name chendlar \
  -e POSTGRES_DB=chendlar \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e PGDATA=/var/lib/postgresql/data \
  -v pg-data:/var/lib/postgresql/data \
  -p 127.0.0.1:4999:5432 \
  postgres:16
