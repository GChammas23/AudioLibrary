//Require services functions
const services = require("./user.services");

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

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(409).send();
    }
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

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(401).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
