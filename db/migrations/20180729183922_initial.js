
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('todos', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('author');
      table.string('content');

      table.timestamp(true, true);
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('todos'),
  ]);
};
