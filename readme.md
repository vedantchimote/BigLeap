# BigLeap API

A simple Express.js RESTful API for user management with comprehensive testing, documentation, and code quality analysis.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API for user management (CRUD operations)
- API documentation with Swagger UI
- Comprehensive test suite with Jest
- Code quality analysis with SonarQube
- In-memory data store (easily replaceable with a database)

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Swagger/OpenAPI** - API documentation
- **Jest** - Testing framework
- **Supertest** - HTTP testing
- **SonarQube** - Code quality analysis
- **Nodemon** - Development server with hot reload

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (for SonarQube)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bigleap.git
   cd bigleap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start SonarQube (optional, for code quality analysis):
   ```bash
   docker run -d --name sonarqube -p 9000:9000 sonarqube:latest
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode

```bash
npm run dev
```

This starts the server with Nodemon, which automatically restarts when file changes are detected.

### Production Mode

```bash
npm start
```

The server will be available at http://localhost:3000.

## API Documentation

Swagger UI documentation is available at http://localhost:3000/api-docs when the server is running.

## Testing

Run the test suite:

```bash
npm test
```

This will run all tests and generate coverage reports in the `coverage` directory.

## Code Quality

Analyze code quality with SonarQube:

1. Make sure SonarQube is running:
   ```bash
   docker ps
   ```

2. Run the analysis:
   ```bash
   npm run sonar
   ```

3. View the results at http://localhost:9000

## Project Structure

```
bigleap/
├── app.js                 # Express application setup
├── server.js              # Server entry point
├── app.test.js            # API tests
├── run-sonar.js           # SonarQube configuration
├── package.json           # Project dependencies and scripts
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## API Endpoints

### Users

| Method | Endpoint        | Description         | Request Body                | Response                  |
|--------|-----------------|---------------------|----------------------------|---------------------------|
| GET    | /api/users      | Get all users       | -                          | Array of user objects     |
| GET    | /api/users/:id  | Get user by ID      | -                          | User object or 404 error  |
| POST   | /api/users      | Create a new user   | `{ name, email }`          | Created user object       |
| PUT    | /api/users/:id  | Update a user       | `{ name, email }`          | Updated user object       |
| DELETE | /api/users/:id  | Delete a user       | -                          | Deleted user object       |

### User Object

```json
{
  "id": 1,
  "name": "Vedant C",
  "email": "cvedant@cdac.in"
}
```
## Deployment

### Docker and Harbor Registry

Build and push the Docker image to Harbor registry:

```bash
# Build the Docker image
docker build -t bigleap-api .

# Tag the image for Harbor registry
docker tag bigleap-api hpcie-harbornode.pune.cdac.in/bigleap/bigleap-api:latest

# Login to Harbor registry
docker login hpcie-harbornode.pune.cdac.in
# Enter your username and password when prompted

# Push the image to Harbor
docker push hpcie-harbornode.pune.cdac.in/bigleap/bigleap-api:latest
```
## Kubernetes Deployment with Helm

Deploy the application to Kubernetes using Helm:

```bash
# Create a Helm chart
mkdir -p charts
helm create charts/bigleap

# Create a secret for Harbor registry
kubectl create secret docker-registry harbor-registry-secret \
  --docker-server=hpcie-harbornode.pune.cdac.in \
  --docker-username=your-username \
  --docker-password=your-password \
  --docker-email=your-email@example.com \
  --namespace=default

# Create a namespace for your application
kubectl create namespace bigleap

# Deploy the application
helm install bigleap ./charts/bigleap --namespace bigleap

# Verify the deployment
kubectl get pods -n bigleap
kubectl get svc -n bigleap

# Access your application
kubectl port-forward svc/bigleap 3000:3000 -n bigleap

# Update your application (when needed)
helm upgrade bigleap ./charts/bigleap --namespace bigleap

# Delete the deployment (when done)
helm uninstall bigleap --namespace bigleap
```
## Helm Chart Configuration

The Helm chart should be configured with the following values in charts/bigleap/values.yaml:

```yaml
# Default values for bigleap
replicaCount: 1

image:
  repository: hpcie-harbornode.pune.cdac.in/bigleap/bigleap-api
  pullPolicy: IfNotPresent
  tag: "latest"

imagePullSecrets:
  - name: harbor-registry-secret

service:
  type: ClusterIP
  port: 3000

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 100m
    memory: 128Mi

env:
  NODE_ENV: production
  PORT: 3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

---