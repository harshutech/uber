# Uber Project

Welcome to the Uber project repository. This project uses Docker images for both the backend server and the frontend client to simulate a ride-sharing service.

## Introduction

This project is a simple Uber-like service simulation comprising:
- **Backend Server:** Pre-built Docker image running on Node.js.
- **Frontend Client:** Pre-built Docker image built with a modern frontend framework.
- **MongoDB:** Serves as the primary database.

## Getting Started

### Using GitHub
1. Clone the repository:
   ```bash
   git clone https://github.com/harshutech/uber
   ```
2. Navigate to the project directory:
   ```bash
   cd uber-project
   ```

### Using Docker Compose
1. Ensure [Docker Compose](https://docs.docker.com/compose/) is installed.
2. Run the following command in the project root:
   ```bash
   docker-compose up
   ```
   This command starts the backend, frontend, and MongoDB services as defined in the `docker-compose.yml` file.

## Environment Configuration

- The backend uses environment variables loaded from `backend/.env`. Be sure to customize this file if needed.
- The Docker services communicate on a dedicated network (`app-network`).

## Troubleshooting & Logs

- If a service fails to start, review the container logs:
   ```bash
   docker-compose logs <service-name>
   ```
- Verify that ports 3000, 5173, and 27017 are not in use.
- For persistent MongoDB data, a named volume `mongo-data` is used.

## Additional Information

- Restart policies are added to all services to ensure they automatically recover from failures.
- For further details, refer to the inline comments in the configuration files.

### Direct Image Access

If you prefer to pull the Docker image directly, run:
```bash
docker pull harshpatil20/uber_prototype
```
// ...existing documentation or further instructions...
