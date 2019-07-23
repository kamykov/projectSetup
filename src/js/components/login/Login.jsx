import React from "react";
import useForm from "../../hooks/useForm";
import PropTypes from "prop-types";
import axios from "axios";
import "./Login.scss";

const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

function Login() {
  const { values, handleChange, handleSubmit } = useForm(login);
  function login() {
    //console.log(values);
    instance
      .post("login", values)
      .then(response => {
        //console.log(response);
        if (response.status === 200) {
          console.log("git!!!", response.data);
        } else {
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
