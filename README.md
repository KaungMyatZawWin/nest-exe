## Project setup

```After clone the repo , dot first below things
$ npm install

$ npx prisma migrate dev --name init

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## How to call api with curl 
```
curl -X POST http://localhost:3000/api/v1/auth/test -H "Content-Type: application/json"
```
