# xiao-shop(小商店)

The goal of **Xiao-shop** is to serve as a demonstration application for showcasing technologies used in system design, expesial for the large distributed system

## Overview

Goal: Create an e-commerce platform with the following microservices:

- Product Service: Manages product catalog (CRUD operations).
- Order Service: Handles order creation, management, and history.
- User Service: Manages user authentication and profiles.
- Payment Service: Processes payments for orders.
- Real-time Product Leaderboard Service: Real time for the most viewed products leaderboard
- Shop Service: Local shops
- Notification Service: Sent notifications
- Admin Service: Admin UI for the sellers

## Technologies:

- Programming Language: Node.js (Express.js for API development), Golang
- Database: PostgreSQL (for relational data) and Redis (for caching), Apache Cassandra
- Message Queue: Apache Kafka (for asynchronous messaging).
- Data Processing: Apache Flink, Apache Spark
- Containerization: Docker.
- Orchestration: Kubernetes on Azure (AKS).
- Helm: For Kubernetes package management.
- CI/CD: GitHub Actions for continuous integration and deployment.
