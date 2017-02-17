const { knex } = require('../../database');
const sizes = [
    {
        "name": "Fun",
        "inches": 2
    },
    {
        "name": "Personal",
        "inches": 8
    },
    {
        "name": "Small",
        "inches": 10
    },
    {
        "name": "Medium",
        "inches": 12
    },
    {
        "name": "Large",
        "inches": 14
    },
    {
        "name": "Murica",
        "inches": 1776
    }
]

const sizePromises = [];
for( let size in sizes ) {
  sizePromises.push(knex('sizes').insert({name: sizes[size].name, inches: sizes[size].inches }));
}

exports.seed = function(knex, Promise) {
  return knex('sizes').del()
    .then(function () {
      return Promise.all(sizePromises);
    });
};
