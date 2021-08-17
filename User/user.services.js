//Require needed modules and models
const User = require("../Models/user");
const jwt = require("jsonwebtoken");

//Require config file
const config = require("../configs/config");

//Require nodemailer and nodemailer sendgrid transport to send email to users
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

//Setup the transporter with api key from sendGrid
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.apiKeys.sendGrid,
    },
  })
);

exports.createUser = async (user) => {
  //First check email availability
  const check = await User.findOne({ email: user.email });

  //Password will be already hashed in frontend
  if (!check) {
    //New email, create the user and save it

    //Create user and save it with given password
    const newUser = new User(user);

    const result = await newUser.save();

    // Send email to newly created user using sendGrid and nodeMailer
    const sendMail = await transporter.sendMail({
      to: user.email,
      from: "audioLibrary2380@gmail.com",
      subject: "Sign up successful!",
      text: `Welcome to AudioLibrary ${user.name}!`,
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

exports.login = async (credentials) => {
  const result = await User.findOne({ email: credentials.email });

  if (result) {
    //Check if we have block time on user
    if (
      !result.blockTime ||
      Math.floor((Date.now() - result.blockTime) / 36e5) >= 1
    ) {
      //Accept login request
      if (credentials.password == result.password) {
        //Correct credentials

        //Reset nb of attempts if any
        if (result.nbOfAttempts > 0) {
          await User.updateOne(
            { email: credentials.email },
            { $set: { nbOfAttempts: 0 } }
          );
        }

        //Create JWT token
        const token = jwt.sign(
          {
            email: credentials.email,
            id: result._id.toString(),
          },
          config.jwt.secret,
          { expiresIn: "1h" }
        );

        //Send the token in the response to front-end
        return { status: 200, token: token };
      } else {
        //Wrong password case
        if (Math.floor((Date.now() - result.blockTime) / 36e5) >= 1) {
          //Block time elapsed

          //Reset nb of attempts count to 0 and remove block time
          await User.updateOne(
            { email: result.email },
            { $set: { nbOfAttempts: 0 }, $unset: { blockTime: "" } }
          );
        }

        //First check nbOfAttempts for the user
        if (result.nbOfAttempts === 5) {
          //User is blocked
          return { status: 429 };
        } else if (result.nbOfAttempts === 4) {
          //Block user and update nbOfAttempts
          await User.updateOne(
            { email: credentials.email },
            { blockTime: Date.now() }
          );
        }

        //Increment nb of attempts for user
        await User.updateOne(
          { email: credentials.email },
          { $inc: { nbOfAttempts: 1 } }
        );

        return { status: 401 };
      }
    } else {
      //User is blocked, reject request
      return { status: 429 };
    }
  } else {
    return { status: 404 };
  }
};
