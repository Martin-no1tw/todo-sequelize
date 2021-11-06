const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const session = require('express-session')
const usePassport = require('./config/passport')

const routes = require('./routes')
const app = express()
const PORT = process.env.PORT

const flash = require('connect-flash')

app.engine('hbs', exhbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))



usePassport(app)
app.use(flash())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})



app.use(routes)



app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})