const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Validation.Username.Reqired";
  }
  if (!Validator.isLength(data.username, { min: 3, max: 64 })) {
    errors.username = "Validation.Username.Length";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Validation.Password.Required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
    data
  };
};
