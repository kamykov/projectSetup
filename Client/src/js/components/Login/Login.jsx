/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import axios from 'axios';
import { SEND_NOTIFICATION, USER_LOGIN_SUCCES } from '../../actions';
import { Context } from '../../context/storeContext';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});

function Login({ intl, history }) {
  const { dispatch } = useContext(Context);
  const [type, setType] = useState('login');
  const switchType = () => setType(type === 'login' ? 'register' : 'login');

  function callback(action, values) {
    return () => {
      instance
        .post(action, values)
        .then((response) => {
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
          console.log(values);
          // if (!values.username) {
          //   errors.username = "Required";
          // } else if (!(values.username.length > 3)) {
          //   errors.username = "Validation.usernameToShort";
          // }
          // if (values.password) {
          //   errors.password = "Password Required";
          // }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, submitCount }) => {
          setTimeout(() => {
            callback(type, values)();
            // alert(JSON.stringify(values, null, 2));
            console.log(JSON.stringify(values, null, 2));
            console.log(submitCount);

            setSubmitting(true);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          // handleBlur,
          handleSubmit,
          // isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={values.username || ''}
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: 'Auth.Username' })}
            />
            {errors.username && touched.username && errors.username}
            <input
              type="password"
              name="password"
              value={values.password || ''}
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: 'Auth.Password' })}
            />
            {errors.password && touched.password && errors.password}
            {type === 'register' && (
            <input
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm || ''}
              onChange={handleChange}
              placeholder={intl.formatMessage({
                id: 'Auth.Password2.Placeholder',
              })}
            />
            )}
            {errors.passwordConfirm
                && touched.passwordConfirm
                && errors.passwordConfirm}

            <button className="button--primary" type="submit">
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
