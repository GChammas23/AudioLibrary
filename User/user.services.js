//Require needed modules and models
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

exports.signUpService = async (req, res) => {
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
      return result._id;
    } else {
      return;
    }
  } else {
    //Email already exists
    return;
  }
};

exports.loginService = async (req, res) => {
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
      return token;
    } else {
      return;
    }
  } else {
    return;
  }
};
