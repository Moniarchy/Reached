const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const routes = require('./routes/index')
const users = require('./routes/users')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)
app.use('/users', users)

app.use(function(request, response, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

if (app.get('env') === 'development') {
  app.use(function(err, request, response, next) {
    response.status(err.status || 500)
    response.render('error', {
      message: err.message,
      error: err
    })
  })
}

app.use(function(err, request, response, next) {
  response.status(err.status || 500)
  response.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app
