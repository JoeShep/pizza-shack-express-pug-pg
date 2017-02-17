const { knex } = require('../../database');

const toppings = [
"Anchovies",
"Bacon",
"Banana Peppers",
"Beef",
"Broccoli",
"Chicken",
"Green Peppers",
"Ham",
"Jalapeño",
"Meatballs",
"Mozzarella",
"Mushrooms",
"Olives",
"Onions",
"Pepperoni",
"Pineapple",
"Red Peppers",
"Salami",
"Sausage",
"Shrimp",
"Sour Patch Kids",
"Spinach",
"Steak" 
];

const seedPromises = []
toppings.forEach( (topping) => {
  seedPromises.push(knex('toppings').insert({ name: topping }));
});

exports.seed = function(knex, Promise) {
  return knex('toppings').del() // Deletes ALL existing entries
    .then(function () { // Inserts seed entries one by one in series
      return Promise.all(seedPromises);
    });
};

