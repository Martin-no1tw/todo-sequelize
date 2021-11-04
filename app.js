const express = require('express')
const exhbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.engine('hbs', exhbs({ defaultLayout: 'main', exist: 'hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hellow world!')
})


app.listen(PORT, () => {
  console.log(`APP is running on http://localhost:${PORT}`)
})