const router = require('express').Router();
const Users = require('../../models/users');
const Campaigns = require('../../models/campaigns');
const { renderError } = require('../utils');

router.get('/new', (request, response) => {
  const twilioAccountSID = request.query.AccountSid;
  const id = request.session.user.id;

  Users.addSid(twilioAccountSID, id)
  .then(user => {
    console.log('updated user:::', user);
    response.render('campaigns/new');
  })
  .catch(error => {
    renderError(request, response, error);
  });
});

router.post('/new', (request, response) => {
  const userId = request.session.user.id;
  const name = request.body.campaign_name;
  const organizationName = request.body.organization_name;

  Campaigns.create(userId, name, organizationName)
  .then(response.redirect('/sms/auto'))
  .catch(error => {
    renderError(request, response, error);
  });
});

router.get('/sms/auto', (request, response) => {
  response.render('sms/auto');
});

module.exports = router;
