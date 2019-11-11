const Validator = require('validator');
const isEmpty = require('./isEmpty');

exports.validateLoginInput = (data) => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Validation.Username.Reqired';
  }
  if (!Validator.isLength(data.username, { min: 3, max: 64 })) {
    errors.username = 'Validation.Username.Length';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Validation.Password.Required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    data,
  };
};

exports.validateRegisterInput = (data) => {
  const errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Validation.Username.Reqired';
  }
  if (!Validator.isLength(data.username, { min: 3, max: 64 })) {
    errors.username = 'Validation.Username.Length';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Validation.Password.Required';
  }
  if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Auth.Register.Passwords.Error';
  }

  return {
    errors,
    isValid: isEmpty(errors),
    data,
  };
};
