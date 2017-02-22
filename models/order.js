'use strict';

const { bookshelf } = require('../db/database');
require('./size');
require('./topping');

// TODO: Add form validation
const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

// Note how we're connecting the Order model to Topping and Size:
// BUT, our migrations also need to define a relationship between 
// the tables the model represents based on foreign keys.

// NOTE: Save relationships for API. Too much to cover here?
const Order = bookshelf.Model.extend({
  tableName: 'orders',
  toppings: function() {
    return this.hasMany('Topping');
  },
  size: function() {
    return this.hasOne('Size');
  }
});

// TODO: Understand this better (at all)
// Other models without relatonships can just do this:
// module.exports = Order;

// We have to do this to register Order as a string on the Bookshelf.model prop (?)
module.exports = bookshelf.model('Order', Order);
// Here we’re registering our Order model as the string 'Order'. 
// Now we’ll be able to reference the Order model using a string 
// rather than assigning it to a variable 
// (that’s what gets us the circular dependency error to begin with)
// http://billpatrianakos.me/blog/2015/11/30/how-to-structure-bookshelf-dot-js-models/
