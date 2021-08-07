//Require user Schema and other needed packages
const User = require("../Models/user");
const jwt = require("jsonwebtoken");

//Require nodemailer and nodemailer sendgrid transport to send email to users
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

//Setup the transporter with api key from sendGrid
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SEND_GRID_API_KEY,
    },
  })
);

exports.createUser = async (req, res) => {
  //Check if passwords match (SHOULD BE REMOVED AFTER USING JOI)
  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).send(); // Passwords do not match
  } else {
    //Check if email is already in use first
    try {
      const check = await User.findOne({ email: req.body.email });

      //Password will be already hashed in frontend 
      if (!check) {
        //New email, create the user and save it

        //Create user and save it with given password
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          registrationDate: new Date(),
        });

        const result = await newUser.save();

        // Send email to newly created user using sendGrid and nodeMailer
        const sendMail = await transporter.sendMail({
          to: req.body.email,
          from: "audioLibrary2380@gmail.com",
          subject: "Sign up successful!",
          text: `Welcome to AudioLibrary ${req.body.name}!`,
        });

        if (sendMail) {
          res.status(200).send({ result: result });
        } else {
          res.status(500).send();
        }

      } else {
        //Email already exists
        res.status(400).send();
      }
    } catch (err) {
      res.status(500).send({ error: err });
    }
  }
};

exports.login = async (req, res) => {
  //Check if entered email is existing
  try {
    const result = await User.findOne({ email: req.body.email });

    if (result) {

      if (req.body.password == result.password) {
        //Correct credentials

        //Create JWT token
        const token = jwt.sign(
          {
            email: req.body.email,
            id: result._id.toString(),
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        //Send the token in the response to front-end
        res.status(200).send({ token: token });
      } else {
        res.status(401).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
