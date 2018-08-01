# express_todo
This is a REST API built using Node.js, ExpressJS, Knex.js, and PostgreSQL to track and maintain a To-do list.

## Setup Instructions
- Run the following commands in your terminal:
* ```git clone git@github.com:jbevis/express_todo.git```
* ```npm install```

 *Note: You will need PostgreSQL installed locally. http://postgresapp.com/*
- Next steps to set up, and seed local db:
* ```psql```
* ```CREATE DATABASE threeohthree_software;```
* ```\q```
* ```knex migrate:latest```
* ```knex seed:run```

- Start server: ```npm start```
- Run linter: ```npm run lint```

## Endpoints

### GET
  * /api/v1/todos
    - Returns all todo objects from the database.
    - Returns all todo objects with following keys: ID(primary), TITLE, AUTHOR, CONTENT.
   
   * /api/v1/todos/:id
    - Returns specific todo from the database based on the ID parameter.
    - Returns todo object with ID, TITLE, AUTHOR, CONTENT
   
### POST
  * /api/v1/todos
    - Creates a new todo object in the database
    - Requests must be sent with a body including the following parameters: TITLE, AUTHOR, CONTENT.

### PUT
  * /api/v1/todos/:id
    - Updates a specific todo in the database by ID.
    - Requests can be made with a body that includes any combination of TITLE, AUTHOR, CONTENT based on what is being             updated.
    
### DELETE
  * /api/v1/todos/:id
    - Deletes a record from the database based on ID.
    - Must be sent with an ID parameter in order to find correct record.
  