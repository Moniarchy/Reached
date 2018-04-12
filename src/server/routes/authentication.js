const router = require('express').Router();
const Users = require('../../models/users');
const { createSession, renderError } = require('../utils');

router.post('/signup', (request, response) => {
  const firstName = request.body.first_name;
  const lastName = request.body.last_name;
  const email = request.body.email;
  const password = request.body.password;
    Users.create(firstName, lastName, email, password)
    .then(newUser => {
     createSession(request, response, newUser);
     request.session.save(function(err) {
       if(err){
         console.log('request.session.save error:::', err);
       }
       response.redirect(`/connectTwilio`);
     });
   })
   .catch(error => {
     request.flash('error', 'That email already exists.');
     response.redirect('/');
   });
});

router.get('/connectTwilio', (request, response) => {
  response.locals.isLoggedIn = false;
  response.render('twilio');
});

router.get('/logout', (request, response) => {
  request.session.destroy((error) => {
    response.redirect('/');
    if(error) {
      renderError(request, response, error);
    }
  });
});

module.exports = router;
