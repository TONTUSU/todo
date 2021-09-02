//modules
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const passport = require('passport')

//routes
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todo')
const path = require("path");

const app = express()

mongoose.connect(keys.mongoURI)
    .then(()=> console.log('MongoDB connected'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)

if (process.env.NODE_ENV === 'production') {
  // app.use(express.static('client/dist/client'))
  // app.get('*', (req, res) => {
  //   res.sendFile(
  //       path.resolve(__dirname, 'client', 'dist', 'client', 'index.html' )
  //   )
  // })
}
//test

module.exports = app