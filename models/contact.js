'use strict';

const { bookshelf } = require('../db/database');

// console.log("bookshelf in model", bookshelf );

var Contact = bookshelf.Model.extend({
  tableName: 'contacts'
});

module.exports = Contact;

