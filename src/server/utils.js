const createSession = (request, response, user) => {
  request.session.user = user;
};

const renderError = (request, response, error) => {
  console.error('---------------------');
  console.error('ERROR:', error.message);
  console.error(error.stack);
  console.error('---------------------');
  response.status(500).render('error', {error});
};

module.exports = {
  createSession,
  renderError
};
