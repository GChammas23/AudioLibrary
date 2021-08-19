//Require services functions and sender middleware.
const services = require("./user.services");
const sender = require("../middleware/responseSender");

exports.createUser = async (req, res) => {
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

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.login = async (req, res) => {
  //Create credentials object to send to services
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const result = await services.login(credentials);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.sendResetMail = async (req, res) => {
  try {
    const result = await services.sendResetMail(req.body.email);
    
    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};
