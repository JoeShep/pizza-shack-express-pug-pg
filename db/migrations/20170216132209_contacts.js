// running `knex migrate:make contacts` created this file and its direcotry

// the up function creates the shows table while the down 
// function drops the table. So we now have a schema defined, 
// and a migration file ready to create that schema.

// knex migrate:latest --env test to apply the migration to the db
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contacts', (table) => {
    table.increments(); // same as (`id` int unsigned not null auto_increment primary key)
    table.string('name').notNullable().unique();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('message').notNullable()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contacts');
};
