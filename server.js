const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Todos';

app.get('/', (request, response) => {
  response.send('')
})