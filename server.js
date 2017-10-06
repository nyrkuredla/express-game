const express = require('express')
const app = express()
const dal = require('./dal')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const session = require('express-session')
const routes = require('./routes/routes')
const validator = require('express-validator')

//setting up mustache stuff
app.engine('mustache', mustacheExpress())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

//setting up express static
app.use(express.static('public'))

// setting up bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//validator middleware
app.use(validator())

//middleware for sesh. sssssshhhhhh
app.use(session({
  guessCount: 8,
  word: "",
  wordArr: [],
  secret: 'so secret', //encrypts a secret hash; this secret is the only thing that can unencrypt it. Usually not saved in the file like this, for security reasons; we can use process.env to save it otherwise
  resave: false, //doesn't resave it every time
  saveUninitialized: true, //if you don't have a session, it will create one, even if you are anonymous
  cookie: { maxAge:null }
}))

//middleware to check if a user has begin a game session
app.use(function (req, res, next) {
  if (req.session.usr) {
    req.isAuthenticated = true;
  }
  else {
    req.isAuthenticated = false;
  }
  next();
})


//routes
app.use('/', routes)


//setting the port
app.set('port', 3000)

//listening at port and console log start
app.listen(app.get('port'), function () {
  console.log('Application has started at port 3000')
})
