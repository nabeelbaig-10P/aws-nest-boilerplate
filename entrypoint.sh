#!/bin/sh

# Wait for the PostgreSQL to be ready
echo "Waiting for PostgreSQL..."
until pg_isready -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER"; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "PostgreSQL is up - continuing..."

# Run Prisma migrations
echo "Running migrations..."
pnpm run migrate:deploy

# Run Prisma seed command
echo "Seeding database..."
pnpm run seed

# Start the application
exec "$@"
