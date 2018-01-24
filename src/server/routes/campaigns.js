const router = require('express').Router( { mergeParams: true } );
const Users = require('../../models/users');
const Campaigns = require('../../models/campaigns');
const Recipients = require('../../models/recipients');
const { renderError } = require('../utils');
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)/*(get a user's SID from the database, get a user's token from the database)*/

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

router.post('/sms/auto', (request, response) => {
  const phoneNumber = request.body.To.replace(/[^0-9]/, '');
  const incomingNumber = request.body.From;
  const msgBody = request.body.Body;

  Campaigns.getByPhoneNumber(phoneNumber)
  .then(campaign => {
    Recipients.create(incomingNumber, campaign.id)
  })
  .then(campaign => {
    response.send(`
      <Response>
        <Message>
          Hello ${incomingNumber}!
          ${campaign.auto_response}
        </Message>
      </Response>
    `);
  })
  .catch(error => {
    renderError(request, response, error);
  });
});

router.post('/sms/mass', (request, response) => {
  const message = request.body.sms_mass
  let campaignPhoneNumber;

  Recipients.getAll()
  .then(recipients => {
    Campaigns.getById(recipients[0].campaign_id)
    .then(campaign => {
      console.log('campaign', campaign.phone_number)
    })
  recipients.forEach(recipient => {
    console.log('campaignPhoneNumber', campaignPhoneNumber) //empty right now
    twilio.messages.create({
      to: recipient.phone_number,
      from: campaignPhoneNumber,
      body: message
    })
    .then(result => {
      console.log(result.sid)
    })
  })
  })
  .catch(error => {
    renderError(request, response, error);
  })
  response.send('Success!')
})

module.exports = router;
