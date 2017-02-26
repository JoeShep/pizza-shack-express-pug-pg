'use strict'

const express = require('express')
// For grabbing the form inputs 
const bodyParser = require('body-parser')
// For auth
const passport = require('passport')
// For user session persistence
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')(session);
// to pretty up our error messages
const { cyan, red } = require('chalk')
require('./.env')

//When you give a folder path to require, it does not load .js files inside that folder automatically. 
// It looks for package.json file and if it's not there it loads index.js. i. e. It looks for an entry point.
const routes = require('./routes/'); // same as ./routes/index.js

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

// Is this called body because you use it to hold values for the templates?
app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name

// Silly ex to show in order template
app.locals.body.magic = "fooooooo!"

// middlewares -- Note how next() is called. Other MWs also call it from their code (like 'routes')
// Now we have a session property that all route requests can access to get current user info
const { knex } = require('./db/database');
app.use(session({
  store: new KnexSessionStore({
    knex: knex, // or just knex if using shorthand
    tablename: 'sessions' // optional. Defaults to 'sessions'
    // url: process.env.REDIS_URL || 'redis://localhost:6379',
  }),
  // necessary to set, but don't worry about what it means
  resave: false,
  // ditto
  saveUninitialized: false,
  // This is the secret used to sign the session ID cookie
  secret: process.env.SESSION_SECRET || 'pizzashacksupersecretkey',
}))

// Look, we wrote our own middleware!
app.use( (req, res, next) => { console.log("USER ID?", req.session.passport.user); next()})

// Don't need a varable to require something. Weird, eh? Require runs the code in the module.
require('./lib/passport-strategies')
app.use(passport.initialize())
// passport.session() acts as a middleware to alter the req object and change the 'user' value 
// that is currently the session id (from the client cookie) into the true deserialized user object.
// It is equivalent to app.use(passport.authenticate('session'));
// So in effect, you are authenticating the user with every request, even though this authentication 
// doesn't need to look up a database or oauth as in the login response. 

// BUT isn't this what we are doing in the deserialize function by looking up 'users'?

// So passport will treat session authentication also as yet another authentication strategy. 
// This is why we have to serialize and deserialize as part of passport setup.
app.use(passport.session())

// wazzup here? Setting 'email' to req.user.email if user exists on the req object
app.use((req, res, next) => {
  // console.log("user????", req.session.user ); see Callan's notes for how it is different there
  app.locals.email = req.user && req.user.email
  next()
})

// For console logging the server activity every time we trigger a route
app.use(({ method, url, headers: { 'user-agent': agent } }, res, next) => {
  const timeStamp = new Date()
  console.log(`[${timeStamp}] "${cyan(`${method} ${url}`)}" "${agent}"`)
  next()
})

app.use(express.static('public'))

// get info from html forms.
// 'urlencoded' parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST) 
// and exposes the resulting object (containing the keys and values) on req.body. 
// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) 
// or the qs library (when true). 
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// Custom 404 page <--- no next() here. How does it not hang? res.render() is the key.
// This only gets triggered if the above routes don't match
app.use((req, res) =>
  res.render('404')
)

// Error handling middleware
// You define error-handling middleware last, after other app.use() and routes calls
// https://expressjs.com/en/guide/error-handling.html
// Responses from within a middleware function can be in any format that you prefer, 
// such as an HTML error page, a simple message, or a JSON string.
// How is this picked up in the sequence of events if the above res.render ends it? 
// I guess that's a different end of the cycle?
// NOTE the destructuring of the request object here
app.use((err, { method, url, headers: { 'user-agent': agent } }, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    // Send the stack trace as a response, for debugging purposes
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

app.listen(port, () =>
  console.log(`Listening on port: ${port}`)
)
