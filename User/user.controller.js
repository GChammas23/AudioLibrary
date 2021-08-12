//Require services functions
const services = require("./user.services");

exports.createUser = async (req, res, next) => {
  //Create user object with values from body
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.email,
    registrationDate: new Date(),
  };

  try {
    const result = await services.createUser(user);

    req.result = result;

    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.login = async (req, res, next) => {
  //Create credentials object to send to services
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await services.login(credentials);

    req.result = result;

    next();
  } catch (err) {
    throw new Error(err.message);
  }
};
