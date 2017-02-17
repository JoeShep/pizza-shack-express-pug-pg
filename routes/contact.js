'use strict'

const { Router } = require('express')

const contact = require('../controllers/contact')

const router = Router()

router.get('/contact', contact.new)
router.post('/contact', contact.addContact)

module.exports = router
