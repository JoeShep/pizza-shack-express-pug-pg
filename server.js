'use strict'

const express = require('express')
// For grabbing the form inputs 
const bodyParser = require('body-parser')
// For OAuth
const passport = require('passport')
// For user session persistence
const session = require('express-session')
const { cyan, red } = require('chalk')
const KnexSessionStore = require('connect-session-knex')(session);

const routes = require('./routes/'); // same as ./routes/index.js
// const { connect } = require('./db/database');

const app = express()

// Get port from environment and store in Express.
const port = process.env.PORT || 3000
app.set('port', port)

// pug configuration
app.set('view engine', 'pug')

if (process.env.NODE_ENV !== 'production') {
  app.locals.pretty = true
}

// "app.locals" You can access local variables in templates rendered within the application. 
// This is useful for providing helper functions to templates, 
// as well as application-level data
app.locals.company = "🍕 Pizza Shack"
app.locals.errors = {} // errors & body added to avoid guard statements
app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name
// Silly ex to show in order template
app.locals.body.magic = "fooooooo!"

// middlewares
// app.use(session({
//   store: new RedisStore({
//     url: process.env.REDIS_URL || 'redis://localhost:6379',
//   }),
//   resave: false,
//   saveUninitialized: false,
//   secret: process.env.SESSION_SECRET || 'pizzadescottsupersecretkey',
// }))

// require('./lib/passport-strategies')
// app.use(passport.initialize())
// app.use(passport.session())

// app.use((req, res, next) => {
//   app.locals.email = req.user && req.user.email
//   next()
// })

// app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
//   const timeStamp = new Date()
//   console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
//   next()
// })

app.use(express.static('public'))
// 'urlencoded' parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) 
// and exposes the resulting object (containing the keys and values) on req.body. 
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) 
// or the qs library (when true). 
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// Custom 404 page
app.use((req, res) =>
  res.render('404')
)

// Error handling middleware
app.use((
    err,
    { method, url, headers: { 'user-agent': agent } },
    res,
    next
  ) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    res.set('Content-Type', 'text/plain').send(err.stack)
  }

  const timeStamp = new Date()
  const statusCode = res.statusCode
  const statusMessage = res.statusMessage

  console.error(
    `[${timeStamp}] "${red(`${method} ${url}`)}" Error (${statusCode}): "${statusMessage}"`
  )
  console.error(err.stack)
})

// Listen to requests on the provided port and log when available
// connect()
//   .then(() => {
//     app.listen(port, () =>
//       console.log(`Listening on port: ${port}`)
//     )
//   })
//   .catch(console.error)

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
