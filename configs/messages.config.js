module.exports = {
  create: {
    success: {
      status: 200,
      message: "The record has been successfully created!",
    },

    failure: {
      status: 500,
      message: "An error occurred while trying to create the record",
    },
  },

  read: {
    success: {
      status: 200,
      message: "Fetch successful!",
    },

    failure: {
      status: 404,
      message: "Couldn't find any record",
    },
  },

  update: {
    success: {
      status: 200,
      message: "The record has been successfully updated!",
    },

    failure: {
      status: 500,
      message: "An error occurred while trying to update the record",
    },
  },

  delete: {
    success: {
      status: 200,
      message: "The record has been successfully deleted!",
    },

    failure: {
      status: 500,
      message: "An error occurred while trying to delete the record",
    },
  },

  login: {
    success: {
      status: 200,
      message: "Login successful!",
    },

    failure: {
      invalidEmail: {
        status: 404,
        message:
          "Invalid email address, please make sure you enter a valid one",
      },

      blocked: {
        status: 429,
        message: "Your account has been blocked for 1 hour, please wait",
      },

      invalidPassword: {
        status: 401,
        message: "Wrong password",
      },
    },
  },

  resetPassMail: {
    success: {
      status: 200,
      message: "Reset password link has been successfully sent to your email!",
    },

    mailError: {
      status: 401,
      message: "Unauthorized request. Please try again later!",
    }
  }
};
