const router = require('express').Router( { mergeParams: true } );
const Users = require('../../models/users');
const Campaigns = require('../../models/campaigns');
const { renderError } = require('../utils');

router.get('/new', (request, response) => {
  const twilioAccountSID = request.query.AccountSid;
  const id = request.session.user.id;

  Users.addSid(twilioAccountSID, id)
  .then(user => {
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
  .then(campaign => {
    response.redirect(`/campaigns/${campaign.id}/sms/auto`);
  })
  .catch(error => {
    renderError(request, response, error);
  });
});

router.get('/:id/sms/auto', (request, response) => {
  const id = request.params.id;
  response.render('sms/auto', {id});
});

router.post('/:id/sms/auto', (request, response) => {
  const id = request.params.id;
  const userId = request.session.user.id;
  const autoResponse = request.body.sms_auto;

  Campaigns.addAutoResponse(id, userId, autoResponse)
  .then(response.redirect(`/campaigns/${id}`))
  .catch(error => {
    renderError(request, response, error);
  });
});

router.get('/:id', (request, response) => {
  const id = request.params.id;

  Campaigns.getById(id)
  .then(campaign => {
    const campaignName = campaign.name;
    const phoneNumber = campaign.phone_number;
    response.render('campaigns/campaign-info', {campaignName, phoneNumber});
  })
  .catch(error => {
    renderError(request, response, error);
  });
});

module.exports = router;
