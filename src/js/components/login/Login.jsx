import React, { useContext, useState } from "react";
import useForm from "../../hooks/useForm";
import { Context } from "../../App";
import PropTypes from "prop-types";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

function Login() {
  const {
    store: { notifications },
    dispatch
  } = useContext(Context);
  const [type, setType] = useState("login");
  const { values, handleChange, handleSubmit } = useForm(callback(type));

  const switchType = e => {
    let newType = type === "login" ? "register" : "login";
    setType(newType);
  };

  function callback(type) {
    return function() {
      instance
        .post(type, values)
        .then(response => {
          if (response.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", message: "Sucess" });
            console.log("git!!!", response.data);
          } else {
            dispatch({ type: "LOGIN_FAIL", message: "Fail" });
            console.log("Fail", response.data);
          }
        })
        .catch(error => console.log(error));
    };
  }

  const inputConfirm = type => {
    return type === "register" ? (
      <input
        type="password"
        name="passwordConfirm"
        value={values.passwordConfirm || ""}
        onChange={handleChange}
      />
    ) : null;
  };
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={values.username || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
        />
        {type === "register" && (
          <input
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm || ""}
            onChange={handleChange}
          />
        )}
        <button className="button--primary" type="submit">
          {type === "register" ? "Rejestracja" : "Login"}
        </button>
        <button type="button" onClick={switchType}>
          {type === "register" ? "Login" : "Rejestracja"}
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
