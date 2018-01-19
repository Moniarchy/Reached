const router = require('express').Router();
const authentication = require('./authentication');
const campaigns = require('./campaigns');
const users = require('./users');
const { isLoggedIn, setDefaultReponseLocals } = require('../middlewares');

router.use(setDefaultReponseLocals);

router.get('/', (request, response) => {
  if(request.session.user) {
    const id = request.session.user.id;
    response.redirect(`users/${id}`);
  } else {
    response.render('index', {warning: request.flash('error')});
  }
});


router.use(isLoggedIn);
router.use('/', authentication);
router.use('/campaigns', campaigns);
router.use('/users', users);

module.exports = router;
