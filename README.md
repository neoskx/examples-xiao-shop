# xiao-shop(小商店)

An mock application that I used to learn and verify ideas of large-scale distributed system.
This is a magic small shop, most of the products is unlimit, after you pay, you will get the products

## Overview

Goal: Create an e-commerce platform with the following microservices:

1. Product Service: Manages product catalog (CRUD operations).
2. Order Service: Handles order creation, management, and history.
3. User Service: Manages user authentication and profiles.
4. Payment Service: Processes payments for orders.

## Technologies:

- Programming Language: Node.js (Express.js for API development).
- Database: PostgreSQL (for relational data) and Redis (for caching).
- Message Queue: Apache Kafka (for asynchronous messaging).
- Containerization: Docker.
- Orchestration: Kubernetes on Azure (AKS).
- Helm: For Kubernetes package management.
- CI/CD: GitHub Actions for continuous integration and deployment.

docker run --name xiao -e POSTGRES_PASSWORD=xiaoshop123 -p 5432:5432 -d postgresdo
