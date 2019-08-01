import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import { injectIntl, FormattedMessage } from "react-intl";
import { Formik } from "formik";
import { Context } from "../../App";
import { SEND_NOTIFICATION } from "../../actions";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

function Login(props) {
  const {
    store: { notifications },
    dispatch
  } = useContext(Context);
  const [type, setType] = useState("login");
  const {
    intl // Injected by `injectIntl`
  } = props;
  const switchType = e => {
    let newType = type === "login" ? "register" : "login";
    setType(newType);
  };

  function callback(type, values) {
    return function() {
      instance
        .post(type, values)
        .then(response => {
          dispatch({
            type:
              response.status === 200
                ? `${SEND_NOTIFICATION}:${type.toUpperCase()}_SUCCESS`
                : `${SEND_NOTIFICATION}:${type.toUpperCase()}_FAIL`,
            notifications: response.data
          });
        })
        .catch(error => console.log(error));
    };
  }

  return (
    <div className="form">
      <Formik
        initialValues={{
          username: "",
          password: "",
          passwordConfirm: ""
        }}
        validate={values => {
          let errors = {};
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
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={values.username || ""}
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: "Auth.Username" })}
            />
            {errors.username && touched.username && errors.username}
            <input
              type="password"
              name="password"
              value={values.password || ""}
              onChange={handleChange}
              placeholder={intl.formatMessage({ id: "Auth.Password" })}
            />
            {errors.password && touched.password && errors.password}
            {type === "register" && (
              <input
                type="password"
                name="passwordConfirm"
                value={values.passwordConfirm || ""}
                onChange={handleChange}
                placeholder={intl.formatMessage({
                  id: "Auth.Password2.Placeholder"
                })}
              />
            )}
            {errors.passwordConfirm &&
              touched.passwordConfirm &&
              errors.passwordConfirm}

            <button className="button--primary" type="submit">
              <FormattedMessage
                id={type === "register" ? "Auth.Register" : "Auth.Login"}
                defaultMessage={`Login`}
              />
            </button>
            <button
              className="button--custom"
              type="button"
              onClick={switchType}
            >
              <FormattedMessage
                id={type === "register" ? "Auth.Login" : "Auth.Register"}
                defaultMessage={`Register?`}
              />
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

Login.propTypes = {};

export default injectIntl(Login);
