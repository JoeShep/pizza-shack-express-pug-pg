'use strict';

const { bookshelf } = require('../db/database');

// console.log("bookshelf in model", bookshelf );

const Contact = bookshelf.Model.extend({
  tableName: 'contacts'
});

module.exports = Contact;
