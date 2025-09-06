#!/bin/sh

echo "Esperando o MySQL subir"
until nc -z db 3306; do
  sleep 2
done
echo "MySQL pronto"

echo "Aplicando migrations..."
npx prisma migrate deploy

echo "Iniciando API..."
exec node dist/index.js
