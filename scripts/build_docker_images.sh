#!/bin/bash

# Build Docker images for each service
echo "Building Docker images..."

services=("db" "gateway" "order" "payment" "product" "user")

for service in "${services[@]}"; do
  echo "========================================="
  echo "Building ${service}..."
  echo "========================================="
  docker build -t ${service}-service:latest ./services/${service}
done
