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
```
curl http://localhost:3000/api/all/phones | json_pp
```
### POST
###### Update phone details
```
/api/add/phone
```
```
curl -d '{"type": "test2","serial": "123-456-789","color": "red","metadata": "hashedmetadata"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/add/phone
```
returns `false` because the id / serial is not unique
```
curl -d '{"type": "smartphone","serial": "312312","color": "red","metadata": "hashedmetadata"}' -H "Content-Type: application/json" -X POST http://localhost:3000/api/add/phone
```
returns `true` and you can curl the GET endpoint to check that the data was added.
### PUT
###### Add a new phone
```
/api/update/phone/:id
```
```
curl -d '{"type": "smartphone","serial": "12345678","color": "red","metadata": "hashedmetadata"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/update/phone/12345678
```
returns `false` cause the id / serial is not in our array (not existing)
```
curl -d '{"type": "smartphone","serial": "123-456-789","color": "red","metadata": "hashedmetadata"}' -H "Content-Type: application/json" -X PUT http://localhost:3000/api/update/phone/123-456-789
```
returns `true` because this id / serial is existing
### DELETE
###### Delete an existing phone
```
/api/delete/phone/:id
```
```
curl -X DELETE http://localhost:3000/api/delete/phone/666
```
returns `false` because the id / serial is not existing
```
curl -X DELETE http://localhost:3000/api/delete/phone/123-456-789
```
returns `true` because the id is existing and it was deleted succesfully
