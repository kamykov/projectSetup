/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useContext, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import { apiRequest } from '../../utils/apiRequest';
import { SEND_NOTIFICATION, USER_LOGIN_SUCCES } from '../../actions';
import { Context } from '../../context/storeContext';
import ErrorValidation from '../ErrorValidation/ErrorValidation';

function Login({ intl, history }) {
  const { dispatch } = useContext(Context);
  const [type, setType] = useState('login');
  const switchType = () => setType(type === 'login' ? 'register' : 'login');

  function sendData(action, values) {
    return () => {
      apiRequest
        .post(action, values)
        .then((response) => {
          console.log(response.data);
          dispatch({
            type:
            response.status < 204
              ? `${SEND_NOTIFICATION}:${action.toUpperCase()}_SUCCESS`
              : `${SEND_NOTIFICATION}:${action.toUpperCase()}_FAIL`,
            notifications: response.data,
          });
          if (response.status === 202) {
            dispatch({
              type: USER_LOGIN_SUCCES,
              users: response.data,
            });
            history.push('/user/status');
          }
        })
        .catch((error) => console.log(error));
    };
  }

  return (
    <div className="form">
      <Formik
        initialValues={{
          username: '',
          password: '',
          passwordConfirm: '',
        }}

        validate={(values) => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Validation.Username.Required';
          } else if (values.username.length < 3) {
            errors.username = 'Validation.Username.Length';
          }
          if (!values.password) {
            errors.password = 'Validation.Password.Required';
          }
          if (type === 'register') {
            if (!values.passwordConfirm) {
              errors.passwordConfirm = 'Validation.Password.Required';
            }
            if (values.password !== values.passwordConfirm) {
              errors.passwordConfirm = 'Validation.passwordConfirm.Match';
            }
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            sendData(type, values)();
            setSubmitting(true);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          dirty,
          isValid,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: 'Auth.Username' })}
            />
            <ErrorValidation name="username" errors={errors} />
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: 'Auth.Password' })}
            />
            <ErrorValidation name="password" errors={errors} />
            {type === 'register' && (
            <>
              <input
                type="password"
                name="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
                placeholder={intl.formatMessage({
                  id: 'Auth.Password2.Placeholder',
                })}
              />
              <ErrorValidation name="passwordConfirm" errors={errors} />
            </>
            )}

            <button className="button--primary" type="submit" disabled={!dirty || !isValid}>
              <FormattedMessage
                id={type === 'register' ? 'Auth.Register' : 'Auth.Login'}
                defaultMessage="Login"
              />
            </button>
            <button
              className="button--custom"
              type="button"
              onClick={switchType}
            >
              <FormattedMessage
                id={type === 'register' ? 'Auth.Login' : 'Auth.Register'}
                defaultMessage="Register?"
              />
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

Login.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(Login);
