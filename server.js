const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const dal = require('./dal')
const app = express()

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: 'this is cool',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null }
  })
)
app.use(function (req, res, next) {
  if (req.session.usr) {
    req.isAuthenticated = true
  } else {
    req.isAuthenticated = false
  }
  console.log(req.isAuthenticated, 'session')
  next()
})
app.get('/', function (req, res) {
  res.render('home', { isAuthenticated: req.isAuthenticated })
})
app.get('/admin', function (req, res) {
  if (req.isAuthenticated) {
    const users = dal.getUsers()
    res.render('admin', { users: users, loggedUsr: req.session.usr })
  } else {
    res.redirect('/')
  }
})

app.get('/login', function (req, res) {
  res.render('login')
})
app.post('/login', function (req, res) {
  const sesh = req.session
  const foundUsr = dal.getUserByUsername(req.body.username)
  if (req.body.password === foundUsr.password) {
    req.session.usr = { name: foundUsr.name }
    res.redirect('/admin')
  } else {
    res.send('womp womp')
  }
})
app.get('/logout', function (req, res) {
  req.session.destroy()
  res.render('logout')
})

app.listen(3000, function () {
  console.log('server running on port 3000')
})
