//Require message configs to use in response
const messages = require("../configs/messages.config");

module.exports = (req, res, next) => {
  // First check the method used in the request

  switch (req.method) {
    case "GET":
      let responseObject;

      if (req.result) {
        //Successful fetch
        responseObject = messages.read.success;

        responseObject.result = req.result;
      } else {
        responseObject = messages.read.failure;
      }

      //Send response
      res.status(responseObject.status).send(responseObject);
      break;

    case "POST":
      //Add case

      let object;

      //Check if it is the login case

      if (req.url === "/api/auth/login") {
        if (req.result) {
          //Login successful
          object = messages.login.success;

          object.result = req.result;
        } else {
          //Login unsuccessful
          object = messages.login.failure;
        }
      } else {
        //Other cases

        //Check if anything is in request
        if (req.result) {
          //Successful add

          //Prepare and send the proper response
          object = messages.create.success;

          object.result = req.result;
        } else {
          //Error case

          object = messages.create.failure;
        }
      }

      //Send response
      res.status(object.status).send(object);

      break;

    case "PUT":
      //Update case

      let response;

      if (req.result == 200) {
        //Update successful
        response = messages.update.success;
      } else {
        response = messages.update.failure;
      }

      //Send response
      res.status(response.status).send(response);
      break;

    case "DELETE":
      //Delete case

      let responseBody;

      if (req.result == 200) {
        //Delete successful
        responseBody = messages.delete.success;
      } else {
        responseBody = messages.delete.failure;
      }

      //Send response
      res.status(responseBody.status).send(responseBody);
      break;
  }
};
