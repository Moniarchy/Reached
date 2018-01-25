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
  const incomingNumber = request.body.From.replace(/[^0-9]/, '');
  const msgBody = request.body.Body;

  Campaigns.getByPhoneNumber(phoneNumber)
  .then(campaign => {
    Recipients.create(incomingNumber, campaign.id)
    .then(recipient => {
      Campaigns.getById(recipient.campaign_id)
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
      })
    })
  .catch(error => {
    renderError(request, response, error);
  });
});

router.get('/sms/mass', (request, response) => {
  const userId = request.session.user.id

  Campaigns.getByUserId(userId)
  .then(campaign => {
    response.render('sms/mass', {campaign})
  })
  .catch(error => {
    renderError(request, response, error);
  })
})

router.post('/:id/sms/mass', (request, response) => {
  const message = request.body.sms_mass
  const campaignId = request.params.id

  Recipients.getHellaInfoByCampaignId(campaignId)
  .then(info => {
    info.forEach(recipient => {
      twilio.messages.create({
        to: recipient.recipientnumber,
        from: recipient.campaignnumber,
        body: message
      })
    })
  })
  .then(result => {
    response.redirect(`/campaigns/${campaignId}/sms/mass/success`)
  })
  .catch(error => {
    renderError(request, response, error)
  })
})

router.get('/:id/sms/mass/success', (request, response) => {
  const campaignId = request.params.id

  Recipients.getHellaInfoByCampaignId(campaignId)
  .then(recipients => {
    const numberOfRecipients = recipients.length
    const campaignName = recipients[0].campaignname
    response.render('sms/success', {numberOfRecipients, campaignName})
  })
  .catch(error => {
    renderError(request, response, error)
  })
})

module.exports = router;
