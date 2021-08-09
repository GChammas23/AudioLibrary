const { Joi } = require("express-validation");

exports.loginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required(),

    password: Joi.string().required(),
  }),
};

exports.signUpSchema = {
  body: Joi.object({
    name: Joi.string().required(),

    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required(),

    password: Joi.string().required(),

    confirmPassword: Joi.ref("password"),
  })
    .with("password", "confirmPassword")
    .with("confirmPassword", "password"),
};
