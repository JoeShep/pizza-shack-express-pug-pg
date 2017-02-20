'use strict'

const { bookshelf } = require('../db/database');

// const BCRYPT_DIFFICULTY = 15 // known as salt rounds. More == more secure. but longer processing time
// This was used in mongo version, but here, booshelf-bcrypt does it automatically with a default of 15(?)

                                 // instance methods       static functions
// use this pattern: Model.extend([prototypeProperties], [classProperties])
const User = bookshelf.Model.extend({ 
  tableName: 'users', 
  bcrypt: { field: 'password' } 
}, {
  findOneByEmail: function (email) {
    return this.forge({email})
    .fetch()
    .then(function(user) {  
      // 'get' gives us the current value of an attribute from the model
      console.log('Got user:', user.get('email'));
      // resolve(user.get('email'));
      return user.get('email');
    })
    .catch( () => {
      return (null)
    });
  }
});

// possibly add "on.creating" hook to check for existing email and /or password?

module.exports = bookshelf.model('User', User);

// const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
