const { Joi } = require("express-validation");

exports.loginSchema = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required()
      .messages({
        "any.required": "Email not entered!",
        "string.empty": "Email can't be empty!",
      }),

    password: Joi.string().required().messages({
      "any.required": "Password not entered!",
      "string.empty": "Password can't be empty!",
    }),
  }),
};

exports.signUpSchema = {
  body: Joi.object({
    name: Joi.string().required(),

    email: Joi.string()
      .email({ tlds: { allow: ["com"] } })
      .required()
      .messages({
        "any.required": "Email not entered!",
        "string.empty": "Name can't be empty!",
      }),

    password: Joi.string().required().messages({
      "any.required": "Password not entered!",
      "string.empty": "Password can't be empty!",
    }),

    confirmPassword: Joi.ref("password"),
  })
    .with("password", "confirmPassword")
    .with("confirmPassword", "password"),
};

exports.resetPassSchema = {
  body: Joi.object({
    password: Joi.string().required().messages({
      "any.required": "Password not entered!",
      "string.empty": "Password can't be empty!",
    }),
  }),
};
