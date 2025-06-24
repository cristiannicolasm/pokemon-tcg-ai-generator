#!/bin/sh
# wait-for-db.sh

set -e # Salir inmediatamente si un comando falla

host="$1"
port="$2"
shift 2
cmd="$@"

echo "Waiting for Postgres at $host:$port..."

# Usar pg_isready para verificar la disponibilidad de la base de datos
until pg_isready -h "$host" -p "$port" -U "$POSTGRES_USER"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd