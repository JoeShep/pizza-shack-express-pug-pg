'use strict'

const User = require('../models/user')

module.exports.new = (req, res) => {
  console.log("rendering new register page")
  res.render('register')
};
                         // Remember nested destructuring?   
module.exports.create = ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOneByEmail(email)
    .then( (user) => {
      if (user) return res.render('register', { msg: 'Email is already registered' });
      return User.forge({email, password})
      .save()
      .then( () => {
        res.redirect('/');
      })
      .catch( (err) => {
        res.render('register', { msg: 'Dang. There was a problem. Please try again' });
      })
    })
    .catch( (err) => res.render('register', { msg: 'Oops. There was a problem. Please try again' }));
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
};
