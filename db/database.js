'use strict'

// We created this file manually so we can specify 
// the environment (test, development, or production), 
// require the knexfile.js, and export the configuration 
// (based on the environment) for our database:

const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);

// Resolve circular dependencies with relations, ie models requiring each other
// when defining relationships
bookshelf.plugin('registry');

// The plugin we will use to salt and hash our user passwords
bookshelf.plugin(require('bookshelf-bcrypt'));

// console.log("bookshelf in db", bookshelf.Model );
module.exports = { knex, bookshelf };


// Then we ran these to
// Apply the migrations to both databases:
// $ knex migrate:latest --env development
// $ knex migrate:latest --env test

