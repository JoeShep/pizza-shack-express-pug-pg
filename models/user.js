'use strict'

const { bookshelf } = require('../db/database');
const { compare } = require('bcryptjs');

// const BCRYPT_DIFFICULTY = 15 // known as salt rounds. More == more secure. but longer processing time
// This was used in mongo version, but here, booshelf-bcrypt does it automatically with a default of 15(?)

                                 // instance methods       static functions
// use this pattern: Model.extend([prototypeProperties], [classProperties])
const User = bookshelf.Model.extend({ 
  tableName: 'users', 
  bcrypt: { field: 'password' },  
  // compare a string to a hash
  comparePass: function (passwordStr) {
    console.log("password String?", passwordStr);
    console.log("this.password", this.attributes.password);
    // 'this' will be the user from the db, since passport called user.compare, 
    // and user is the data from the then method after calling findOneByEmail in the strategies files
    // compare(passwordStr, this.attributes.password).then((result) => {console.log("compare?", result);});
    return compare(passwordStr, this.attributes.password);
  }
}, {
  findOneByEmail: function (email) {
    return this.forge({email})
    .fetch()
    .then( (user) => {  
      // 'get' gives us the current value of an attribute from the model
      console.log('Got user:', user.get('email'));
      // resolve(user.get('email'));
      return user;
    })
    .catch( () => {
      console.log("yup, this is when no email");
      return (null)
    });
  }
});

module.exports = bookshelf.model('User', User);

// const HTML5_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
