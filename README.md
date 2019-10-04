# nodejs-backend
A NodeJS Backend with Typescript

Assignment: Create a functional phone asset management server which supports the following APIs:
1. Get a list of all phones in the warehouse
2. Update phone details
3. Add a new phone
4. Delete an existing phone

# How to
### Prerequisite
###### My local versions
```
tsc --version
Version 3.6.3

ts-node --version
v8.4.1
```
### Commands
```
npm install // install all the good stuff
npm run build // builds from `ts` to `js`
npm run dev // starts the app via `index.ts`
npm run prod // builds + starts the app via `index.js`
npm run lint // checks the lint rules
npm run test:unit // execute unit tests
```

# METHODS
### GET
###### Get a list of all phones
```
/api/all/phones
```
### POST
###### Update phone details
```
/api/add/phone
```
### PUT
###### Add a new phone
```
/api/update/phone/:id
```
### DELETE
###### Delete an existing phone
```
/api/delete/phone/:id
```
