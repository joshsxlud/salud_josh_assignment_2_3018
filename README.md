# Project Overview

## PiXELL River Financial Employee and Branch Management API

### Description

This API is used to track and manage the current employees and branches of PiXELL River Financial. Using this API, employee and branch information can be created, updated, deleted, and fetched from a serverless database (Firestore). This API can be utilized by developers at PiXELL River Financial to build internal tools to manage employee and branch information.

---

## Getting Started

### Prerequisites

1. Install the latest version of [Node.js](https://nodejs.org/en/download) if not already downloaded.

    - Choose the *latest* LTS version

2. Install npm:

   `npm install npm@latest -g`

3. Create your own Github repository

    - Use this repo when setting a new origin to avoid pushing to the base repository.

### Installation

1. Clone the repo:

   `git clone https://github.com/joshsxlud/salud_josh_assignment_2_3018`

2. Install required npm packages:

    `npm install`

3. Create a .env file:

    ```.env
    FIREBASE_PROJECT_ID=<your-firebase-project-id>
    PRIVATE_KEY_ID=<your-private-key>
    FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n<your-private-key>\n-----END PRIVATE KEY-----\n"
    FIREBASE_CLIENT_EMAIL=<your-client-email>
    PORT=<your-port-of-choice>
    NODE_ENV=<your-environment>
    ```

4. Change the origin of the repository to avoid pushing to the base project:

    ```git
    git remote set-url origin https://github.com/<your-username>/<your-repo>
    git remote -v # confirm correct origin
    ```

---

## Usage

### API Request Examples

GET all employees:

```cURL
curl --location 'http://localhost:3000/api/v1/employees' \
--header 'Content-Type: text/plain' \
--data-binary '@'
```

POST new employee:

```cURL
curl --location 'http://localhost:3000/api/v1/employees' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "testName",
    "position": "testPostion",
    "department": "testDepartment",
    "email": "testemail@test.com",
    "phoneNumber": 1234567890,
    "branchId": 1

}'
```

DELETE branch:

```cURL
curl --location --request DELETE 'http://localhost:3000/api/v1/branches/2' \
--data ''
```

PUT (update) employee by ID:

```cURL
curl --location --request PUT 'http://localhost:3000/api/v1/employees/0KMfjVDKQaZ8t8de0Su5' \
--header 'Content-Type: application/json' \
--data '{
    "position": "newPosition"
}'
```

#### Official Documentation

Refer to the [official documentation](https://joshsxlud.github.io/salud_josh_assignment_2_3018/) for more usage information.

#### Local Access to the Documentation

##### *Visual Studio Code*

Install the following extension inside of Visual Studio Code:

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) by Ritwick Dey

    1. Follow the guide inside the details of the extension to start a server.
        - Note: The extension uses port 5500 by default. When starting a server using `npm run start` ensure that the port you have selected is **NOT** the same as Live Server.

##### Without Live Server

Use `npm run start` to initialize your server, and go to the following link: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

## Security Configuration

### CORS

```.ts
export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return {
            origin: "http://localhost:3000", // Since will only be in development environment
            // origin: "*", // for testing with all origins allowed
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
        };
    }

    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};
```

This security configuration was grabbed from the notes, and adjusted slightly, according to the needs of the project.

`origin: "http://localhost:3000", // Since will only be in development environment`

- This is one major line that had to be adjusted. With this configuration, even inside of a development environment, the origin is set to localhost, preventing access to resources from other sites (origins).

### Helmet

```ts
export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Base configuration for APIs
    const baseConfig = {
        contentSecurityPolicy: false, // Disable for JSON APIs
        hidePoweredBy: true, // Always hide server info
        noSniff: true, // Always prevent MIME sniffing
    };

    if (isDevelopment) {
        return helmet({
            ...baseConfig,
            hsts: false, // No HTTPS enforcement in development
        });
    }

    // Production gets full security
    return helmet({
        ...baseConfig,
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },
        frameguard: { action: "deny" },
        referrerPolicy: { policy: "no-referrer" },
    });
};
```

No lines were changed with this configuration from the notes.

- It was hard to find a way to change up this configuration and add some custom headers. The reason being, the author of helmet himself responded to a Stack Overflow post enumerating different headers for JSON API's. The configurations outlined were already included, inferring that the current configuration from the notes encompasses most/all needs for this kind of API. Find the link to the comment on the [Stack Overflow post](https://stackoverflow.com/a/60709460).
