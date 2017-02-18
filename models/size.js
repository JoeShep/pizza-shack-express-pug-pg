'use strict'

const { bookshelf } = require('../db/database');

const Size = bookshelf.Model.extend({
  tableName: 'sizes'
});

module.exports = Size;


