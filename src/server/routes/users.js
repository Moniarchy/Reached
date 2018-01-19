const router = require('express').Router();

router.get('/:id', (request, response) => {
  response.render('users/profile');
});

module.exports = router;
