
exports.seed = function (knex, Promise) {
  return knex('todos').del()
    .then(() => Promise.all([
      knex('todos').insert({
        title: 'Buy Groceries', author: 'Sam I am', content: 'Eggs, Milk, Chicken, Onions, Tomatoes, Cereal',
      }, 'id'),
      knex('todos').insert({
        title: 'Fix Bike', author: 'Mr. Bike Guy', content: 'Need to buy new tube, and patch kit. Fix flat tire.',
      }, 'id'),
      knex('todos').insert({
        title: 'Do Laundry', author: 'Testy McTester', content: 'Do laundry, 2 loads, colors + whites. Need to get more detergent.',
      }, 'id'),
    ]))
    .catch(error => console.log(`Error seeding data: ${error}.`));
};
