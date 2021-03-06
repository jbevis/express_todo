const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const configuration = require('./knexfile')[environment];

const database = (knex)(configuration);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = '303 To Do List';

app.get('/', (request, response) => {
  response.sendFile('index.html');
});

app.get('/api/v1/todos', (request, response) => {
  database('todos').select()
    .then((todos) => {
      if (todos.length) {
        response.status(200).json(todos);
      } else {
        response.status(404).json({
          error: 'No todos were found.',
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/todos/:id', (request, response) => {
  database('todos').where('id', request.params.id).select()
    .then((todos) => {
      if (todos.length) {
        response.status(200).json(todos);
      } else {
        response.status(404).json({
          error: `Could not find paper with id ${request.params.id}.`,
        });
      }
    })
    .catch((error) => {
      response.status(500).json({
        error: 'Internal Server Error',
      });
    });
});

app.post('/api/v1/todos', (request, response) => {
  const todo = request.body;

  for (const requiredParameter of ['title', 'author', 'content']) {
    if (!todo[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { title: <String>, author: <String>, content: <String> }. You're missing a ${requiredParameter} property.` });
    }
  }

  database('todos').insert(todo, 'id')
    .then((newTodo) => {
      response.status(201).json({ id: newTodo[0] });
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.put('/api/v1/todos/:id', (request, response) => {
  const update = request.body;

  database('todos').where('id', request.params.id).update(update, 'id')
    .then((todo) => {
      if (todo.length) {
        response.status(201).json({
          id: todo[0],
          message: 'Todo was successfully updated.',
        });
      } else {
        response.status(422).json({
          error: 'Todo was not updated, please check parameters.',
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/todos/:id', (request, response) => {
  database('todos').where('id', request.params.id).del()
    .then((result) => {
      if (result === 1) {
        response.status(200).json({
          message: `Todo with id of ${request.params.id} successfully deleted.`,
        });
      } else {
        response.status(404).json({
          error: `Todo with id of ${request.params.id} was not found.`,
        });
      }
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
  });
}

module.exports = app;
