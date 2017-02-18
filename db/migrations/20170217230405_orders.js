'use strict';

// TODO: Validate inputs. Here or in model? email to lowercase + valid email format
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments(); // same as (`id` int unsigned not null auto_increment primary key)
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('size').notNullable();
    table.specificType('toppings', knex.raw('text[]')).notNullable().defaultTo('{"cheese"}');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
