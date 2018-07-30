
exports.seed = function(knex, Promise) {
  return knex('todos').del()
    .then(function () {
      return Promise.all([
        knex('todos').insert({id: 1, title: 'Buy Groceries', author: 'Sam I am', content: 'Eggs, Milk, Chicken, Onions, Tomatoes, Cereal'}),
        knex('todos').insert({id: 2, title: 'Fix Bike', author: 'Mr. Bike Guy', content: 'Need to buy new tube, and patch kit. Fix flat tire.'}),
        knex('todos').insert({id: 3, title: 'Do Laundry', author: 'Testy McTester', content: 'Do laundry, 2 loads, colors + whites. Need to get more detergent.'})
      ]);
    });
};
