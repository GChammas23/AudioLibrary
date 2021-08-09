//Require services functions
const services = require("./user.services");

exports.createUser = async (req, res) => {
  //Check if passwords match (SHOULD BE REMOVED AFTER USING JOI)
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send(); // Passwords do not match
  } else {
    //Check if email is already in use first
    try {
      const result = await services.createUser(req);

      if (result) {
        res.status(200).send({ result: result });
      } else {
        res.status(409).send();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

exports.login = async (req, res) => {
  //Check if entered email is existing
  try {
    const result = await services.login(req);

    if(result) {
      res.status(200).send({result: result})
    }else{
      res.status(401).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
