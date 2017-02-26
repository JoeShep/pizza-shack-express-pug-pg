'use strict'

// We are sort of 'doubly' modularizing our routes. We move the router middleware out of server.js
// and into this file, which we then require into server.js.
// then this file acts as a hub for pulling in all the route definitions, which exist in their own modules

const { Router } = require('express');

// Router is a method on express that creates a new router object. Don't call 'new'. That don't work, bub
const router = Router();

// .use() can be passed a pathname. This is the mount point.
// public routes
router.use(require('./about'))
router.use(require('./contact'))
router.use(require('./login'))
router.use(require('./register'))
router.use(require('./root'))

// login guard middleware. isAuthenticated is built into Passport, which adds it to the req object when you initialize it
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
})

// private routes
router.use(require('./logout'))
router.use(require('./order'))

module.exports = router
