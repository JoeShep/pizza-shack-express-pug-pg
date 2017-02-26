'use strict'

const { Router } = require('express')

const contact = require('../controllers/contact')

const router = Router()

// Router allows us to define multiple routes for "/contact" here then pull in this module as
// the route for `/contact'
router.get('/contact', contact.new)
router.post('/contact', contact.addContact)

module.exports = router
