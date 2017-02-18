'use strict'

const { bookshelf } = require('../db/database');

const Topping = bookshelf.Model.extend({
  tableName: 'toppings'
});

module.exports = Topping;
