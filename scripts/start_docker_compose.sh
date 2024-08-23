#!/bin/bash

# Change to the scripts directory
cd "$(dirname "$0")"

# Start services with docker-compose
echo "Starting services with docker-compose..."
docker-compose -p xiaoshop-services up -d

echo "All services started successfully."
