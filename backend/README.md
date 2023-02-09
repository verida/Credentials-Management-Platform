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

# REST API

## Issue a credential

`POST: http://localhost:3000/credential/issue`:

```
{
    "did": "did:vda:testnet:0xAAB9e2F05968e2aAC54323eB3aD378f7fF6D1b7c",
    "name": "Verite KYC/AML Attestation (Test)",
    "title": "Verite KYC/AML Attestation (Test)",
    "summary": "KYC/AML Attestation in the format provided by Verite",
    "schema": "https://common.schemas.verida.io/identity/kyc/Verite/KYCAMLAttestation/latest/schema.json",
    "proofs": {
        "uniqueId": ["type", "process", "approvalDate"]
    },
    "data": {
        "type": "KYCAMLAttestation",
        "process": "https://verite.id/definitions/processes/kycaml/0.0.1/usa",
        "approvalDate": "2021-08-25T02:13:43.387Z"
    }
}
```

Where:

- `did` DID that is the subject of the credential and will receive the inbox message with the credential
- `name` Name of the credential that will appear in the user's Verida Wallet
- `title` Subject of the inbox message that will be sent to the user with their credential
- `summary` Short summary describing the credential in the user's Verida Wallet
- `schema` Schema of the verifiable credential
- `proofs` (Optional) Key/value of string array of proofs that are signed by the issuer private key and included in the credential payload. These can be efficiently used on chain, if required.