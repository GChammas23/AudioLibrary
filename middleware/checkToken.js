//Require jwt to check token
const jwt = require("jsonwebtoken");
const config = require("../configs/config");

//Middleware method to check authentication of user
module.exports = (req, res, next) => {
  //Check if we have auth header first
  if (!req.headers.authorization){
    const error = new Error('No authorization token provided');
    error.statusCode = 403;
    throw error;
  }
  //Get Authorization header from request and split to get the token
  const receivedToken = req.get("Authorization").split(" ")[1];

  let decodedToken;

  try {
    //Validate the token
    decodedToken = jwt.verify(receivedToken, config.jwt.secret);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }

  if (!decodedToken) {
    //Token could not be decoded
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  //Move on to the controller
  next();
};
