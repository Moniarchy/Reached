const setDefaultReponseLocals = (request, response, next) => {
  response.locals.isLoggedIn = false;
  next();
};

const isLoggedIn = (request, response, next) => {
  if(request.session.user) {
    response.locals.isLoggedIn = true;
  }
  next();
};

module.exports = {
  isLoggedIn,
  setDefaultReponseLocals
};
