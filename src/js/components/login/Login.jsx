import React, { useContext } from "react";
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
  const { values, handleChange, handleSubmit } = useForm(login);
  function login() {
    //console.log(values);
    instance
      .post("login", values)
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
  }
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
        <button className="button--primary" type="submit">
          Zaloguj
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
