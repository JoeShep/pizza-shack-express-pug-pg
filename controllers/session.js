'use strict'

const passport = require('passport');
module.exports.new = (req, res) =>
  res.render('login');

module.exports.create = (req, res, next) =>
  // 'local' is the strategy property on passport. (You can also have strategies for google, github, etc)
  // if authentication fails, Passport will respond with a 401 Unauthorized status, 
  // and any additional route handlers will not be invoked. If authentication succeeds, 
  // the next handler will be invoked and the req.user property will be set to the authenticated user.
  passport.authenticate('local', (err, user, msg) => {
    console.log("Where are we? session.js", user );
    if (err) { return next(err) }
    if (!user) { return res.render('login', msg) }

    req.logIn(user, err => {
      if (err) { return next(err) }
      console.log("authenticated. Rerouting to home!" );
      res.redirect('/')
    })
  })(req, res, next)

module.exports.edit = (req, res) =>
  res.render('logout', { page: 'Logout' })

module.exports.destroy = (req, res) => {
  req.logout()
  res.redirect('/login')
}
