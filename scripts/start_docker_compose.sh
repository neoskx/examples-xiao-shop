#!/bin/bash

# Change to the scripts directory
cd "$(dirname "$0")"
echo "Stop and remove existing containers, networks, and volumes"
# Stop and remove existing containers, networks, and volumes
docker-compose -p xiaoshop-services down -v

# Start services with docker-compose
echo "Starting services with docker-compose..."
docker-compose -p xiaoshop-services up -d

echo "All services started successfully."
