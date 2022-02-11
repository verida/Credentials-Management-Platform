## Description

Credentials Management Platform( Server-Side)


## Installation

```bash
$ npm install
```

## setting up database connection

- Install MongDB compass Desktop on your machine

- To Connect with MongoDb Compass enter this url `mongodb://localhost:27017/verida-health` in the HostName input field.

## Create an admin account

```bash
# development
$ npm run seed
```

This will create a super admin that can create other issuers

> Login Details

- email: admin@verida.com
- password: admin

1.  you can login as an admin from this url :[admin login ](http://localhost:8080/admin/login) after starting the vue App by navigating to the `frontend` project folder.

2.  Login Url for an issuer [admin login](http://localhost:8080/login)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

