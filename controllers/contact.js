'use strict'

const Contact = require('../models/contact')

module.exports.new = (req, res) => {
  res.render('contact', { page: 'Contact', user: req.user })
}

module.exports.addContact = ({ body }, res, err) => {
  Contact.forge(body)
  .save()
  .then( (model) => res.redirect('/') )
  .catch(err)
}
