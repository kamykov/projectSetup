import React from "react";
import useForm from "../../hooks/useForm";
import PropTypes from "prop-types";
import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

function Login() {
  const { values, handleChange, handleSubmit } = useForm(login);
  function login() {
    //console.log(values);
    instance
      .post("login", values)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={values.username || ""}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  );
}

Login.propTypes = {};

export default Login;
