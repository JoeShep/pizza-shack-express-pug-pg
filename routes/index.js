'use strict'

// We are sort of 'doubly' modularizing our routes. We move the router middleware out of server.js
// and into this file, which we then require into server.js.
// then this file acts as a hub for pulling in all the route definitions, which exist in their own modules

const { Router } = require('express');

const router = Router();

// public routes
router.use(require('./about'))
router.use(require('./contact'))
router.use(require('./login'))
router.use(require('./register'))
router.use(require('./root'))

// login guard middleware
// router.use((req, res, next) => {
//   if (req.isAuthenticated()) {
//     next()
//   } else {
//     res.redirect('/login')
//   }
// })

// private routes
router.use(require('./logout'))
router.use(require('./order'))

module.exports = router
