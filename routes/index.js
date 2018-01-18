const express = require('express')
const router = express.Router()

router.get('/', function(request, response) {
  response.render('index', { title: 'Express' })
})

module.exports = router
