'use strict'

const passport = require('passport');
const { Strategy } = require('passport-local');
const { knex } = require('../db/database.js');

const User = require('../models/user');

// http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser((user, done) => done(null, user.id));
// Could not make this work with static method on User model, so went straight to knex query
// passport.deserializeUser((id, done) => User.findOne({id}, done));
passport.deserializeUser( (id, done) => {
  knex('users').where({id}).first()
  .then((user) => { done(null, user); })
  .catch((err) => { done(err,null); });
});

// Here, we check if the username exists in the database and then 
// pass the appropriate results back to Passport via the 'cb' callback.
const localStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, passwordStr, done) => {
    console.log("Where are we? localStrategy callback");
    User.findOneByEmail(email)
      .then( (user) => {
        console.log("are we done yet?");
        if (user) {
          console.log("findOneEmail works in passport strats", user);
          return Promise.all([
            // what's this? Is user a Promise?
            user,
            // will compare the passed in pw from the form to the user that came back from the db
            user.comparePass(passwordStr),
          ])
        }
        // Else, without the else, since the 'if' has a return in it
        done(null, null, { msg: 'Email does not exist in our system, weirdo' })
      })
      .then(([user, matches]) => {
        if (matches) {
          console.log("Matched and logged in");
          done(null, user, { msg: 'Successfully logged in' }) //This isn't used because we reroute to '/' (?)
        } else {
          done(null, null, { msg: 'Password does not match' })
        }
      })
      .catch(done)
  }
)

passport.use(localStrategy)
