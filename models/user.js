'use strict'

const { bookshelf } = require('../db/database');

// const BCRYPT_DIFFICULTY = 15 // known as salt rounds
// This was used in mongo version, but here, booshelf-bcrypt does it automatically with a default of 15

const User = bookshelf.Model.extend({ 
  tableName: 'users', 
  bcrypt: { field: 'password' } 
});

// possibly add "on.creating" hook to check for existing email and /or password?

module.exports = bookshelf.model('User', User);

// const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


// class/static/model methods
// userSchema.statics.findOneByEmail = function (email, cb) {
//   const collection = this
//   return collection.findOne({ email }, cb)
// }

// instance methods
// userSchema.methods.comparePassword = function (password, cb) {
//   const user = this

//   // Support callback and `Promise` pattern
//   if (typeof cb === 'function') {
//     return compare(password, user.password, cb)
//   }

//   return new Promise((resolve, reject) =>
//     compare(password, user.password, (err, matches) =>
//       err ? reject(err) : resolve(matches)
//     )
//   )
// }



