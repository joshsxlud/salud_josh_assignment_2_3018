# Project Overview

---

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

```
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
