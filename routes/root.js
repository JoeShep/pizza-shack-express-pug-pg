'use strict'

// The Router class allows us to modularize our routes.
// A Router instance is a complete middleware and routing system; 
// for this reason, it is often referred to as a “mini-app”.
// It creates a router as a module, loads a middleware function in it, 
// defines some routes, and mounts the router module on a path in the main app.
const { Router } = require('express')

const { index } = require('../controllers/home')

const router = Router()

router.get('/', index)

module.exports = router
